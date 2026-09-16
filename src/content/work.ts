import type { ImageName } from './images.generated'

/**
 * Case studies and the project index. Feeds Home "Selected work" and the Work page.
 *
 * PLACEHOLDERS: every client, result and image here comes from the design mockups.
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

export const caseStudies: CaseStudy[] = [
  {
    slug: 'northwind',
    year: 2026,
    client: 'Northwind',
    industry: 'Fintech',
    services: ['Software', 'Web platform'],
    disciplines: ['software', 'web'],
    metric: '+212%',
    metricLabel: 'Qualified leads',
    image: 'work/northwind',
    imageAlt: 'Dark green payment card, business cards and notebook embossed with a geometric brand mark',
  },
  {
    slug: 'halden-coffee',
    year: 2025,
    client: 'Halden Coffee',
    industry: 'Retail',
    services: ['E-commerce', 'Graphic design'],
    disciplines: ['e-commerce', 'graphic-design'],
    metric: '3.4×',
    metricLabel: 'Online revenue',
    image: 'work/halden-coffee',
    imageAlt:
      'A row of kraft-paper coffee bags labelled Ethiopia, Colombia, Kenya and Guatemala on a stone shelf',
  },
  {
    slug: 'orbit-health',
    year: 2025,
    client: 'Orbit Health',
    industry: 'Healthtech',
    services: ['Mobile app', 'UI/UX'],
    disciplines: ['mobile', 'ui-ux'],
    metric: '4.8★',
    metricLabel: 'App Store rating',
    image: 'work/orbit-health',
    imageAlt: 'Hand holding a phone showing a daily wellbeing score of 85 with steps and sleep tracking',
  },
  {
    slug: 'kinetic-labs',
    year: 2024,
    client: 'Kinetic Labs',
    industry: 'SaaS',
    services: ['SEO', 'Tech consultancy'],
    disciplines: ['seo', 'consultancy'],
    metric: '+180%',
    metricLabel: 'Organic traffic',
    image: 'work/kinetic-labs',
    imageAlt: 'Large blue and white geometric billboard on a concrete wall above a busy city street',
  },
  {
    slug: 'atlas-freight',
    year: 2024,
    client: 'Atlas Freight',
    industry: 'Logistics',
    services: ['Software', 'Tech consultancy'],
    disciplines: ['software', 'consultancy'],
    metric: '−38%',
    metricLabel: 'Dispatch time',
    image: 'work/atlas-freight',
    imageAlt: 'Operations dashboard with a global shipping map on a wall screen in an open-plan office',
  },
]

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
