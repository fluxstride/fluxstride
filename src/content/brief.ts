/**
 * Project brief options: the full form on /contact and the quick brief builder
 * at the bottom of Home, which hands its choices over to the form.
 */

/** "What do you need?" on the Contact form. */
export const needs = [
  { id: 'product-design', label: 'Product design' },
  { id: 'branding', label: 'Branding' },
  { id: 'website', label: 'Website' },
  { id: 'mobile', label: 'Mobile app' },
  { id: 'backend', label: 'Backend' },
  { id: 'cloud-devops', label: 'Cloud & DevOps' },
  { id: 'not-sure', label: 'Not sure yet' },
] as const

export type NeedId = (typeof needs)[number]['id']

/** "Budget" on the Contact form. */
export const budgets = [
  { id: 'under-10k', label: '< £10k' },
  { id: '10-25k', label: '£10–25k' },
  { id: '25-50k', label: '£25–50k' },
  { id: '50-100k', label: '£50–100k' },
  { id: '100k-plus', label: '£100k+' },
] as const

export const timelines = [
  { id: 'asap', label: 'ASAP' },
  { id: '1-3-months', label: '1–3 months' },
  { id: '3-6-months', label: '3–6 months' },
  { id: 'flexible', label: 'Flexible' },
] as const

/**
 * Home's quick builder: one chip per service. Each chip lists the form options it ticks
 * when the brief is handed over.
 */
export const quickNeeds: { label: string; needs: NeedId[] }[] = [
  { label: 'Website', needs: ['website'] },
  { label: 'Mobile app', needs: ['mobile'] },
  { label: 'Backend', needs: ['backend'] },
  { label: 'Cloud & DevOps', needs: ['cloud-devops'] },
  { label: 'Product design', needs: ['product-design'] },
  { label: 'Branding', needs: ['branding'] },
]

export type BudgetId = (typeof budgets)[number]['id']

/** Link to the Contact form with these options ticked, e.g. /contact?need=website&budget=10-25k#brief */
export function contactHref(needIds: NeedId[], budget: BudgetId | null = null) {
  const params = new URLSearchParams()
  if (needIds.length) params.set('need', needIds.join(','))
  if (budget) params.set('budget', budget)
  const query = params.toString()
  return `/contact${query ? `?${query}` : ''}#brief`
}

/** Link to the Contact form with the quick builder's choices filled in. Home uses the form's own budget bands. */
export function briefHref(selectedNeeds: string[], budget: BudgetId | null) {
  const ids = quickNeeds
    .filter((option) => selectedNeeds.includes(option.label))
    .flatMap((option) => option.needs)
  return contactHref(ids, budget)
}

export type TimelineId = (typeof timelines)[number]['id']

const needIds = new Set<string>(needs.map((need) => need.id))
const budgetIds = new Set<string>(budgets.map((budget) => budget.id))

/** Reads the options a contactHref link ticks: "?need=backend,website&budget=10-25k". Unknown ids are ignored. */
export function briefFromSearch(search: string) {
  const params = new URLSearchParams(search)
  const need = (params.get('need') ?? '').split(',').filter((id): id is NeedId => needIds.has(id))
  const budget = params.get('budget')
  return { needs: need, budget: budget && budgetIds.has(budget) ? (budget as BudgetId) : null }
}

/** "What happens next" beside the Contact form. */
export const nextSteps = [
  { title: 'We reply within 24 hours', body: 'With questions, or a time for a call.' },
  { title: 'Intro call — 20 minutes', body: "We listen, then tell you honestly if we're the right fit." },
  { title: 'Proposal in 5 days', body: 'Scope, timeline and a fixed price. No obligation.' },
]
