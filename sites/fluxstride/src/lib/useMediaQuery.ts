import { useSyncExternalStore } from 'react'

/**
 * Live result of a CSS media query. Renders `serverValue` during prerendering and
 * hydration, then follows the browser, without a setState-in-effect round trip.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

/** Whether the browser tab is visible. Always true while prerendering. */
export function usePageVisible() {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener('visibilitychange', onChange)
      return () => document.removeEventListener('visibilitychange', onChange)
    },
    () => document.visibilityState === 'visible',
    () => true,
  )
}
