import type { ImageName } from './images.generated'

/**
 * Studio page: story, facts, values and team. Open roles live in content/careers.ts.
 *
 * PLACEHOLDERS: the team are stock photos with invented names, and the facts come
 * from the design. Replace with real people (with their consent), real
 * numbers before launch.
 */

export const story = {
  lead: 'Built by engineers and designers who were tired of the hand-off.',
  paragraphs: [
    'Fluxstride started with a simple frustration: agencies that design beautiful things nobody can build, and developers who build solid things nobody wants to use. We put both crafts in the same room, on the same roadmap.',
    'Today we’re a compact team of senior specialists across product design, branding, web, mobile, backend and cloud engineering. We keep the studio small on purpose — the people you meet in the pitch are the people who do the work.',
    'Our name is our method. Flux: technology, markets and customers never stop changing. Stride: we respond with deliberate, confident steps forward — never noise for its own sake.',
  ],
}

/** Values count up from zero, except years, which would read oddly. */
export const facts: { value: string; label: string; count?: boolean }[] = [
  { value: '2019', label: 'Founded', count: false },
  { value: '14', label: 'Senior specialists' },
  { value: '6', label: 'Services under one roof' },
  { value: '3', label: 'Time zones, one team' },
]

export const values: { title: string; body: string }[] = [
  {
    title: 'Direct, not loud.',
    body: 'We say what we think, price things clearly and flag problems early. No jargon, no theatre.',
  },
  {
    title: 'Always in motion.',
    body: 'We ship in small, visible steps and keep improving after launch. Momentum beats perfection.',
  },
  {
    title: 'Craft over volume.',
    body: 'We take on fewer projects so every line of code and every pixel gets senior attention.',
  },
  {
    title: 'Own the outcome.',
    body: 'We measure success by what changes for your business — not by deliverables handed over.',
  },
]

export type TeamMember = {
  name: string
  role: string
  photo: ImageName
  /** Profile URL. The LinkedIn icon only shows when this is set. */
  linkedin?: string
}

export const team: TeamMember[] = [
  { name: 'Daniel Mensah', role: 'Founder & Technical Director', photo: 'team/daniel-mensah' },
  { name: 'Priya Raman', role: 'Creative Director', photo: 'team/priya-raman' },
  { name: 'Tom Keller', role: 'Head of Engineering', photo: 'team/tom-keller' },
  { name: 'Aisha Bello', role: 'Lead Product Designer', photo: 'team/aisha-bello' },
  { name: 'Leo Martins', role: 'Senior Mobile Engineer', photo: 'team/leo-martins' },
  { name: 'Sofia Lind', role: 'Brand & Graphic Designer', photo: 'team/sofia-lind' },
  { name: 'Kwame Asante', role: 'SEO & Growth Lead', photo: 'team/kwame-asante' },
  { name: 'Hannah Cole', role: 'Client Partner', photo: 'team/hannah-cole' },
]
