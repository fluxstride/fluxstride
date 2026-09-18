import { useRef, type ReactNode } from 'react'
import { gsap, MOTION_OK } from '@fluxstride/design-system/lib/gsap'
import { useIsomorphicLayoutEffect } from '@fluxstride/design-system/lib/useIsomorphicLayoutEffect'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { images, type ImageName } from '@/content/images.generated'
import { cn } from '@/lib/cn'

export { Eyebrow } from '@fluxstride/design-system/ui/Typography'

/** The serif italic phrase inside a headline. Sized by the sam-* token passed in. */
export function Accent({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('font-serif font-normal italic', className)}>{children}</span>
}

/**
 * The flux-blue full stop that ends the hero headline and the footer wordmark.
 * It drops in after the words have landed and settles with a small bounce.
 */
export function FluxDot({
  className,
  on = 'scroll',
  delay = 0,
}: {
  className?: string
  on?: 'mount' | 'scroll'
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useIsomorphicLayoutEffect(() => {
    const dot = ref.current
    if (!dot) return
    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      gsap.set(dot, { opacity: 1 })
      dot.dataset.revealReady = ''
      gsap.from(dot, {
        y: '-3em',
        scale: 0.4,
        duration: 1.1,
        delay,
        ease: 'bounce.out',
        scrollTrigger: on === 'scroll' ? { trigger: dot, start: 'top 95%', once: true } : undefined,
      })
    })
    return () => media.revert()
  }, [delay, on])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-reveal="self"
      className={cn('ml-[0.06em] inline-block size-[0.2em] rounded-full bg-flux align-baseline', className)}
    />
  )
}

/** Section headline: a sans phrase then a serif one, e.g. "Things I've *shipped.*" */
export function SectionTitle({
  plain,
  accent,
  id,
  className,
}: {
  plain: string
  accent: string
  id?: string
  className?: string
}) {
  return (
    <RevealText as="h2" id={id} className={cn('text-sam-title', className)}>
      {plain} <Accent className="text-sam-title-accent">{accent}</Accent>
    </RevealText>
  )
}

/** Responsive <img> from the generated manifest (scripts/import-images.mjs). */
export function Img({
  name,
  alt,
  sizes,
  className,
  eager,
}: {
  name: ImageName
  alt: string
  sizes: string
  className?: string
  eager?: boolean
}) {
  const image = images[name]
  const largest = image.variants[image.variants.length - 1]
  return (
    <img
      src={largest.src}
      srcSet={image.variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ')}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}
