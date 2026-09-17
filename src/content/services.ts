import type { LucideIcon } from 'lucide-react'
import type { NeedId } from './brief'
import { CloudCog, Laptop, Palette, PenTool, Server, Smartphone } from 'lucide-react'

/**
 * The six services, in Design → Build → Run order. One list feeds the Home grid, the Services
 * page, each service's own page at /services/<slug>, the footer, the Work page filters, the case
 * study tags and the structured data, so a rename happens in one place.
 *
 * Capabilities without a service of their own live inside one: e-commerce and technical SEO
 * in Website Design & Frontend Development, maintenance and support plans in Cloud & DevOps.
 * Audits and discovery are how projects start (the Consultancy model on /process).
 *
 * Text in `faqs` accepts inline links: "[our backend team](/services/backend-development)".
 *
 * PLACEHOLDERS: timelines, investment bands, team sizes, phases and FAQ answers were written
 * for the design. Confirm pricing and how each service really runs before launch.
 */
export type ServiceSlug =
  | 'product-design'
  | 'graphic-design-branding'
  | 'web-design-frontend'
  | 'mobile-development'
  | 'backend-development'
  | 'cloud-devops'

export type ServiceGroup = 'design' | 'build' | 'run'

export type ServicePhase = {
  name: string
  /** Mono label under the number: "Weeks 2–4" */
  duration: string
  description: string
  /** "You get": three deliverables */
  outcomes: string[]
}

export type Service = {
  /** URL: /services/<slug>. Also the anchor on /services. */
  slug: ServiceSlug
  title: string
  /** Shorter name for the footer, the Work page filters and case study cards */
  shortTitle: string
  /** Sets the order: Design, then Build, then Run. */
  group: ServiceGroup
  icon: LucideIcon
  /** The Contact form option "Discuss your project" ticks */
  need: NeedId
  /** One-liner for the Home grid */
  summary: string
  /** Longer pitch: the Services page, the service page intro and its meta description */
  description: string
  /** The service page h1, split where the design switches to the serif. */
  headline: [sans: string, serif: string]
  /** Home grid footer, e.g. "APIs · Databases · Integrations" */
  tags: string[]
  /** Services page tool list, and "Stack" on the service page */
  tools: string[]
  /** Titles make the Services page checklist; the service page adds the bodies. */
  included: { title: string; body: string }[]
  timeline: string
  investment: string
  /** Service page facts: who works on it */
  team: string
  /** Service page facts: what the client keeps */
  handover: string
  /** Services that usually join this one on a project */
  pairsWith: ServiceSlug[]
  /**
   * "Selected work": case study slugs, in the order they should appear. Anything left out is
   * filled in from the studies tagged with this service, so this is optional curation.
   */
  work?: string[]
  /** "How it works": four phases */
  process: ServicePhase[]
  /** Also published as FAQPage structured data on the service page. */
  faqs: { question: string; answer: string }[]
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
    headline: ['Products people', 'love to use.'],
    tags: ['Research', 'Prototypes', 'Systems'],
    tools: ['Figma', 'Maze', 'ProtoPie'],
    included: [
      {
        title: 'User research & testing',
        body: 'Interviews, analytics reviews and usability tests that show what people need, not what we assume.',
      },
      {
        title: 'Wireframes & prototypes',
        body: 'Journeys and clickable prototypes you can put in front of customers before a line of code is written.',
      },
      {
        title: 'Interface design',
        body: 'Polished, accessible screens for web and mobile, designed with the engineers who will build them.',
      },
      {
        title: 'Design systems',
        body: 'Components, tokens and guidelines in Figma that keep every new screen consistent as the product grows.',
      },
    ],
    timeline: '3–8 weeks',
    investment: 'From £6k',
    team: 'Designer + researcher',
    handover: 'Figma files & design system',
    pairsWith: ['web-design-frontend', 'mobile-development'],
    work: ['orbit-health', 'kinetic-labs'],
    process: [
      {
        name: 'Research',
        duration: 'Weeks 1–2',
        description:
          'Interviews, analytics and a review of your product and competitors, ending in clear problems to solve.',
        outcomes: ['Research findings', 'User journeys', 'Priorities'],
      },
      {
        name: 'Explore',
        duration: 'Weeks 2–4',
        description:
          'Wireframes and quick prototypes of the key flows, tested with real users before we commit.',
        outcomes: ['Wireframes', 'Prototype', 'Test results'],
      },
      {
        name: 'Design',
        duration: 'Weeks 4–7',
        description: 'Final interfaces and the components behind them, reviewed with you every week.',
        outcomes: ['Interface designs', 'Design system', 'Interaction specs'],
      },
      {
        name: 'Handover',
        duration: 'Week 8',
        description:
          'Files, specs and a walkthrough for your engineers, then design support while they build.',
        outcomes: ['Figma library', 'Developer handover', 'Build support'],
      },
    ],
    faqs: [
      {
        question: 'Can you improve the product we already have?',
        answer:
          'Yes. Most projects start with an existing product: we audit what’s there and improve it rather than starting over.',
      },
      {
        question: 'Who takes part in the research?',
        answer:
          'Your customers, ideally. We recruit and run the sessions, or work with the users you already talk to.',
      },
      {
        question: 'Can your engineers build the designs too?',
        answer:
          'They can. Our [web](/services/web-design-frontend), mobile and backend teams work from the same files, so nothing gets lost in handover.',
      },
      {
        question: 'What tools do you design in?',
        answer:
          'Figma, with Maze for testing and ProtoPie for detailed prototypes. You own every file at the end.',
      },
    ],
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
    headline: ['Brands people', 'remember.'],
    tags: ['Identity', 'Guidelines', 'Collateral'],
    tools: ['Illustrator', 'Figma', 'After Effects'],
    included: [
      {
        title: 'Brand strategy & positioning',
        body: 'Workshops that pin down who you’re for, what you stand for and how you sound.',
      },
      {
        title: 'Logo & visual identity',
        body: 'A logo, colour palette, type and imagery style that work from a favicon to a billboard.',
      },
      {
        title: 'Brand guidelines',
        body: 'A clear guide your team and suppliers can follow, so the brand stays consistent without us.',
      },
      {
        title: 'Print, social & signage',
        body: 'Pitch decks, packaging, social templates and signage, ready to use from launch day.',
      },
    ],
    timeline: '2–6 weeks',
    investment: 'From £3k',
    team: 'Brand designer + strategist',
    handover: 'Logo files & guidelines',
    pairsWith: ['web-design-frontend', 'product-design'],
    process: [
      {
        name: 'Discover',
        duration: 'Week 1',
        description: 'Workshops and a look at your market and competitors, ending in a clear positioning.',
        outcomes: ['Brand workshop', 'Positioning', 'Moodboards'],
      },
      {
        name: 'Concepts',
        duration: 'Weeks 2–3',
        description:
          'Two or three identity routes, each shown on real applications so you can picture them in use.',
        outcomes: ['Identity routes', 'Mock-ups', 'Feedback round'],
      },
      {
        name: 'Refine',
        duration: 'Weeks 3–5',
        description: 'The chosen route developed in full: logo, colour, type, imagery and tone of voice.',
        outcomes: ['Final identity', 'Tone of voice', 'Asset library'],
      },
      {
        name: 'Roll out',
        duration: 'Weeks 5–6',
        description: 'Guidelines, templates and the first set of collateral, ready for launch.',
        outcomes: ['Brand guidelines', 'Templates', 'Launch assets'],
      },
    ],
    faqs: [
      {
        question: 'How many logo concepts will we see?',
        answer:
          'Two or three distinct routes, each shown in use. We develop one route in full rather than tweaking dozens of options.',
      },
      {
        question: 'Can you refresh our brand rather than replace it?',
        answer: 'Yes. Many projects keep what people already recognise and fix what isn’t working.',
      },
      {
        question: 'Do we own the brand files?',
        answer:
          'Yes. You get every logo file, the font licence details and editable templates, with full rights to use them.',
      },
      {
        question: 'Can you design our website to match?',
        answer:
          'Our [web team](/services/web-design-frontend) builds the sites for most of the brands we design, so the identity carries through online.',
      },
    ],
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
    headline: ['Websites that', 'win customers.'],
    tags: ['Next.js', 'React', 'Shopify'],
    tools: ['Next.js', 'React', 'Sanity', 'Shopify'],
    included: [
      {
        title: 'Strategy, sitemap & design',
        body: 'Workshops, content structure and page designs built around the actions you want visitors to take.',
      },
      {
        title: 'Frontend & CMS build',
        body: 'Fast, accessible Next.js and React sites your team edits in Sanity, without calling a developer.',
      },
      {
        title: 'E-commerce & headless stores',
        body: 'Shopify and headless storefronts with checkout, subscriptions and the integrations behind them.',
      },
      {
        title: 'Technical SEO & performance',
        body: 'Server rendering, structured data and Core Web Vitals in the green, so Google finds every page.',
      },
    ],
    timeline: '4–10 weeks',
    investment: 'From £8k',
    team: 'Designer + 2 engineers',
    handover: 'Code, CMS & training',
    pairsWith: ['product-design', 'backend-development'],
    work: ['kinetic-labs', 'halden-coffee'],
    process: [
      {
        name: 'Discover',
        duration: 'Week 1',
        description: 'Goals, audience and a content audit, ending in a sitemap and a fixed scope.',
        outcomes: ['Sitemap', 'Content plan', 'Fixed quote'],
      },
      {
        name: 'Design',
        duration: 'Weeks 2–4',
        description: 'Key pages designed in Figma, then a clickable prototype you can test with customers.',
        outcomes: ['Page designs', 'Prototype', 'Design system'],
      },
      {
        name: 'Build',
        duration: 'Weeks 4–8',
        description: 'Weekly releases to a preview site, so you see progress and give feedback as we go.',
        outcomes: ['Preview site', 'CMS set-up', 'Integrations'],
      },
      {
        name: 'Launch',
        duration: 'Weeks 8–10',
        description: 'Redirects, analytics and speed checks, then a calm launch and training for your team.',
        outcomes: ['Live site', 'Team training', '30 days’ support'],
      },
    ],
    faqs: [
      {
        question: 'How long does a website take?',
        answer:
          'Most marketing sites take 4–6 weeks; stores and larger sites 8–10. We agree the timeline in the quote.',
      },
      {
        question: 'Can we edit the site ourselves?',
        answer:
          'Yes. We set up a CMS such as Sanity or Shopify and train your team, so everyday changes never need us.',
      },
      {
        question: 'Will we keep our Google rankings?',
        answer:
          'We map every old URL to its new page and test the redirects before launch, so rankings carry over.',
      },
      {
        question: 'Do you look after the site after launch?',
        answer:
          'Every launch includes 30 days of support, then an optional care plan from our [Cloud & DevOps](/services/cloud-devops) team.',
      },
    ],
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
    headline: ['Apps people', 'come back to.'],
    tags: ['iOS', 'Android', 'React Native'],
    tools: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
    included: [
      {
        title: 'Discovery & MVP scoping',
        body: 'We find the smallest version worth launching, so you learn from real users sooner.',
      },
      {
        title: 'iOS & Android apps',
        body: 'Native Swift and Kotlin, or one React Native or Flutter codebase when that suits the product better.',
      },
      {
        title: 'Payments, push & offline',
        body: 'In-app payments, notifications and offline modes that feel native and survive a patchy signal.',
      },
      {
        title: 'App Store launch & updates',
        body: 'Store listings, reviews and release management, then regular updates after launch.',
      },
    ],
    timeline: '10–20 weeks',
    investment: 'From £30k',
    team: 'Designer + 2–3 engineers',
    handover: 'Code & store accounts',
    pairsWith: ['product-design', 'backend-development'],
    process: [
      {
        name: 'Scope',
        duration: 'Weeks 1–2',
        description:
          'User flows and a technical plan that settles native or cross-platform, ending in a fixed scope.',
        outcomes: ['MVP scope', 'User flows', 'Fixed quote'],
      },
      {
        name: 'Design',
        duration: 'Weeks 2–5',
        description: 'App screens and a tappable prototype, tested with users on real devices.',
        outcomes: ['App designs', 'Prototype', 'Test results'],
      },
      {
        name: 'Build',
        duration: 'Weeks 5–16',
        description: 'Two-week sprints, with a test build on your phone at the end of each one.',
        outcomes: ['Test builds', 'API integration', 'QA reports'],
      },
      {
        name: 'Launch',
        duration: 'Weeks 16–20',
        description:
          'App Store and Google Play submission, analytics and crash reporting, then a staged release.',
        outcomes: ['Store release', 'Analytics', 'Release plan'],
      },
    ],
    faqs: [
      {
        question: 'Native or cross-platform?',
        answer:
          'It depends on the app. We recommend React Native or Flutter for most products, and native when performance or device features demand it.',
      },
      {
        question: 'Will you handle App Store approval?',
        answer:
          'Yes. We prepare the listings, submit the builds and deal with any review feedback from Apple and Google.',
      },
      {
        question: 'Do you build the backend too?',
        answer:
          'Our [backend team](/services/backend-development) builds the APIs and admin tools most apps need, so one team owns the whole product.',
      },
      {
        question: 'What happens after launch?',
        answer: 'We plan updates for new OS versions and features, through a retainer or a care plan.',
      },
    ],
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
    headline: ['Systems built', 'to scale.'],
    tags: ['APIs', 'Databases', 'Integrations'],
    tools: ['TypeScript', 'Node', 'Python', 'PostgreSQL'],
    included: [
      {
        title: 'APIs & platforms',
        body: 'REST and GraphQL APIs, customer portals and internal platforms, designed around how your business works.',
      },
      {
        title: 'Databases & data models',
        body: 'Data models that stay fast and reliable as your data grows, with migrations planned from day one.',
      },
      {
        title: 'Integrations & payments',
        body: 'Stripe, CRMs, ERPs and third-party APIs connected properly, with retries, logging and alerts.',
      },
      {
        title: 'Automated testing & QA',
        body: 'Tests that run on every change, so new features ship without breaking what already works.',
      },
    ],
    timeline: '6–16 weeks',
    investment: 'From £20k',
    team: '2–3 engineers',
    handover: 'Code, docs & runbooks',
    pairsWith: ['web-design-frontend', 'cloud-devops'],
    work: ['northwind', 'atlas-freight'],
    process: [
      {
        name: 'Discover',
        duration: 'Weeks 1–2',
        description:
          'Your systems, data and integrations mapped, ending in an architecture plan and a fixed scope.',
        outcomes: ['Architecture plan', 'Data model', 'Fixed quote'],
      },
      {
        name: 'Foundations',
        duration: 'Weeks 2–4',
        description:
          'Environments, CI and the core data model set up, so every feature lands on solid ground.',
        outcomes: ['Environments', 'CI pipeline', 'Core API'],
      },
      {
        name: 'Build',
        duration: 'Weeks 4–14',
        description:
          'Features delivered in two-week sprints and demoed on a staging environment you can use.',
        outcomes: ['Staging API', 'Integrations', 'Test suite'],
      },
      {
        name: 'Launch',
        duration: 'Weeks 14–16',
        description: 'Load testing, data migration and a planned cut-over, with your team trained to run it.',
        outcomes: ['Live platform', 'API docs', 'Runbooks'],
      },
    ],
    faqs: [
      {
        question: 'Can you work with our existing code?',
        answer:
          'Yes. We start with a code review, then improve and extend what you have rather than rewriting it for the sake of it.',
      },
      {
        question: 'Which languages do you use?',
        answer:
          'Mostly TypeScript and Node, with Python for data-heavy work and PostgreSQL as the default database.',
      },
      {
        question: 'How do you keep our data secure?',
        answer:
          'Encryption, least-privilege access and audit logs by default, with a security review before every launch.',
      },
      {
        question: 'Will our team be able to maintain it?',
        answer: 'We write documentation and runbooks as we go, and pair with your engineers before handover.',
      },
    ],
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
    headline: ['Products that', 'stay online.'],
    tags: ['AWS', 'CI/CD', 'Support'],
    tools: ['AWS', 'Vercel', 'Terraform', 'GitHub Actions'],
    included: [
      {
        title: 'Cloud architecture & migration',
        body: 'Infrastructure on AWS or Vercel sized for your traffic, and calm migrations from wherever you are now.',
      },
      {
        title: 'CI/CD & infrastructure as code',
        body: 'Every environment written in Terraform and every release automated, so deploys are routine.',
      },
      {
        title: 'Monitoring, backups & security',
        body: 'Alerts, uptime checks, tested backups and patching, so problems are fixed before customers notice.',
      },
      {
        title: 'Maintenance & support plans',
        body: 'Monthly care plans for updates, fixes and small improvements, with agreed response times.',
      },
    ],
    timeline: '2–6 weeks, then ongoing',
    investment: 'From £4k',
    team: 'DevOps engineer',
    handover: 'Infrastructure as code',
    pairsWith: ['backend-development', 'web-design-frontend'],
    process: [
      {
        name: 'Audit',
        duration: 'Week 1',
        description:
          'A review of your infrastructure, costs, security and release process, ending in a prioritised plan.',
        outcomes: ['Audit report', 'Cost review', 'Roadmap'],
      },
      {
        name: 'Set up',
        duration: 'Weeks 2–4',
        description: 'Infrastructure as code, CI/CD pipelines and environments, built fresh or moved across.',
        outcomes: ['Terraform', 'CI/CD pipelines', 'Environments'],
      },
      {
        name: 'Harden',
        duration: 'Weeks 4–6',
        description: 'Monitoring, alerting, backups and security controls, tested with a practice incident.',
        outcomes: ['Monitoring', 'Backups', 'Incident plan'],
      },
      {
        name: 'Care',
        duration: 'Ongoing',
        description: 'A monthly plan for updates, patches and improvements, with a report on what changed.',
        outcomes: ['Care plan', 'Monthly report', 'Response times'],
      },
    ],
    faqs: [
      {
        question: 'Can you take over hosting from our current supplier?',
        answer:
          'Yes. We plan the move, run it at a quiet time and keep the old setup ready until everything checks out.',
      },
      {
        question: 'Will this cut our cloud bill?',
        answer:
          'Often. Most audits find savings in unused resources and oversized servers, and we show the numbers before changing anything.',
      },
      {
        question: 'What do care plans include?',
        answer:
          'Updates, security patches, backups, monitoring and a set number of hours for fixes and small improvements each month.',
      },
      {
        question: 'How quickly do you respond to incidents?',
        answer:
          'Care plans include agreed response times, with urgent issues picked up within hours during the working week.',
      },
    ],
  },
]

/** A service by slug. Throws on an unknown slug so a typo can't ship. */
export function service(slug: ServiceSlug) {
  const found = services.find((candidate) => candidate.slug === slug)
  if (!found) throw new Error(`Unknown service "${slug}"`)
  return found
}

/** The service's own page. */
export const serviceHref = (slug: ServiceSlug) => `/services/${slug}`

/** The eyebrow on a service page: "(Service 03 / 06) Build". */
export const groupLabels: Record<ServiceGroup, string> = { design: 'Design', build: 'Build', run: 'Run' }
