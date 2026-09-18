import { CountUp } from '@fluxstride/design-system/motion/CountUp'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@fluxstride/design-system/ui/Typography'
import { clientLogos } from '@/content/logos.generated'
import { stats } from '@/content/proof'
import { cn } from '@fluxstride/design-system/lib/cn'
import { TestimonialCarousel } from './TestimonialCarousel'

/*
 * Design: Home / Proof (paper-2). Three blocks, 96px apart (40px on mobile):
 *   Stats        ink rule; four columns split by hairlines (stacked rows on mobile)
 *   Testimonial  rotating quotes with a progress timer (TestimonialCarousel)
 *   Logos        wordmarks spread between two hairlines (a left-aligned list on mobile)
 */
export function ProofSection() {
  return (
    <Section tone="paper-2" id="proof" labelledBy="proof-title" className="flex flex-col gap-10 lg:gap-24">
      <Stats />
      <Reveal>
        <TestimonialCarousel />
      </Reveal>
      <Logos />
    </Section>
  )
}

function Stats() {
  return (
    <div className="flex flex-col gap-7">
      <Reveal>
        <Eyebrow as="h2" id="proof-title">
          (05) Proof, not promises
        </Eyebrow>
      </Reveal>
      <Reveal as="dl" stagger={0.1} className="flex flex-col border-t border-ink lg:grid lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              'flex flex-col gap-3 py-6 lg:pt-8 lg:pr-6 lg:pb-0',
              index > 0 && 'border-line max-lg:border-t lg:border-l lg:pl-6',
            )}
          >
            <dt className="order-2 text-[15px] leading-[1.4] text-stone">{stat.label}</dt>
            <dd className="order-1 text-numeral-lg">
              <CountUp value={stat.value} />
            </dd>
          </div>
        ))}
      </Reveal>
    </div>
  )
}

function Logos() {
  return (
    <div className="flex flex-col gap-7">
      <Reveal>
        <Eyebrow>Trusted by teams at</Eyebrow>
      </Reveal>
      {/* Wordmarks are 25px → 30px type, drawn as outlines (scripts/build-logos.mjs). */}
      <Reveal
        as="ul"
        stagger={0.06}
        y={12}
        className="flex flex-col items-start gap-5 border-y border-line py-8 text-[clamp(1.5625rem,1.4464rem+0.4762vw,1.875rem)] text-stone lg:flex-row lg:items-center lg:justify-between"
      >
        {clientLogos.map((logo) => (
          <li key={logo.slug}>
            <svg
              role="img"
              aria-label={logo.name}
              viewBox={logo.viewBox}
              style={{ height: `${logo.height / 100}em`, width: `${logo.width / 100}em` }}
              className="block fill-current transition-colors duration-300 hover:text-ink"
            >
              <path d={logo.d} />
            </svg>
          </li>
        ))}
      </Reveal>
    </div>
  )
}
