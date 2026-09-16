/**
 * The Stride Method: four phases. Feeds Home "How we work" and the Process page.
 */
export type ProcessStep = {
  number: string
  duration: string
  title: string
  description: string
  deliverables: string[]
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    duration: 'Weeks 1–2',
    title: 'Discover',
    description:
      'Workshops, audits, customer interviews and analytics deep-dives to find the real problem worth solving.',
    deliverables: ['Research report', 'Opportunity map'],
  },
  {
    number: '02',
    duration: 'Weeks 2–3',
    title: 'Define',
    description: 'Positioning, information architecture and a prioritised roadmap everyone signs off on.',
    deliverables: ['Strategy deck', 'Sitemap & flows'],
  },
  {
    number: '03',
    duration: 'Weeks 4–10',
    title: 'Design & Build',
    description:
      'Identity, UI and engineering in weekly shippable increments — reviewed live, never thrown over a wall.',
    deliverables: ['Design system', 'Production code'],
  },
  {
    number: '04',
    duration: 'Ongoing',
    title: 'Launch & Grow',
    description: 'Go live, measure everything, then compound gains with SEO, campaigns and experiments.',
    deliverables: ['Launch plan', 'Growth dashboard'],
  },
]
