import { onConsent } from './consent'

/**
 * Third-party scripts that need consent. Nothing here loads until the visitor allows
 * its category in the cookie banner or Cookie settings.
 *
 * Each tracker is off until its environment variable is set (in .env.local, or in
 * the hosting dashboard for production):
 *
 *   VITE_PLAUSIBLE_DOMAIN   e.g. fluxstride.com         → Plausible Analytics (analytics)
 *   VITE_GA_MEASUREMENT_ID  e.g. G-XXXXXXXXXX            → Google Analytics 4 (analytics)
 *
 * Adding one (LinkedIn Insight Tag, Google Ads…): add an entry below with the right
 * category, list its cookies in content/consent.ts and the cookie policy table, and
 * bump CONSENT_VERSION in lib/consent.ts.
 */

type Tracker = {
  category: Parameters<typeof onConsent>[0]
  enabled: boolean
  load: () => void
}

const env = import.meta.env

const trackers: Tracker[] = [
  {
    category: 'analytics',
    enabled: Boolean(env.VITE_PLAUSIBLE_DOMAIN),
    load: () =>
      loadScript('https://plausible.io/js/script.js', { 'data-domain': env.VITE_PLAUSIBLE_DOMAIN as string }),
  },
  {
    category: 'analytics',
    enabled: Boolean(env.VITE_GA_MEASUREMENT_ID),
    load: () => {
      const id = env.VITE_GA_MEASUREMENT_ID as string
      const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void }
      w.dataLayer = w.dataLayer || []
      w.gtag = function gtag() {
        // gtag.js reads the arguments object, not an array.
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer.push(arguments)
      }
      w.gtag('js', new Date())
      w.gtag('config', id, { anonymize_ip: true })
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`)
    },
  },
]

let registered = false

/** Registers every enabled tracker with the consent store. Safe to call more than once. */
export function registerTrackers() {
  if (registered) return
  registered = true
  for (const tracker of trackers) {
    if (tracker.enabled) onConsent(tracker.category, tracker.load)
  }
}

function loadScript(src: string, attributes: Record<string, string> = {}) {
  const script = document.createElement('script')
  script.src = src
  script.defer = true
  for (const [name, value] of Object.entries(attributes)) script.setAttribute(name, value)
  document.head.append(script)
}
