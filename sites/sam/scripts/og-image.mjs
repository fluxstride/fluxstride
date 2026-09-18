// Converts the Pencil export of "Samuel Adekoya: OG Image (1200×630)" into public/og.jpg.
//
//   1. In Pencil, export the frame as PNG at 2x.
//   2. pnpm og-image <path-to-export.png>
//
// Rendered at 2x and scaled down so the type stays crisp; JPEG keeps it well under the
// 5MB (X) and 8MB (Facebook) link-preview limits.
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const source = process.argv[2]
if (!source) {
  console.error('Usage: pnpm og-image <pencil-export.png>')
  process.exit(1)
}

const out = fileURLToPath(new URL('../public/og.jpg', import.meta.url))
const info = await sharp(source)
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(out)
console.log(`Wrote ${out} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`)
