import { useRef, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect'

type ClipRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Where the wipe starts. */
  from?: 'bottom' | 'left'
}

/**
 * Wipes a block open when it scrolls into view, the way ImageReveal opens a photo,
 * but for content that sets its own height (a browser frame, a card). Anything
 * inside marked `data-clip-zoom` settles from a slight zoom as the wipe runs.
 */
export function ClipReveal({ children, className, delay = 0, from = 'bottom' }: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      const hidden = from === 'bottom' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'
      const zoom = element.querySelectorAll('[data-clip-zoom]')
      gsap.set(element, { opacity: 1, clipPath: hidden })
      element.dataset.revealReady = ''

      const timeline = gsap.timeline({
        delay,
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      })
      timeline.to(element, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' })
      if (zoom.length) timeline.from(zoom, { scale: 1.15, duration: 1.6, ease: 'expo.out' }, 0.1)
    })

    return () => media.revert()
  }, [delay, from])

  return (
    <div ref={ref} data-reveal="self" className={cn(className)}>
      {children}
    </div>
  )
}
