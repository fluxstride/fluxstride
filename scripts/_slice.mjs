import sharp from 'sharp'
import { basename, join } from 'node:path'
const [file, outDir, sliceH = '1800', width] = process.argv.slice(2)
const img = sharp(file)
const { width: w, height: h } = await img.metadata()
const n = Math.ceil(h / +sliceH)
for (let i = 0; i < n; i++) {
  const top = i * +sliceH
  const out = join(outDir, `${basename(file, '.png')}-${i}.png`)
  let s = sharp(file).extract({ left: 0, top, width: w, height: Math.min(+sliceH, h - top) })
  if (width) s = s.resize({ width: +width })
  await s.toFile(out)
}
console.log(basename(file), w, h, n)
