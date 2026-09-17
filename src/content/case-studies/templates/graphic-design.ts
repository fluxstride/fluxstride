import { defineCaseStudy } from '../schema'

/**
 * STARTER TEMPLATE · Graphic Design & Branding
 * Design: "Case Study Template — Graphic Design & Branding" in the Pencil file.
 * Example of a finished page: "Case Study — Brand Identity" (Aurora Architects).
 *
 * Copy it with `pnpm new:case-study graphic-design <slug>`.
 * Guide: docs/case-studies.md
 */
export default defineCaseStudy({
  slug: 'template-graphic-design',
  status: 'draft',
  service: 'graphic-design',
  client: '[Client name]',
  industry: '[Industry]',
  year: 0,

  seo: {
    title: '[Client]: [the result in a few words]',
    description:
      '[Lead with the result, then say what we designed and for whom. 140–160 characters so Google shows it in full.]',
  },

  // HERO: e.g. ['An identity built', 'like a building.']
  hero: {
    title: ['[Outcome-led headline,', 'one italic phrase.]'],
    intro:
      '[Who the client is, what was holding them back and what we delivered. Two or three sentences, 45 words max. Lead with the outcome.]',
    facts: [
      ['Client', '[Client name]'],
      ['Industry', '[Industry]'],
      ['Services', '[Services delivered]'],
      ['Timeline', '[00 weeks · YEAR]'],
      ['Deliverables', '[000+ brand assets]'],
      ['Guidelines', '[00-page brand book]'],
    ],
    media: {
      image: null,
      alt: '[What the photo shows]',
      brief: 'Hero image · brand application photography · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '[First year]',
    summary: "[One sentence on the business impact, in the client's own terms.]",
    stats: [
      { value: '[+00%]', label: '[Enquiries or brand awareness]', detail: '[Baseline → now]' },
      { value: '[000+]', label: '[Assets and templates delivered]', detail: '[One system]' },
      { value: '[0]', label: '[Awards or shortlists]', detail: '[Year]' },
      { value: '[−00%]', label: '[Time to produce materials]', detail: '[Before → now]' },
    ],
  },

  challenge: {
    title: '[The problem, in one line.]',
    paragraphs: [
      '[What was wrong with the old brand and why it mattered to the business. Quote the client where you can. 60–90 words.]',
    ],
    points: ['[Symptom one, with a number if possible]', '[Symptom two]', '[Symptom three]'],
  },
  approach: {
    title: '[How we solved it, in one line.]',
    paragraphs: [
      '[Where the idea came from and the key decisions we made. 60–90 words.]',
      '[Optional: the turning point or insight that changed direction.]',
    ],
  },

  sections: [
    // MARK: export flat panels: primary logo on brand colour, on light, reversed, construction grid.
    {
      kind: 'gallery',
      label: 'The mark',
      title: ['[The idea', 'behind the logo.]'],
      intro: '[What the mark represents and where it works.]',
      frame: 'plain',
      columns: 2,
      items: [
        {
          media: {
            image: null,
            alt: '[Primary logo on the brand colour]',
            brief: 'Primary logo on brand colour · 1600×1200',
          },
        },
        {
          media: {
            image: null,
            alt: '[Logo on a light background]',
            brief: 'Logo on light background · 1600×1200',
          },
        },
        { media: { image: null, alt: '[The mark, reversed]', brief: 'Mark · reversed · 1600×1200' } },
        {
          media: {
            image: null,
            alt: '[The construction grid behind the mark]',
            brief: 'Construction grid · 1600×1200',
          },
        },
      ],
    },
    // COLOUR: real hex, RGB and CMYK. The page picks readable text for each swatch.
    {
      kind: 'palette',
      label: 'Colour',
      title: ['[Where the', 'colours come from.]'],
      intro: "[The thinking behind the palette and how it's used.]",
      colours: [1, 2, 3, 4, 5].map(() => ({
        name: '[Colour name]',
        hex: '[#000000]',
        rgb: '[0 0 0]',
        cmyk: '[0 0 0 0]',
      })),
    },
    // TYPE: name both typefaces and show real brand lines, not lorem ipsum.
    {
      kind: 'typography',
      tone: 'ink',
      label: 'Typography',
      title: ['[A voice', 'set with care.]'],
      specimens: [
        {
          role: 'Display',
          typeface: '[Typeface name]',
          sample: '[A brand line set in the display face.]',
          style: 'serif',
        },
        {
          role: 'Text',
          typeface: '[Typeface name]',
          sample: '[A longer sentence showing how body copy reads.]',
          style: 'sans',
        },
      ],
    },
    // APPLICATIONS: real mock-ups or photos of the brand in use, with what was delivered.
    {
      kind: 'gallery',
      label: 'Applications',
      title: ['[The brand', 'in the real world.]'],
      intro: '[Where the identity shows up and the templates the team now uses.]',
      frame: 'plain',
      columns: 3,
      items: [
        {
          media: { image: null, alt: '[Stationery photo]', brief: 'Stationery or packaging photo' },
          caption: '[Stationery]',
          meta: '[00 items]',
        },
        {
          media: { image: null, alt: '[Print application]', brief: 'Print application' },
          caption: '[Print & documents]',
          meta: '[00 templates]',
        },
        {
          media: { image: null, alt: '[Signage in place]', brief: 'Signage or environment' },
          caption: '[Signage]',
          meta: '[00 formats]',
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
      '[Brand strategy]',
      '[Logo & identity]',
      '[Typography & colour]',
      '[Templates & print]',
      '[Brand guidelines]',
    ],
    team: ['[Name] — [Role]', '[Name] — [Role]', '[Name] — [Role]'],
    tools: ['[e.g. Illustrator]', '[e.g. InDesign]', '[e.g. Figma]', '[e.g. Frontify]'],
  },
})
