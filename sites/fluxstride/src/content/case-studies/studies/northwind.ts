import { ListChecks, ShieldCheck, Smartphone } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * Northwind · Backend, Web & frontend, Product design
 * Design: "Case Study: Software Platform" (desktop) and "(Mobile)" in the Pencil file.
 *
 * SAMPLE CONTENT: the client, figures, team credits and quote are invented for the design
 * mockups. Replace them with a real, client-approved project and remove `sample` before launch.
 */
export default defineCaseStudy({
  slug: 'northwind',
  status: 'draft',
  sample: true,
  services: ['backend-development', 'web-design-frontend', 'product-design'],
  discipline: 'Software platform',
  client: 'Northwind',
  industry: 'Fintech',
  year: 2026,

  seo: {
    title: 'Northwind: a customer platform that onboards itself',
    description:
      '86% of new Northwind accounts now finish onboarding, up from 38%. How we rebuilt a fintech portal, its onboarding and design system in 12 weeks.',
  },

  hero: {
    title: ['A customer platform', 'that onboards itself.'],
    intro:
      "Northwind's customers loved the product once they were set up, but 62% never finished onboarding. We rebuilt the portal, the onboarding and the system behind it in 12 weeks.",
    tags: ['Fintech', 'Backend & web', 'Product design', '2026'],
    facts: [
      ['Client', 'Northwind Ltd'],
      ['Industry', 'Fintech · B2B'],
      ['Services', 'Engineering, UX/UI, design system'],
      ['Timeline', '12 weeks · 2026'],
      ['Team', '4 people'],
      ['Platform', 'Web · Next.js · Node'],
    ],
    media: {
      image: 'case-studies/northwind-hero',
      alt: 'An open-plan office where a wall screen shows an operations dashboard with a world map and charts',
      brief: 'Hero image · product in use · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '6 months after launch',
    summary:
      'Onboarding went from a support-heavy process to something customers finish on their own, in one sitting.',
    stats: [
      { value: '+212%', label: 'qualified leads from the new sign-up flow', detail: 'vs previous 6 months' },
      { value: '86%', label: 'of new accounts now finish onboarding', detail: 'up from 38%' },
      { value: '−54%', label: 'support tickets per 100 customers', detail: '24 → 11' },
      { value: '0.9s', label: 'median page load across the portal', detail: 'was 4.1s' },
    ],
  },

  challenge: {
    title: 'Great product, painful first week.',
    paragraphs: [
      'Northwind sells expense and payroll tools to growing businesses. Their customers renewed at 94%, but only after a week of calls, spreadsheets and support tickets to get set up.',
      "The 2019 portal couldn't keep up: every screen was bespoke, nothing worked on mobile, and the team spent more time answering questions than shipping features.",
    ],
    points: [
      '62% of new accounts never finished onboarding',
      '24 support tickets per 100 customers every month',
      'No design system: each feature rebuilt from scratch',
    ],
  },

  approach: {
    title: 'Fix the first hour, then the system.',
    paragraphs: [
      "We interviewed 8 customers and shadowed the support team for a week. The biggest drop-off wasn't a missing feature, it was the six decisions customers had to make before seeing any value.",
      'So we redesigned onboarding around a single goal: first payroll run in the first session. Everything else (the portal, the design system, the API) was rebuilt to support that.',
    ],
  },

  sections: [
    {
      kind: 'steps',
      variant: 'cards',
      label: 'Process',
      title: ['Twelve weeks,', 'four phases.'],
      intro: 'A working demo every Friday, and decisions made together rather than at the end.',
      steps: [
        {
          title: 'Discover',
          meta: 'Weeks 1–2',
          points: ['8 customer interviews', 'Support ticket analysis', 'Technical audit'],
        },
        {
          title: 'Define',
          meta: 'Weeks 2–3',
          points: ['Onboarding journey map', 'Clickable prototype', 'Roadmap sign-off'],
        },
        {
          title: 'Design & build',
          meta: 'Weeks 4–10',
          points: ['4 two-week sprints', '42-component design system', 'Stripe, HubSpot & Okta'],
          highlight: true,
        },
        {
          title: 'Launch',
          meta: 'Weeks 11–12',
          points: ['Staged rollout to 10% → 100%', 'Analytics & alerts', 'Team handover'],
        },
      ],
    },
    {
      kind: 'screenshot',
      label: 'The product',
      title: ['A portal customers', 'actually use.'],
      intro:
        'Clear numbers up front, the next step always obvious, and every screen built from the same 42 components.',
      frame: 'browser',
      media: {
        image: 'case-studies/northwind-dashboard',
        url: 'app.northwind.example/overview',
        alt: 'The Northwind portal overview: active accounts, onboarding rate, tickets and NPS, a chart of new accounts over 12 weeks and a list of recent sign-ups',
        brief: 'Product screenshot · desktop · 2560×1106',
      },
      featureStyle: 'plain',
      features: [
        {
          icon: ListChecks,
          title: 'Guided onboarding',
          body: 'Five steps, saved progress, and help exactly where people got stuck.',
        },
        {
          icon: Smartphone,
          title: 'Works on any device',
          body: 'Approvals and payslips from a phone, 31% of sessions are now mobile.',
        },
        {
          icon: ShieldCheck,
          title: 'SSO & permissions',
          body: 'Okta single sign-on and role-based access for finance teams.',
        },
      ],
    },
    {
      kind: 'architecture',
      tone: 'ink',
      label: 'Engineering',
      title: ['Built to scale,', 'and to hand over.'],
      intro: "A typed, tested codebase Northwind's own engineers now extend every week.",
      layers: [
        {
          name: 'Clients',
          nodes: [
            { title: 'Customer portal', meta: 'Next.js · React' },
            { title: 'Admin console', meta: 'Next.js' },
            { title: 'Mobile web', meta: 'PWA' },
          ],
        },
        {
          name: 'Core',
          nodes: [
            { title: 'API gateway', meta: 'Node · tRPC' },
            { title: 'Services', meta: 'Payroll, billing, docs' },
            { title: 'Data', meta: 'Postgres · Redis' },
          ],
        },
        {
          name: 'Integrations',
          nodes: [
            { title: 'Stripe', meta: 'Payments' },
            { title: 'HubSpot', meta: 'CRM sync' },
            { title: 'Okta', meta: 'SSO' },
          ],
        },
      ],
      stack: {
        label: 'Stack',
        items: [
          'TypeScript',
          'Next.js',
          'Node',
          'tRPC',
          'PostgreSQL',
          'Redis',
          'Vercel',
          'AWS',
          'Playwright',
        ],
      },
    },
  ],

  quote: {
    text: "Fluxstride didn't just rebuild our portal, they fixed the first week of every customer relationship we have.",
    name: 'Jane Doe',
    role: 'Head of Product, Northwind',
    initials: 'JD',
  },

  credits: {
    services: [
      'Product strategy',
      'UX research & design',
      'Design system',
      'Full-stack engineering',
      'QA & launch',
    ],
    team: [
      'Hannah Cole, Client Partner',
      'Daniel Mensah, Technical Lead',
      'Priya Raman, Design Lead',
      'Leo Park, Engineer',
    ],
    tools: ['TypeScript', 'Next.js', 'Node', 'PostgreSQL', 'Stripe', 'Okta'],
    toolsLabel: 'Stack',
  },

  next: 'orbit-health',
})
