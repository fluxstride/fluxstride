/* global document, window -- code inside page.evaluate() runs in the browser */
// Full-page screenshots at the two design canvas widths, for comparing against
// the Pencil file (or brand-assets/08-website-mockups/).
//
//   pnpm dev                        (in another terminal)
//   pnpm shots                      every page
//   pnpm shots work contact         specific pages ("home" for /)
//
// Options (env):
//   BASE_URL=http://localhost:4173  screenshot a preview build instead
//   MOTION=1                        keep animations (default: reduced motion, so
//                                   reveals are in their final state)
//
// Uses the Microsoft Edge or Google Chrome already installed on this machine.
// Output: .screenshots/<page>-desktop.png and <page>-mobile.png
import { mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, '.screenshots')
const baseUrl = process.env.BASE_URL ?? 'http://localhost:5173'
// With motion on, give scroll-triggered reveals time to fire and finish.
const motion = Boolean(process.env.MOTION)
const scrollPause = motion ? 250 : 60

const ALL_PAGES = [
  '/',
  '/work',
  '/services',
  '/process',
  '/studio',
  '/insights',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/404-example',
]

// Accept "work" as well as "/work": Git Bash rewrites a leading slash into a Windows path.
const toPath = (arg) => (arg === 'home' ? '/' : `/${arg.replace(/^\/+/, '')}`)
const paths = process.argv.length > 2 ? process.argv.slice(2).map(toPath) : ALL_PAGES

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

async function launch() {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel })
    } catch {
      // try the next installed browser
    }
  }
  throw new Error('No installed Edge or Chrome found for playwright-core.')
}

await mkdir(outDir, { recursive: true })
const browser = await launch()

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: motion ? 'no-preference' : 'reduce',
  })
  const page = await context.newPage()

  for (const path of paths) {
    await page.goto(new URL(path, baseUrl).href, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    // Scroll through once so scroll-triggered content and lazy images load.
    await page.evaluate(async (pause) => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
        window.scrollTo(0, y)
        await new Promise((done) => setTimeout(done, pause))
      }
      window.scrollTo(0, 0)
    }, scrollPause)
    await page.waitForTimeout(motion ? 2000 : 400)

    const name = path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '-')
    const file = join(outDir, `${name}-${viewport.name}.png`)
    await page.screenshot({ path: file, fullPage: true })
    console.log(`  ${file.replace(root, '.')}`)
  }

  await context.close()
}

await browser.close()
