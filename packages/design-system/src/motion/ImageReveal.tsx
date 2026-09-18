import { useRef, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect'

type ImageRevealProps = {
  /** The image layer. It is scaled up slightly and drifts as the page scrolls. */
  image: ReactNode
  /** Anything laid over the image (badges, captions). Revealed with it, but does not drift. */
  children?: ReactNode
  /** Size the frame here (height or aspect ratio). */
  className?: string
}

/**
 * A framed image that wipes open from the bottom when it scrolls into view, then
 * drifts gently inside its frame while the page scrolls (parallax).
 * Reduced motion: shown as-is, no wipe, no drift.
 */
export function ImageReveal({ image, children, className }: ImageRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const frame = frameRef.current
    const layer = layerRef.current
    if (!frame || !layer) return

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      gsap.set(frame, { opacity: 1, clipPath: 'inset(100% 0% 0% 0%)' })
      frame.dataset.revealReady = ''

      gsap.to(frame, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: frame, start: 'top 90%', once: true },
      })
      gsap.fromTo(
        layer,
        { yPercent: -6, scale: 1.14 },
        {
          yPercent: 6,
          scale: 1.14,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })

    return () => media.revert()
  }, [])

  return (
    <div ref={frameRef} data-reveal="self" className={cn('relative isolate overflow-hidden', className)}>
      <div ref={layerRef} className="absolute inset-0 -z-10">
        {image}
      </div>
      {children}
    </div>
  )
}
