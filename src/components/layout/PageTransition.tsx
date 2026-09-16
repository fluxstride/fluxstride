import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { EASE_OUT } from '@/lib/motion'
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect'

type PageTransitionProps = { children: ReactNode; hash: string }

/**
 * Wraps each page so it fades in as the previous one leaves. It also owns the
 * scroll position, because the new page only mounts once the old one has left.
 */
export function PageTransition({ children, hash }: PageTransitionProps) {
  useIsomorphicLayoutEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView()
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
      onAnimationComplete={() => ScrollTrigger.refresh()}
    >
      {children}
    </motion.div>
  )
}
