import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registered once here so every component imports an already-configured gsap.
// ScrollTrigger reaches for the DOM as it registers, and prerendering imports
// this module in Node, where there is no document, so register in the browser only.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: 'power3.out', duration: 0.85 })
  // Web fonts swapping in, images arriving and accordions opening all change the page's
  // height after ScrollTrigger has measured it, which leaves triggers further down waiting
  // for scroll positions that no longer exist (the footer wordmark never rising). Re-measure,
  // debounced, whenever the document's height changes.
  let lastHeight = 0
  let timer = 0
  new ResizeObserver(([entry]) => {
    const height = entry.contentRect.height
    if (Math.abs(height - lastHeight) < 1) return
    lastHeight = height
    window.clearTimeout(timer)
    timer = window.setTimeout(() => ScrollTrigger.refresh(), 200)
  }).observe(document.documentElement)
}

/** Media query every GSAP animation is wrapped in. Visitors who ask for less motion get none. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger }
