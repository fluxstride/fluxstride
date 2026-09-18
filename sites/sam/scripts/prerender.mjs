// Renders the page and the 404 to static HTML after the client and SSR bundles are built.
//
// Run by `pnpm build`, after:
//   vite build                                        -> dist/
//   vite build --ssr src/entry-server.tsx --outDir dist-ssr
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')

// pathToFileURL matters on Windows: a bare absolute path is not a valid import specifier.
const server = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)

const template = await readFile(join(distDir, 'index.html'), 'utf8')
const SEO_MARKERS = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/
const ROOT = '<div id="root"></div>'
if (!SEO_MARKERS.test(template) || !template.includes(ROOT)) {
  throw new Error('index.html needs the <!-- seo:start --> / <!-- seo:end --> markers and an empty #root')
}

for (const page of [...server.pages, server.notFoundSeo]) {
  const html = server.render(page.path)
  // Function replacers: a "$&" inside page content must not be treated as a pattern.
  const output = template
    .replace(SEO_MARKERS, () => server.headTags(page))
    .replace(ROOT, () => `<div id="root">${html}</div>`)
  const file = page.path === '/' ? 'index.html' : '404.html'
  await writeFile(join(distDir, file), output, 'utf8')
  console.log(
    `  ${page.path.padEnd(6)} -> dist/${file.padEnd(12)} ${(Buffer.byteLength(output) / 1024).toFixed(1)} KB`,
  )
}

await writeFile(
  join(distDir, 'sitemap.xml'),
  server.sitemapXml(new Date().toISOString().slice(0, 10)),
  'utf8',
)
await writeFile(join(distDir, 'robots.txt'), server.robotsTxt(), 'utf8')
console.log('\nPrerendered. sitemap.xml and robots.txt written.')

if (server.TO_CONFIRM.length) {
  console.warn(`
  ----------------------------------------------------------------
  WARNING: ${server.TO_CONFIRM.length} pieces of copy still need Samuel's confirmation
${server.TO_CONFIRM.map((item) => `    - ${item}`).join('\n')}
  Confirm or correct them, then remove them from TO_CONFIRM in
  src/content/site.ts.
  ----------------------------------------------------------------
`)
}
