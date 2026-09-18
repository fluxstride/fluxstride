import { publishedCaseStudies, serviceNames } from './case-studies'
import type { ImageName } from './images.generated'
import { service, services, type ServiceSlug } from './services'

/**
 * Case study cards and the project index. Feeds Home "Selected work" and the Work page.
 *
 * Cards read their client, industry, year, services, photo and headline figure from the case
 * study itself (src/content/case-studies/studies), so a card always matches its page. Only
 * the badge label is written here.
 *
 * PLACEHOLDERS: every client, result and image comes from the design mockups.
 * Replace with real, approved case studies before launch.
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
}

type Card = {
  slug: string
  /** Which of the case study's result figures goes on the badge, and its short label. */
  metric: { stat: number; label: string }
}

/** In curated order: the Work page keeps it for projects from the same year. */
const cards: Card[] = [
  { slug: 'northwind', metric: { stat: 0, label: 'Qualified leads' } },
  { slug: 'halden-coffee', metric: { stat: 1, label: 'Online revenue' } },
  { slug: 'orbit-health', metric: { stat: 1, label: 'App Store rating' } },
  { slug: 'kinetic-labs', metric: { stat: 0, label: 'Demo requests' } },
  { slug: 'aurora-architects', metric: { stat: 0, label: 'Competition shortlists' } },
  { slug: 'atlas-freight', metric: { stat: 0, label: 'Organic traffic' } },
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

const project = (year: number, client: string, industry: string, slugs: ServiceSlug[]): ProjectEntry => ({
  year,
  client,
  industry,
  disciplines: slugs,
  services: slugs.map((slug) => service(slug).shortTitle),
})

/** "More projects" table on the Work page. */
export const moreProjects: ProjectEntry[] = [
  project(2026, 'Meridian Bank', 'Finance', ['backend-development', 'product-design']),
  project(2025, 'Volta Energy', 'Energy', ['web-design-frontend']),
  project(2025, 'Loom & Thread', 'Fashion', ['web-design-frontend', 'graphic-design-branding']),
  project(2025, 'Pathway Learning', 'Education', ['mobile-development', 'product-design']),
  project(2024, 'Harbour Health', 'Healthcare', ['cloud-devops']),
  project(2024, 'Northstar Legal', 'Professional services', ['web-design-frontend', 'cloud-devops']),
]

/** Total shown in "All case studies (24)" and the Work page eyebrow. */
export const PROJECT_COUNT = 24
