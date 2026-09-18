// Copies the web-ready files from the brand kit (brand-assets/, exported from
// the Pencil design) into public/, optimising the Open Graph images on the way.
//
//   pnpm assets:brand
//
// brand-assets/ is gitignored (~90 MB). The outputs in public/ are committed,
// so this only needs running again when the brand kit changes.
import { copyFile, mkdir, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// The brand kit is shared by every site, so it lives at the repo root.
const kit = join(root, '..', '..', 'brand-assets')
const pub = join(root, 'public')

if (!existsSync(kit)) {
  console.error(`No brand kit at ${kit}. Export it from the Pencil file first.`)
  process.exit(1)
}

// -- Favicons & app icons: copied as-is (already optimised by the export) --
const icons = [
  'favicon.ico',
  'favicon.svg',
  'favicon-16.png',
  'favicon-32.png',
  'apple-touch-icon.png',
  'android-chrome-192.png',
  'android-chrome-512.png',
  'maskable-512.png',
  'mstile-150.png',
  'safari-pinned-tab.svg',
  'site.webmanifest',
  'browserconfig.xml',
]
for (const file of icons) {
  await copyFile(join(kit, '02-favicons-app-icons', file), join(pub, file))
}
console.log(`  ${icons.length} icons -> public/`)

// -- Open Graph images: PNG exports are ~600 KB each; JPEG at q86 is ~10x smaller --
//
// The dark variants ship, and the "-light" ones are skipped on purpose. A link preview is
// scraped once by the platform's crawler and served from its CDN, so it cannot follow the
// reader's colour scheme; one card has to work everywhere. The ink card stands out against
// light feeds (LinkedIn, X, Google) and still reads inside dark-mode apps.
await mkdir(join(pub, 'og'), { recursive: true })
const ogDir = join(kit, '01-open-graph')
const og = (await readdir(ogDir)).filter(
  (file) => file.endsWith('.png') && !file.includes('-light') && !file.includes('template'),
)
for (const file of og) {
  const out = join(pub, 'og', file.replace(/\.png$/, '.jpg'))
  await sharp(join(ogDir, file))
    .flatten({ background: '#0A0F1E' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out)
}
console.log(`  ${og.length} Open Graph images -> public/og/`)

// -- Logo for structured data (Google wants a raster, at least 112px) --
await copyFile(join(kit, '02-favicons-app-icons', 'android-chrome-512.png'), join(pub, 'logo.png'))
console.log('  logo.png -> public/')
