import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { ButtonLink } from '@/components/ui/Button'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import { contactLink } from '@/content/site'
import { HeroVisual } from './HeroVisual'

/*
 * Design: Home / Hero (desktop) and Home Mobile / Hero.
 *
 *              mobile (390)                        desktop (1440)
 * padding      24 top, 48 bottom                   40 top, 72 bottom
 * headline     58px, lh 0.95, serif 64px           144px, lh 0.92, serif 164px
 * line breaks  We build / software that /          We build software /
 *              keeps moving. (both serif)          that keeps moving. (only "moving." serif)
 * lower        stacked, 28px gaps, one CTA          420px intro column | visual, 380px tall
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="container-page pt-[clamp(1.5rem,1.1286rem+1.5238vw,2.5rem)] pb-[clamp(3rem,2.4429rem+2.2857vw,4.5rem)]"
    >
      <div className="@container flex flex-col gap-7 lg:gap-6">
        <Reveal on="mount" className="flex justify-between gap-6">
          <Eyebrow className="max-lg:text-label-sm">(01) Independent digital agency</Eyebrow>
          <Eyebrow className="max-lg:hidden">Design · Build · Run</Eyebrow>
        </Reveal>

        {/* On desktop the size is also capped by the container (11.25cqw = 144px at 1280px wide)
            so "We build software" stays on one line on laptops narrower than the canvas. */}
        <RevealText
          as="h1"
          id="hero-title"
          on="mount"
          stagger={0.06}
          className="text-display-2xl leading-[0.95] lg:text-[length:min(var(--text-display-2xl),11.25cqw)] lg:leading-[0.92]"
        >
          We build software <br className="max-lg:hidden" />
          that <br className="lg:hidden" />
          <span className="max-lg:font-serif max-lg:text-[1.103em] max-lg:font-normal max-lg:italic">
            keeps
          </span>{' '}
          <Accent className="text-[1.103em] lg:text-[1.139em]">moving.</Accent>
        </RevealText>
      </div>

      <div className="mt-7 flex flex-col gap-7 lg:mt-12 lg:h-95 lg:flex-row lg:gap-10">
        <div className="flex flex-col gap-7 lg:w-105 lg:shrink-0 lg:justify-between lg:border-t lg:border-ink lg:pt-5">
          <Reveal on="mount" delay={0.45} as="p" className="text-lead">
            <span className="lg:hidden">
              Product design, branding, web, mobile, backend and cloud under one roof.
            </span>
            <span className="max-lg:hidden">
              Fluxstride is a design and engineering studio. We design products and brands, build the
              websites, apps and backends behind them, and run it all in the cloud.
            </span>
          </Reveal>

          <Reveal on="mount" delay={0.6} className="flex items-center gap-3">
            <ButtonLink
              to={contactLink.to}
              block
              className="lg:inline-flex lg:w-auto lg:justify-start lg:px-6"
            >
              {contactLink.label}
            </ButtonLink>
            <ButtonLink to="/work" variant="outline" arrow={null} className="max-lg:hidden">
              See our work
            </ButtonLink>
          </Reveal>
        </div>

        <HeroVisual className="h-[clamp(15rem,11.75rem+13.3333vw,23.75rem)] lg:h-auto lg:flex-1" />
      </div>
    </section>
  )
}
