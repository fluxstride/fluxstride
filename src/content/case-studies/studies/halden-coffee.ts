import { Gift, Mail, Package, Repeat, Wallet, Zap } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * Halden Coffee · Web & frontend (e-commerce), Product design
 * Design: "Case Study — E-commerce" (desktop) and "(Mobile)" in the Pencil file.
 *
 * SAMPLE CONTENT: the client, figures, revenue chart, team credits and quote are invented
 * for the design mockups. Replace them with a real, client-approved project and remove
 * `sample` before launch. Chart values are £k per month, read off the design.
 */
const revenue = [
  ['J', 'January', 7.8, 0.5],
  ['F', 'February', 9.1, 0.6],
  ['M', 'March', 5.2, 3.6],
  ['A', 'April', 6.5, 4.5],
  ['M', 'May', 8.4, 5.8],
  ['J', 'June', 9.8, 6.8],
  ['J', 'July', 11.4, 7.9],
  ['A', 'August', 12.8, 8.9],
  ['S', 'September', 13.8, 9.6],
  ['O', 'October', 15.7, 10.9],
  ['N', 'November', 17.1, 11.9],
  ['D', 'December', 19.3, 13.4],
] as const

export default defineCaseStudy({
  slug: 'halden-coffee',
  status: 'published',
  sample: true,
  services: ['web-design-frontend', 'product-design'],
  discipline: 'E-commerce',
  client: 'Halden Coffee',
  industry: 'Food & drink',
  year: 2026,

  seo: {
    title: 'Halden Coffee: a coffee shop that sells while it sleeps',
    description:
      'Conversion up 2.8× and 41% of revenue from subscriptions. How we rebuilt the Halden Coffee store on Shopify Plus with subscriptions at the centre.',
  },

  hero: {
    title: ['A coffee shop that', 'sells while it sleeps.'],
    intro:
      'Halden roasts some of the best coffee in the north, but its online store was losing customers at checkout. We rebuilt it on Shopify Plus with subscriptions at the centre.',
    tags: ['Specialty coffee', 'E-commerce', 'Shopify Plus', '2026'],
    facts: [
      ['Client', 'Halden Coffee Co.'],
      ['Industry', 'Food & drink · DTC'],
      ['Services', 'E-commerce, UX, CRO, subscriptions'],
      ['Timeline', '9 weeks · 2026'],
      ['Platform', 'Shopify Plus · Recharge'],
      ['Catalogue', '64 products'],
    ],
    media: {
      image: 'case-studies/halden-coffee-hero',
      alt: 'Four bags of Halden coffee from Ethiopia, Colombia, Kenya and Guatemala on a stone plinth in warm morning light',
      brief: 'Hero image · product photography · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '6 months after relaunch',
    summary: 'More visitors buy, more buyers subscribe, and the store now brings in a third of the business.',
    stats: [
      { value: '2.8×', label: 'online conversion rate', detail: '1.4% → 3.9%' },
      { value: '+164%', label: 'monthly online revenue', detail: 'Year on year' },
      { value: '41%', label: 'of revenue from subscriptions', detail: 'Was 6%' },
      { value: '−38%', label: 'checkout abandonment', detail: 'First 90 days' },
    ],
  },

  challenge: {
    title: 'Great coffee, leaky checkout.',
    paragraphs: [
      "Customers loved Halden's coffee, but only 1.4% of visitors bought anything, and most reorders happened by email to the roastery. Subscriptions existed, but were buried three clicks deep.",
    ],
    points: [
      '5-page checkout with forced account creation',
      'Subscriptions hidden behind a separate app',
      'Slow product pages on mobile — 71% of traffic',
    ],
  },

  approach: {
    title: 'Make the second bag automatic.',
    paragraphs: [
      'We analysed 18 months of orders and found 42% of repeat buyers reordered the same coffee within five weeks. So subscribe-and-save became the default choice on every product page.',
      'Then we rebuilt checkout as a single page with Shop Pay and Apple Pay, and tuned every product page for mobile speed.',
    ],
  },

  sections: [
    {
      kind: 'screenshot',
      label: 'Product page',
      title: ['Designed for', 'the second bag.'],
      intro: 'Tasting notes first, grind options clear, and subscribe-and-save chosen by default.',
      frame: 'browser',
      media: {
        image: 'case-studies/halden-coffee-product',
        alt: 'Product page for Kenya Nyeri AA: tasting notes of blackcurrant, grapefruit and brown sugar, a grind choice, subscribe and save 15% selected at £12.33, and an Add to bag button',
        brief: 'Website screenshot · product page · 2560×1306',
        url: 'haldencoffee.example/kenya-nyeri-aa',
      },
    },
    {
      kind: 'bars',
      label: 'Conversion',
      title: ['Every step', 'converts better.'],
      intro: 'Share of all sessions reaching each step, same 3-month period before and after launch.',
      legend: ['Before', 'After'],
      rows: [
        {
          label: 'Product views',
          before: { value: 58, display: '58%' },
          after: { value: 71, display: '71%' },
        },
        {
          label: 'Add to bag',
          before: { value: 9.8, display: '9.8%' },
          after: { value: 16.4, display: '16.4%' },
        },
        {
          label: 'Reached checkout',
          before: { value: 5.1, display: '5.1%' },
          after: { value: 11.2, display: '11.2%' },
        },
        {
          label: 'Purchased',
          before: { value: 1.4, display: '1.4%' },
          after: { value: 3.9, display: '3.9%' },
        },
      ],
    },
    {
      kind: 'chart',
      tone: 'ink',
      label: 'Revenue',
      title: ['Subscriptions', 'changed the curve.'],
      intro: 'Monthly online revenue, in £k. Relaunch in March.',
      legend: ['Before relaunch', 'One-off orders'],
      stackLabel: 'Subscriptions',
      changeAt: 2,
      points: revenue.map(([label, month, oneOff, subscriptions]) => ({
        label,
        value: oneOff,
        stack: subscriptions,
        display: `${month}: £${oneOff}k one-off, £${subscriptions}k subscriptions`,
      })),
    },
    {
      kind: 'features',
      label: 'Checkout',
      title: ['Five pages', 'became one.'],
      style: 'cards',
      tint: { background: '#EFE4D4', icon: '#6B3F24' },
      features: [
        {
          icon: Zap,
          title: 'One-page checkout',
          body: 'Guest checkout by default, with address lookup and saved details.',
        },
        {
          icon: Wallet,
          title: 'Express payments',
          body: 'Shop Pay, Apple Pay, Google Pay and Klarna — 64% of orders now use one.',
        },
        {
          icon: Repeat,
          title: 'Subscriptions that flex',
          body: 'Skip, swap coffees or change frequency from one email link.',
        },
        {
          icon: Gift,
          title: 'Gifting built in',
          body: 'Gift subscriptions with scheduled delivery and a personal note.',
        },
        {
          icon: Package,
          title: 'Local delivery',
          body: 'Roasted Monday, delivered Wednesday with live tracking.',
        },
        {
          icon: Mail,
          title: 'Klaviyo flows',
          body: 'Brew guides, reorder nudges and win-back emails, automated.',
        },
      ],
    },
  ],

  quote: {
    text: "Subscriptions went from an afterthought to 41% of our revenue. We're roasting to plan instead of guessing.",
    name: 'Tom Reyes',
    role: 'Founder, Halden Coffee Co.',
    initials: 'TR',
  },

  credits: {
    services: [
      'E-commerce strategy',
      'UX & conversion design',
      'Shopify Plus build',
      'Subscription setup',
      'Email automation',
    ],
    team: ['Priya Raman — Design Lead', 'Leo Park — Engineer', 'Hannah Cole — Client Partner'],
    tools: ['Shopify Plus', 'Recharge', 'Klaviyo', 'Shop Pay', 'Hotjar', 'GA4'],
    toolsLabel: 'Stack',
  },

  next: 'aurora-architects',
})
