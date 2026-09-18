import { useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * Sticky-header behaviour shared by every site:
 *   - `scrolled` once the page has left the top, for the translucent backdrop and hairline.
 *   - `hidden` while scrolling down past `hideAfter`, back as soon as the visitor scrolls up.
 */
export function useHeaderScroll(hideAfter = 120) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(current > 8)
    setHidden(current > previous && current > hideAfter)
  })

  return { hidden, scrolled }
}

/**
 * While a full-screen menu is open: lock the page behind it, close on Escape, and
 * close when the viewport grows to desktop (where the menu does not exist).
 */
export function useMenuLock(open: boolean, close: () => void, desktopQuery = '(min-width: 64rem)') {
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close()
    const desktop = window.matchMedia(desktopQuery)
    const onBreakpoint = (event: MediaQueryListEvent) => event.matches && close()
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open, close, desktopQuery])
}
