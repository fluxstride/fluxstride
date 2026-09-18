import { Globe, Layers, PenLine } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * STARTER TEMPLATE · Website
 * Design: "Case Study Template: Website" in the Pencil file.
 * Example of a finished page: "Case Study: Website" (Kinetic Labs).
 *
 * Copy it with `pnpm new:case-study website <slug>`.
 * Guide: docs/case-studies.md
 */
export default defineCaseStudy({
  slug: 'template-website',
  status: 'draft',
  services: ['web-design-frontend', 'product-design'],
  discipline: 'Website',
  client: '[Client name]',
  industry: '[Industry]',
  year: 0,

  seo: {
    title: '[Client]: [the result in a few words]',
    description:
      '[Lead with the result, then say what we built and for whom. 140–160 characters so Google shows it in full.]',
  },

  // HERO: e.g. ['A website that finally', 'sells the product.']
  // The hero is the new homepage as a desktop screenshot. Phones show it scaled down.
  hero: {
    title: ['[Outcome-led headline,', 'one italic phrase.]'],
    intro:
      '[Who the client is, what was holding them back and what we delivered. Two or three sentences, 45 words max. Lead with the outcome.]',
    facts: [
      ['Client', '[Client name]'],
      ['Industry', '[Industry]'],
      ['Services', '[Services delivered]'],
      ['Timeline', '[00 weeks · YEAR]'],
      ['Pages', '[00 pages · 00 templates]'],
      ['Stack', '[CMS · framework]'],
    ],
    media: {
      image: null,
      alt: '[The new homepage: describe the headline and main visual]',
      brief: 'Homepage screenshot · desktop 2560×1440 (keep the desktop view on mobile)',
      aspect: 16 / 9,
    },
    frame: 'browser',
  },

  // RESULTS: four measurable outcomes with baseline and timeframe; client-approved.
  results: {
    timeframe: '[First 6 months]',
    summary: "[One sentence on the business impact, in the client's own terms.]",
    stats: [
      { value: '[+00%]', label: '[Conversion rate]', detail: '[Baseline → now]' },
      { value: '[0.0s]', label: '[Page load time]', detail: '[Was 0.0s]' },
      { value: '[+00%]', label: '[Organic traffic]', detail: '[Timeframe]' },
      { value: '[−00%]', label: '[Bounce rate]', detail: '[Baseline → now]' },
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
    // BEFORE / AFTER: same page (usually the homepage), same crop. Both stay
    // desktop screenshots on mobile.
    {
      kind: 'before-after',
      label: 'Redesign',
      title: ['[What changed,', 'in one phrase.]'],
      intro: '[Summarise the difference between the old and new site.]',
      frame: 'browser',
      before: {
        label: 'Before · [Year]',
        media: {
          image: null,
          alt: '[The old homepage]',
          brief: 'Old site · desktop screenshot',
          aspect: 620 / 420,
        },
        metrics: [
          { value: '[00]', label: '[Metric]' },
          { value: '[00]', label: '[Metric]' },
          { value: '[00]', label: '[Metric]' },
        ],
      },
      after: {
        label: 'After · [Year]',
        media: {
          image: null,
          alt: '[The new homepage]',
          brief: 'New site · desktop screenshot',
          aspect: 620 / 420,
        },
        metrics: [
          { value: '[00]', label: '[Metric]' },
          { value: '[00]', label: '[Metric]' },
          { value: '[00]', label: '[Metric]' },
        ],
      },
    },
    // TEMPLATES: six page thumbnails from the desktop design, cropped to the top of the page.
    {
      kind: 'gallery',
      label: 'Templates',
      title: ['[00 pages,', '00 templates.]'],
      intro: '[How the page templates and CMS blocks fit together.]',
      frame: 'plain',
      columns: 3,
      items: [1, 2, 3, 4, 5, 6].map((n) => ({
        media: { image: null, alt: '[Page template name]', brief: '[Page thumbnail]' },
        caption: '[Template name]',
        meta: `0${n}`,
      })),
    },
    // PERFORMANCE: Lighthouse scores from mobile tests, plus Core Web Vitals before and after.
    {
      kind: 'scores',
      tone: 'ink',
      label: 'Performance',
      title: ['[Fast on every', 'device.]'],
      scores: [
        { value: '[00]', label: 'Performance' },
        { value: '[00]', label: 'Accessibility' },
        { value: '[00]', label: 'Best practices' },
        { value: '[00]', label: 'SEO' },
      ],
      vitals: [
        { name: 'LCP', before: '[0.0s]', after: '[0.0s]' },
        { name: 'INP', before: '[000ms]', after: '[000ms]' },
        { name: 'CLS', before: '[0.00]', after: '[0.00]' },
      ],
    },
    // EDITING: three things the client's team can now do themselves.
    {
      kind: 'features',
      label: 'Editing',
      title: ['[Easy for the team', 'to update.]'],
      intro: "[How the client's team manages content now.]",
      features: [
        { icon: PenLine, title: '[CMS feature]', body: '[What it does and why it matters to the team.]' },
        { icon: Layers, title: '[CMS feature]', body: '[What it does and why it matters to the team.]' },
        { icon: Globe, title: '[CMS feature]', body: '[What it does and why it matters to the team.]' },
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
      '[UX & information architecture]',
      '[Web design]',
      '[Development]',
      '[CMS setup]',
      '[SEO migration]',
    ],
    team: ['[Name], [Role]', '[Name], [Role]', '[Name], [Role]'],
    tools: ['[e.g. Next.js]', '[e.g. Sanity]', '[e.g. Vercel]', '[e.g. Figma]'],
  },
})
