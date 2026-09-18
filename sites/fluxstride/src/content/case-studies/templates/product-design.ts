import { defineCaseStudy } from '../schema'

/**
 * STARTER TEMPLATE · Product design
 * Design: "Case Study Template: Product design" in the Pencil file.
 *
 * Copy it with `pnpm new:case-study product-design <slug>`.
 * Guide: docs/case-studies.md
 */
export default defineCaseStudy({
  slug: 'template-product-design',
  status: 'draft',
  services: ['product-design'],
  discipline: 'Product design',
  client: '[Client name]',
  industry: '[Industry]',
  year: 0,

  seo: {
    title: '[Client]: [the result in a few words]',
    description:
      '[Lead with the result, then say what we designed and for whom. 140–160 characters so Google shows it in full.]',
  },

  // HERO: e.g. ['Five steps', 'became two.']
  hero: {
    title: ['[Outcome-led headline,', 'one italic phrase.]'],
    intro:
      '[Who the client is, what was holding them back and what we delivered. Two or three sentences, 45 words max. Lead with the outcome.]',
    facts: [
      ['Client', '[Client name]'],
      ['Industry', '[Industry]'],
      ['Services', '[Services delivered]'],
      ['Timeline', '[00 weeks · YEAR]'],
      ['Research', '[00 interviews · 0 tests]'],
      ['Deliverables', '[Prototype · design system]'],
    ],
    media: {
      image: null,
      alt: '[What the image shows]',
      brief: 'Hero image · key screen on a device or workshop photo · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '[3 months after release]',
    summary: "[One sentence on the business impact, in the client's own terms.]",
    stats: [
      { value: '[+00%]', label: '[Task success rate]', detail: '[Baseline → now]' },
      { value: '[−00%]', label: '[Time on key task]', detail: '[00s → 00s]' },
      { value: '[+00]', label: '[SUS or NPS score]', detail: '[Was 00]' },
      { value: '[−00%]', label: '[Support tickets]', detail: '[Timeframe]' },
    ],
  },

  challenge: {
    title: '[The problem, in one line.]',
    paragraphs: [
      '[What was going wrong for users and why it mattered to the business. Quote users where you can. 60–90 words.]',
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
    // RESEARCH: three insights, each with a real (anonymised) user quote and what we changed.
    {
      kind: 'cards',
      columns: 3,
      label: 'Research',
      title: ['[What we learned', 'from real users.]'],
      intro: '[Who we spoke to and how.]',
      cards: [1, 2, 3].map((n) => ({
        eyebrow: `Insight 0${n}`,
        title: '[Insight in a few words]',
        quote: '[A direct user quote that captures the insight.]',
        body: '[What this told us and what we changed. 25 words.]',
      })),
      stats: [
        { value: '[00]', label: 'User interviews' },
        { value: '[0]', label: 'Usability tests' },
        { value: '[000]', label: 'Survey responses' },
      ],
    },
    // FLOW: the single most important task. Name each step in the user's words.
    {
      kind: 'flow',
      label: 'User flow',
      title: ['[Fewer steps', 'to get it done.]'],
      intro: '[The key task, before and after the redesign.]',
      before: { label: 'Before · [0] steps', steps: ['[Step]', '[Step]', '[Step]', '[Step]', '[Step]'] },
      after: { label: 'After · [0] steps', steps: ['[Step]', '[Step]', '[Step]'] },
    },
    // DESIGN: the same screen as a wireframe and as final UI, both desktop screenshots.
    {
      kind: 'before-after',
      label: 'Design',
      title: ['[From sketch', 'to screen.]'],
      intro: '[How the idea developed through wireframes and testing.]',
      frame: 'browser',
      before: {
        label: 'Wireframe',
        media: {
          image: null,
          alt: '[Low-fidelity wireframe of the key screen]',
          brief: 'Low-fidelity wireframe · desktop',
          aspect: 620 / 420,
        },
        metrics: [],
      },
      after: {
        label: 'Final UI',
        media: {
          image: null,
          alt: '[The final design of the key screen]',
          brief: 'Final UI screenshot · desktop',
          aspect: 620 / 420,
        },
        metrics: [],
      },
    },
    // TESTING: task success for the same tasks before and after. Say how many took part.
    {
      kind: 'bars',
      tone: 'ink',
      label: 'Usability testing',
      title: ['[Proven with', 'real users.]'],
      legend: ['Before', 'After'],
      rows: [
        {
          label: '[Task one]',
          before: { value: 42, display: '[00%]' },
          after: { value: 92, display: '[00%]' },
        },
        {
          label: '[Task two]',
          before: { value: 55, display: '[00%]' },
          after: { value: 90, display: '[00%]' },
        },
        {
          label: '[Task three]',
          before: { value: 30, display: '[00%]' },
          after: { value: 86, display: '[00%]' },
        },
        {
          label: '[Task four]',
          before: { value: 61, display: '[00%]' },
          after: { value: 95, display: '[00%]' },
        },
      ],
      source: '[00] participants · [moderated / unmoderated] · [Month Year]',
    },
    // DESIGN SYSTEM: eight component crops (buttons, forms, cards, navigation…).
    {
      kind: 'gallery',
      label: 'Design system',
      title: ['[One system,', 'every screen.]'],
      intro: '[What the design system covers and who uses it.]',
      frame: 'plain',
      columns: 4,
      items: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
        media: { image: null, alt: '[Component name]', brief: `[Component 0${n}]` },
      })),
      stats: [
        { value: '[00]', label: 'Components' },
        { value: '[00]', label: 'Design tokens' },
        { value: '[0]', label: 'Themes' },
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
      '[User research]',
      '[UX strategy]',
      '[Interaction design]',
      '[UI design]',
      '[Usability testing]',
    ],
    team: ['[Name], [Role]', '[Name], [Role]', '[Name], [Role]'],
    tools: ['[e.g. Figma]', '[e.g. Maze]', '[e.g. Dovetail]', '[e.g. Hotjar]'],
  },
})
