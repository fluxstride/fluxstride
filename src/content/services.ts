import type { LucideIcon } from 'lucide-react'
import type { NeedId } from './brief'
import { CloudCog, Laptop, Palette, PenTool, Server, Smartphone } from 'lucide-react'

/**
 * The six services, in Design → Build → Run order. One list feeds the Home grid, the Services
 * page, the footer, the Work page filters, the case study tags and the structured data, so a
 * rename happens in one place.
 *
 * Capabilities without a service of their own live inside one: e-commerce and technical SEO
 * in Website Design & Frontend Development, maintenance and support plans in Cloud & DevOps.
 * Audits and discovery are how projects start (the Consultancy model on /process).
 *
 * PLACEHOLDERS: timelines and investment bands are illustrative. Confirm pricing before launch.
 */
export type ServiceSlug =
  | 'product-design'
  | 'graphic-design-branding'
  | 'web-design-frontend'
  | 'mobile-development'
  | 'backend-development'
  | 'cloud-devops'

export type ServiceGroup = 'design' | 'build' | 'run'

export type Service = {
  /** Anchor on /services, e.g. /services#backend-development */
  slug: ServiceSlug
  title: string
  /** Shorter name for the footer, the Work page filters and case study cards */
  shortTitle: string
  /** Sets the order: Design, then Build, then Run. */
  group: ServiceGroup
  icon: LucideIcon
  /** The Contact form option "Discuss this" ticks */
  need: NeedId
  /** One-liner for the Home grid */
  summary: string
  /** Longer pitch for the Services page */
  description: string
  /** Home grid footer, e.g. "APIs · Databases · Integrations" */
  tags: string[]
  /** Services page tool list */
  tools: string[]
  included: string[]
  timeline: string
  investment: string
}

export const services: Service[] = [
  {
    slug: 'product-design',
    title: 'Product Design (UI/UX)',
    shortTitle: 'Product design',
    group: 'design',
    icon: PenTool,
    need: 'product-design',
    summary:
      'Research-led journeys, prototypes and polished interfaces, backed by design systems that scale.',
    description:
      'Research-led journeys, prototypes and polished interfaces, backed by design systems that keep products consistent as they grow.',
    tags: ['Research', 'Prototypes', 'Systems'],
    tools: ['Figma', 'Maze', 'ProtoPie'],
    included: ['User research & testing', 'Wireframes & prototypes', 'Interface design', 'Design systems'],
    timeline: '3–8 weeks',
    investment: 'From £6k',
  },
  {
    slug: 'graphic-design-branding',
    title: 'Graphic Design & Branding',
    shortTitle: 'Branding',
    group: 'design',
    icon: Palette,
    need: 'branding',
    summary: 'Logos, identities and brand systems that make you unmistakable, from pitch deck to signage.',
    description:
      'Brand strategy, logos and visual identities, then the guidelines, collateral and social graphics that keep them unmistakable wherever they show up.',
    tags: ['Identity', 'Guidelines', 'Collateral'],
    tools: ['Illustrator', 'Figma', 'After Effects'],
    included: [
      'Brand strategy & positioning',
      'Logo & visual identity',
      'Brand guidelines',
      'Print, social & signage',
    ],
    timeline: '2–6 weeks',
    investment: 'From £3k',
  },
  {
    slug: 'web-design-frontend',
    title: 'Website Design & Frontend Development',
    shortTitle: 'Web & frontend',
    group: 'build',
    icon: Laptop,
    need: 'website',
    summary:
      'Fast, striking websites, online stores and web app frontends built to turn visitors into customers.',
    description:
      'Websites, online stores and web app frontends that turn visitors into customers — fast, accessible, found on Google, and easy for your team to edit.',
    tags: ['Next.js', 'React', 'Shopify'],
    tools: ['Next.js', 'React', 'Sanity', 'Shopify'],
    included: [
      'Strategy, sitemap & design',
      'Frontend & CMS build',
      'E-commerce & headless stores',
      'Technical SEO & performance',
    ],
    timeline: '4–10 weeks',
    investment: 'From £8k',
  },
  {
    slug: 'mobile-development',
    title: 'Mobile Development',
    shortTitle: 'Mobile apps',
    group: 'build',
    icon: Smartphone,
    need: 'mobile',
    summary:
      'Native and cross-platform apps with seamless experiences people return to — from MVP to App Store.',
    description:
      'Native and cross-platform apps with seamless experiences people return to, from first MVP to App Store launch and beyond.',
    tags: ['iOS', 'Android', 'React Native'],
    tools: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
    included: [
      'Discovery & MVP scoping',
      'iOS & Android apps',
      'Payments, push & offline',
      'App Store launch & updates',
    ],
    timeline: '10–20 weeks',
    investment: 'From £30k',
  },
  {
    slug: 'backend-development',
    title: 'Backend Development',
    shortTitle: 'Backend',
    group: 'build',
    icon: Server,
    need: 'backend',
    summary:
      'APIs, platforms and integrations engineered to scale — clean architecture, tested and documented.',
    description:
      'The engine behind your product: APIs, databases, integrations and internal tools engineered to scale — tested, documented and handed over properly.',
    tags: ['APIs', 'Databases', 'Integrations'],
    tools: ['TypeScript', 'Node', 'Python', 'PostgreSQL'],
    included: [
      'APIs & platforms',
      'Databases & data models',
      'Integrations & payments',
      'Automated testing & QA',
    ],
    timeline: '6–16 weeks',
    investment: 'From £20k',
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud & DevOps',
    group: 'run',
    icon: CloudCog,
    need: 'cloud-devops',
    summary:
      'Cloud infrastructure, release pipelines and support plans that keep your product fast, secure and online.',
    description:
      'Cloud architecture, deployment pipelines and monitoring, plus the support plans that keep your product updated, secure and online long after launch.',
    tags: ['AWS', 'CI/CD', 'Support'],
    tools: ['AWS', 'Vercel', 'Terraform', 'GitHub Actions'],
    included: [
      'Cloud architecture & migration',
      'CI/CD & infrastructure as code',
      'Monitoring, backups & security',
      'Maintenance & support plans',
    ],
    timeline: '2–6 weeks, then ongoing',
    investment: 'From £4k',
  },
]

/** A service by slug. Throws on an unknown slug so a typo can't ship. */
export function service(slug: ServiceSlug) {
  const found = services.find((candidate) => candidate.slug === slug)
  if (!found) throw new Error(`Unknown service "${slug}"`)
  return found
}
