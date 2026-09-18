import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { Logo } from '@/components/ui/Logo'
import { MarkRings } from '@/components/ui/MarkRings'
import { BRAND } from '@/content/site'
import { gsap, MOTION_OK } from '@fluxstride/design-system/lib/gsap'
import { useIsomorphicLayoutEffect } from '@fluxstride/design-system/lib/useIsomorphicLayoutEffect'

type StandaloneScreenProps = {
  /** Mono tag opposite the wordmark, e.g. "Error 404". */
  tag: string
  /** The h1: a plain line, a <br />, then an <Accent>. */
  title: ReactNode
  intro: ReactNode
  actions: ReactNode
  /** Right side of the foot, e.g. links or a status line. */
  foot: ReactNode
  /** Marks the markup so the client can tell which screen it is hydrating (see main.tsx). */
  screen?: string
}

/*
 * A full-screen page without the site header and footer: the 404 and maintenance screens.
 * Design: page-404-light and page-maintenance-light (1440×900; both have dark variants,
 * JMkxU and ZNb4s). Wordmark and tag on top, the message and actions in the middle, a
 * hairline foot. 40px top, 56px bottom padding.
 *
 * The rings are the hero's at 0.845× (unit = 84.5% of the screen height), centred at
 * 75% / 52%. The designs have no mobile frame; there they shrink and move to the lower
 * right so they sit behind the actions rather than the heading.
 */
export function StandaloneScreen({ tag, title, intro, actions, foot, screen }: StandaloneScreenProps) {
  const artRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    // Outside the site layout, so nothing else resets the scroll position.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    const art = artRef.current
    if (!art) return
    const q = gsap.utils.selector(art)
    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      const rings = q('[data-ring]').reverse()
      gsap.set(art, { opacity: 1 })
      art.dataset.revealReady = ''
      gsap
        .timeline({ delay: 0.2, defaults: { ease: 'expo.out' } })
        .from(q('[data-core]'), { scale: 0, duration: 1.4, ease: 'back.out(1.6)' })
        .from(rings, { scale: 0.7, opacity: 0, duration: 1.8, stagger: 0.12 }, 0.1)
        .add(() => {
          rings.forEach((ring, index) => {
            gsap.to(ring, {
              scale: 1.03,
              duration: 3.2,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              delay: index * 0.4,
            })
          })
        })
    })
    return () => media.revert()
  }, [])

  return (
    <div
      data-screen={screen}
      className="relative isolate flex min-h-svh flex-col justify-between gap-16 overflow-hidden bg-paper px-gutter pt-8 pb-10 lg:pt-10 lg:pb-14"
    >
      <div
        ref={artRef}
        aria-hidden="true"
        data-reveal="self"
        className="[container-type:size] absolute inset-0 -z-10"
      >
        <MarkRings
          tone="light"
          ringClassName="border-2"
          className="top-[86%] left-[85%] [--rings-unit:90cqw] lg:top-[52%] lg:left-[75%] lg:[--rings-unit:84.5cqh]"
        />
      </div>

      <header className="flex items-center justify-between">
        <Link to="/" aria-label={`${BRAND} home`} className="flex">
          {/* 1.2 line height, as the design's text box, so the row is 31px tall. */}
          <Logo className="text-[clamp(1.375rem,1.2821rem+0.381vw,1.625rem)] leading-[1.2]" />
        </Link>
        <p className="font-mono text-[13px]/[1.2] text-stone uppercase">{tag}</p>
      </header>

      <main className="flex flex-col gap-7 lg:w-160">
        <RevealText as="h1" on="mount" className="text-display-sm/[1] font-semibold">
          {title}
        </RevealText>
        <Reveal on="mount" delay={0.35} stagger={0.1} className="flex flex-col items-start gap-7">
          <p className="text-lead/[1.5] text-stone lg:w-130">{intro}</p>
          <div className="flex flex-wrap items-center gap-3">{actions}</div>
        </Reveal>
      </main>

      <footer className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-4.75 font-mono text-label/[1.2] text-stone uppercase">
        <p>
          © {new Date().getFullYear()} {BRAND}
        </p>
        {foot}
      </footer>
    </div>
  )
}
