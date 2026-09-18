/**
 * Cookie categories, shared by the cookie banner, the Cookie settings dialog and the
 * cookie policy (/cookies), so the three can never disagree.
 *
 * Copy is from the design: `summary` is the short line in Cookie settings, `description`
 * and `cookies` are the cookie policy's "How we use them" cards.
 *
 * PLACEHOLDERS: the cookie names follow the design. Before launch, check them against
 * what the live site really sets (browser dev tools → Application → Cookies) and update
 * this file, the "Cookies we set" table in content/legal/cookies.ts and, if anything
 * material changed, CONSENT_VERSION in lib/consent.ts so visitors are asked again.
 */

export type OptionalCategory = 'analytics' | 'functional' | 'marketing'
export type CookieCategoryId = 'necessary' | OptionalCategory

export type CookieCategory = {
  id: CookieCategoryId
  name: string
  /** One line, for Cookie settings. */
  summary: string
  /** Fuller explanation, for the cookie policy. */
  description: string
  /** Cookie names, shown in the policy and deleted when consent is withdrawn. `*` is a wildcard. */
  cookies: string[]
  /** Shown as "plausible (cookieless)" in the policy but never a cookie to delete. */
  displayCookies?: string[]
}

export const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Strictly necessary',
    summary: 'Keeps the site secure and remembers your choices.',
    description:
      "Security, load balancing and remembering your cookie choices. The site can't work properly without these.",
    cookies: ['fs_consent', '__cf_bm', '__Host-session'],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    summary: 'Anonymous stats that help us improve pages and speed.',
    description:
      'Anonymous statistics about which pages are visited, so we can improve content and performance.',
    cookies: ['_ga', '_ga_*'],
    displayCookies: ['plausible (cookieless)', '_ga', '_ga_*'],
  },
  {
    id: 'functional',
    name: 'Functional',
    summary: 'Remembers preferences like reduced motion.',
    description: 'Remember preferences such as reduced motion and embedded video settings.',
    cookies: ['fs_prefs', 'vimeo_player'],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    summary: 'Measures LinkedIn and Google campaign results.',
    description: "Measure the results of LinkedIn and Google campaigns. We don't use these for retargeting.",
    cookies: ['li_fat_id', '_gcl_au', '_fbp'],
  },
]

export const optionalCategories = cookieCategories.filter(
  (category): category is CookieCategory & { id: OptionalCategory } => category.id !== 'necessary',
)

export const consentCopy = {
  banner: {
    title: 'Cookies — only with your OK.',
    body: "We use essential cookies to run this site. With your permission we'd also like to use analytics to improve it and measure our campaigns. No selling data, ever.",
    /** The mobile sheet uses a shorter line. */
    bodyShort:
      'We use essential cookies to run this site, and — with your permission — analytics to improve it.',
  },
  settings: {
    eyebrow: 'Privacy preferences',
    title: 'Cookie settings',
    body: 'Choose which cookies we can use. You can change this any time from "Cookie settings" in the footer.',
    bodyShort: 'Choose which cookies we can use. Change this any time from the footer.',
  },
}
