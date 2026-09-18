// Starts a new case study from one of the starter templates.
//
//   pnpm new:case-study                          list the templates
//   pnpm new:case-study <template> <slug>        e.g. pnpm new:case-study mobile-app orbit-health
//
// Copies src/content/case-studies/templates/<template>.ts to
// src/content/case-studies/studies/<slug>.ts, sets the slug and keeps it as a draft.
// Drafts render at /work/<slug> in `pnpm dev` with a banner listing every placeholder
// left to fill; the build refuses to publish a study that still has any.
//
// Full guide: docs/case-studies.md
import { existsSync } from 'node:fs'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'src', 'content', 'case-studies')
const templatesDir = join(contentDir, 'templates')
const studiesDir = join(contentDir, 'studies')

// Route segments under /work that a case study slug must not shadow.
const RESERVED = new Set(['templates'])

const fail = (message) => {
  console.error(`\n  ✖ ${message}\n`)
  process.exit(1)
}

const templateIds = (await readdir(templatesDir))
  .filter((file) => file.endsWith('.ts'))
  .map((file) => file.replace(/\.ts$/, ''))
  .sort()

const [template, slug] = process.argv.slice(2)

if (!template) {
  console.log('\n  Usage: pnpm new:case-study <template> <slug>\n\n  Templates:')
  for (const name of templateIds) console.log(`    ${name}`)
  console.log('\n  Guide: docs/case-studies.md\n')
  process.exit(0)
}

if (!templateIds.includes(template)) {
  fail(`Unknown template "${template}". Pick one of:\n      ${templateIds.join('\n      ')}`)
}
if (!slug) fail('Give the new case study a slug, e.g. pnpm new:case-study mobile-app orbit-health')
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  fail(`"${slug}" isn't a valid slug. Use lowercase letters, numbers and single hyphens.`)
}
if (RESERVED.has(slug) || slug.startsWith('template-')) fail(`"${slug}" is reserved. Choose another slug.`)

const target = join(studiesDir, `${slug}.ts`)
if (existsSync(target)) fail(`${relative(root, target)} already exists.`)

const source = await readFile(join(templatesDir, `${template}.ts`), 'utf8')
const slugLine = `slug: 'template-${template}',`
if (!source.includes(slugLine)) fail(`Couldn't find "${slugLine}" in the ${template} template.`)

const today = new Date().toISOString().slice(0, 10)
const output = source
  // The template header explains how to copy it; replace it with where this file came from.
  .replace(
    /^\/\*\*[\s\S]*?\*\/\n/m,
    [
      '/**',
      ` * Case study: ${slug}`,
      ` * Started ${today} from templates/${template}.ts. Its design is in the Pencil file.`,
      ' *',
      ' * Replace every [bracketed] value and every `image: null`, delete sections that',
      " * don't apply, then set status to 'published'. Guide: docs/case-studies.md",
      ' */',
      '',
    ].join('\n'),
  )
  .replace(slugLine, `slug: '${slug}',`)

await writeFile(target, output)

const file = relative(root, target).replaceAll('\\', '/')
console.log(`
  ✔ Created ${file}

  Next:
    1. pnpm dev, then open http://localhost:5173/work/${slug}
       The yellow banner lists every placeholder left to fill.
    2. Replace the [bracketed] text with real, client-approved content.
    3. Add images to scripts/import-images.mjs, run pnpm assets:images,
       then set each image: null to its name, e.g. image: 'work/${slug}'.
    4. Delete any section that doesn't apply.
    5. Set status: 'published' and run pnpm build. The build fails if
       any placeholder is left.

  Guide: docs/case-studies.md
`)
