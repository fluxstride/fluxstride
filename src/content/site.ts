/**
 * Site-wide facts: brand, contact details, navigation and social links.
 * Anything used on more than one page lives here.
 *
 * PLACEHOLDERS: social URLs and the X handle are guesses from the brand kit.
 * Confirm them before launch.
 */

export const BRAND = 'Fluxstride'
export const LEGAL_NAME = 'Fluxstride Ltd'

export const EMAIL_NEW_BUSINESS = 'hello@fluxstride.com'
export const EMAIL_CAREERS = 'jobs@fluxstride.com'

/**
 * "Book a 20-min intro call". PLACEHOLDER: set VITE_INTRO_CALL_URL to the booking page
 * (Cal.com, Calendly…). Until then it opens an email asking for a call.
 */
export const INTRO_CALL_URL: string =
  import.meta.env.VITE_INTRO_CALL_URL || mailto(EMAIL_NEW_BUSINESS, 'Intro call')

export const STUDIO_HOURS = 'Mon–Fri · 9:00–18:00 GMT'

/** Shown beside the nav CTA. Update each quarter. */
export const AVAILABILITY = 'Booking Q4 projects'

export type NavLink = { to: string; label: string }

export const primaryNav: NavLink[] = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/studio', label: 'Studio' },
  { to: '/insights', label: 'Insights' },
]

export const contactLink: NavLink = { to: '/contact', label: 'Start a project' }

export const studioLinks: NavLink[] = [
  { to: '/work', label: 'Work' },
  { to: '/process', label: 'Process' },
  { to: '/studio', label: 'About' },
  { to: '/studio#careers', label: 'Careers' },
  { to: '/insights', label: 'Insights' },
]

export const socialLinks = [
  { href: 'https://www.linkedin.com/company/fluxstride', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/fluxstride', label: 'Instagram' },
  { href: 'https://dribbble.com/fluxstride', label: 'Dribbble' },
  { href: 'https://x.com/fluxstride', label: 'X / Twitter' },
] as const

export const X_HANDLE = '@fluxstride'

export function mailto(email: string, subject?: string) {
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
}
