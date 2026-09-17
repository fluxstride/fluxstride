import { defineCaseStudy } from '../schema'

/**
 * STARTER TEMPLATE · SEO
 * Design: "Case Study Template — SEO" in the Pencil file.
 * Example of a finished page: "Case Study — SEO & Growth" (Atlas Freight).
 *
 * Copy it with `pnpm new:case-study seo <slug>`.
 * Guide: docs/case-studies.md
 */
export default defineCaseStudy({
  slug: 'template-seo',
  status: 'draft',
  service: 'seo',
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
      legend: ['Before', 'After'],
      points: [26, 27, 25, 28, 31, 38, 47, 50, 62, 74, 87, 100].map((value) => ({
        label: '[Mon]',
        value,
        display: '[0,000] sessions',
      })),
      changeAt: 4,
      markerLabel: 'Start',
      source: 'Source: Google Search Console · [country] · clicks from organic search',
    },
    // RANKINGS: five to eight keywords with buying intent. Same country and device before
    // and after; name the source tool.
    {
      kind: 'table',
      label: 'Rankings',
      title: ['[The keywords', 'that bring leads.]'],
      intro: '[Commercial terms that now rank, not vanity keywords.]',
      columns: [
        { key: 'keyword', label: 'Keyword', width: 'fill', emphasis: 'strong' },
        { key: 'volume', label: 'Searches / month', emphasis: 'muted' },
        { key: 'before', label: 'Before', width: 'sm', emphasis: 'muted' },
        { key: 'after', label: 'After', width: 'sm' },
        { key: 'change', label: 'Change', width: 'sm' },
      ],
      rows: [1, 2, 3, 4, 5].map(() => ({
        keyword: '[keyword phrase]',
        volume: '[0,000]',
        before: '[00]',
        after: { tag: '#[0]' },
        change: '[+00 places]',
      })),
      source: 'Source: [tool] · [country] · [Month Year] vs [Month Year]',
    },
    // TECHNICAL: four to six fixes, biggest impact first, each explained in one sentence.
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
      stats: [
        { value: '[0.0s]', label: 'Largest Contentful Paint', detail: '[Was 0.0s]' },
        { value: '[000ms]', label: 'Interaction to Next Paint', detail: '[Was 000ms]' },
        { value: '[0.00]', label: 'Cumulative Layout Shift', detail: '[Was 0.00]' },
      ],
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
