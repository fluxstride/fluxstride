import { useEffect, useState } from 'react'

/**
 * Scroll-spy for one-page sites: the id of the last section whose top has passed the
 * middle of the viewport, or null above the first one. Nav items use it to keep their
 * underline drawn.
 *
 * Measured from scroll position rather than IntersectionObserver, so a jump (the
 * "Back to top" link, a hash) always lands on the right answer.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.45
      let current: string | null = null
      for (const id of ids) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
