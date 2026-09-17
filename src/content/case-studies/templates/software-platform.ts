import { LayoutDashboard, ShieldCheck, Zap } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * STARTER TEMPLATE · Software platform
 * Design: "Case Study Template — Software platform" in the Pencil file.
 * Example of a finished page: "Case Study — Software Platform" (Northwind).
 *
 * Copy it with `pnpm new:case-study software-platform <slug>`, then replace every
 * [bracketed] value and every `image: null`. Delete any section that doesn't apply.
 * Guide: docs/case-studies.md
 */
export default defineCaseStudy({
  slug: 'template-software-platform',
  status: 'draft',
  services: ['backend-development', 'web-design-frontend'],
  discipline: 'Software platform',
  client: '[Client name]',
  industry: '[Industry]',
  year: 0,

  seo: {
    title: '[Client]: [the result in a few words]',
    description:
      '[Lead with the result, then say what we built and for whom. 140–160 characters so Google shows it in full.]',
  },

  // HERO: state the result in plain words, max 8 words, plus one italic phrase.
  // e.g. ['A portal customers', 'actually use.']. Keep six facts; relabel any that don't fit.
  hero: {
    title: ['[Outcome-led headline,', 'one italic phrase.]'],
    intro:
      '[Who the client is, what was holding them back and what we delivered. Two or three sentences, 45 words max. Lead with the outcome.]',
    facts: [
      ['Client', '[Client name]'],
      ['Industry', '[Industry]'],
      ['Services', '[Services delivered]'],
      ['Timeline', '[00 weeks · YEAR]'],
      ['Platform', '[Web app · API]'],
      ['Team', '[0 specialists]'],
    ],
    media: {
      image: null,
      alt: '[What the photo shows]',
      brief: 'Hero image · product in use or team context · 2880×1520',
    },
    frame: 'plain',
  },

  // RESULTS: four measurable outcomes. Always give the baseline and timeframe.
  // Get the client's written approval before publishing any figure.
  results: {
    timeframe: '[First 12 months]',
    summary: "[One sentence on the business impact, in the client's own terms.]",
    stats: [
      { value: '[+00%]', label: '[Active users / adoption]', detail: '[Baseline → now]' },
      { value: '[00h]', label: '[Time saved per week]', detail: '[For whom]' },
      { value: '[0.0×]', label: '[Faster process or releases]', detail: '[Compared with]' },
      { value: '[£0.0m]', label: '[Revenue or cost impact]', detail: '[Timeframe]' },
    ],
  },

  // STORY: challenge, then approach. Write for a non-technical buyer. Three bullets max.
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
    // PROCESS: four phases max. Name each and give its length (meta).
    {
      kind: 'steps',
      variant: 'phases',
      label: 'Process',
      title: ['[How we ran', 'the project.]'],
      intro: '[One or two sentences on the delivery approach.]',
      steps: [
        {
          title: '[Discovery]',
          meta: '[0 weeks]',
          body: '[What happened and its key deliverable. 20–30 words.]',
        },
        {
          title: '[Design]',
          meta: '[0 weeks]',
          body: '[What happened and its key deliverable. 20–30 words.]',
        },
        {
          title: '[Build]',
          meta: '[0 weeks]',
          body: '[What happened and its key deliverable. 20–30 words.]',
        },
        {
          title: '[Launch]',
          meta: '[0 weeks]',
          body: '[What happened and its key deliverable. 20–30 words.]',
        },
      ],
    },
    // PRODUCT: one hero screen at desktop size (2560×1200). On phones it stays a
    // scaled-down desktop screenshot; don't redesign it.
    {
      kind: 'screenshot',
      label: 'The product',
      title: ['[What the product', 'makes easy.]'],
      intro: '[What the screenshot shows and who uses it.]',
      frame: 'browser',
      media: {
        image: null,
        alt: '[Describe the screen: what data and actions are visible]',
        brief: 'Product screenshot · desktop 2560×1200',
        aspect: 2560 / 1200,
      },
      features: [
        {
          icon: LayoutDashboard,
          title: '[Feature name]',
          body: '[What it does and why it matters to users.]',
        },
        { icon: Zap, title: '[Feature name]', body: '[What it does and why it matters to users.]' },
        { icon: ShieldCheck, title: '[Feature name]', body: '[What it does and why it matters to users.]' },
      ],
    },
    // ARCHITECTURE: plain-language layers. Name the tech in chips; explain the benefit
    // in the reliability stats underneath.
    {
      kind: 'cards',
      tone: 'ink',
      columns: 3,
      label: 'Architecture',
      title: ["[How it's built", 'to last.]'],
      cards: [
        {
          eyebrow: 'Layer 01',
          title: '[Frontend]',
          body: '[What this layer does, in one sentence.]',
          chips: ['[Tech]', '[Tech]', '[Tech]'],
        },
        {
          eyebrow: 'Layer 02',
          title: '[Services & API]',
          body: '[What this layer does, in one sentence.]',
          chips: ['[Tech]', '[Tech]', '[Tech]'],
        },
        {
          eyebrow: 'Layer 03',
          title: '[Data & infrastructure]',
          body: '[What this layer does, in one sentence.]',
          chips: ['[Tech]', '[Tech]', '[Tech]'],
        },
      ],
      stats: [
        { value: '[00ms]', label: 'P95 response time' },
        { value: '[99.9%]', label: 'Uptime' },
        { value: '[00]', label: 'Releases per month' },
      ],
    },
  ],

  // QUOTE: one or two sentences about the outcome, approved in writing.
  quote: {
    text: '[A short quote from the client about the result, in their own words.]',
    name: '[Full name]',
    role: '[Role, Company]',
    initials: '[AB]',
  },

  // CREDITS: services actually delivered, the core team and up to six tools.
  credits: {
    services: [
      '[Discovery & scoping]',
      '[Product design]',
      '[Frontend engineering]',
      '[Backend & API]',
      '[QA & DevOps]',
    ],
    team: ['[Name] — [Role]', '[Name] — [Role]', '[Name] — [Role]'],
    tools: ['[e.g. React]', '[e.g. Node.js]', '[e.g. PostgreSQL]', '[e.g. AWS]'],
  },
})
