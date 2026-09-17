import { CreditCard, Package, Repeat, Search, ShoppingBag, Truck } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * STARTER TEMPLATE · E-commerce
 * Design: "Case Study Template — E-commerce" in the Pencil file.
 * Example of a finished page: "Case Study — E-commerce" (Halden Coffee).
 *
 * Copy it with `pnpm new:case-study e-commerce <slug>`.
 * Guide: docs/case-studies.md
 */
export default defineCaseStudy({
  slug: 'template-e-commerce',
  status: 'draft',
  service: 'e-commerce',
  client: '[Client name]',
  industry: '[Industry]',
  year: 0,

  seo: {
    title: '[Client]: [the result in a few words]',
    description:
      '[Lead with the result, then say what we built and for whom. 140–160 characters so Google shows it in full.]',
  },

  // HERO: e.g. ['From coffee shop', 'to online bestseller.']
  hero: {
    title: ['[Outcome-led headline,', 'one italic phrase.]'],
    intro:
      '[Who the client is, what was holding them back and what we delivered. Two or three sentences, 45 words max. Lead with the outcome.]',
    facts: [
      ['Client', '[Client name]'],
      ['Industry', '[Industry]'],
      ['Services', '[Services delivered]'],
      ['Timeline', '[00 weeks · YEAR]'],
      ['Platform', '[e.g. Shopify Plus]'],
      ['Catalogue', '[000 products · 0 markets]'],
    ],
    media: {
      image: null,
      alt: '[What the photo shows]',
      brief: 'Hero image · product or packaging photography · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '[First 12 months]',
    summary: "[One sentence on the business impact, in the client's own terms.]",
    stats: [
      { value: '[+00%]', label: '[Conversion rate]', detail: '[Baseline → now]' },
      { value: '[+00%]', label: '[Average order value]', detail: '[£00 → £00]' },
      { value: '[£0.0m]', label: '[Online revenue]', detail: '[Timeframe]' },
      { value: '[−00%]', label: '[Checkout abandonment]', detail: '[Baseline → now]' },
    ],
  },

  challenge: {
    title: '[The problem, in one line.]',
    paragraphs: [
      '[What was going wrong and why it mattered to the business. Quote the client where you can. 60–90 words.]',
    ],
    points: ['[Symptom one, with a number if possible]', '[Symptom two]', '[Symptom three]'],
  },
  approach: {
    title: '[How we solved it, in one line.]',
    paragraphs: [
      '[The key decisions we made and why: who was involved, how long it took and what we ruled out. 60–90 words.]',
      '[Optional: the turning point or insight that changed direction.]',
    ],
  },

  sections: [
    // STORE: product page screenshot at desktop size. It stays a desktop screenshot on mobile.
    {
      kind: 'screenshot',
      label: 'The store',
      title: ['[What makes it', 'easy to buy.]'],
      intro: '[The pages and features that drive sales.]',
      frame: 'browser',
      media: {
        image: null,
        alt: '[The product page: product, price and add-to-basket]',
        brief: 'Product page screenshot · desktop 2560×1400',
        aspect: 2560 / 1400,
      },
      features: [
        { icon: Search, title: '[Feature name]', body: '[What it does and why it matters to shoppers.]' },
        {
          icon: ShoppingBag,
          title: '[Feature name]',
          body: '[What it does and why it matters to shoppers.]',
        },
        { icon: Truck, title: '[Feature name]', body: '[What it does and why it matters to shoppers.]' },
      ],
    },
    // FUNNEL: same date range before and after (e.g. 90 days each). `value` is the bar
    // length (0–100); `display` is the real figure shown beside it.
    {
      kind: 'bars',
      label: 'Conversion',
      title: ['[Fewer drop-offs', 'at every step.]'],
      intro: '[Where shoppers were leaving and what we changed.]',
      legend: ['Before', 'After'],
      rows: [
        {
          label: '[Viewed a product]',
          before: { value: 100, display: '[100%]' },
          after: { value: 100, display: '[100%]' },
        },
        {
          label: '[Added to basket]',
          before: { value: 34, display: '[00%]' },
          after: { value: 46, display: '[00%]' },
        },
        {
          label: '[Started checkout]',
          before: { value: 18, display: '[00%]' },
          after: { value: 30, display: '[00%]' },
        },
        {
          label: '[Placed an order]',
          before: { value: 6, display: '[00%]' },
          after: { value: 14, display: '[00%]' },
        },
      ],
      source: 'Source: [analytics tool] · [date range]',
    },
    // REVENUE: 12 months of online revenue. `changeAt` marks the launch month.
    {
      kind: 'chart',
      tone: 'ink',
      label: 'Revenue',
      title: ['[Growth that', 'keeps compounding.]'],
      kpi: { value: '[£0.0m]', label: 'Online revenue · 12 months', detail: '[+00%] year on year' },
      legend: ['Old store', 'New store'],
      points: [30, 32, 35, 34, 40, 48, 55, 60, 70, 78, 88, 100].map((value, i) => ({
        label: `M${String(i + 1).padStart(2, '0')}`,
        value,
        display: '[£00k]',
      })),
      changeAt: 4,
      markerLabel: 'Launch',
    },
    // CHECKOUT: three changes linked to the funnel results above.
    {
      kind: 'features',
      label: 'Checkout',
      title: ['[Paying takes', 'seconds.]'],
      intro: '[What changed in basket, checkout and delivery.]',
      features: [
        {
          icon: CreditCard,
          title: '[Payment feature]',
          body: '[What it does and why it matters to shoppers.]',
        },
        {
          icon: Repeat,
          title: '[Subscription / repeat order]',
          body: '[What it does and why it matters to shoppers.]',
        },
        {
          icon: Package,
          title: '[Delivery feature]',
          body: '[What it does and why it matters to shoppers.]',
        },
      ],
    },
  ],

  quote: {
    text: '[A short quote from the client about the result, in their own words.]',
    name: '[Full name]',
    role: '[Role, Company]',
    initials: '[AB]',
  },

  credits: {
    services: [
      '[E-commerce strategy]',
      '[Store design]',
      '[Platform development]',
      '[Integrations]',
      '[Conversion optimisation]',
    ],
    team: ['[Name] — [Role]', '[Name] — [Role]', '[Name] — [Role]'],
    tools: ['[e.g. Shopify Plus]', '[e.g. Klaviyo]', '[e.g. Stripe]', '[e.g. GA4]'],
  },
})
