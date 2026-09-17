import { defineCaseStudy } from '../schema'

/**
 * STARTER TEMPLATE · Website rebuild
 * Design: "Case Study Template — Website rebuild" in the Pencil file.
 * Example of a finished page: "Case Study — SEO & Growth" (Atlas Freight).
 *
 * Copy it with `pnpm new:case-study website-rebuild <slug>`.
 * Guide: docs/case-studies.md
 */
export default defineCaseStudy({
  slug: 'template-website-rebuild',
  status: 'draft',
  services: ['web-design-frontend', 'backend-development'],
  discipline: 'Website rebuild',
  client: '[Client name]',
  industry: '[Industry]',
  year: 0,

  seo: {
    title: '[Client]: [the result in a few words]',
    description:
      '[Lead with the result, then say what we did and for whom. 140–160 characters so Google shows it in full.]',
  },

  // HERO: e.g. ['From page five', 'to first choice.']
  hero: {
    title: ['[Outcome-led headline,', 'one italic phrase.]'],
    intro:
      '[Who the client is, what was holding them back and what we delivered. Two or three sentences, 45 words max. Lead with the outcome.]',
    facts: [
      ['Client', '[Client name]'],
      ['Industry', '[Industry]'],
      ['Services', '[Services delivered]'],
      ['Timeline', '[00 months · YEAR]'],
      ['Audit', '[0,000 URLs crawled]'],
      ['Content', '[00 articles · 0 pillars]'],
    ],
    media: {
      image: null,
      alt: '[What the image shows]',
      brief: 'Hero image · abstract growth visual or search result · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '[12 months]',
    summary: "[One sentence on the business impact, in the client's own terms.]",
    stats: [
      { value: '[+000%]', label: '[Organic sessions per month]', detail: '[Month Year → Month Year]' },
      { value: '[000]', label: '[Commercial keywords on page one]', detail: '[Was 00]' },
      { value: '[£0.0m]', label: '[Pipeline from organic search]', detail: '[Tracked in CRM]' },
      { value: '[−00%]', label: '[Cost per lead]', detail: '[Vs paid search]' },
    ],
  },

  challenge: {
    title: '[The problem, in one line.]',
    paragraphs: [
      '[Why the client was hard to find and what it cost them. Quote the client where you can. 60–90 words.]',
    ],
    points: ['[Symptom one, with a number if possible]', '[Symptom two]', '[Symptom three]'],
  },
  approach: {
    title: '[How we solved it, in one line.]',
    paragraphs: [
      '[The phases of the work and how we measured success. 60–90 words.]',
      '[Optional: the turning point or insight that changed direction.]',
    ],
  },

  sections: [
    // TRAFFIC: 12 months of organic clicks from Search Console. Mark the start month.
    {
      kind: 'chart',
      label: 'Organic traffic',
      title: ['[How much', 'traffic grew.]'],
      intro: '[Monthly organic sessions and what drove the growth.]',
      kpi: { value: '[00,000]', label: 'Organic sessions / month', detail: '[+000%]' },
      legend: ['Old site', 'New site'],
      points: [26, 27, 25, 28, 31, 38, 47, 50, 62, 74, 87, 100].map((value, i) => ({
        label: '[Mon]',
        value,
        display: '[0,000] sessions',
        // The latest month's figure, shown over its column on desktop.
        callout: i === 11 ? '[00.0K]' : undefined,
      })),
      changeAt: 4,
      markerLabel: 'Start',
      source: 'Source: Google Search Console · [country] · clicks from organic search',
    },
    // RANKINGS: five to eight keywords with buying intent. Same country and device before
    // and after; name the source tool.
    {
      kind: 'rankings',
      label: 'Rankings',
      title: ['[The keywords', 'that bring leads.]'],
      intro: '[Commercial terms that now rank, not vanity keywords.]',
      rows: [1, 2, 3, 4, 5, 6].map(() => ({
        keyword: '[keyword phrase]',
        volume: '[0,000]',
        before: '[00]',
        after: '#[0]',
        change: '[+00 places]',
      })),
      source: 'Source: [tool] · [country] · [Month Year] vs [Month Year]',
    },
    // TECHNICAL: four to six fixes, biggest impact first, each explained in one sentence.
    // The panel shows Core Web Vitals from the Chrome UX Report (mobile, 75th percentile).
    {
      kind: 'checklist',
      tone: 'ink',
      columns: 1,
      label: 'Technical SEO',
      title: ['[What we fixed', 'under the hood.]'],
      items: [
        { title: '[Fix name]', body: '[What we changed and why it mattered.]', tag: '[High impact]' },
        { title: '[Fix name]', body: '[What we changed and why it mattered.]', tag: '[High impact]' },
        { title: '[Fix name]', body: '[What we changed and why it mattered.]', tag: '[Medium]' },
        { title: '[Fix name]', body: '[What we changed and why it mattered.]', tag: '[Medium]' },
      ],
      panel: {
        label: 'Core Web Vitals · Mobile · 75th percentile',
        metrics: [
          { name: 'Largest Contentful Paint', value: '[0.0s]', before: '[0.0s]', status: 'Good', score: 80 },
          {
            name: 'Interaction to Next Paint',
            value: '[000ms]',
            before: '[000ms]',
            status: 'Good',
            score: 80,
          },
          { name: 'Cumulative Layout Shift', value: '[0.00]', before: '[0.00]', status: 'Good', score: 80 },
        ],
        stats: [
          ['[000]', 'Lighthouse SEO'],
          ['[0,000]', 'Clean URLs indexed'],
        ],
      },
    },
    // CONTENT: up to three pillar pages, each with three or four supporting articles.
    {
      kind: 'clusters',
      label: 'Content',
      title: ['[Answering what', 'buyers search for.]'],
      intro: '[The topic clusters we built and how they connect.]',
      clusters: [1, 2, 3].map(() => ({
        pillar: '[Pillar page topic]',
        rank: '#[0]',
        visits: '[0,000]',
        articles: [1, 2, 3].map(() => ({
          title: '[Supporting article title]',
          rank: '#[0]',
          visits: '[0,000]',
        })),
      })),
      stats: [
        { value: '[00]', label: '[articles published in 12 months]' },
        { value: '[00%]', label: '[of organic traffic from the clusters]' },
        { value: '[00]', label: '[featured snippets won]' },
      ],
    },
    // VISIBILITY: share of voice against three or four named competitors, same keyword set
    // both years. Highlight the client.
    {
      kind: 'bars',
      style: 'compare',
      label: 'Visibility',
      title: ['[Share of voice,', 'up 0 times.]'],
      intro: '[How many keywords were tracked, and where the client moved in its market.]',
      legend: ['[2025]', '[2026]'],
      rows: [
        {
          label: '[Client]',
          highlight: true,
          before: { value: 6, display: '[0%]' },
          after: { value: 24, display: '[00%]' },
        },
        ...[1, 2, 3].map(() => ({
          label: '[Competitor]',
          before: { value: 18, display: '[00%]' },
          after: { value: 15, display: '[00%]' },
        })),
        {
          label: 'Everyone else',
          before: { value: 42, display: '[00%]' },
          after: { value: 31, display: '[00%]' },
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
      '[Technical SEO audit]',
      '[Information architecture]',
      '[Content strategy]',
      '[Digital PR]',
      '[Reporting]',
    ],
    team: ['[Name] — [Role]', '[Name] — [Role]', '[Name] — [Role]'],
    tools: ['[e.g. Ahrefs]', '[e.g. Search Console]', '[e.g. Screaming Frog]', '[e.g. GA4]'],
  },
})
