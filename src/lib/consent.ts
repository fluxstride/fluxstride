import { useSyncExternalStore } from 'react'
import { optionalCategories, type OptionalCategory } from '@/content/consent'

/**
 * Cookie consent: what the visitor agreed to, and whether the banner or the settings
 * dialog is showing.
 *
 * Nothing optional runs until the visitor says yes. Choices are stored in the
 * `fs_consent` cookie for 12 months (the period the cookie policy promises), then the
 * banner asks again. Anything that needs consent registers with `onConsent` (see
 * lib/trackers.ts) instead of checking the cookie itself.
 *
 *   const { status, choices } = useConsent()   // status: 'pending' | 'undecided' | 'decided'
 *   openCookieSettings()        // e.g. from the footer link
 */

/**
 * Bump when categories or the cookies in them change materially. Stored choices with
 * an older version are ignored, so every visitor sees the banner again.
 */
export const CONSENT_VERSION = 1

const COOKIE_NAME = 'fs_consent'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365

export type ConsentChoices = Record<OptionalCategory, boolean>

export type ConsentState = {
  /** 'pending' on the server and before hydration, so neither renders consent UI. */
  status: 'pending' | 'undecided' | 'decided'
  choices: ConsentChoices
  settingsOpen: boolean
}

const noneGranted = (): ConsentChoices => ({ analytics: false, functional: false, marketing: false })
const allGranted = (): ConsentChoices => ({ analytics: true, functional: true, marketing: true })

const serverState: ConsentState = { status: 'pending', choices: noneGranted(), settingsOpen: false }

let state: ConsentState | null = null
const listeners = new Set<() => void>()

function readCookie(): ConsentChoices | null {
  const raw = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1)
  if (!raw) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as { v?: number; c?: Partial<ConsentChoices> }
    if (parsed.v !== CONSENT_VERSION || !parsed.c) return null
    return { ...noneGranted(), ...parsed.c }
  } catch {
    return null
  }
}

function writeCookie(choices: ConsentChoices) {
  const value = encodeURIComponent(JSON.stringify({ v: CONSENT_VERSION, c: choices, t: Date.now() }))
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`
}

function getState(): ConsentState {
  if (!state) {
    const stored = readCookie()
    state = stored
      ? { status: 'decided', choices: stored, settingsOpen: false }
      : { status: 'undecided', choices: noneGranted(), settingsOpen: false }
  }
  return state
}

function setState(next: Partial<ConsentState>) {
  state = { ...getState(), ...next }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Current consent, re-rendering when it changes. Server renders and hydration see 'pending'. */
export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, getState, () => serverState)
}

// ------------------------------------------------------------------ actions

/** Save choices, remove cookies from anything just switched off, and run newly allowed code. */
export function saveConsent(choices: ConsentChoices) {
  const previous = getState().choices
  writeCookie(choices)
  setState({ status: 'decided', choices, settingsOpen: false })

  const revoked = optionalCategories.filter(({ id }) => previous[id] && !choices[id])
  revoked.forEach((category) => category.cookies.forEach(deleteCookie))
  runCallbacks()

  // Scripts that already ran can't be unloaded; a reload is the only way to stop them.
  if (revoked.some(({ id }) => started.has(id))) window.location.reload()
}

export const acceptAll = () => saveConsent(allGranted())
export const rejectAll = () => saveConsent(noneGranted())

/** Change one category and save straight away (the toggles on the cookie policy page). */
export const setCategory = (category: OptionalCategory, granted: boolean) =>
  saveConsent({ ...getState().choices, [category]: granted })

export const openCookieSettings = () => setState({ settingsOpen: true })
export const closeCookieSettings = () => setState({ settingsOpen: false })

// ---------------------------------------------------------------- callbacks

type Callback = { category: OptionalCategory; run: () => void; done: boolean }
const callbacks: Callback[] = []
/** Categories whose code has run on this page view. */
const started = new Set<OptionalCategory>()

function runCallbacks() {
  const { choices } = getState()
  for (const callback of callbacks) {
    if (callback.done || !choices[callback.category]) continue
    callback.done = true
    started.add(callback.category)
    callback.run()
  }
}

/**
 * Runs `run` once the visitor allows `category`: immediately if they already have,
 * otherwise as soon as they do. Call it from the browser only (an effect or a module
 * that only loads client-side).
 */
export function onConsent(category: OptionalCategory, run: () => void) {
  callbacks.push({ category, run, done: false })
  runCallbacks()
}

// ------------------------------------------------------------------- helpers

/** Deletes a cookie on this host and its parent domain. A trailing `*` matches a prefix. */
function deleteCookie(pattern: string) {
  const names = pattern.endsWith('*')
    ? document.cookie
        .split('; ')
        .map((part) => part.split('=')[0])
        .filter((name) => name.startsWith(pattern.slice(0, -1)))
    : [pattern]

  const host = window.location.hostname
  const domains = ['', host, `.${host.split('.').slice(-2).join('.')}`]
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Path=/; Max-Age=0${domain ? `; Domain=${domain}` : ''}`
    }
  }
}
