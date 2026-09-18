import { motion } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { ScrollTrigger } from '@fluxstride/design-system/lib/gsap'
import { EASE_OUT } from '@fluxstride/design-system/lib/motion'
import { useIsomorphicLayoutEffect } from '@fluxstride/design-system/lib/useIsomorphicLayoutEffect'

type PageTransitionProps = { children: ReactNode; hash: string }

/**
 * Wraps each page so it fades in as the previous one leaves. It also owns the
 * scroll position, because the new page only mounts once the old one has left.
 */
export function PageTransition({ children, hash }: PageTransitionProps) {
  // Keyed by pathname, so the first run is a new page; later runs are hash changes on this one.
  const mounted = useRef(false)
  /** Anchor to settle on once the page has finished entering. */
  const pendingTarget = useRef<HTMLElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null

    if (mounted.current) {
      // Same page, new #hash: glide there. Positions have not changed, so no refresh.
      target?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    mounted.current = true

    // A new page jumps. It must be instant: the stylesheet sets scroll-behavior: smooth, and
    // ScrollTrigger.refresh() below would cancel a smooth scroll that has not moved yet.
    if (target) {
      target.scrollIntoView({ behavior: 'instant' })
      pendingTarget.current = target
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    // Section positions have changed, so scroll-driven animations need re-measuring.
    ScrollTrigger.refresh()
  }, [hash])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      onAnimationComplete={() => {
        // Headings and images above an anchor can still shift while the page enters, so
        // land on it again once everything has settled.
        pendingTarget.current?.scrollIntoView({ behavior: 'instant' })
        pendingTarget.current = null
        ScrollTrigger.refresh()
      }}
    >
      {children}
    </motion.div>
  )
}
