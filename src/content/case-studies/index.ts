import { service } from '@/content/services'
import type { CaseStudy } from './schema'

/**
 * Case study registry.
 *
 * Every file in ./studies is picked up automatically: add one (ideally with
 * `pnpm new:case-study`) and it gets a page at /work/<slug>. Nothing to register.
 * Starter templates live in ./templates, one per service, named after its slug.
 */

export type { CaseStudy, CaseStudySection, ServiceSlug } from './schema'
export { defineCaseStudy } from './schema'
export { findPlaceholders } from './placeholders'

/** `null` in production builds for drafts and templates (see vite.config.ts). */
type StudyModule = { default: CaseStudy | null }

const byYear = (a: CaseStudy, b: CaseStudy) => b.year - a.year

const studies = Object.entries(import.meta.glob<StudyModule>('./studies/*.ts', { eager: true }))
  .flatMap(([file, { default: study }]) => {
    if (!study) return []
    if (file !== `./studies/${study.slug}.ts`) {
      throw new Error(`${file} has slug "${study.slug}"; the file name and slug must match`)
    }
    return [study]
  })
  .sort(byYear)

const seen = new Set<string>()
for (const study of studies) {
  if (seen.has(study.slug)) throw new Error(`Two case studies use the slug "${study.slug}"`)
  seen.add(study.slug)
}

/** Published case studies: prerendered, in the sitemap, linked from the Work page. */
export const publishedCaseStudies = studies.filter((study) => study.status === 'published')

/** What /work/<slug> can show in this build. Drafts are only reachable in development. */
export const visibleCaseStudies = import.meta.env.DEV ? studies : publishedCaseStudies

export const findCaseStudy = (slug: string) => visibleCaseStudies.find((study) => study.slug === slug)

/** The case study linked at the bottom of the page: `next` if it can be shown, otherwise the following one. */
export function nextCaseStudy(study: CaseStudy) {
  const pool = visibleCaseStudies.filter((candidate) => candidate.slug !== study.slug)
  const chosen = study.next ? pool.find((candidate) => candidate.slug === study.next) : undefined
  if (chosen) return chosen
  const index = visibleCaseStudies.findIndex((candidate) => candidate.slug === study.slug)
  return visibleCaseStudies[index + 1] ?? pool[0]
}

/** The lead service's name, e.g. "Mobile Development". */
export const serviceTitle = (study: Pick<CaseStudy, 'services'>) => service(study.services[0]).title

/** Short names of every service on the project, e.g. ["Mobile apps", "Product design"]. */
export const serviceNames = (study: Pick<CaseStudy, 'services'>) =>
  study.services.map((slug) => service(slug).shortTitle)

/** Where a Work card should point: the full case study once one exists, otherwise its anchor on /work. */
export const caseStudyHref = (slug: string) => (findCaseStudy(slug) ? `/work/${slug}` : `/work#${slug}`)

const templateModules = import.meta.glob<StudyModule>('./templates/*.ts', { eager: true })

/**
 * Starter templates keyed by file name, e.g. "mobile-app". A template is a page structure,
 * not a service: each one names the services it usually covers, and a case study made from
 * it can list any others. Its slug must be "template-<file name>".
 */
export const templates = Object.fromEntries(
  Object.entries(templateModules).flatMap(([file, { default: template }]) => {
    if (!template) return []
    const id = file.replace(/^.*\/(.+)\.ts$/, '$1')
    if (template.slug !== `template-${id}`) {
      throw new Error(`${file} has slug "${template.slug}"; a template's slug must be "template-${id}"`)
    }
    return [[id, template] as const]
  }),
) as Record<string, CaseStudy>

/** A template's name on /work/templates, e.g. "Mobile app". */
export const templateTitle = (template: CaseStudy) => template.discipline ?? serviceTitle(template)
