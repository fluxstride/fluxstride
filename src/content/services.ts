import type { LucideIcon } from 'lucide-react'
import type { NeedId } from './brief'
import {
  CodeXml,
  Compass,
  Laptop,
  Palette,
  PenTool,
  ScanSearch,
  Smartphone,
  Store,
  Wrench,
} from 'lucide-react'

/**
 * The nine disciplines. One list feeds the Home grid, the Services page and
 * the footer, so a rename happens in one place.
 *
 * PLACEHOLDERS: timelines and investment bands are illustrative. Confirm pricing before launch.
 */
export type Service = {
  /** Anchor on /services, e.g. /services#software-engineering */
  slug: string
  title: string
  /** Shorter name used in the footer */
  shortTitle: string
  icon: LucideIcon
  /** The Contact form option "Discuss this" ticks */
  need: NeedId
  /** One-liner for the Home grid */
  summary: string
  /** Longer pitch for the Services page */
  description: string
  /** Home grid footer, e.g. "Web apps · APIs · Cloud" */
  tags: string[]
  /** Services page tool list */
  tools: string[]
  included: string[]
  timeline: string
  investment: string
}

export const services: Service[] = [
  {
    slug: 'software-engineering',
    title: 'Software Engineering',
    shortTitle: 'Software engineering',
    icon: CodeXml,
    need: 'software',
    summary:
      'Custom platforms, APIs and internal tools engineered to scale — clean architecture, tested and documented.',
    description:
      'Custom platforms, APIs and internal tools engineered to scale — clean architecture, tested, documented and handed over properly.',
    tags: ['Web apps', 'APIs', 'Cloud'],
    tools: ['TypeScript', 'Node', 'Python', 'AWS'],
    included: [
      'Custom web applications',
      'APIs & integrations',
      'Cloud architecture & DevOps',
      'Automated testing & QA',
    ],
    timeline: '8–16 weeks',
    investment: 'From £25k',
  },
  {
    slug: 'website-design-development',
    title: 'Website Design & Development',
    shortTitle: 'Web design & development',
    icon: Laptop,
    need: 'website',
    summary:
      'Visually striking, high-performance websites built to turn visitors into customers and grow your business.',
    description:
      'Visually striking, high-performance websites that turn visitors into customers — and that your team can edit without calling us.',
    tags: ['Next.js', 'Webflow', 'CMS'],
    tools: ['Next.js', 'Webflow', 'Sanity'],
    included: ['Strategy & sitemap', 'Bespoke design', 'CMS build & training', 'Performance & accessibility'],
    timeline: '4–8 weeks',
    investment: 'From £8k',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile apps',
    icon: Smartphone,
    need: 'mobile',
    summary:
      'Native and cross-platform apps with seamless experiences people return to — from MVP to App Store.',
    description:
      'Native and cross-platform apps with seamless experiences people return to, from first MVP to App Store launch and beyond.',
    tags: ['iOS', 'Android', 'Flutter'],
    tools: ['Swift', 'Kotlin', 'Flutter', 'React Native'],
    included: [
      'Discovery & MVP scoping',
      'iOS & Android apps',
      'Backend & notifications',
      'App Store launch',
    ],
    timeline: '10–20 weeks',
    investment: 'From £30k',
  },
  {
    slug: 'e-commerce',
    title: 'E-commerce Websites',
    shortTitle: 'E-commerce',
    icon: Store,
    need: 'e-commerce',
    summary: 'High-converting stores that showcase your products beautifully and make buying effortless.',
    description:
      'High-converting stores that showcase your products beautifully and make buying effortless on every device.',
    tags: ['Shopify', 'WooCommerce', 'Headless'],
    tools: ['Shopify', 'WooCommerce', 'Stripe'],
    included: [
      'Store design & build',
      'Payments & shipping',
      'Product data migration',
      'Conversion optimisation',
    ],
    timeline: '6–10 weeks',
    investment: 'From £12k',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    shortTitle: 'UI/UX design',
    icon: PenTool,
    need: 'ui-ux',
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
    slug: 'graphic-design',
    title: 'Graphic Design',
    shortTitle: 'Graphic design',
    icon: Palette,
    need: 'graphic-design',
    summary: 'Logos, identities, marketing collateral and social graphics that make your brand unmistakable.',
    description:
      'Logos, identities, marketing collateral and social graphics that make your brand unmistakable wherever it shows up.',
    tags: ['Identity', 'Print', 'Social'],
    tools: ['Illustrator', 'Figma', 'After Effects'],
    included: [
      'Logo & visual identity',
      'Brand guidelines',
      'Print & marketing collateral',
      'Social media graphics',
    ],
    timeline: '2–6 weeks',
    investment: 'From £3k',
  },
  {
    slug: 'seo',
    title: 'SEO',
    shortTitle: 'SEO',
    icon: ScanSearch,
    need: 'seo',
    summary:
      'Technical and content SEO that lifts your Google rankings and connects you with your ideal customers.',
    description:
      'Technical and content SEO that lifts your Google rankings and connects you directly with your ideal customers.',
    tags: ['Technical', 'Content', 'Local'],
    tools: ['Search Console', 'Ahrefs', 'GA4'],
    included: [
      'Technical SEO audit',
      'Keyword & content strategy',
      'On-page optimisation',
      'Monthly reporting',
    ],
    timeline: 'Ongoing',
    investment: 'From £1.5k / mo',
  },
  {
    slug: 'tech-consultancy',
    title: 'Tech Consultancy',
    shortTitle: 'Tech consultancy',
    icon: Compass,
    need: 'consultancy',
    summary:
      'Independent advice on stack, architecture, audits and digital roadmaps — so you invest in the right things.',
    description:
      'Independent, vendor-neutral advice on stack, architecture and digital roadmaps — so you invest in the right things, in the right order.',
    tags: ['Audits', 'Architecture', 'Roadmaps'],
    tools: ['Workshops', 'Audits', 'Advisory'],
    included: [
      'Technology & stack audits',
      'Architecture reviews',
      'Digital roadmaps',
      'Fractional CTO support',
    ],
    timeline: '1–4 weeks',
    investment: 'From £950 / day',
  },
  {
    slug: 'website-maintenance',
    title: 'Website Maintenance',
    shortTitle: 'Website maintenance',
    icon: Wrench,
    need: 'maintenance',
    summary:
      'Proactive updates, security, backups and support that keep your site fast, secure and bug-free.',
    description:
      'Proactive updates, security, backups and support that keep your site smooth, secure and bug-free long after launch.',
    tags: ['Security', 'Updates', 'SLA support'],
    tools: ['WordPress', 'Webflow', 'Shopify'],
    included: [
      'Updates & security patches',
      'Backups & uptime monitoring',
      'Bug fixes & small changes',
      'Priority support SLA',
    ],
    timeline: 'Ongoing',
    investment: 'From £250 / mo',
  },
]
