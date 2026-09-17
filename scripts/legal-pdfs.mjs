/* global document -- code inside page.evaluate() runs in the browser */
// Builds the "Download PDF" files for the legal pages from their print layout.
//
//   pnpm dev                        (in another terminal)
//   pnpm legal:pdfs
//
// Re-run it whenever a legal document changes, and commit the PDFs with the change:
// the page links to public/legal/fluxstride-<slug>.pdf, so a stale file is a stale policy.
//
// Options (env):
//   BASE_URL=http://localhost:4173  use a preview build instead of the dev server
//
// Uses the Microsoft Edge or Google Chrome already installed on this machine.
import { mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'legal')
const baseUrl = process.env.BASE_URL ?? 'http://localhost:5173'

async function launch() {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel })
    } catch {
      // Try the next installed browser.
    }
  }
  throw new Error('Needs Microsoft Edge or Google Chrome installed.')
}

const browser = await launch()
const context = await browser.newContext({ reducedMotion: 'reduce' })
// A saved (all-off) consent choice, so the cookie banner never appears in the PDF.
await context.addCookies([
  {
    name: 'fs_consent',
    value: encodeURIComponent(
      JSON.stringify({ v: 1, c: { analytics: false, functional: false, marketing: false }, t: Date.now() }),
    ),
    url: baseUrl,
  },
])
const page = await context.newPage()
await mkdir(outDir, { recursive: true })

try {
  await page.goto(`${baseUrl}/privacy`, { waitUntil: 'networkidle' })
} catch {
  throw new Error(`Could not reach ${baseUrl}. Start the dev server first (pnpm dev).`)
}

// The documents are whatever the legal tabs link to, so a new one is picked up automatically.
const slugs = await page.$$eval('nav[aria-label="Legal documents"] ul a', (links) =>
  links.map((link) => new URL(link.href).pathname.slice(1)),
)

for (const slug of slugs) {
  await page.goto(`${baseUrl}/${slug}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const title = await page.title()
  const file = join(outDir, `fluxstride-${slug}.pdf`)
  await page.pdf({
    path: file,
    format: 'A4',
    printBackground: true,
    margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;padding:0 16mm;font:8px monospace;color:#5B6477;display:flex;justify-content:space-between">
      <span>${title.replace(/</g, '&lt;')}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>`,
  })
  console.log(`  ${file.replace(root, '.')}`)
}

await browser.close()
