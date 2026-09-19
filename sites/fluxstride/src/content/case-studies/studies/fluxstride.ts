import { Cloud, FileText, Layers, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * Fluxstride · Branding, Web & frontend, Product design, Cloud
 *
 * Our own studio: the brand, this website and the design system behind it. Kept as a case
 * study because it is the project a prospective client can inspect most closely, and because
 * every claim in it can be checked by viewing source.
 *
 * Screenshots: `pnpm shots:projects fluxstride` recaptures them from the live site.

 */
export default defineCaseStudy({
  slug: 'fluxstride',
  status: 'published',
  services: ['graphic-design-branding', 'web-design-frontend', 'product-design', 'cloud-devops'],
  discipline: 'Brand & website',
  client: 'Fluxstride',
  industry: 'Design & engineering',
  year: 2026,

  seo: {
    title: 'Fluxstride: the studio brand, site and design system',
    description:
      'How we built our own brand, website and shared design system: prerendered pages, a case-study system that is plain data, and components two sites run on.',
  },

  hero: {
    title: ['The studio, built', 'the way we build.'],
    intro:
      'Our own brand, website and design system. Everything a client is promised is visible here first: a design system rather than pages, prerendered HTML, and content that anyone on the team can edit without touching a component.',
    tags: ['Our studio', 'Brand & website', '2026'],
    facts: [
      ['Client', 'Fluxstride, our own studio'],
      ['Industry', 'Design & engineering'],
      ['Services', 'Branding, design, web, cloud'],
      ['Scope', 'Brand, website, design system'],
      ['Rendering', 'Prerendered static HTML'],
      ['Stack', 'React 19 · Vite · Tailwind · GSAP'],
    ],
    media: {
      image: 'case-studies/fluxstride-home',
      alt: 'The Fluxstride home page: the headline "We build digital products that keep moving" beside a dark panel with a blue mark radiating rings',
      brief: 'Website screenshot · home page · 2880×1800',
      // No href: the hero link is a "visit the live site" button, and this is the live site.
      url: 'fluxstride.com',
    },
    frame: 'browser',
  },

  cover: {
    image: 'case-studies/fluxstride-cover',
    alt: 'The Fluxstride home page, headlined "We build digital products that keep moving"',
    brief: 'Cover · home page on ink · 2400×1600',
  },

  results: {
    timeframe: 'Shipped 2026',
    summary:
      'A brand and a site that are one system: the same tokens, components and motion rules power the studio site and everything built on top of it.',
    stats: [
      { value: '6', label: 'services, each with its own page', detail: 'Design, build and run' },
      { value: '26', label: 'components shared between sites', detail: 'One design system package' },
      { value: '9', label: 'brand asset kits, logo to email', detail: 'Guidelines, social, print, mockups' },
      { value: '100%', label: 'of pages prerendered as HTML', detail: 'No server to keep running' },
    ],
  },

  challenge: {
    title: 'A studio site is an audition.',
    paragraphs: [
      'Anyone deciding whether to hire us opens the site first, and judges the work by how it behaves: how fast it arrives, how it reads on a phone, whether the animation helps or shows off.',
      'It also had to survive us. A site the studio cannot update between projects goes stale in a quarter, and a brand that lives only in one designer’s file cannot be applied by anyone else.',
    ],
    points: [
      'The work has to be the proof',
      'Content must change without a developer',
      'The brand has to travel beyond the site',
    ],
  },

  approach: {
    title: 'Design a system, then write the pages.',
    paragraphs: [
      'The brand came first: one mark, two typefaces, a small palette and a rule that blue is used for action rather than decoration. Those decisions became design tokens, and the tokens became the components.',
      'The site is prerendered to static HTML at build time and served from the edge. Case studies, services, insights and roles are plain data, so publishing one is a file rather than a ticket, and the build refuses to ship a page that still has a placeholder in it.',
    ],
  },

  sections: [
    {
      kind: 'design-system',
      label: 'The system',
      title: ['Tokens first,', 'then everything else.'],
      intro:
        'A palette, a type scale and a component set, shared as source between this site and the studio’s other products.',
      tone: 'mist',
      colours: [
        { name: 'Ink', hex: '#0A0F1E' },
        { name: 'Paper', hex: '#F5F7FB' },
        { name: 'Flux', hex: '#1F4FFF' },
        { name: 'Flux soft', hex: '#E3E9FF' },
        { name: 'Stone', hex: '#5B6477' },
      ],
      type: {
        sample: 'Aa',
        scale: [
          ['Display', '120 / 0.92'],
          ['Heading', '56 / 1.05'],
          ['Body', '17 / 1.5'],
          ['Label', '12 / 1.2'],
        ],
        note: 'Inter Tight, Instrument Serif & JetBrains Mono',
      },
      components: {
        items: [
          { kind: 'button', label: 'Start a project' },
          { kind: 'button', label: 'See our work', variant: 'outline' },
          { kind: 'input', placeholder: 'you@company.com' },
          { kind: 'badge', label: 'Booking Q4' },
          { kind: 'note', label: '+ 26 shared modules' },
        ],
        colours: { primary: '#1F4FFF', soft: '#E3E9FF', accent: '#0A0F1E' },
        description: 'Buttons, an email field and a status badge in the Fluxstride palette',
      },
    },
    {
      kind: 'gallery',
      label: 'The site',
      title: ['Pages assembled', 'from the same parts.'],
      intro:
        'Work, services, process and contact are different content in the same system, not bespoke pages.',
      frame: 'browser',
      columns: 2,
      items: [
        {
          media: {
            image: 'case-studies/fluxstride-work',
            alt: 'The Fluxstride work page: the heading "Selected work" with service filter chips above a large case study card',
            brief: 'Website screenshot · work page · 1280×800',
            url: 'fluxstride.com/work',
            href: 'https://www.fluxstride.com/work',
          },
          caption: 'Work',
          meta: 'Filtered by service',
        },
        {
          media: {
            image: 'case-studies/fluxstride-services',
            alt: 'The Fluxstride services page: the heading "What we do" above a two-column index of the six services with timelines and prices',
            brief: 'Website screenshot · services page · 1280×800',
            url: 'fluxstride.com/services',
            href: 'https://www.fluxstride.com/services',
          },
          caption: 'Services',
          meta: 'Six services, one page each',
        },
      ],
    },
    {
      kind: 'steps',
      label: 'The method',
      title: ['How every project', 'actually runs.'],
      intro:
        'The Stride Method is on the site because it is what clients are buying: fixed scope, weekly demos and ownership from day one.',
      variant: 'phases',
      steps: [
        {
          title: 'Discover',
          body: 'Get under the skin of the business, its users and its constraints, so we solve the right problem.',
        },
        {
          title: 'Define',
          body: 'Scope, deliverables and a fixed quote in writing before any build work starts.',
          highlight: true,
        },
        {
          title: 'Design & Build',
          body: 'Design and engineering run together, with something clickable to review every week.',
        },
        {
          title: 'Launch & Grow',
          body: 'Ship it, measure it, and keep improving it. Launch day is day one, not the finish line.',
        },
      ],
    },
    {
      kind: 'checklist',
      label: 'Engineering',
      title: ['The parts clients', 'never see.'],
      intro: 'What makes the site fast, editable and safe to change a year from now.',
      columns: 2,
      items: [
        {
          title: 'Prerendered, not server-rendered',
          body: 'Every route is rendered to HTML at build time and served from the edge, so crawlers and phones get the finished page.',
        },
        {
          title: 'Case studies are plain data',
          body: 'A study is one typed file with twenty section kinds to choose from. Nobody edits a component to publish one.',
        },
        {
          title: 'A build that refuses drafts',
          body: 'Unfinished copy and missing images fail the build by name, so a half-written page cannot reach production.',
        },
        {
          title: 'Consent before analytics',
          body: 'Nothing that tracks runs until a visitor agrees, and the choice can be withdrawn from any page.',
        },
        {
          title: 'Motion with a reduced-motion path',
          body: 'Scroll animation is scripted once and skipped entirely for visitors who ask for less motion.',
        },
        {
          title: 'A maintenance mode that is one deploy',
          body: 'A separate build can take the site offline gracefully without dismantling the real one.',
        },
      ],
    },
    {
      kind: 'features',
      label: 'The brand',
      title: ['A system that travels', 'past the website.'],
      intro:
        'The same decisions carry into the places a studio is actually seen: profiles, decks, invoices and inboxes.',
      style: 'cards',
      features: [
        {
          icon: Layers,
          title: 'Logos in every lockup',
          body: 'Horizontal, stacked and mark-only, built from outlines so they stay sharp at a favicon or a billboard.',
        },
        {
          icon: Sparkles,
          title: 'A social kit that runs itself',
          body: 'Daily posts, stories, WhatsApp broadcasts and ad sets, all drawn from the same palette and type.',
        },
        {
          icon: FileText,
          title: 'Documents and email',
          body: 'Proposals, invoices and transactional email use the brand rather than a default template.',
        },
      ],
    },
    {
      kind: 'features',
      label: 'Running it',
      title: ['Cheap to run,', 'quick to change.'],
      intro: 'The site is deployed the way we deploy client work.',
      features: [
        {
          icon: Zap,
          title: 'Static files on a CDN',
          body: 'Pages are files. There is no server to scale, patch or wake up, and a deploy is a fresh upload.',
        },
        {
          icon: Cloud,
          title: 'Previewed before it lands',
          body: 'Every change is built and viewable before it goes near the live domain.',
        },
        {
          icon: ShieldCheck,
          title: 'Typed end to end',
          body: 'Content, components and routes share one type system, so a broken link or a missing image is a build error.',
        },
      ],
    },
  ],

  credits: {
    services: [
      'Brand identity',
      'Product design (UI/UX)',
      'Website design & frontend',
      'Design system',
      'Cloud & deployment',
    ],
    team: ['Samuel Adekoya: Design & engineering'],
    toolsLabel: 'Stack',
    tools: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP · Motion', 'Cloudflare'],
  },

  next: 'dexus-synergy',
})
