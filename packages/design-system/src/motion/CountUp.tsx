import { useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect'

type CountUpProps = {
  /** The finished value exactly as it should read, e.g. "140+", "£38m", "4.9/5", "72%". */
  value: string
  className?: string
}

/**
 * Counts the first number in `value` up from zero when it scrolls into view.
 * The prerendered HTML (and screen readers) always get the finished value.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
    if (!element || !match) return

    const [, prefix, number, suffix] = match
    const target = Number(number)
    const decimals = number.includes('.') ? number.split('.')[1].length : 0
    const render = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      const counter = { n: 0 }
      element.textContent = render(0)
      gsap.to(counter, {
        n: target,
        duration: 1.6,
        ease: 'power3.out',
        onUpdate: () => {
          element.textContent = render(counter.n)
        },
        scrollTrigger: { trigger: element, start: 'top 90%', once: true },
      })
      return () => {
        element.textContent = value
      }
    })

    return () => media.revert()
  }, [value])

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </span>
  )
}
