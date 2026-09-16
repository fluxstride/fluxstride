import type { LucideIcon } from 'lucide-react'
import { CalendarRange, KeyRound, MessagesSquare, Presentation } from 'lucide-react'
import { contactHref } from './brief'

/**
 * The Stride Method. Feeds Home "How we work" and the Process page.
 *
 * PLACEHOLDERS: prices and all but the first FAQ answer are illustrative
 * (the design only wrote out the first answer). Confirm before launch.
 */

export type ProcessStep = {
  number: string
  duration: string
  title: string
  /** Short version for the Home staircase */
  summary: string
  /** Process page description */
  description: string
  /** Home staircase: two headline deliverables */
  deliverables: string[]
  /** Process page "What happens" */
  activities: string[]
  /** Process page "You get" */
  outcomes: string[]
  /** Process page "Your involvement" */
  involvement: string
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    duration: 'Weeks 1–2',
    title: 'Discover',
    summary:
      'Workshops, audits, customer interviews and analytics deep-dives to find the real problem worth solving.',
    description:
      'We get under the skin of your business, users and tech so we solve the right problem — not just the one in the brief.',
    deliverables: ['Research report', 'Opportunity map'],
    activities: [
      'Stakeholder workshops',
      'User & competitor research',
      'Technical & analytics audit',
      'Opportunity mapping',
    ],
    outcomes: ['Research report', 'Opportunity map', 'Project proposal'],
    involvement: '2 workshops + access to data and key people.',
  },
  {
    number: '02',
    duration: 'Weeks 2–3',
    title: 'Define',
    summary: 'Positioning, information architecture and a prioritised roadmap everyone signs off on.',
    description:
      'We turn insight into a plan: positioning, user journeys, architecture and a prioritised roadmap everyone signs off.',
    deliverables: ['Strategy deck', 'Sitemap & flows'],
    activities: [
      'Positioning & messaging',
      'Information architecture',
      'Technical architecture',
      'Roadmap & estimates',
    ],
    outcomes: ['Strategy deck', 'Sitemap & user flows', 'Fixed-scope plan'],
    involvement: 'Weekly review + final sign-off.',
  },
  {
    number: '03',
    // The Home mockup said "Weeks 4–10"; the Process page's "Weeks 4–12" is used on both.
    duration: 'Weeks 4–12',
    title: 'Design & Build',
    summary:
      'Identity, UI and engineering in weekly shippable increments — reviewed live, never thrown over a wall.',
    description:
      'Design and engineering run side by side in weekly increments, reviewed live in a staging environment you can click through.',
    deliverables: ['Design system', 'Production code'],
    activities: [
      'UI/UX & visual design',
      'Graphic & brand assets',
      'Front & back-end development',
      'QA, accessibility & testing',
    ],
    outcomes: ['Design system', 'Production-ready code', 'Staging environment'],
    involvement: 'Friday demos, async feedback in the shared channel.',
  },
  {
    number: '04',
    duration: 'Ongoing',
    title: 'Launch & Grow',
    summary: 'Go live, measure everything, then compound gains with SEO, campaigns and experiments.',
    description:
      'We launch carefully, measure everything, then keep improving with SEO, maintenance and growth experiments.',
    deliverables: ['Launch plan', 'Growth dashboard'],
    activities: [
      'Launch & migration plan',
      'Analytics & monitoring',
      'SEO & performance tuning',
      'Maintenance & support',
    ],
    outcomes: ['Launch checklist', 'Growth dashboard', 'Monthly report'],
    involvement: 'Monthly check-in, or as needed.',
  },
]

/** Process page: the strip of working principles under the title. */
export const principles: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: CalendarRange,
    title: 'Fixed-scope sprints',
    body: 'Clear price and deliverables before we start.',
  },
  { icon: Presentation, title: 'Weekly live demos', body: 'See real progress every Friday, not slides.' },
  { icon: MessagesSquare, title: 'One shared channel', body: 'Talk directly to the people doing the work.' },
  { icon: KeyRound, title: 'You own everything', body: 'Code, files and accounts are yours from day one.' },
]

export type EngagementModel = {
  name: string
  kicker: string
  description: string
  includes: string[]
  bestFor: string
  price: string
  href: string
  /** Drawn highlighted, with a "Most popular" badge */
  featured?: boolean
}

export const engagementModels: EngagementModel[] = [
  {
    name: 'Project',
    kicker: 'Fixed scope, fixed price',
    description:
      'A defined outcome — a website, app, platform or identity — delivered through the Stride Method.',
    includes: ['Discovery to launch', 'Fixed price & timeline', '30 days post-launch support'],
    bestFor: 'New builds & rebrands',
    price: 'From £8k',
    href: contactHref([]),
  },
  {
    name: 'Retainer',
    kicker: 'Monthly capacity',
    description:
      'A dedicated slice of our team every month for continuous design, development, SEO and maintenance.',
    includes: ['Reserved monthly hours', 'Roadmap & priority support', 'Monthly reporting'],
    bestFor: 'Growing products',
    price: 'From £2.5k / mo',
    href: contactHref(['maintenance']),
    featured: true,
  },
  {
    name: 'Consultancy',
    kicker: 'Day rate advice',
    description:
      'Senior, vendor-neutral guidance on technology, architecture and digital strategy when you need it.',
    includes: ['Audits & reviews', 'Workshops & roadmaps', 'Fractional CTO'],
    bestFor: 'Decisions & due diligence',
    price: '£950 / day',
    href: contactHref(['consultancy']),
  },
]

export const faqs: { question: string; answer: string }[] = [
  {
    question: 'How much does a project cost?',
    answer:
      'Websites start from £8k, apps and custom software from £25k. After discovery you get a fixed price, so there are no surprises.',
  },
  {
    question: 'How long until we launch?',
    answer:
      'Most websites launch in 4–8 weeks; apps and custom software take 8–20. You get a dated plan at the end of the Define phase and see progress every Friday.',
  },
  {
    question: 'Do we own the code and designs?',
    answer:
      'Yes. Code, design files, accounts and content are yours from day one. Repositories and hosting sit in your organisation, not ours.',
  },
  {
    question: 'Can you work with our in-house team?',
    answer:
      'Often. We join your tools and rituals, pair with your engineers and designers, and hand over with documentation so your team can carry on without us.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Every project includes 30 days of support. After that, most clients keep a retainer for maintenance, SEO and new features, but there is no lock-in.',
  },
]
