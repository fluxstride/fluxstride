import cookies from './cookies'
import privacy from './privacy'
import type { LegalDocument, LegalSection, LegalSlug } from './schema'
import terms from './terms'

/**
 * Legal documents, in tab order. Each gets a page at /<slug> (see App.tsx and lib/seo.ts).
 * To change wording, edit the document file; the page, table of contents and anchors follow.
 */

export type * from './schema'

export const legalDocuments: LegalDocument[] = [privacy, terms, cookies]

export const legalDocument = (slug: LegalSlug) => legalDocuments.find((document) => document.slug === slug)!

/** Anchor for a section: its `id`, or the title in kebab case. */
export function sectionId(section: LegalSection) {
  return (
    section.id ??
    section.title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  )
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * "2026-09-16" → "16 Sep 2026". Built by hand: Intl's en-GB gives "Sept", and the result
 * must not depend on the server's or visitor's locale and time zone.
 */
export function formatLegalDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return `${day} ${MONTHS[month - 1]} ${year}`
}

/**
 * Before launch: the legal pages carry placeholder company details and design copy.
 * While this list is not empty, the production build prints a warning (scripts/prerender.mjs).
 * Remove each item once it is done, and set it to [] once a lawyer has reviewed the text.
 */
export const LEGAL_TODO: string[] = [
  'Have the privacy policy, terms and cookie policy reviewed by a lawyer.',
  'privacy.ts: company number, registered address and ICO reference are placeholders.',
  'privacy.ts: confirm the Data Protection Lead and the provider list (hosting says Vercel/AWS; the site deploys to Cloudflare).',
  'terms.ts: confirm the commercial terms (deposit, payment terms, interest, warranty, liability cap).',
  'cookies.ts + consent.ts: check the cookie names against what the live site really sets.',
]
