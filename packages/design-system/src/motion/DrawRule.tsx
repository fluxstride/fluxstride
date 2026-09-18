import { useRef } from 'react'
import { cn } from '../lib/cn'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect'

type DrawRuleProps = {
  /** Colour, thickness and position, e.g. "absolute inset-x-0 top-0 h-px bg-ink". */
  className?: string
  delay?: number
  /** Which way the line grows. */
  from?: 'left' | 'right'
}

/**
 * A hairline that draws itself across when it scrolls into view, like the rules on the
 * studio's Process steps. Use it in place of a border where the line should move.
 */
export function DrawRule({ className, delay = 0, from = 'left' }: DrawRuleProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useIsomorphicLayoutEffect(() => {
    const rule = ref.current
    if (!rule) return

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      gsap.set(rule, { opacity: 1, scaleX: 0, transformOrigin: from })
      rule.dataset.revealReady = ''
      gsap.to(rule, {
        scaleX: 1,
        duration: 1.2,
        delay,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: rule, start: 'top 92%', once: true },
      })
    })

    return () => media.revert()
  }, [delay, from])

  return <span ref={ref} aria-hidden="true" data-reveal="self" className={cn('block', className)} />
}
