import { Calculator, Heart, Inbox, Link2, Search, ShieldCheck, Users } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * Dexus Synergy · Web & frontend, Backend, Product design, Cloud
 *
 * A real, live project: www.dexussynergy.com. Every figure here is a fact about what was
 * built and can be checked against the running site or the repository, because the client's
 * commercial numbers are not ours to publish. When Dexus approves traffic, enquiry or
 * speed-to-lead figures, swap them into `results.stats` and add an approved quote.
 *
 * Screenshots: `pnpm shots:projects dexus` recaptures them from the live site.
 */
export default defineCaseStudy({
  slug: 'dexus-synergy',
  status: 'published',
  services: ['web-design-frontend', 'backend-development', 'product-design', 'cloud-devops'],
  discipline: 'Dealership platform',
  client: 'Dexus Synergy',
  industry: 'Automotive retail',
  year: 2026,

  seo: {
    title: 'Dexus Synergy: a dealership platform with its own CMS',
    description:
      'Every vehicle on the forecourt gets a fast, filterable page, and staff publish stock themselves. A public site, a CMS and an API for a multi-brand dealership.',
  },

  hero: {
    title: ['Every vehicle in stock,', 'online in minutes.'],
    intro:
      'Dexus Synergy sells cars, motorcycles, campers, boats and commercial vehicles across its branches. We designed and built the public site, the CMS the dealership runs it from, and the API underneath.',
    tags: ['Automotive retail', 'Platform & CMS', '2026'],
    facts: [
      ['Client', 'Dexus Synergy'],
      ['Industry', 'Automotive retail'],
      ['Services', 'Design, web, backend, cloud'],
      ['Scope', 'Public site, CMS and API'],
      ['Stock', '8 vehicle types, many brands'],
      ['Stack', 'TypeScript · Express · Postgres'],
    ],
    media: {
      image: 'case-studies/dexus-synergy-home',
      alt: 'The Dexus Synergy home page: a full-width photograph of a car on a mountain road under the headline "Find a car worth keeping", with Browse the stock and Value my car buttons',
      brief: 'Website screenshot · home page · 2880×1800',
      url: 'dexussynergy.com',
      href: 'https://www.dexussynergy.com/',
    },
    frame: 'browser',
  },

  cover: {
    image: 'case-studies/dexus-synergy-cover',
    alt: 'A navy Dexus Synergy cover: the wordmark and the line “A dealership platform: public site, CMS and API” beside a browser panel showing the live home page',
    brief: 'Cover · Dexus brand frame with the live home page · 2400×1600',
  },

  /** Dexus's own tokens: --brand #000F36 with the --brand-accent blue. */
  brandCover: {
    background: '#000F36',
    panel: '#0A1A45',
    chrome: '#0F2452',
    dot: '#33456F',
    accent: '#0095FF',
    foreground: '#FFFFFF',
    muted: '#8FA3C8',
    wordmark: 'Dexus Synergy',
    eyebrow: 'Automotive retail',
    line: 'A dealership platform: public site, CMS and API.',
    services: 'Design · Web · Backend · Cloud',
    screen: {
      image: 'case-studies/dexus-synergy-home',
      alt: 'The Dexus Synergy home page: a car on a mountain road under the headline "Find a car worth keeping"',
    },
  },

  results: {
    timeframe: 'Shipped 2026',
    summary:
      'One platform behind the forecourt: buyers filter real stock, staff publish it themselves, and every enquiry arrives with the vehicle attached.',
    stats: [
      { value: '3', label: 'applications, one codebase', detail: 'Public site, CMS and API' },
      { value: '8', label: 'vehicle types, cars to boats', detail: 'Each with its own specification' },
      { value: '10', label: 'live filters, every one a URL', detail: 'Counts update as you narrow' },
      { value: 'AA', label: 'WCAG 2.2 accessibility target', detail: 'Release-blocking, not an audit' },
    ],
  },

  challenge: {
    title: 'Stock goes stale faster than a website can keep up.',
    paragraphs: [
      'A dealership that lists on portals rents its audience, pays per lead and competes on price alone. One that runs a plugin-heavy site waits on a developer for every car, so sold vehicles linger and buyers enquire about stock that has gone.',
      'Dexus needed the opposite: a site it owns, that staff update themselves, and that treats a motorcycle, a horsebox and a jet ski as first-class listings rather than a car with the wrong fields.',
    ],
    points: [
      'Listings only a developer could change',
      'Buyers filtering on the wrong things',
      'Enquiries landing in a shared mailbox',
    ],
  },

  approach: {
    title: 'One platform, three front doors.',
    paragraphs: [
      'The public site, the CMS and the API ship from one repository and share a single definition of a fuel type, a price and a search query, so a change to the domain reaches all three at once.',
      'Every request is validated at the edge of the API, every response has the same envelope, and the test suite runs against a real database rather than mocks, because the behaviour worth trusting here is what happens when a constraint or a publish rule fires.',
    ],
  },

  sections: [
    {
      kind: 'screenshot',
      label: 'The stock',
      title: ['Filters buyers', 'actually shop by.'],
      intro:
        'Budget, body type, fuel, mileage and condition, with the number of matches on every option before it is chosen.',
      frame: 'browser',
      media: {
        image: 'case-studies/dexus-synergy-vehicles',
        alt: 'The Dexus Synergy vehicles page: a filter column for price, year, mileage and vehicle type beside a grid of vehicle cards with prices and branches',
        brief: 'Website screenshot · vehicle search · 2880×1800',
        url: 'dexussynergy.com/vehicles',
        href: 'https://www.dexussynergy.com/vehicles',
      },
      features: [
        {
          icon: Search,
          title: 'Counts before you click',
          body: 'Each filter shows how many vehicles match, so nobody lands on an empty result page.',
        },
        {
          icon: Link2,
          title: 'Every search is a link',
          body: 'Filter state lives in the URL, so a salesperson can send a customer exactly what they are looking at.',
        },
        {
          icon: Heart,
          title: 'Shortlist without an account',
          body: 'Saved vehicles and comparisons work anonymously, so browsing never hits a sign-up wall.',
        },
      ],
    },
    {
      kind: 'gallery',
      label: 'The vehicle page',
      title: ['Everything a buyer asks,', 'before they ring.'],
      intro:
        'Photographs, the full specification, a monthly figure and five ways to make contact, on one page per vehicle.',
      tone: 'mist',
      frame: 'browser',
      columns: 2,
      items: [
        {
          media: {
            image: 'case-studies/dexus-synergy-vehicle',
            alt: 'A vehicle page for a 2019 BMW 1 Series: a large photograph, the price, and buttons to enquire, book a test drive, call, WhatsApp and shortlist',
            brief: 'Website screenshot · vehicle detail · 1280×800',
            url: 'dexussynergy.com/vehicles/2019-bmw-1-series-1000',
            href: 'https://www.dexussynergy.com/vehicles/2019-bmw-1-series-1000',
          },
          caption: 'Vehicle detail',
          meta: 'Gallery, specification, enquiry',
        },
        {
          media: {
            image: 'case-studies/dexus-synergy-finance',
            alt: 'The finance page: a calculator showing a monthly payment with sliders for car price, deposit and term, beside a representative example',
            brief: 'Website screenshot · finance calculator · 1280×800',
            url: 'dexussynergy.com/finance',
            href: 'https://www.dexussynergy.com/finance',
          },
          caption: 'Finance calculator',
          meta: 'Monthly figure, total cost shown',
        },
      ],
    },
    {
      kind: 'architecture',
      label: 'Architecture',
      title: ['Boring where it counts,', 'strict at the edges.'],
      intro:
        'No microservices and no message bus. One API of self-contained modules, one database, and types shared with both front ends.',
      tone: 'ink',
      layers: [
        {
          name: 'Clients',
          nodes: [
            { title: 'Public site', meta: 'React · Vite · Tailwind' },
            { title: 'CMS', meta: 'Its own address, same session' },
          ],
        },
        {
          name: 'API',
          nodes: [
            { title: 'Feature modules', meta: 'Router, service, repository' },
            { title: 'Sessions and roles', meta: 'Better Auth · four roles' },
            { title: 'Validation', meta: 'Zod on body, query and params' },
          ],
        },
        {
          name: 'Data and services',
          nodes: [
            { title: 'PostgreSQL', meta: 'Drizzle ORM · migrations' },
            { title: 'Object storage', meta: 'Vehicle photography' },
            { title: 'Mail and spam checks', meta: 'Enquiries and alerts' },
          ],
        },
      ],
      stack: {
        label: 'Stack',
        items: ['TypeScript', 'Express', 'Drizzle ORM', 'PostgreSQL', 'Better Auth', 'Vitest'],
      },
    },
    {
      kind: 'features',
      label: 'The CMS',
      title: ['A new starter can run it', 'in half an hour.'],
      intro: 'Staff publish stock, write content and work enquiries without a developer in the loop.',
      features: [
        {
          icon: Users,
          title: 'Roles that match the floor',
          body: 'Admin, manager, editor and viewer, so a salesperson sees leads without being able to delete a brand.',
        },
        {
          icon: ShieldCheck,
          title: 'A publish gate',
          body: 'A vehicle goes live only when it has the photographs and fields a buyer needs, which is what keeps listings honest.',
        },
        {
          icon: Inbox,
          title: 'Enquiries with an owner',
          body: 'Every enquiry arrives attached to its vehicle, with notes, an assignee and part-exchange details.',
        },
      ],
    },
    {
      kind: 'checklist',
      label: 'Engineering',
      title: ['Built to be handed over,', 'not handed back.'],
      intro: 'The things that decide whether a platform is still maintainable a year after launch.',
      columns: 2,
      items: [
        {
          title: 'One definition of the domain',
          body: 'Enums, money and the search contract live in a shared package and become the database type, the validator and the CMS dropdown.',
        },
        {
          title: 'Money as integer minor units',
          body: 'Never a float, formatted only at the edge, so a price is the same number everywhere it appears.',
        },
        {
          title: 'Tests against a real database',
          body: 'The API suite exercises the real routes and real constraints, because a mock cannot get a cascade rule wrong.',
        },
        {
          title: 'Three environments and a branch model',
          body: 'Every push is checked, previews are deployed, and a release can be rolled back without archaeology.',
        },
        {
          title: 'Runs locally in three commands',
          body: 'Seeded data, storage and mail all work offline, so nothing needs a third-party account to develop against.',
        },
        {
          title: 'Accessibility in the definition of done',
          body: 'The filters, gallery and carousels were built to WCAG 2.2 AA from the first commit rather than audited at the end.',
        },
      ],
    },
    {
      kind: 'features',
      label: 'Speed to lead',
      title: ['Five ways to start', 'a conversation.'],
      intro:
        'The site never takes a payment. Its whole job is to turn a visitor into a conversation with a salesperson, fast.',
      style: 'cards',
      features: [
        {
          icon: Calculator,
          title: 'A monthly figure first',
          body: 'Most buyers shop by what they can afford each month, so the calculator sits on the vehicle page with the total cost beside it.',
        },
        {
          icon: Inbox,
          title: 'Enquiry, test drive, part-exchange',
          body: 'Three structured forms, each landing in the same inbox with the vehicle, the branch and the customer attached.',
        },
        {
          icon: Heart,
          title: 'Call, WhatsApp or save',
          body: 'One tap to the branch that holds the car, a chat, or a shortlist to come back to later.',
        },
      ],
    },
  ],

  credits: {
    services: [
      'Product design (UI/UX)',
      'Website design & frontend',
      'Backend & API',
      'CMS',
      'Cloud, deployment & CI',
    ],
    team: ['Samuel Adekoya: Design & engineering'],
    toolsLabel: 'Stack',
    tools: ['TypeScript', 'React · Vite', 'Express · Drizzle', 'PostgreSQL', 'Better Auth', 'Cloudflare'],
  },

  next: 'adunyato',
})
