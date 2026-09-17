import { defineCaseStudy } from '../schema'

/**
 * Aurora Architects · Graphic Design
 * Design: "Case Study — Brand Identity" (desktop) and "(Mobile)" in the Pencil file.
 *
 * SAMPLE CONTENT: the client, identity, figures, team credits and quote are invented for the
 * design mockups. Replace them with a real, client-approved project and remove `sample`
 * before launch.
 */
export default defineCaseStudy({
  slug: 'aurora-architects',
  status: 'published',
  sample: true,
  service: 'graphic-design',
  discipline: 'Brand identity',
  client: 'Aurora Architects',
  industry: 'Architecture',
  year: 2026,

  seo: {
    title: 'Aurora Architects: an identity built like a building',
    description:
      'Three major competition shortlists in the first year. How we gave Aurora Architects a brand as considered as their buildings, from the mark to the hoardings.',
  },

  hero: {
    title: ['An identity built', 'like a building.'],
    intro:
      'Aurora designs calm, long-lasting public buildings. Their old identity looked like a tech start-up. We created a brand as considered as their architecture — from the mark to the hoardings.',
    tags: ['Architecture', 'Brand identity', 'Graphic design', '2026'],
    facts: [
      ['Client', 'Aurora Architects'],
      ['Industry', 'Architecture · Public sector'],
      ['Services', 'Brand strategy, identity, graphic design'],
      ['Timeline', '8 weeks · 2026'],
      ['Deliverables', '140+ brand assets'],
      ['Guidelines', '64-page brand book'],
    ],
    media: {
      image: 'case-studies/aurora-architects-hero',
      alt: 'Letterpress business cards, a green card, a notebook and a pen on slate, each embossed with the Aurora A',
      brief: 'Hero image · stationery photography · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: 'First year',
    summary:
      'A brand that finally looks like the work — and wins it. Aurora shortlisted for three major public competitions.',
    stats: [
      { value: '3', label: 'major competition shortlists', detail: 'Was 0 in 2025' },
      { value: '+74%', label: 'inbound enquiries', detail: 'Year on year' },
      { value: '140+', label: 'templates and assets delivered', detail: 'One system' },
      { value: '2', label: 'design awards for the identity', detail: '2026' },
    ],
  },

  challenge: {
    title: 'Serious work, forgettable brand.',
    paragraphs: [
      "Aurora's buildings win praise for their restraint and craft. Their identity — a gradient logo and stock photography — said the opposite, and bid teams kept rebuilding documents from scratch.",
    ],
    points: [
      "Identity didn't reflect the studio's work",
      'No templates — every bid designed from zero',
      'Inconsistent across 3 offices',
    ],
  },

  approach: {
    title: 'Start from the drawings.',
    paragraphs: [
      "We spent two days in the studio going through sketchbooks and site models. The idea came from the section drawing: a simple, load-bearing 'A' built from four structural lines.",
      "Everything else follows the same rules — a strict grid, materials-inspired colour and a typographic voice that's quiet but confident.",
    ],
  },

  sections: [
    {
      kind: 'screenshot',
      label: 'The mark',
      title: ['Four lines,', 'one structure.'],
      intro:
        'The A is drawn like a section: two columns, a floor plate and a roof. It works from a 16px favicon to a 6-metre hoarding.',
      frame: 'plain',
      media: {
        image: 'case-studies/aurora-architects-mark',
        mobileImage: 'case-studies/aurora-architects-mark-mobile',
        alt: 'The Aurora mark, a structural letter A with a floor plate, shown four ways: with the Aurora Architects wordmark in sand on forest green, in forest on sand, in white on clay, and on its construction grid',
        brief: 'Logo panels · 2560×1120, mobile 1050×2076',
      },
    },
    {
      kind: 'palette',
      label: 'Colour',
      title: ['Materials,', 'not trends.'],
      intro:
        'Forest from copper patina, sand from limestone, clay from brick. Tested for AA contrast in print and on screen.',
      colours: [
        { name: 'Forest', hex: '#1F3A2E', rgb: '31 58 46', cmyk: '80 30 70 55', text: '#E9E1D3' },
        { name: 'Sage', hex: '#8FA89A', rgb: '143 168 154', cmyk: '45 15 40 5', text: '#1F3A2E' },
        { name: 'Sand', hex: '#E9E1D3', rgb: '233 225 211', cmyk: '8 9 16 0', text: '#1F3A2E' },
        { name: 'Clay', hex: '#B5673F', rgb: '181 103 63', cmyk: '20 65 80 10', text: '#FFFFFF' },
        { name: 'Charcoal', hex: '#1C1C1C', rgb: '28 28 28', cmyk: '70 60 60 80', text: '#E9E1D3' },
      ],
    },
    {
      kind: 'typography',
      tone: 'ink',
      label: 'Typography',
      title: ['A quiet voice,', 'set with care.'],
      colour: '#E9E1D3',
      specimens: [
        {
          role: 'Display',
          typeface: 'Instrument Serif',
          sample: 'Buildings that outlast the people who commission them.',
          style: 'serif',
        },
        {
          role: 'Text',
          typeface: 'Inter Tight',
          sample: 'Clear, factual and generous with space — for bids, reports and signage.',
          style: 'sans',
          weights: ['Regular', 'Medium', 'Semibold'],
        },
      ],
    },
    {
      kind: 'screenshot',
      label: 'Applications',
      title: ['From business cards', 'to hoardings.'],
      intro: 'A complete system of templates so every office produces work that looks like Aurora.',
      frame: 'plain',
      media: {
        image: 'case-studies/aurora-architects-applications',
        mobileImage: 'case-studies/aurora-architects-applications-mobile',
        alt: 'Aurora applications: letterpress business cards and a green card on slate, a forest hoarding reading "Built for the next hundred years.", a sand bid document cover for Riverside Library & Civic Hall, and clay signage with the Aurora wordmark',
        brief: 'Applications mosaic · 2560×1312, mobile 1050×1800',
      },
      deliverables: [
        ['Stationery', '12 items'],
        ['Bid documents', '8 templates'],
        ['Signage & hoardings', '6 formats'],
        ['Social & web', '24 templates'],
      ],
    },
  ],

  quote: {
    text: 'For the first time, our brand feels like it was designed by the same people who design our buildings.',
    name: 'Elena Marsh',
    role: 'Founding Partner, Aurora Architects',
    initials: 'EM',
  },

  credits: {
    services: [
      'Brand strategy',
      'Logo & identity',
      'Typography & colour',
      'Templates & signage',
      'Brand guidelines',
    ],
    team: ['Priya Raman — Design Lead', 'Ade Okafor — Graphic Designer', 'Hannah Cole — Client Partner'],
    tools: ['Figma', 'Illustrator', 'InDesign', 'Frontify'],
  },

  next: 'atlas-freight',
})
