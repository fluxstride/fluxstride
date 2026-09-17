// Imports the images used by the design into responsive, modern formats.
//
//   pnpm assets:images            convert anything missing
//   pnpm assets:images --force    rebuild everything
//
// For every entry in IMAGES below it writes
//   public/images/<name>-<width>.avif and .webp   (one pair per width)
// and regenerates src/content/images.generated.ts, the typed manifest that
// <Picture name="…"> reads (intrinsic size, widths, placeholder colour).
//
// Sources are either files exported from the Pencil design (the "images" folder
// next to fluxstride.pen; override with DESIGN_IMAGES=<dir>) or remote URLs.
//
// Adding an image: add an entry, run the script, commit the output.
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const designImages = process.env.DESIGN_IMAGES ?? join(homedir(), 'Documents', 'pencil designs', 'images')
const outDir = join(root, 'public', 'images')
const manifestPath = join(root, 'src', 'content', 'images.generated.ts')
const force = process.argv.includes('--force')

/** Full-width product screenshots: sharp on 2x screens at the 1280px container. */
const SCREENSHOT_WIDTHS = [640, 1024, 1600, 2560]

const unsplash = (id) => `https://images.unsplash.com/${id}?fm=jpg&q=90&w=1600&fit=max`

/**
 * name → { src, widths? }. `src` is a file name in the design's images folder or a URL.
 * Widths default to [640, 1024, 1408] and are capped at the source width.
 * PLACEHOLDERS: every image here is design-stage artwork or stock photography.
 */
const IMAGES = {
  'work/northwind': { src: 'generated-1789577323589.png' },
  'work/halden-coffee': { src: 'generated-1789577320469.png' },
  'work/orbit-health': { src: 'generated-1789577326370.png' },
  'work/kinetic-labs': { src: 'generated-1789578363583.png' },
  'work/atlas-freight': { src: 'generated-1789579203190.png' },
  'people/amara-okafor': { src: unsplash('photo-1784926119174-1b471595aa5a'), widths: [96, 144, 216] },
  'studio/monday-planning': { src: 'generated-1789579395826.png' },
  'insights/launch-is-the-start-line': { src: 'generated-1789579506258.png' },
  'insights/headless-or-monolith': { src: 'generated-1789579532172.png', widths: [480, 800] },
  'insights/checkout-audit': { src: 'generated-1789579522787.png', widths: [480, 800] },
  'insights/design-systems-second-year': { src: 'generated-1789579520168.png', widths: [480, 800] },
  'insights/technical-seo-javascript': { src: 'generated-1789579525110.png', widths: [480, 800] },
  'insights/build-buy-or-integrate': { src: 'generated-1789579529376.png', widths: [480, 800] },
  'insights/website-packages': { src: 'generated-1789579530858.png', widths: [480, 800] },
  // Case studies (src/content/case-studies/studies). Hero photos double as the "Next project"
  // cover. Screenshots are exported from the design at 2x without their browser chrome,
  // which the page draws itself.
  'case-studies/northwind-hero': { src: 'generated-1789579203190.png' },
  'case-studies/northwind-dashboard': { src: 'cs-northwind-dashboard.png', widths: SCREENSHOT_WIDTHS },
  'case-studies/orbit-health-hero': { src: 'generated-1789577326370.png' },
  ...appScreens('orbit-health', ['home', 'choose-time', 'confirm', 'booked'], 'cs-orbit-screen'),
  'case-studies/kinetic-labs-cover': { src: 'generated-1789578363583.png' },
  'case-studies/kinetic-labs-home': { src: 'cs-kinetic-hero.png', widths: SCREENSHOT_WIDTHS },
  // Before/after pair: 620px wide on desktop, so 2x is 1240.
  'case-studies/kinetic-labs-before': { src: 'cs-kinetic-before.png', widths: [640, 1240] },
  'case-studies/kinetic-labs-after': { src: 'cs-kinetic-after.png', widths: [640, 1240] },
  'case-studies/halden-coffee-hero': { src: 'generated-1789577320469.png' },
  'case-studies/halden-coffee-product': { src: 'cs-halden-product.png', widths: SCREENSHOT_WIDTHS },
  'case-studies/aurora-architects-hero': { src: 'generated-1789577323589.png' },
  // Brand artwork panels: the design arranges them differently on phones, so each has a mobile crop (3x of 350px).
  'case-studies/aurora-architects-mark': { src: 'cs-aurora-mark.png', widths: SCREENSHOT_WIDTHS },
  'case-studies/aurora-architects-mark-mobile': { src: 'cs-aurora-mark-mobile.png', widths: [700, 1050] },
  'case-studies/aurora-architects-applications': {
    src: 'cs-aurora-applications.png',
    widths: SCREENSHOT_WIDTHS,
  },
  'case-studies/aurora-architects-applications-mobile': {
    src: 'cs-aurora-applications-mobile.png',
    widths: [700, 1050],
  },
  'case-studies/atlas-freight-cover': { src: 'generated-1789579525110.png' },
  ...thumbnails(
    'kinetic-labs',
    ['home', 'product', 'pricing', 'customers', 'docs', 'blog-article'],
    'cs-kinetic-template',
  ),
  ...team({
    'daniel-mensah': 'photo-1763745315951-7daac4821af6',
    'priya-raman': 'photo-1760552069633-c05f246a5d8c',
    'tom-keller': 'photo-1601233748618-c0d3963fd030',
    'aisha-bello': 'photo-1591618828412-c1a160a7fb20',
    'leo-martins': 'photo-1676131161005-ec2b897f1323',
    'sofia-lind': 'photo-1581182830442-e8bc7babbf15',
    'kwame-asante': 'photo-1763849049538-5ec4a2729c5d',
    'hannah-cole': 'photo-1631377307692-36a9b6ae3ef6',
  }),
}

/**
 * Page template thumbnails: a desktop crop (413×220, exported at 2x) and the design's own
 * mobile crop (169×130, at 3x), used through `mobileImage`.
 */
function thumbnails(study, pages, filePrefix) {
  return Object.fromEntries(
    pages.flatMap((page) => [
      [`case-studies/${study}-${page}-thumb`, { src: `${filePrefix}-${page}.png`, widths: [480, 827] }],
      [
        `case-studies/${study}-${page}-thumb-mobile`,
        { src: `${filePrefix}-${page}-mobile.png`, widths: [340, 507] },
      ],
    ]),
  )
}

/** App screens exported at 3x (756×1626), shown about 250px wide in a phone frame. */
function appScreens(study, screens, filePrefix) {
  return Object.fromEntries(
    screens.map((screen) => [
      `case-studies/${study}-${screen}`,
      { src: `${filePrefix}-${screen}.png`, widths: [320, 540, 756] },
    ]),
  )
}

/** Studio team portraits: about 300px wide on desktop, 170px on mobile. */
function team(people) {
  return Object.fromEntries(
    Object.entries(people).map(([slug, id]) => [
      `team/${slug}`,
      { src: unsplash(id), widths: [320, 480, 640] },
    ]),
  )
}

const DEFAULT_WIDTHS = [640, 1024, 1408]

async function load(src) {
  if (/^https?:\/\//.test(src)) {
    const response = await fetch(src)
    if (!response.ok) throw new Error(`${response.status} fetching ${src}`)
    return Buffer.from(await response.arrayBuffer())
  }
  const path = join(designImages, src)
  if (!existsSync(path)) throw new Error(`Missing ${path}. Set DESIGN_IMAGES to the design's images folder.`)
  return readFile(path)
}

function hex({ r, g, b }) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

async function readManifest() {
  if (!existsSync(manifestPath)) return {}
  const text = await readFile(manifestPath, 'utf8')
  const json = text.match(/export const images = (\{[\s\S]*\}) as const/)
  return json ? JSON.parse(json[1]) : {}
}

const previous = await readManifest()
const manifest = {}
let converted = 0

for (const [name, { src, widths = DEFAULT_WIDTHS }] of Object.entries(IMAGES)) {
  const known = previous[name]
  const outputs = (list) =>
    list.flatMap((w) => ['avif', 'webp'].map((ext) => join(outDir, `${name}-${w}.${ext}`)))

  if (!force && known && known.src === src && outputs(known.widths).every((file) => existsSync(file))) {
    manifest[name] = known
    continue
  }

  const input = await load(src)
  const image = sharp(input).rotate()
  const { width, height } = await image.metadata()
  const { dominant } = await image.stats()
  const sizes = [...new Set(widths.map((w) => Math.min(w, width)))].sort((a, b) => a - b)

  await mkdir(dirname(join(outDir, name)), { recursive: true })
  for (const w of sizes) {
    const resized = sharp(input).rotate().resize({ width: w, withoutEnlargement: true })
    await resized
      .clone()
      .avif({ quality: 55, effort: 6 })
      .toFile(join(outDir, `${name}-${w}.avif`))
    await resized
      .clone()
      .webp({ quality: 78, effort: 6 })
      .toFile(join(outDir, `${name}-${w}.webp`))
  }

  manifest[name] = { src, width, height, widths: sizes, color: hex(dominant) }
  converted++
  console.log(`  ${name}  ${width}×${height} → ${sizes.join(', ')}`)
}

const body = JSON.stringify(manifest, null, 2)
await writeFile(
  manifestPath,
  `// Generated by scripts/import-images.mjs. Do not edit; add images there and re-run pnpm assets:images.
export const images = ${body} as const

export type ImageName = keyof typeof images
`,
)
console.log(`${converted} converted, ${Object.keys(manifest).length - converted} unchanged.`)
