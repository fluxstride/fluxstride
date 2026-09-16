import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { gsap, MOTION_OK, ScrollTrigger } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect'

type MarqueeProps = {
  children: ReactNode
  /** Seconds for one full pass at rest. Higher is slower. */
  duration?: number
  className?: string
}

/**
 * Endlessly scrolling row. The content is rendered twice so the loop never shows a seam.
 *
 * Scrolling the page gives the band a brief push in the scroll direction, then it
 * eases back to its resting speed. Hovering pauses it. Reduced motion: it stays still.
 */
export function Marquee({ children, duration = 40, className }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      const loop = gsap.to(track, { xPercent: -50, duration, ease: 'none', repeat: -1 })

      const settle = gsap.quickTo(loop, 'timeScale', { duration: 0.9, ease: 'power3.out' })
      const trigger = ScrollTrigger.create({
        trigger: track,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const push = gsap.utils.clamp(-4, 4, self.getVelocity() / 350)
          loop.timeScale(1 + Math.abs(push))
          settle(1)
        },
      })

      const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.6, ease: 'power2.out' })
      const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.6, ease: 'power2.in' })
      track.addEventListener('pointerenter', pause)
      track.addEventListener('pointerleave', resume)

      return () => {
        trigger.kill()
        track.removeEventListener('pointerenter', pause)
        track.removeEventListener('pointerleave', resume)
      }
    })

    return () => media.revert()
  }, [duration])

  return (
    <div className={cn('overflow-hidden', className)}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div aria-hidden="true" className="flex shrink-0">
          {children}
        </div>
      </div>
    </div>
  )
}
