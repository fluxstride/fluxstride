// Renders every route to static HTML after the client and SSR bundles are built.
//
// Run by `pnpm build`, after:
//   vite build                                        -> dist/
//   vite build --ssr src/entry-server.tsx --outDir dist-ssr
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js')

// pathToFileURL matters on Windows: a bare absolute path is not a valid import specifier.
const server = await import(pathToFileURL(ssrEntry).href)

const template = await readFile(join(distDir, 'index.html'), 'utf8')
const lastmod = new Date().toISOString().slice(0, 10)

const SEO_MARKERS = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/
const ROOT = '<div id="root"></div>'

if (!SEO_MARKERS.test(template)) {
  throw new Error('index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers')
}
if (!template.includes(ROOT)) {
  throw new Error(`index.html is missing ${ROOT}`)
}

// A published case study must be finished: no [bracketed] text, no empty image slots.
// Drafts are never built, so they can stay half-written. See docs/case-studies.md.
const unfinished = server.publishedCaseStudies
  .map((study) => ({ study, placeholders: server.findPlaceholders(study) }))
  .filter(({ placeholders }) => placeholders.length > 0)

if (unfinished.length) {
  const report = unfinished
    .map(({ study, placeholders }) =>
      [
        `  src/content/case-studies/studies/${study.slug}.ts (${placeholders.length} left)`,
        ...placeholders.slice(0, 12).map(({ path, value }) => `    ${path}: ${value}`),
        ...(placeholders.length > 12 ? [`    …and ${placeholders.length - 12} more`] : []),
      ].join('\n'),
    )
    .join('\n\n')
  throw new Error(
    `Published case studies still contain placeholders. Finish them or set status: 'draft'.\n\n${report}\n`,
  )
}

function outputPathFor(routePath) {
  if (routePath === '/') return join(distDir, 'index.html')
  if (routePath === '/404') return join(distDir, '404.html')
  return join(distDir, routePath.replace(/^\//, ''), 'index.html')
}

for (const page of [...server.pages, server.notFoundSeo]) {
  // The 404 page has no route of its own; any unmatched URL renders it.
  const url = page.path === '/404' ? '/__not_found__' : page.path
  const { html } = server.render(url)
  const head = server.headTags(server.resolveSeo(page))

  // Function replacers: a "$&" or "$1" inside page content must not be treated as a pattern.
  const output = template.replace(SEO_MARKERS, () => head).replace(ROOT, () => `<div id="root">${html}</div>`)

  const file = outputPathFor(page.path)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, output, 'utf8')
  const size = `${(Buffer.byteLength(output) / 1024).toFixed(1)} KB`
  console.log(`  ${page.path.padEnd(12)} -> ${file.replace(distDir, 'dist').padEnd(28)} ${size}`)
}

await writeFile(join(distDir, 'sitemap.xml'), server.sitemapXml(lastmod), 'utf8')
await writeFile(join(distDir, 'robots.txt'), server.robotsTxt(), 'utf8')

console.log(`\n${server.pages.length + 1} routes prerendered. sitemap.xml and robots.txt written.`)

if (server.SITE_URL_IS_PLACEHOLDER) {
  console.warn(`
  ----------------------------------------------------------------
  WARNING: SITE_URL is marked as a placeholder (${server.SITE_URL})
  Canonical, OpenGraph and sitemap URLs are built from it. Confirm
  the domain in src/lib/seo.ts and set SITE_URL_IS_PLACEHOLDER to
  false before submitting the site to Google Search Console.
  ----------------------------------------------------------------
`)
}
