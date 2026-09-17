import { Fragment, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { ButtonLink } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { MarkRings } from '@/components/ui/MarkRings'
import { Accent } from '@/components/ui/Typography'
import { BRAND } from '@/content/site'
import { gsap, MOTION_OK } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect'
import { useSeo } from '@/lib/useSeo'

const footLinks = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

/*
 * Design: page-404-light (1440×900; there is also a dark variant, JMkxU). A standalone
 * screen without the site header and footer: wordmark and "Error 404" on top, the message
 * and two actions in the middle, a hairline foot. 40px top, 56px bottom padding.
 *
 * The rings are the hero's at 0.845× (unit = 84.5% of the screen height), centred at
 * 75% / 52%. The design has no mobile frame; there they shrink and move to the lower
 * right so they sit behind the actions rather than the heading.
 */
export function NotFound() {
  const { pathname } = useLocation()
  useSeo(pathname)
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
    <div className="relative isolate flex min-h-svh flex-col justify-between gap-16 overflow-hidden bg-paper px-gutter pt-8 pb-10 lg:pt-10 lg:pb-14">
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
        <p className="font-mono text-[13px]/[1.2] text-stone uppercase">Error 404</p>
      </header>

      <main className="flex flex-col gap-7 lg:w-160">
        <RevealText as="h1" on="mount" className="text-display-sm/[1] font-semibold">
          This page took <br />
          <Accent>a wrong turn.</Accent>
        </RevealText>
        <Reveal on="mount" delay={0.35} stagger={0.1} className="flex flex-col items-start gap-7">
          <p className="text-lead/[1.5] text-stone lg:w-130">
            The link may be broken or the page may have moved. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink to="/" className="px-5.5 py-4">
              Back to home
            </ButtonLink>
            <ButtonLink to="/work" variant="outline" arrow={null} className="px-4.75 py-3.75">
              View our work
            </ButtonLink>
          </div>
        </Reveal>
      </main>

      <footer className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-4.75 font-mono text-label/[1.2] text-stone uppercase">
        <p>
          © {new Date().getFullYear()} {BRAND}
        </p>
        <nav aria-label="Popular pages">
          {footLinks.map((link, i) => (
            <Fragment key={link.to}>
              {i > 0 ? ' · ' : null}
              <Link to={link.to} className="transition-colors hover:text-ink">
                {link.label}
              </Link>
            </Fragment>
          ))}
        </nav>
      </footer>
    </div>
  )
}
