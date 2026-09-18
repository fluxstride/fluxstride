// Prints a fluid clamp() for a type or spacing token.
//
//   node scripts/fluid.mjs <size at 390px> <size at 1440px>
//   node scripts/fluid.mjs 40 64
//   -> clamp(2.5rem, 1.9429rem + 2.2857vw, 4rem)
//
// 390px and 1440px are the widths of the mobile and desktop canvases in the
// Pencil design, so the result matches both designs exactly.
const MOBILE = 390
const DESKTOP = 1440

const [min, max] = process.argv.slice(2).map(Number)
if (!Number.isFinite(min) || !Number.isFinite(max)) {
  console.error('Usage: node scripts/fluid.mjs <mobile px> <desktop px>')
  process.exit(1)
}

const rem = (px) => `${+(px / 16).toFixed(4)}rem`

if (min === max) {
  console.log(rem(min))
} else {
  const slope = (max - min) / (DESKTOP - MOBILE)
  const intercept = min - MOBILE * slope
  console.log(`clamp(${rem(min)}, ${rem(intercept)} + ${+(slope * 100).toFixed(4)}vw, ${rem(max)})`)
}
