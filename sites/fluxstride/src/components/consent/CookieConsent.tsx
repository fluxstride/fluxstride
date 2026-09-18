import { useEffect } from 'react'
import { useConsent } from '@/lib/consent'
import { registerTrackers } from '@/lib/trackers'
import { CookieBanner } from './CookieBanner'
import { CookieSettings } from './CookieSettings'

/**
 * Cookie banner and Cookie settings, for every page (mounted once in App).
 *
 * Renders nothing on the server or during hydration: the visitor's choice lives in a
 * cookie the prerendered HTML can't know about. Open the settings from anywhere with
 * `openCookieSettings()` from lib/consent.
 */
export function CookieConsent() {
  const { status, choices, settingsOpen } = useConsent()

  useEffect(registerTrackers, [])

  return (
    <>
      {status === 'undecided' && !settingsOpen ? <CookieBanner /> : null}
      {settingsOpen ? <CookieSettings initial={choices} /> : null}
    </>
  )
}
