import { useRef, type ReactNode, type RefObject } from 'react'
import { gsap, MOTION_OK } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect'

type RevealTag =
  'div' | 'section' | 'article' | 'header' | 'figure' | 'ul' | 'ol' | 'dl' | 'p' | 'li' | 'span'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Animate direct children one after another. Pass a number to set the gap in seconds. */
  stagger?: boolean | number
  delay?: number
  /** Distance to rise, in px. */
  y?: number
  /** 'scroll' waits until the block scrolls into view, 'mount' plays straight away. */
  on?: 'scroll' | 'mount'
  as?: RevealTag
  id?: string
}

/**
 * Fades and lifts a block (or each of its children) into place.
 *
 * No-flash contract (see "Motion" in docs/animations.md):
 *   - `data-reveal` makes the element start hidden before first paint, but only when
 *     JS is running and the visitor allows motion (styles/motion.css).
 *   - Once GSAP has taken over it sets `data-reveal-ready`, which releases the CSS rule.
 *   - If JS never runs, a CSS failsafe shows the content after a moment.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  y = 24,
  on = 'scroll',
  as = 'div',
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      const targets = stagger ? Array.from(element.children) : [element]
      gsap.set(targets, { opacity: 0, y })
      element.dataset.revealReady = ''

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        delay,
        stagger: stagger === false ? 0 : typeof stagger === 'number' ? stagger : 0.08,
        scrollTrigger: on === 'scroll' ? { trigger: element, start: 'top 88%', once: true } : undefined,
      })
    })

    return () => media.revert()
  }, [delay, on, stagger, y])

  // One concrete tag type keeps the ref typing simple; the rendered element is still `as`.
  const Tag = as as 'div'
  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement>}
      id={id}
      className={className}
      data-reveal={stagger ? 'children' : 'self'}
    >
      {children}
    </Tag>
  )
}
