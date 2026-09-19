import { defineCaseStudy } from '../schema'

/**
 * Kinetic Labs · Web & frontend, Product design
 * Design: "Case Study: Website" (desktop) and "(Mobile)" in the Pencil file.
 *
 * SAMPLE CONTENT: the client, figures, scores, team credits and quote are invented for the
 * design mockups. Replace them with a real, client-approved project and remove `sample`
 * before launch.
 */
const templates = [
  ['Home', 'home'],
  ['Product', 'product'],
  ['Pricing', 'pricing'],
  ['Customers', 'customers'],
  ['Docs', 'docs'],
  ['Blog article', 'blog-article'],
] as const

export default defineCaseStudy({
  slug: 'kinetic-labs',
  status: 'draft',
  sample: true,
  services: ['web-design-frontend', 'product-design'],
  discipline: 'Website',
  client: 'Kinetic Labs',
  industry: 'SaaS',
  year: 2026,

  seo: {
    title: 'Kinetic Labs: from brochure site to sales engine',
    description:
      '4.4× more demo requests and a 0.9s load time. How we rebuilt the Kinetic Labs website as a fast, CMS-driven site their marketing team runs on its own.',
  },

  hero: {
    title: ['From brochure site', 'to sales engine.'],
    intro:
      "Kinetic Labs had outgrown a template site that couldn't explain the product or keep up with launches. We rebuilt it as a fast, CMS-driven site the marketing team runs on its own.",
    tags: ['Robotics SaaS', 'Web design & development', '2026'],
    facts: [
      ['Client', 'Kinetic Labs'],
      ['Industry', 'Robotics · SaaS'],
      ['Services', 'Web design, development, CMS'],
      ['Timeline', '10 weeks · 2026'],
      ['Pages', '38 pages · 14 templates'],
      ['Stack', 'Next.js · Sanity · Vercel'],
    ],
    media: {
      image: 'case-studies/kinetic-labs-home',
      alt: 'The new Kinetic Labs home page: a dark navy hero reading "Motion data for robots that learn." with Start free and Watch demo buttons, above a row of customer logos',
      brief: 'Website screenshot · home page · 2560×1426',
      url: 'kineticlabs.example',
    },
    frame: 'browser',
  },

  cover: {
    image: 'case-studies/kinetic-labs-cover',
    alt: 'A large blue and white geometric poster on a concrete wall above a busy city street',
    brief: 'Cover photo · 2880×1520',
  },

  results: {
    timeframe: '90 days after launch',
    summary:
      'More of the right visitors, staying longer and booking demos, without a developer for every page change.',
    stats: [
      { value: '4.4×', label: 'demo requests per month', detail: '22 → 96' },
      { value: '−46%', label: 'bounce rate on key landing pages', detail: '71% → 38%' },
      { value: '0.9s', label: 'largest contentful paint', detail: 'Was 4.8s' },
      { value: '100', label: 'Lighthouse SEO & accessibility', detail: 'All pages' },
    ],
  },

  challenge: {
    title: 'A product that outgrew its website.',
    paragraphs: [
      "Kinetic's platform had doubled in scope, but the site still described version one. Every new page needed a developer, launches slipped, and visitors couldn't tell who the product was for.",
    ],
    points: [
      'Template theme with 4.8s load times',
      'No clear path from visitor to demo',
      'Every edit needed engineering time',
    ],
  },

  approach: {
    title: 'Message first, then a system.',
    paragraphs: [
      'We started with positioning workshops and 12 customer calls, rewrote the sitemap around three buyer journeys, then designed a component library that maps one-to-one to CMS blocks.',
      'The marketing team now assembles new landing pages from 26 blocks in under an hour, no tickets required.',
    ],
  },

  sections: [
    {
      kind: 'before-after',
      label: 'Redesign',
      title: ['Same company,', 'clearer story.'],
      intro: 'A single message, three buyer journeys and a demo path on every page.',
      frame: 'browser',
      before: {
        label: 'Before · 2021',
        media: {
          image: 'case-studies/kinetic-labs-before',
          alt: 'The old Kinetic Labs home page: a generic template with a stock hero image and three grey feature boxes',
          brief: 'Website screenshot · old home page · 1240×746',
          url: 'kineticlabs.example',
        },
        metrics: [
          { label: 'Bounce rate', value: '71%' },
          { label: 'Load time', value: '4.8s' },
          { label: 'Demo requests / mo', value: '22' },
        ],
      },
      after: {
        label: 'After · 2026',
        media: {
          image: 'case-studies/kinetic-labs-after',
          alt: 'The new Kinetic Labs home page: "Motion data for robots that learn." on navy, with Start free and Watch demo buttons and customer logos',
          brief: 'Website screenshot · new home page · 1240×746',
          url: 'kineticlabs.example',
        },
        metrics: [
          { label: 'Bounce rate', value: '38%' },
          { label: 'Load time', value: '0.9s' },
          { label: 'Demo requests / mo', value: '96' },
        ],
      },
    },
    {
      kind: 'gallery',
      label: 'Templates',
      title: ['38 pages,', '14 templates.'],
      intro: 'Each template is assembled from the same CMS blocks, so new pages stay on-brand automatically.',
      frame: 'plain',
      columns: 3,
      outline: true,
      items: templates.map(([caption, page], i) => ({
        caption,
        meta: String(i + 1).padStart(2, '0'),
        media: {
          image: `case-studies/kinetic-labs-${page}-thumb` as const,
          mobileImage: `case-studies/kinetic-labs-${page}-thumb-mobile` as const,
          alt: `Wireframe of the ${caption.toLowerCase()} template`,
          brief: `Template thumbnail · ${caption.toLowerCase()} · 827×440`,
        },
      })),
    },
    {
      kind: 'design-system',
      tone: 'mist',
      label: 'Design system',
      title: ['Tokens to', 'templates.'],
      intro: 'Colour, type and 26 blocks: shared between Figma, Storybook and Sanity.',
      colours: [
        { name: 'Navy', hex: '#07122B' },
        { name: 'Signal', hex: '#2E6BFF' },
        { name: 'Cyan', hex: '#7CE0FF' },
        { name: 'Mist', hex: '#E8EEF7' },
        { name: 'Ink', hex: '#111827' },
      ],
      type: {
        scale: [
          ['Display', '64 / 1.0'],
          ['Heading', '32 / 1.15'],
          ['Body', '17 / 1.5'],
          ['Label', '12 / mono'],
        ],
        note: 'Satoshi & JetBrains Mono',
      },
      components: {
        colours: { primary: '#07122B', soft: '#E8EEF7', accent: '#2E6BFF' },
        description:
          'Sample components: a solid Book a demo button, an outlined Read docs button, an email field, a Beta badge, and 22 more blocks.',
        items: [
          { kind: 'button', label: 'Book a demo' },
          { kind: 'button', label: 'Read docs', variant: 'outline' },
          { kind: 'input', placeholder: 'you@company.com' },
          { kind: 'badge', label: 'Beta' },
          { kind: 'note', label: '+ 22 more blocks' },
        ],
      },
    },
    {
      kind: 'scores',
      label: 'Performance',
      title: ['Fast by', 'default.'],
      intro: 'Static generation, optimised images and zero layout shift, checked on every deploy.',
      scores: [
        { value: '99', label: 'Performance' },
        { value: '100', label: 'Accessibility' },
        { value: '100', label: 'Best practices' },
        { value: '100', label: 'SEO' },
      ],
      vitals: [
        { key: 'LCP', name: 'Largest contentful paint', before: '4.8s', after: '0.9s', status: 'Good' },
        { key: 'INP', name: 'Interaction to next paint', before: '310ms', after: '64ms', status: 'Good' },
        { key: 'CLS', name: 'Cumulative layout shift', before: '0.24', after: '0.01', status: 'Good' },
      ],
    },
  ],

  quote: {
    text: 'Our site finally explains what we do. Demo requests quadrupled, and I can ship a landing page before lunch.',
    name: 'Maya Chen',
    role: 'VP Marketing, Kinetic Labs',
    initials: 'MC',
  },

  credits: {
    services: [
      'Positioning & messaging',
      'Information architecture',
      'Web design',
      'Next.js development',
      'Sanity CMS & training',
    ],
    team: [
      'Priya Raman, Design Lead',
      'Leo Park, Engineer',
      'Sam Adeyemi, Content Strategist',
      'Hannah Cole, Client Partner',
    ],
    tools: ['Next.js', 'Sanity', 'Vercel', 'Tailwind', 'Algolia', 'HubSpot'],
    toolsLabel: 'Stack',
  },

  next: 'halden-coffee',
})
