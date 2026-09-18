import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap, MOTION_OK } from '@fluxstride/design-system/lib/gsap'
import { useIsomorphicLayoutEffect } from '@fluxstride/design-system/lib/useIsomorphicLayoutEffect'
import { DrawRule } from '@fluxstride/design-system/motion/DrawRule'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { ButtonAnchor } from '@fluxstride/design-system/ui/Button'
import { HERO, PERSON, STUDIO } from '@/content/site'
import { external, samButton } from '@/lib/external'
import { Availability } from './Nav'
import { Accent, Eyebrow, FluxDot, Img } from './ui'

/** Samuel's local time, ticking. Blank on the server so hydration never disagrees. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      timeZone: PERSON.timeZone,
      hour: '2-digit',
      minute: '2-digit',
    })
    const tick = () => setTime(format.format(new Date()))
    tick()
    const timer = window.setInterval(tick, 15_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <time suppressHydrationWarning className="tabular-nums">
      {time ?? '--:--'} {PERSON.timeZoneLabel}
    </time>
  )
}

/*
 * Motion: the headline rises word by word, the full stop drops in and bounces, then the
 * rule draws across and the details below it follow. Scrolling away, the headline
 * lifts slightly faster than the page, and the serif line drifts right.
 *
 * Lower row: stacked on phones, two columns on tablets (intro across the top), and the
 * design's four columns from xl, so nothing gets squeezed in between.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const section = ref.current
    if (!section) return
    const q = gsap.utils.selector(section)

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      const scroll = { trigger: section, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(q('[data-hero-title]'), { yPercent: -18, ease: 'none', scrollTrigger: scroll })
      // RevealText wraps each serif word in its own clone of <Accent>, so move them by a
      // fixed distance (with the full stop) rather than a percentage of each word.
      gsap.to(q('[data-hero-title] .font-serif, [data-hero-title] .bg-flux'), {
        x: () => window.innerWidth * 0.04,
        ease: 'none',
        scrollTrigger: scroll,
      })
    })
    return () => media.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="container-page overflow-x-clip pt-8 pb-12 lg:pt-14 lg:pb-18"
    >
      <Reveal on="mount" className="mb-8 min-[90rem]:hidden">
        <Availability />
      </Reveal>
      <Reveal on="mount" className="flex justify-between gap-6 max-md:hidden">
        <Eyebrow>{HERO.eyebrow}</Eyebrow>
        <Eyebrow>
          Lagos, NG · {PERSON.coordinates} · <LocalTime />
        </Eyebrow>
      </Reveal>

      <div data-hero-title="">
        <RevealText
          as="h1"
          id="hero-title"
          on="mount"
          stagger={0.06}
          className="text-sam-hero tracking-[-0.02em] md:mt-8 lg:mt-14"
        >
          {HERO.lines[0]}
          <br className="max-md:hidden" /> {HERO.lines[1]}
          <br /> <Accent className="text-sam-hero-accent">{HERO.accent}</Accent>
          <FluxDot on="mount" delay={1.05} />
        </RevealText>
      </div>

      <DrawRule className="mt-8 h-px bg-ink lg:mt-14" />

      <Reveal
        on="mount"
        delay={0.9}
        stagger={0.1}
        className="grid gap-8 pt-6 md:grid-cols-2 md:gap-x-10 lg:pt-7 xl:grid-cols-[minmax(0,1fr)_14rem_15rem_13.75rem] xl:gap-12"
      >
        <div className="flex gap-4.5 md:col-span-2 md:max-w-2xl xl:col-span-1">
          <Img
            name="portrait"
            alt={PERSON.name}
            sizes="64px"
            eager
            className="size-16 shrink-0 rounded-full object-cover max-md:hidden"
          />
          <p className="text-body-lg md:text-[1.0625rem]/[1.5]">{HERO.intro}</p>
        </div>

        <a href={STUDIO.url} {...external} className="group flex gap-2.5 max-md:items-center md:flex-col">
          <span className="flex items-center gap-1.5">
            <Eyebrow className="text-label-sm">
              <span className="md:hidden">Now</span>
              <span className="max-md:hidden">Currently</span>
            </Eyebrow>
            <ArrowUpRight
              size={13}
              className="text-flux transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 max-md:hidden"
              aria-hidden="true"
            />
          </span>
          <span className="text-sm font-medium md:text-[1.0625rem]/[1.4]">
            Founder & lead engineer <span className="max-md:hidden">at</span>
            <span className="md:hidden">,</span>{' '}
            <span className="underline-offset-4 group-hover:underline">{STUDIO.name}</span>
          </span>
          <ArrowUpRight size={14} className="text-flux md:hidden" aria-hidden="true" />
        </a>

        <div className="flex flex-col gap-2.5 max-md:hidden">
          <Eyebrow className="text-label-sm">Focus</Eyebrow>
          <p className="text-[1.0625rem]/[1.4] font-medium">{HERO.focus}</p>
        </div>

        <div className="flex flex-col gap-2.5 md:col-span-2 md:flex-row xl:col-span-1 xl:flex-col">
          <ButtonAnchor href="#contact" block size="inline" className={samButton}>
            Start a project
          </ButtonAnchor>
          <ButtonAnchor
            href={PERSON.resume}
            {...external}
            variant="outline"
            block
            size="inline"
            arrow="down"
            className={samButton}
          >
            Download CV
          </ButtonAnchor>
        </div>
      </Reveal>
    </section>
  )
}
