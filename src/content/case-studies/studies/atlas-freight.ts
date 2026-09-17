import { defineCaseStudy } from '../schema'

/**
 * Atlas Freight · Web & frontend, Backend
 * Design: "Case Study — SEO & Growth" (desktop) and "(Mobile)" in the Pencil file.
 *
 * SAMPLE CONTENT: the client, traffic, rankings, vitals, team credits and quote are invented
 * for the design mockups. Replace them with a real, client-approved project and remove
 * `sample` before launch. Chart values are thousands of sessions, read off the design.
 */
const sessions = [
  ['May', 18.3],
  ['Jun', 19.0],
  ['Jul', 17.7],
  ['Aug', 19.6],
  ['Sep', 22.1],
  ['Oct', 27.5],
  ['Nov', 33.8],
  ['Dec', 36.3],
  ['Jan', 45.0],
  ['Feb', 54.0],
  ['Mar', 62.7],
  ['Apr', 71.9],
] as const

export default defineCaseStudy({
  slug: 'atlas-freight',
  status: 'published',
  sample: true,
  services: ['web-design-frontend', 'backend-development'],
  discipline: 'SEO & growth',
  client: 'Atlas Freight',
  industry: 'Logistics',
  year: 2026,

  seo: {
    title: 'Atlas Freight: from page five to first choice',
    description:
      'Organic sessions up 291% and 148 commercial keywords on page one. How we rebuilt the technical SEO and content behind Atlas Freight’s biggest lead source.',
  },

  hero: {
    title: ['From page five', 'to first choice.'],
    intro:
      "Atlas Freight had a decade of expertise and a website Google couldn't read. We rebuilt the technical foundations, restructured 6,800 URLs and published content that answers what shippers actually search for.",
    tags: ['Logistics', 'SEO & growth', '2025–26'],
    facts: [
      ['Client', 'Atlas Freight'],
      ['Industry', 'Logistics · B2B'],
      ['Services', 'Technical SEO, content, analytics'],
      ['Timeline', '12 months · 2025–26'],
      ['Audit', '6,800 URLs crawled'],
      ['Content', '42 articles, 3 pillars'],
    ],
    media: {
      image: 'case-studies/atlas-freight-cover',
      alt: 'Frosted glass steps rising from left to right, with a blue line climbing over them like a growth chart',
      brief: 'Hero image · abstract 3D render · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '12 months',
    summary:
      "Organic search became Atlas Freight's biggest source of qualified leads — overtaking paid search in month seven.",
    stats: [
      { value: '+291%', label: 'organic sessions per month', detail: 'May 2025 → Apr 2026' },
      { value: '148', label: 'commercial keywords on page one', detail: 'Was 11' },
      { value: '£2.4m', label: 'sales pipeline from organic', detail: 'Tracked in HubSpot' },
      { value: '−62%', label: 'cost per lead', detail: 'vs paid search' },
    ],
  },

  challenge: {
    title: 'Great service, invisible online.',
    paragraphs: [
      'Atlas Freight wins almost every customer it speaks to. The problem was getting found: its site was a JavaScript app Google struggled to index, and its best pages competed with thousands of near-duplicate quote URLs.',
      'Paid search was covering the gap — at £84 per lead and rising.',
    ],
    points: [
      'Only 11 commercial keywords on page one',
      '6,800 URLs indexed, most of them duplicates',
      '70% of leads came from paid search',
    ],
  },

  approach: {
    title: 'Fix the foundations, then publish.',
    paragraphs: [
      'We ran the work in three phases: a full technical audit and rebuild of the site structure, a content programme built around the questions buyers ask before requesting a quote, and monthly reporting tied to leads, not just rankings.',
    ],
  },

  sections: [
    {
      kind: 'chart',
      label: 'Organic traffic',
      title: ['Four times the traffic,', 'same budget.'],
      intro:
        'Monthly organic sessions from Google. The new site launched in September, and growth compounded as new content was indexed.',
      kpi: { value: '71,900', label: 'Organic sessions / month', detail: '+291%' },
      legend: ['Old site', 'New site'],
      points: sessions.map(([label, value], i) => ({
        label,
        value,
        display: `${(value * 1000).toLocaleString('en-GB')} sessions`,
        callout: i === sessions.length - 1 ? `${value}K` : undefined,
      })),
      changeAt: 4,
      markerLabel: 'Relaunch',
      source: 'Source: Google Search Console · UK · clicks from organic search',
    },
    {
      kind: 'rankings',
      label: 'Rankings',
      title: ['Page five to', 'page one.'],
      intro:
        'The keywords that bring in quote requests, not just visits. 148 commercial terms now rank on page one.',
      rows: [
        {
          keyword: 'freight forwarding uk',
          volume: '12,100',
          before: '38',
          after: '#3',
          change: '+35 places',
        },
        { keyword: 'pallet delivery', volume: '22,200', before: '>100', after: '#5', change: '+95 places' },
        {
          keyword: 'container shipping quote',
          volume: '6,600',
          before: '54',
          after: '#2',
          change: '+52 places',
        },
        { keyword: 'same day courier b2b', volume: '4,400', before: '27', after: '#1', change: '+26 places' },
        {
          keyword: 'customs clearance services',
          volume: '8,100',
          before: '61',
          after: '#4',
          change: '+57 places',
        },
        { keyword: 'warehousing leeds', volume: '1,900', before: '15', after: '#1', change: '+14 places' },
      ],
      source: 'Source: Ahrefs rank tracker · UK desktop & mobile · Apr 2025 vs Apr 2026',
    },
    {
      kind: 'checklist',
      tone: 'ink',
      columns: 1,
      label: 'Technical SEO',
      title: ['Fix what Google', "couldn't see."],
      items: [
        {
          title: 'Consolidated 4,200 duplicate URLs',
          body: 'Canonicals and 301 redirects for the old quote engine.',
          tag: 'High',
        },
        {
          title: 'Rebuilt the information architecture',
          body: 'Services, routes and industries — any page within three clicks.',
          tag: 'High',
        },
        {
          title: 'Server-rendered every page',
          body: 'Google now sees the full content, not an empty shell.',
          tag: 'High',
        },
        {
          title: 'Structured data on every template',
          body: 'Organization, Service, FAQ and Breadcrumb schema.',
          tag: 'Medium',
        },
        {
          title: 'Stopped crawl budget waste',
          body: 'Filter pages set to noindex, sitemaps split by type.',
          tag: 'Medium',
        },
        {
          title: 'Automated internal linking',
          body: 'Related-route links across 380 location pages.',
          tag: 'Medium',
        },
      ],
      panel: {
        label: 'Core Web Vitals · Mobile · 75th percentile',
        metrics: [
          { name: 'Largest Contentful Paint', value: '1.6s', before: '4.8s', status: 'Good', score: 86 },
          { name: 'Interaction to Next Paint', value: '120ms', before: '480ms', status: 'Good', score: 90 },
          { name: 'Cumulative Layout Shift', value: '0.02', before: '0.31', status: 'Good', score: 96 },
        ],
        stats: [
          ['100', 'Lighthouse SEO'],
          ['2,140', 'Clean URLs indexed'],
        ],
      },
    },
    {
      kind: 'clusters',
      label: 'Content',
      title: ['Answer the question,', 'own the topic.'],
      intro:
        'Three topic clusters built around the questions shippers ask before they request a quote. Each pillar page links to every article in its cluster.',
      clusters: [
        {
          pillar: 'Exporting to the EU after Brexit',
          rank: '#1',
          visits: '9,800',
          articles: [
            { title: 'EORI numbers explained', rank: '#1', visits: '2,400' },
            { title: 'Incoterms 2020 cheat sheet', rank: '#2', visits: '1,900' },
            { title: 'How long does EU customs take?', rank: '#1', visits: '1,300' },
            { title: 'Commodity codes: a practical guide', rank: '#3', visits: '880' },
          ],
        },
        {
          pillar: 'The pallet shipping handbook',
          rank: '#1',
          visits: '7,200',
          articles: [
            { title: 'Pallet sizes: UK vs EU', rank: '#1', visits: '3,100' },
            { title: 'Full vs half pallet: which is cheaper?', rank: '#2', visits: '1,450' },
            { title: 'How to wrap a pallet for transport', rank: '#1', visits: '1,120' },
            { title: 'Pallet delivery costs in 2026', rank: '#4', visits: '760' },
          ],
        },
        {
          pillar: 'Container shipping for first-time importers',
          rank: '#1',
          visits: '5,600',
          articles: [
            { title: 'FCL vs LCL explained', rank: '#1', visits: '2,050' },
            { title: 'What is demurrage?', rank: '#2', visits: '1,380' },
            { title: 'Shipping container sizes', rank: '#3', visits: '1,210' },
            { title: 'Port delays: what to do', rank: '#1', visits: '690' },
          ],
        },
      ],
      stats: [
        { value: '42', label: 'articles published in 12 months' },
        { value: '31%', label: 'of organic traffic from the clusters' },
        { value: '18', label: 'featured snippets won' },
      ],
    },
    {
      kind: 'bars',
      style: 'compare',
      label: 'Visibility',
      title: ['Share of voice,', 'up four times.'],
      intro:
        'Across 1,200 tracked keywords, Atlas Freight moved from fifth to first in its market — without increasing ad spend.',
      legend: ['2025', '2026'],
      rows: [
        {
          label: 'Atlas Freight',
          highlight: true,
          before: { value: 6, display: '6%' },
          after: { value: 24, display: '24%' },
        },
        { label: 'Freightline', before: { value: 21, display: '21%' }, after: { value: 18, display: '18%' } },
        {
          label: 'Northgate Logistics',
          before: { value: 17, display: '17%' },
          after: { value: 15, display: '15%' },
        },
        { label: 'CargoHub', before: { value: 14, display: '14%' }, after: { value: 12, display: '12%' } },
        {
          label: 'Everyone else',
          before: { value: 42, display: '42%' },
          after: { value: 31, display: '31%' },
        },
      ],
    },
  ],

  quote: {
    text: 'Organic search went from an afterthought to our biggest source of qualified leads. We finally show up where our customers are looking.',
    name: 'Marcus Hale',
    role: 'Commercial Director, Atlas Freight',
    initials: 'MH',
  },

  credits: {
    services: [
      'Technical SEO audit',
      'Information architecture',
      'Content strategy & writing',
      'Structured data',
      'Analytics & reporting',
    ],
    team: ['Leo Park — SEO Lead', 'Daniel Mensah — Engineer', 'Hannah Cole — Client Partner'],
    tools: ['Ahrefs', 'Search Console', 'Screaming Frog', 'GA4', 'Looker Studio', 'Next.js'],
  },

  next: 'northwind',
})
