import {
  Children,
  cloneElement,
  createElement,
  Fragment,
  isValidElement,
  useRef,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'
import { gsap, MOTION_OK } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'

type RevealTextProps = {
  /** Plain text and inline elements such as <Accent>. Each word animates separately. */
  children: ReactNode
  as?: HeadingTag
  className?: string
  id?: string
  delay?: number
  /** Seconds between words. */
  stagger?: number
  /** 'auto' plays straight away when the heading is already on screen, otherwise on scroll. */
  on?: 'auto' | 'scroll' | 'mount'
}

/**
 * Lifts a heading into view word by word, each word rising out of its own mask.
 *
 * Screen readers get the sentence once, intact: the animated copy is aria-hidden
 * and a visually hidden copy carries the text. Inline elements (like <Accent>)
 * keep their styling because each of their words is wrapped in a clone of them.
 */
export function RevealText({
  children,
  as = 'h2',
  className,
  id,
  delay = 0,
  stagger = 0.045,
  on = 'auto',
}: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      const words = element.querySelectorAll('[data-word]')
      if (words.length === 0) return

      const onScreen = element.getBoundingClientRect().top < window.innerHeight * 0.92
      const playNow = on === 'mount' || (on === 'auto' && onScreen)

      // y: 0 discards the pre-paint translateY from motion.css, which GSAP would otherwise
      // read as a pixel offset and keep on top of yPercent, leaving the words stuck below.
      gsap.set(words, { y: 0, yPercent: 110 })
      element.dataset.revealReady = ''
      gsap.to(words, {
        yPercent: 0,
        duration: 1,
        ease: 'power4.out',
        delay,
        stagger,
        scrollTrigger: playNow ? undefined : { trigger: element, start: 'top 90%', once: true },
      })
    })

    return () => media.revert()
  }, [delay, on, stagger])

  return createElement(
    as,
    { id, className },
    <>
      <span className="sr-only">{plainText(children)}</span>
      <span ref={ref} aria-hidden="true" data-reveal="words">
        {splitWords(children)}
      </span>
    </>,
  )
}

/** One masked word. The padding/negative-margin pair gives descenders and italic overhang room. */
function maskedWord(text: string, key: string) {
  return (
    <span
      key={key}
      className="-mx-[0.08em] -mb-[0.14em] inline-block overflow-hidden px-[0.08em] pb-[0.14em] align-bottom"
    >
      <span data-word="" className="inline-block will-change-transform">
        {text}
      </span>
    </span>
  )
}

function splitWords(node: ReactNode, path = 'w'): ReactNode[] {
  const out: ReactNode[] = []

  Children.toArray(node).forEach((child, index) => {
    const key = `${path}-${index}`

    if (typeof child === 'string' || typeof child === 'number') {
      // Keep whitespace as real text nodes between masks so lines can still wrap.
      String(child)
        .split(/(\s+)/)
        .forEach((part, i) => {
          if (!part) return
          out.push(/\s/.test(part) ? ' ' : maskedWord(part, `${key}-${i}`))
        })
      return
    }

    if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode; className?: string }>
      // Fragments (a title passed in as a prop) are just their contents.
      if (element.type === Fragment) {
        out.push(...splitWords(element.props.children, key))
        return
      }
      // Forced line breaks pass straight through.
      if (element.type === 'br') {
        out.push(cloneElement(element, { key }))
        return
      }
      // Wrap each inner word in a copy of the element, so <Accent>moving on</Accent>
      // becomes two masked words that are both still accented.
      splitWords(element.props.children, key).forEach((inner, i) => {
        if (typeof inner === 'string') {
          out.push(inner)
          return
        }
        out.push(
          cloneElement(
            element,
            { key: `${key}-${i}`, className: cn(element.props.className, 'inline-block') },
            inner,
          ),
        )
      })
    }
  })

  return out
}

function plainText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child)
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return child.type === 'br' ? ' ' : plainText(child.props.children)
      }
      return ''
    })
    .join('')
}
