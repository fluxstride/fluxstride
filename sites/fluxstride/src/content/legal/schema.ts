import type { LucideIcon } from 'lucide-react'

/**
 * The shape of a legal document (privacy policy, terms, cookie policy).
 *
 * A document is a list of numbered sections, each a heading plus blocks. The page
 * layout, numbering, table of contents, anchors and mobile variants all come from
 * this data, so editing the wording never means touching a component.
 *
 * Text fields accept inline links written as Markdown: "[ico.org.uk](https://ico.org.uk)".
 * Internal paths, https:// URLs and mailto: all work.
 */

export type LegalSlug = 'privacy' | 'terms' | 'cookies'

export type LegalDocument = {
  slug: LegalSlug
  /** Tab and related-card label, e.g. "Privacy policy". */
  name: string
  /**
   * The h1, split where the design switches to the serif: ["Privacy", "policy."].
   * On mobile the two parts stack.
   */
  title: [sans: string, serif: string]
  /** Header paragraph. */
  intro: string
  /** One line for the Related policies card on the other two pages. */
  blurb: string
  /** ISO dates. */
  updated: string
  effective: string
  version: string
  /** "The short version": four one-line takeaways. */
  summary: string[]
  /** Sidebar card (end of the page on mobile). */
  contact: LegalContact
  sections: LegalSection[]
}

export type LegalContact = {
  label: string
  title: string
  /** An email address, or an action such as opening Cookie settings. */
  link: { label: string; href: string } | { label: string; action: LegalActionId }
  note: string
}

export type LegalSection = {
  title: string
  /** Anchor. Defaults to the title in kebab case ("Who we are" → "who-we-are"). */
  id?: string
  /** Shorter label for the table of contents, if the title is long. */
  tocLabel?: string
  blocks: LegalBlock[]
}

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  /** Tinted callout with an icon. */
  | { type: 'note'; icon: LucideIcon; text: string }
  /** Blue-dot bullet list. */
  | { type: 'list'; items: string[] }
  /** A table on desktop, a stack of cards on mobile. */
  | { type: 'table'; columns: LegalColumn[]; rows: string[][]; monoFirstColumn?: boolean }
  /** Grid of icon cards (three across on desktop). */
  | { type: 'cards'; items: { icon: LucideIcon; title: string; body: string }[] }
  /** A row of buttons. The first is filled, the rest outlined. */
  | { type: 'actions'; items: LegalAction[] }
  /** Key figures between hairlines: four across on desktop, two on mobile. */
  | { type: 'stats'; items: { value: string; label: string }[] }
  /** Two side-by-side lists; the `highlight` one gets a blue border. */
  | { type: 'split'; columns: [LegalSplitColumn, LegalSplitColumn] }
  /** The consent categories from content/consent.ts, with live toggles. */
  | { type: 'cookie-categories' }

export type LegalColumn = {
  label: string
  /** Desktop width in px. Leave out to share the remaining space. */
  width?: number
}

export type LegalActionId = 'open-cookie-settings' | 'reject-optional'

export type LegalAction = { label: string; icon: LucideIcon } & (
  { href: string; action?: never } | { action: LegalActionId; href?: never }
)

export type LegalSplitColumn = {
  title: string
  icon: LucideIcon
  highlight?: boolean
  items: string[]
}

export const defineLegalDocument = (document: LegalDocument) => document
