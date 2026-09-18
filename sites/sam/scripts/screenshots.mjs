/* global document, window -- code inside page.evaluate() runs in the browser */
// Full-page screenshots at the two design widths, for comparing against the Pencil frames
// "Samuel Adekoya — Home (Desktop/Mobile)".
//
//   pnpm dev                          (in another terminal)
//   pnpm shots                        home page
//   BASE_URL=http://localhost:4174 pnpm shots     a preview build instead
//   MOTION=1 pnpm shots               keep animations (default: reduced motion)
//
// Uses the Microsoft Edge or Google Chrome already installed. Output: .screenshots/
import { mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, '.screenshots')
const baseUrl = process.env.BASE_URL ?? 'http://localhost:5174'
const motion = Boolean(process.env.MOTION)
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/']

await mkdir(outDir, { recursive: true })
const browser = await chromium
  .launch({ channel: 'msedge' })
  .catch(() => chromium.launch({ channel: 'chrome' }))

for (const path of paths) {
  for (const [label, width] of [
    ['desktop', 1440],
    ['mobile', 390],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: motion ? 'no-preference' : 'reduce',
    })
    await page.goto(new URL(path, baseUrl).href, { waitUntil: 'networkidle' })
    // Scroll through so lazy images load and scroll-triggered reveals fire.
    const height = await page.evaluate(() => document.body.scrollHeight)
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
      await page.waitForTimeout(motion ? 250 : 60)
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(400)
    const name = path === '/' ? 'home' : path.replaceAll('/', '')
    const file = join(outDir, `${name}-${label}.png`)
    await page.screenshot({ path: file, fullPage: true })
    console.log(`  ${file}`)
    await page.close()
  }
}
await browser.close()
