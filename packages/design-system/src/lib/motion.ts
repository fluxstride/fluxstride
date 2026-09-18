import type { Transition, Variants } from 'motion/react'

/** Soft, slightly overshooting ease used across the site. Mirrors --ease-out-expo in tokens.css. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const springy: Transition = { type: 'spring', stiffness: 380, damping: 32, mass: 0.6 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2, ease: 'easeIn' } },
}

export const stagger = (staggerChildren = 0.06, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
})

/** Full-screen mobile menu: the panel wipes down from the top, then its rows rise in. */
export const menuPanel = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.6, ease: EASE_OUT, when: 'afterChildren' },
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.7, ease: EASE_OUT, staggerChildren: 0.05, delayChildren: 0.2 },
  },
} as const satisfies Variants

/** One row of the mobile menu. Put it inside an `overflow-hidden` wrapper so it rises from a mask. */
export const menuItem = {
  closed: { y: '110%', transition: { duration: 0.3 } },
  open: { y: '0%', transition: { duration: 0.8, ease: EASE_OUT } },
} as const satisfies Variants
