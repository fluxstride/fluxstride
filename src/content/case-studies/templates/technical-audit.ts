import { defineCaseStudy } from '../schema'

/**
 * STARTER TEMPLATE · Technical audit
 * Design: "Case Study Template — Technical audit" in the Pencil file.
 *
 * Copy it with `pnpm new:case-study technical-audit <slug>`.
 * Guide: docs/case-studies.md
 */
export default defineCaseStudy({
  slug: 'template-technical-audit',
  status: 'draft',
  services: ['cloud-devops', 'backend-development'],
  discipline: 'Technical audit',
  client: '[Client name]',
  industry: '[Industry]',
  year: 0,

  seo: {
    title: '[Client]: [the result in a few words]',
    description:
      '[Lead with the decision or saving, then say what we reviewed and for whom. 140–160 characters so Google shows it in full.]',
  },

  // HERO: e.g. ['The £2m decision,', 'made in six weeks.']
  // Consultancy work is often confidential: agree with the client what can be named.
  hero: {
    title: ['[Outcome-led headline,', 'one italic phrase.]'],
    intro:
      '[Who the client is, the decision they faced and what we delivered. Two or three sentences, 45 words max. Lead with the outcome.]',
    facts: [
      ['Client', '[Client name]'],
      ['Industry', '[Industry]'],
      ['Services', '[Services delivered]'],
      ['Timeline', '[0 weeks · YEAR]'],
      ['Scope', '[0 systems reviewed]'],
      ['Outcome', '[Roadmap · business case]'],
    ],
    media: {
      image: null,
      alt: '[What the image shows]',
      brief: 'Hero image · workshop photo or system map · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '[12 months after the review]',
    summary: "[One sentence on the business impact, in the client's own terms.]",
    stats: [
      { value: '[£000k]', label: '[Cost saved or avoided]', detail: '[Per year]' },
      { value: '[0 → 0]', label: '[Systems consolidated]', detail: '[After 00 months]' },
      { value: '[−00%]', label: '[Running costs]', detail: '[Baseline → now]' },
      { value: '[0 wks]', label: '[From kick-off to decision]', detail: '[Was 0 months]' },
    ],
  },

  challenge: {
    title: '[The decision, in one line.]',
    paragraphs: [
      '[What the client needed to decide, what was at stake and why they asked for outside help. 60–90 words.]',
    ],
    points: ['[Symptom one, with a number if possible]', '[Symptom two]', '[Symptom three]'],
  },
  approach: {
    title: '[How we got to an answer, in one line.]',
    paragraphs: [
      '[Who we interviewed, what we reviewed and how we compared options. 60–90 words.]',
      '[Optional: the turning point or insight that changed direction.]',
    ],
  },

  sections: [
    // AUDIT: score each area 1–5 on the same criteria every time. One finding per area;
    // keep anything confidential out. Risk tags: tone 'risk' for high risk.
    {
      kind: 'table',
      label: 'Audit',
      title: ['[What we found', 'when we looked.]'],
      intro: '[What we reviewed, who we interviewed and how we scored it.]',
      columns: [
        { key: 'area', label: 'Area', emphasis: 'strong' },
        { key: 'score', label: 'Score', width: 'sm' },
        { key: 'finding', label: 'Key finding', width: 'fill', emphasis: 'muted' },
        { key: 'risk', label: 'Risk', width: 'sm' },
      ],
      rows: [
        {
          area: '[Architecture]',
          score: { rating: 2 },
          finding: '[Key finding, in one sentence.]',
          risk: { tag: '[High risk]', tone: 'risk' },
        },
        {
          area: '[Security]',
          score: { rating: 3 },
          finding: '[Key finding, in one sentence.]',
          risk: { tag: '[Medium]' },
        },
        {
          area: '[Scalability]',
          score: { rating: 1 },
          finding: '[Key finding, in one sentence.]',
          risk: { tag: '[High risk]', tone: 'risk' },
        },
        {
          area: '[Delivery process]',
          score: { rating: 4 },
          finding: '[Key finding, in one sentence.]',
          risk: { tag: '[Low]' },
        },
        {
          area: '[Running costs]',
          score: { rating: 2 },
          finding: '[Key finding, in one sentence.]',
          risk: { tag: '[Medium]' },
        },
      ],
    },
    // OPTIONS: two or three real options with honest pros and cons. Highlight the one
    // we recommended and say why in the approach.
    {
      kind: 'cards',
      columns: 3,
      label: 'Options',
      title: ['[The options', 'we weighed up.]'],
      intro: '[How we compared the choices and what we recommended.]',
      cards: [
        ['A', '[Build]', undefined],
        ['B', '[Integrate]', 'Recommended'],
        ['C', '[Buy]', undefined],
      ].map(([letter, kind, highlight]) => ({
        eyebrow: `Option ${letter} · ${kind}`,
        title: '[Option name]',
        highlight,
        facts: [
          ['Cost', '[£000k]'],
          ['Time', '[0 months]'],
          ['Risk', '[Low / Med / High]'],
        ] as [string, string][],
        pros: ['[Advantage]', '[Advantage]'],
        cons: ['[Drawback]'],
      })),
    },
    // ROADMAP: Now / Next / Later. Three initiatives per column max, each with an owner
    // and the outcome it unlocks.
    {
      kind: 'roadmap',
      tone: 'ink',
      label: 'Roadmap',
      title: ['[What happens', 'and when.]'],
      horizons: [
        ['Now', '[0–3 months]'],
        ['Next', '[3–6 months]'],
        ['Later', '[6–12 months]'],
      ].map(([name, when]) => ({
        name,
        when,
        items: [1, 2, 3].map(() => ({ title: '[Initiative]', meta: '[Owner] · [Outcome]' })),
      })),
    },
    // DELIVERABLES: cover or spread images of the main documents. Blur anything confidential.
    {
      kind: 'gallery',
      label: 'Deliverables',
      title: ['[What the client', 'walked away with.]'],
      intro: '[The documents and decisions handed over at the end.]',
      frame: 'plain',
      columns: 3,
      items: ['[Audit report]', '[Architecture proposal]', '[Business case]'].map((caption) => ({
        media: { image: null, alt: `${caption} cover`, brief: 'Document cover or spread · 1600×1200' },
        caption,
        meta: '[00 pages]',
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
      '[Technical due diligence]',
      '[Architecture review]',
      '[Build vs buy analysis]',
      '[Roadmap & business case]',
      '[Vendor selection]',
    ],
    team: ['[Name] — [Role]', '[Name] — [Role]', '[Name] — [Role]'],
    tools: ['[e.g. Miro]', '[e.g. Notion]', '[e.g. Lucidchart]', '[e.g. Excel]'],
  },
})
