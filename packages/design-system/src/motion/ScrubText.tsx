import { useRef, type RefObject } from 'react'
import { cn } from '../lib/cn'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect'

type ScrubTextProps = {
  children: string
  className?: string
  as?: 'p' | 'h2' | 'h3' | 'blockquote'
  /** Opacity of words that have not been read yet. */
  dim?: number
}

/**
 * A paragraph that lights up word by word as it scrolls through the viewport, tied to
 * the scrollbar rather than played once. Reading pace follows the visitor.
 * Reduced motion (and no JS): plain, fully visible text.
 */
export function ScrubText({ children, className, as = 'p', dim = 0.18 }: ScrubTextProps) {
  const ref = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      const words = element.querySelectorAll('[data-scrub-word]')
      gsap.fromTo(
        words,
        { opacity: dim },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: element, start: 'top 85%', end: 'bottom 55%', scrub: 0.6 },
        },
      )
    })

    return () => media.revert()
  }, [dim])

  // One concrete tag type keeps the ref typing simple; the rendered element is still `as`.
  const Tag = as as 'p'
  const words = children.split(' ')
  return (
    <Tag ref={ref as RefObject<HTMLParagraphElement>} className={cn(className)}>
      {words.map((word, index) => (
        <span key={index} data-scrub-word="">
          {word}
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
