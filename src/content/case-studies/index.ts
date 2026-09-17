import { services } from '@/content/services'
import type { CaseStudy, ServiceSlug } from './schema'

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

const studies = Object.values(import.meta.glob<StudyModule>('./studies/*.ts', { eager: true }))
  .map((module) => module.default)
  .filter((study): study is CaseStudy => study !== null)
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

/** The case study linked at the bottom of the page: `next` if set, otherwise the following one. */
export function nextCaseStudy(study: CaseStudy) {
  const pool = visibleCaseStudies.filter((candidate) => candidate.slug !== study.slug)
  if (study.next) return pool.find((candidate) => candidate.slug === study.next)
  const index = visibleCaseStudies.findIndex((candidate) => candidate.slug === study.slug)
  return visibleCaseStudies[index + 1] ?? pool[0]
}

/** The service's display name, e.g. "SEO" or "Website Design & Development". */
export const serviceTitle = (study: Pick<CaseStudy, 'service'>) =>
  services.find((service) => service.slug === study.service)?.title ?? study.service

/** Where a Work card should point: the full case study once one exists, otherwise its anchor on /work. */
export const caseStudyHref = (slug: string) => (findCaseStudy(slug) ? `/work/${slug}` : `/work#${slug}`)

const templateModules = import.meta.glob<StudyModule>('./templates/*.ts', { eager: true })

/** Starter templates keyed by service. File names must match the service slug. */
export const templates = Object.fromEntries(
  Object.entries(templateModules).flatMap(([file, { default: template }]) => {
    if (!template) return []
    const service = file.replace(/^.*\/(.+)\.ts$/, '$1') as ServiceSlug
    if (template.service !== service) {
      throw new Error(`${file} declares service "${template.service}"; rename the file or fix the field`)
    }
    return [[service, template] as const]
  }),
) as Partial<Record<ServiceSlug, CaseStudy>>
