import { publishedCaseStudies } from './case-studies'
import type { ImageName } from './images.generated'

/**
 * Case study cards and the project index. Feeds Home "Selected work" and the Work page.
 *
 * Cards read their client, industry, year, photo and headline figure from the case study
 * itself (src/content/case-studies/studies), so a card always matches its page. Only the
 * filter chips, the short services line and the badge label are written here.
 *
 * PLACEHOLDERS: every client, result and image comes from the design mockups.
 * Replace with real, approved case studies before launch.
 */

/** Work page filter categories, in the order the chips appear. */
export const disciplines = [
  { id: 'software', label: 'Software' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'e-commerce', label: 'E-commerce' },
  { id: 'ui-ux', label: 'UI/UX' },
  { id: 'graphic-design', label: 'Graphic design' },
  { id: 'seo', label: 'SEO' },
  { id: 'consultancy', label: 'Consultancy' },
] as const

export type Discipline = (typeof disciplines)[number]['id']

export type CaseStudy = {
  slug: string
  /** Launch year, used by the Work page sort. */
  year: number
  client: string
  industry: string
  /** Shown after the industry: "Fintech — Software, Web platform" */
  services: string[]
  disciplines: Discipline[]
  /** Headline result on the image badge */
  metric: string
  metricLabel: string
  image: ImageName
  imageAlt: string
}

type Card = {
  slug: string
  services: string[]
  disciplines: Discipline[]
  /** Which of the case study's result figures goes on the badge, and its short label. */
  metric: { stat: number; label: string }
}

/** In curated order: the Work page keeps it for projects from the same year. */
const cards: Card[] = [
  {
    slug: 'northwind',
    services: ['Software', 'Web platform'],
    disciplines: ['software', 'web'],
    metric: { stat: 0, label: 'Qualified leads' },
  },
  {
    slug: 'halden-coffee',
    services: ['E-commerce', 'Shopify Plus'],
    disciplines: ['e-commerce'],
    metric: { stat: 1, label: 'Online revenue' },
  },
  {
    slug: 'orbit-health',
    services: ['Mobile app', 'UI/UX'],
    disciplines: ['mobile', 'ui-ux'],
    metric: { stat: 1, label: 'App Store rating' },
  },
  {
    slug: 'kinetic-labs',
    services: ['Website', 'Development'],
    disciplines: ['web'],
    metric: { stat: 0, label: 'Demo requests' },
  },
  {
    slug: 'aurora-architects',
    services: ['Brand identity', 'Graphic design'],
    disciplines: ['graphic-design'],
    metric: { stat: 0, label: 'Competition shortlists' },
  },
  {
    slug: 'atlas-freight',
    services: ['SEO', 'Content'],
    disciplines: ['seo'],
    metric: { stat: 0, label: 'Organic traffic' },
  },
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
    services: card.services,
    disciplines: card.disciplines,
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
  services: string[]
  industry: string
  disciplines: Discipline[]
}

/** "More projects" table on the Work page. */
export const moreProjects: ProjectEntry[] = [
  {
    year: 2026,
    client: 'Meridian Bank',
    services: ['Software', 'UI/UX'],
    industry: 'Finance',
    disciplines: ['software', 'ui-ux'],
  },
  {
    year: 2025,
    client: 'Volta Energy',
    services: ['Website', 'SEO'],
    industry: 'Energy',
    disciplines: ['web', 'seo'],
  },
  {
    year: 2025,
    client: 'Loom & Thread',
    services: ['E-commerce', 'Graphic design'],
    industry: 'Fashion',
    disciplines: ['e-commerce', 'graphic-design'],
  },
  {
    year: 2025,
    client: 'Pathway Learning',
    services: ['Mobile app', 'UI/UX'],
    industry: 'Education',
    disciplines: ['mobile', 'ui-ux'],
  },
  {
    year: 2024,
    client: 'Harbour Health',
    services: ['Tech consultancy'],
    industry: 'Healthcare',
    disciplines: ['consultancy'],
  },
  {
    year: 2024,
    client: 'Northstar Legal',
    services: ['Website', 'Maintenance'],
    industry: 'Professional services',
    disciplines: ['web'],
  },
]

/** Total shown in "All case studies (24)" and the Work page eyebrow. */
export const PROJECT_COUNT = 24
