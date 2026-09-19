// Screenshots the live client sites used by the case studies.
//
//   pnpm shots:projects                 capture every page below
//   pnpm shots:projects dexus           only the pages whose name starts with "dexus"
//
// Writes 2880x1800 PNGs (1440 CSS pixels at 2x, the size the browser frame draws at)
// into the design's images folder, next to the Pencil exports, so `pnpm assets:images`
// picks them up like any other source. Nothing here is committed: the AVIF/WebP files
// it produces are.
//
// After capturing:
//   pnpm assets:images                  convert and update images.generated.ts
//
// Uses the Microsoft Edge or Google Chrome already installed.
import { mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { chromium } from 'playwright-core'

const outDir = process.env.DESIGN_IMAGES ?? join(homedir(), 'Documents', 'pencil designs', 'images')

/**
 * name -> URL, or [URL, settle] when a page fetches its content after loading (Dexus's
 * stock comes from its API, so the listing needs longer before it is worth a picture).
 * The name is the source file the IMAGES entry in import-images.mjs points at, so keep
 * the two in step.
 */
const PAGES = {
  'cs-dexus-home': ['https://www.dexussynergy.com/', 20000],
  'cs-dexus-vehicles': ['https://www.dexussynergy.com/vehicles', 20000],
  'cs-dexus-vehicle': ['https://www.dexussynergy.com/vehicles/2019-bmw-1-series-1000', 12000],
  'cs-dexus-finance': ['https://www.dexussynergy.com/finance', 8000],
  'cs-adunyato-home': 'https://adunyato.fluxstride.com/',
  'cs-adunyato-menus': 'https://adunyato.fluxstride.com/menus',
  'cs-adunyato-catering': 'https://adunyato.fluxstride.com/catering',
  'cs-adunyato-gallery': 'https://adunyato.fluxstride.com/gallery',
  'cs-fluxstride-home': 'https://www.fluxstride.com/',
  'cs-fluxstride-work': 'https://www.fluxstride.com/work',
  'cs-fluxstride-services': 'https://www.fluxstride.com/services',
  'cs-fluxstride-process': 'https://www.fluxstride.com/process',
}

const only = process.argv.slice(2)
const wanted = Object.entries(PAGES).filter(([name]) => !only.length || only.some((p) => name.includes(p)))

await mkdir(outDir, { recursive: true })
const browser = await chromium
  .launch({ channel: 'msedge' })
  .catch(() => chromium.launch({ channel: 'chrome' }))

for (const [name, entry] of wanted) {
  const [url, settle = 3000] = Array.isArray(entry) ? entry : [entry]
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    // Screenshots should show the site at rest, not mid-animation.
    reducedMotion: 'reduce',
  })
  try {
    // Not networkidle: Dexus holds a live socket open, so the page is never idle.
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForTimeout(settle)
    // A cookie banner would sit over the bottom of every shot.
    const accept = page.getByRole('button', { name: /accept all/i }).first()
    if (await accept.isVisible().catch(() => false)) {
      await accept.click()
      await page.waitForTimeout(1200)
    }
    // Scroll through so lazy images load, then return to the top.
    const height = await page.evaluate(() => document.body.scrollHeight)
    for (let y = 0; y < Math.min(height, 6000); y += 700) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
      await page.waitForTimeout(150)
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    // Content that arrives from an API paints after the scroll, so wait again at the top
    // and, where the page shows skeletons while it loads, until they are gone.
    await page
      .waitForFunction(
        () =>
          !document.querySelector('.animate-pulse, [data-skeleton], [aria-busy="true"]') &&
          // Blur-up placeholders swap for the real file once it decodes, so wait for that too.
          [...document.images].every((image) => image.complete && image.naturalWidth > 0),
        { timeout: 25000 },
      )
      .catch(() => console.log(`    (still loading: ${name})`))
    await page.waitForTimeout(2500)
    const file = join(outDir, `${name}.png`)
    await page.screenshot({ path: file })
    console.log(`  ${name.padEnd(24)} ${url}`)
  } catch (error) {
    console.log(`  ${name.padEnd(24)} FAILED  ${error.message.split('\n')[0]}`)
  }
  await page.close()
}
await browser.close()
