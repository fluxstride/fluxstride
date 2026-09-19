import { publishedCaseStudies, serviceNames } from './case-studies'
import type { BrandCover } from './case-studies/schema'
import type { ImageName } from './images.generated'
import { service, services, type ServiceSlug } from './services'

/**
 * Case study cards and the project index. Feeds Home "Selected work" and the Work page.
 *
 * Cards read their client, industry, year, services, photo and headline figure from the case
 * study itself (src/content/case-studies/studies), so a card always matches its page. Only
 * the badge label is written here.
 *
 * Every card below is a real, live project. The six design-stage studies (Northwind, Halden
 * Coffee, Orbit Health, Kinetic Labs, Aurora Architects, Atlas Freight) are kept as drafts in
 * studies/ for reference: they are reachable in development but never published or listed.
 */

/** Work page filter chips: one per service, in the Services page order. */
export const disciplines = services.map(({ slug, shortTitle }) => ({ id: slug, label: shortTitle }))

export type Discipline = ServiceSlug

export type CaseStudy = {
  slug: string
  /** Launch year, used by the Work page sort. */
  year: number
  client: string
  industry: string
  /** Shown after the industry: "Fintech: Backend, Web & frontend" */
  services: string[]
  /** Every service on the project; the Work page filters match any of them. */
  disciplines: Discipline[]
  /** Headline result on the image badge */
  metric: string
  metricLabel: string
  image: ImageName
  imageAlt: string
  /** Card artwork drawn in code. The photo is the fallback when a study has none. */
  cover?: BrandCover
}

type Card = {
  slug: string
  /** Which of the case study's result figures goes on the badge, and its short label. */
  metric: { stat: number; label: string }
}

/** In curated order: the Work page keeps it for projects from the same year. */
const cards: Card[] = [
  { slug: 'dexus-synergy', metric: { stat: 1, label: 'Vehicle types' } },
  { slug: 'adunyato', metric: { stat: 1, label: 'Dishes online' } },
  { slug: 'fluxstride', metric: { stat: 1, label: 'Shared components' } },
]

export const caseStudies: CaseStudy[] = cards.map((card) => {
  const study = publishedCaseStudies.find((candidate) => candidate.slug === card.slug)
  if (!study) throw new Error(`Work card "${card.slug}" has no published case study`)
  // The cover when the hero is a screenshot, otherwise the hero photo.
  const photo = study.cover ?? study.hero.media
  if (!photo.image) throw new Error(`Case study "${card.slug}" needs a cover image for its Work card`)
  const stat = study.results.stats[card.metric.stat]
  if (!stat) throw new Error(`Case study "${card.slug}" has no result figure ${card.metric.stat}`)
  return {
    slug: card.slug,
    year: study.year,
    client: study.client,
    industry: study.industry,
    services: serviceNames(study),
    disciplines: [...study.services],
    metric: stat.value,
    metricLabel: card.metric.label,
    image: photo.image,
    imageAlt: photo.alt,
    cover: study.brandCover,
  }
})

export const caseStudy = (slug: string) => {
  const found = caseStudies.find((item) => item.slug === slug)
  if (!found) throw new Error(`Unknown case study "${slug}"`)
  return found
}

export type ProjectEntry = {
  year: number
  client: string
  /** Short service names, from `disciplines` */
  services: string[]
  industry: string
  disciplines: Discipline[]
}

/** Builds a "More projects" row; its service names come from the services list. */
export const project = (
  year: number,
  client: string,
  industry: string,
  slugs: ServiceSlug[],
): ProjectEntry => ({
  year,
  client,
  industry,
  disciplines: slugs,
  services: slugs.map((slug) => service(slug).shortTitle),
})

/**
 * "More projects" table on the Work page: projects worth listing that have no case study of
 * their own. The table is hidden entirely while this is empty, so add a row with
 * `project(year, client, industry, [services])` when a project is cleared to be named.
 */
export const moreProjects: ProjectEntry[] = []

/** Total shown in "All case studies (n)" and the Work page eyebrow. */
export const PROJECT_COUNT = caseStudies.length + moreProjects.length

/** "2026", or "2024 to 2026" once the work spans more than one year. */
export const PROJECT_YEARS = (() => {
  const years = [...caseStudies, ...moreProjects].map((item) => item.year)
  const [first, last] = [Math.min(...years), Math.max(...years)]
  return first === last ? `${first}` : `${first} to ${last}`
})()
