import type { ImageName } from './images.generated'

/**
 * Insights listing.
 *
 * PLACEHOLDERS: titles, dates and read times come from the design. The design has no
 * article pages, so there are no article URLs yet. Give an article an `href` and its
 * card becomes a link (and the featured card shows "Read article").
 */

export const categories = ['Engineering', 'Design', 'SEO', 'E-commerce', 'Consultancy', 'Studio'] as const
export type Category = (typeof categories)[number]

export type Article = {
  slug: string
  title: string
  category: Category
  /** Minutes */
  readTime: number
  /** ISO date, e.g. 2026-09-04 */
  date: string
  image: ImageName
  imageAlt: string
  excerpt?: string
  author?: string
  href?: string
}

export const featuredArticle: Article = {
  slug: 'launch-is-the-start-line',
  title: 'Launch is the start line: our playbook for software that keeps moving',
  category: 'Engineering',
  readTime: 12,
  date: '2026-09-04',
  image: 'insights/launch-is-the-start-line',
  imageAlt: 'A blue cone ringed by glass hoops, spinning on a pale grey surface',
  excerpt:
    'Most products stall the week after launch. Here’s the maintenance, measurement and iteration rhythm we use to keep them compounding.',
  author: 'Tom Keller',
}

export const articles: Article[] = [
  {
    slug: 'headless-or-monolith',
    title: 'Headless or monolith? Choosing a CMS in 2026',
    category: 'Engineering',
    readTime: 9,
    date: '2026-08-28',
    image: 'insights/headless-or-monolith',
    imageAlt: 'A floating stack of glass and blue slabs',
  },
  {
    slug: 'checkout-audit',
    title: 'The 12-point checkout audit we run on every store',
    category: 'E-commerce',
    readTime: 6,
    date: '2026-08-19',
    image: 'insights/checkout-audit',
    imageAlt: 'A frosted glass shopping bag holding a blue sphere',
  },
  {
    slug: 'design-systems-second-year',
    title: 'Design systems that survive their second year',
    category: 'Design',
    readTime: 7,
    date: '2026-08-07',
    image: 'insights/design-systems-second-year',
    imageAlt: 'A grid of white tiles with two blue tiles in the middle',
  },
  {
    slug: 'technical-seo-javascript',
    title: 'Technical SEO for JavaScript-heavy websites',
    category: 'SEO',
    readTime: 11,
    date: '2026-07-30',
    image: 'insights/technical-seo-javascript',
    imageAlt: 'A glass staircase with a blue line climbing above it like a rising chart',
  },
  {
    slug: 'build-buy-or-integrate',
    title: 'Build, buy or integrate? A founder’s decision framework',
    category: 'Consultancy',
    readTime: 8,
    date: '2026-07-16',
    image: 'insights/build-buy-or-integrate',
    imageAlt: 'A glass sphere, a blue cube and a glass cylinder side by side on a plinth',
  },
  {
    slug: 'website-packages',
    title: 'Why we stopped selling website packages',
    category: 'Studio',
    readTime: 5,
    date: '2026-07-02',
    image: 'insights/website-packages',
    imageAlt: 'A blue ribbon spiralling out of an open glass box',
  },
]

/** "Sep 4, 2026" */
export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
