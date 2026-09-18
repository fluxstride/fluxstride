import { Bell, ScanFace, WifiOff } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * STARTER TEMPLATE · Mobile app
 * Design: "Case Study Template: Mobile app" in the Pencil file.
 * Example of a finished page: "Case Study: Mobile App" (Orbit Health).
 *
 * Copy it with `pnpm new:case-study mobile-app <slug>`.
 * Guide: docs/case-studies.md
 */
export default defineCaseStudy({
  slug: 'template-mobile-app',
  status: 'draft',
  services: ['mobile-development', 'product-design'],
  discipline: 'Mobile app',
  client: '[Client name]',
  industry: '[Industry]',
  year: 0,

  seo: {
    title: '[Client]: [the result in a few words]',
    description:
      '[Lead with the result, then say what we built and for whom. 140–160 characters so Google shows it in full.]',
  },

  // HERO: e.g. ['Healthcare that fits', 'in your pocket.']
  hero: {
    title: ['[Outcome-led headline,', 'one italic phrase.]'],
    intro:
      '[Who the client is, what was holding them back and what we delivered. Two or three sentences, 45 words max. Lead with the outcome.]',
    facts: [
      ['Client', '[Client name]'],
      ['Industry', '[Industry]'],
      ['Services', '[Services delivered]'],
      ['Timeline', '[00 weeks · YEAR]'],
      ['Platforms', '[iOS · Android]'],
      ['Stack', '[e.g. React Native]'],
    ],
    media: {
      image: null,
      alt: '[What the photo shows]',
      brief: 'Hero image · app on a phone, in context · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '[First 6 months after launch]',
    summary: "[One sentence on the business impact, in the client's own terms.]",
    stats: [
      { value: '[000k]', label: '[Downloads]', detail: '[Timeframe]' },
      { value: '[4.9★]', label: '[App store rating]', detail: '[00k ratings]' },
      { value: '[00%]', label: '[30-day retention]', detail: '[Industry average 00%]' },
      { value: '[+00%]', label: '[Bookings / mobile revenue]', detail: '[Baseline → now]' },
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
    // SCREENS: four real app screens exported at 1170×2532, in journey order. Caption each.
    {
      kind: 'gallery',
      label: 'The app',
      title: ['[Four screens,', 'one clear journey.]'],
      intro: '[What someone does in the app, start to finish.]',
      frame: 'phone',
      columns: 4,
      items: [1, 2, 3, 4].map((n) => ({
        media: {
          image: null,
          alt: '[Describe the screen]',
          brief: 'App screen · 1170×2532',
          aspect: 1170 / 2532,
        },
        caption: `[Screen 0${n}]`,
      })),
    },
    // JOURNEY: four steps. Add the completion rate for each in `meta` if you have it.
    {
      kind: 'steps',
      variant: 'journey',
      label: 'User journey',
      title: ['[From download', 'to habit.]'],
      intro: '[The key steps a user takes and how the app helps.]',
      steps: [1, 2, 3, 4].map(() => ({
        title: '[Step name]',
        body: '[What the user does and how the app helps. 20 words.]',
        meta: '[00%] complete this step',
      })),
    },
    // REVIEWS: real App Store / Google Play reviews only, with the display name from the store.
    {
      kind: 'reviews',
      tone: 'ink',
      label: 'Reviews',
      title: ['[What users', 'are saying.]'],
      rating: '[4.9]',
      ratingLabel: '[00,000] ratings · App Store & Google Play',
      reviews: [1, 2, 3].map(() => ({
        quote: '[Short store review about a specific benefit.]',
        author: '[Display name] · [Store] · [Month Year]',
      })),
    },
    // FEATURES: three features tied to the results above.
    {
      kind: 'features',
      label: 'Features',
      title: ['[Built for', 'everyday use.]'],
      intro: '[The features that made the difference.]',
      features: [
        { icon: Bell, title: '[Feature name]', body: '[What it does and why it matters to users.]' },
        { icon: WifiOff, title: '[Feature name]', body: '[What it does and why it matters to users.]' },
        { icon: ScanFace, title: '[Feature name]', body: '[What it does and why it matters to users.]' },
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
      '[Product strategy]',
      '[UX & UI design]',
      '[iOS & Android development]',
      '[Backend & API]',
      '[App store launch]',
    ],
    team: ['[Name], [Role]', '[Name], [Role]', '[Name], [Role]'],
    tools: ['[e.g. React Native]', '[e.g. Expo]', '[e.g. Firebase]', '[e.g. Figma]'],
  },
})
