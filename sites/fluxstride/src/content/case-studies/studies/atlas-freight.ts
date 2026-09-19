import { defineCaseStudy } from '../schema'

/**
 * Atlas Freight · Web & frontend, Backend
 * Design: "Case Study: Website Rebuild" (desktop) and "(Mobile)" in the Pencil file.
 *
 * A website rebuild told through its search results: the new server-rendered site is what
 * moved the traffic and rankings.
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
  status: 'draft',
  sample: true,
  services: ['web-design-frontend', 'backend-development'],
  discipline: 'Website rebuild',
  client: 'Atlas Freight',
  industry: 'Logistics',
  year: 2026,

  seo: {
    title: 'Atlas Freight: from page five to first choice',
    description:
      'Organic sessions up 291% and 148 commercial keywords on page one. How we rebuilt Atlas Freight’s website so Google could finally read it.',
  },

  hero: {
    title: ['From page five', 'to first choice.'],
    intro:
      "Atlas Freight had a decade of expertise and a website Google couldn't read. We rebuilt it as a fast, server-rendered site, restructured 6,800 URLs and gave every service and route a page of its own.",
    tags: ['Logistics', 'Website rebuild', '2025–26'],
    facts: [
      ['Client', 'Atlas Freight'],
      ['Industry', 'Logistics · B2B'],
      ['Services', 'Web design, frontend, backend'],
      ['Timeline', '12 months · 2025–26'],
      ['Audit', '6,800 URLs crawled'],
      ['Stack', 'Next.js · Node · Vercel'],
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
      "Organic search became Atlas Freight's biggest source of qualified leads, overtaking paid search in month seven.",
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
      'Paid search was covering the gap: at £84 per lead and rising.',
    ],
    points: [
      'Only 11 commercial keywords on page one',
      '6,800 URLs indexed, most of them duplicates',
      '70% of leads came from paid search',
    ],
  },

  approach: {
    title: 'Rebuild the foundations first.',
    paragraphs: [
      'We ran the work in three phases: a full technical audit, a new server-rendered site on a clean URL structure, and a backend that builds a fast page for every service, route and industry, with reporting tied to leads, not just rankings.',
    ],
  },

  sections: [
    {
      kind: 'chart',
      label: 'Organic traffic',
      title: ['Four times the traffic,', 'same budget.'],
      intro:
        'Monthly organic sessions from Google. The new site launched in September, and growth compounded as Google indexed its new pages.',
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
      label: 'The rebuild',
      title: ['Fix what Google', "couldn't see."],
      items: [
        {
          title: 'Consolidated 4,200 duplicate URLs',
          body: 'Canonicals and 301 redirects for the old quote engine.',
          tag: 'High',
        },
        {
          title: 'Rebuilt the information architecture',
          body: 'Services, routes and industries, any page within three clicks.',
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
  ],

  quote: {
    text: 'Organic search went from an afterthought to our biggest source of qualified leads. We finally show up where our customers are looking.',
    name: 'Marcus Hale',
    role: 'Commercial Director, Atlas Freight',
    initials: 'MH',
  },

  credits: {
    services: [
      'Technical audit',
      'Information architecture',
      'Web design & frontend build',
      'Backend & page generation',
      'Analytics & reporting',
    ],
    team: ['Daniel Mensah, Engineering Lead', 'Leo Park, Frontend Engineer', 'Hannah Cole, Client Partner'],
    tools: ['Next.js', 'Node', 'PostgreSQL', 'Vercel', 'Search Console', 'Screaming Frog'],
    toolsLabel: 'Stack',
  },

  next: 'northwind',
})
