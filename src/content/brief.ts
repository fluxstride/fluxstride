/**
 * Project brief options: the full form on /contact and the quick brief builder
 * at the bottom of Home, which hands its choices over to the form.
 */

/** "What do you need?" on the Contact form. */
export const needs = [
  { id: 'software', label: 'Software engineering' },
  { id: 'website', label: 'Website' },
  { id: 'mobile', label: 'Mobile app' },
  { id: 'e-commerce', label: 'E-commerce' },
  { id: 'ui-ux', label: 'UI/UX design' },
  { id: 'graphic-design', label: 'Graphic design' },
  { id: 'seo', label: 'SEO' },
  { id: 'consultancy', label: 'Tech consultancy' },
  { id: 'maintenance', label: 'Maintenance' },
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
 * Home's quick builder groups the form's needs into six broader chips.
 * Each chip lists the form options it ticks when the brief is handed over.
 */
export const quickNeeds: { label: string; needs: NeedId[] }[] = [
  { label: 'Software', needs: ['software'] },
  { label: 'Website / e-commerce', needs: ['website', 'e-commerce'] },
  { label: 'Mobile app', needs: ['mobile'] },
  { label: 'Design', needs: ['ui-ux', 'graphic-design'] },
  { label: 'SEO', needs: ['seo'] },
  { label: 'Consultancy', needs: ['consultancy'] },
]

/**
 * Home's budget chips, as drawn. NOTE: these bands differ from the Contact form's
 * (the design uses two sets), so the chosen band is passed along as text for the
 * form to show rather than being mapped onto one of its options.
 */
export const quickBudgets = ['< £15k', '£15–40k', '£40–100k', '£100k+']

/** Link to the Contact form with the quick builder's choices filled in. */
export function briefHref(selectedNeeds: string[], budget: string | null) {
  const params = new URLSearchParams()
  const ids = quickNeeds
    .filter((option) => selectedNeeds.includes(option.label))
    .flatMap((option) => option.needs)
  if (ids.length) params.set('need', ids.join(','))
  if (budget) params.set('budget', budget)
  const query = params.toString()
  return `/contact${query ? `?${query}` : ''}#brief`
}
