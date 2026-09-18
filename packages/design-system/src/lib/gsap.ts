import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registered once here so every component imports an already-configured gsap.
// ScrollTrigger reaches for the DOM as it registers, and prerendering imports
// this module in Node, where there is no document — so register in the browser only.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: 'power3.out', duration: 0.85 })
}

/** Media query every GSAP animation is wrapped in. Visitors who ask for less motion get none. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger }
