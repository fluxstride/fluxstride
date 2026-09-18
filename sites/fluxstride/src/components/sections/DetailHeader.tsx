import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { ButtonLink } from '@/components/ui/Button'
import { Accent, Eyebrow } from '@/components/ui/Typography'

type DetailHeaderProps = {
  /** "← All roles": where the page sits. */
  back: { to: string; label: string }
  /** Mono trail on the right: "Careers / Product Designer" */
  trail: string
  eyebrow: string
  /** The h1, split where the design switches to the serif: ['Websites that', 'win customers.']. */
  heading: [sans: string, serif: string]
  intro: string
  action: { to: string; label: string }
  /** Six label/value pairs beside the intro. */
  facts: [label: string, value: string][]
}

/*
 * Design: the header of a role page (Careers · Job Description) and a service page
 * (Service · <name>), itself the case study hero without the visual.
 *   Breadcrumbs  back link left, mono trail right; 32px from the nav (20px on mobile)
 *   Header       eyebrow, the title with its serif phrase on a second line (display-case),
 *                then the 520px intro and button beside a 3×2 grid of facts (2 columns on mobile)
 */
export function DetailHeader({ back, trail, eyebrow, heading, intro, action, facts }: DetailHeaderProps) {
  const [sans, serif] = heading

  return (
    <header>
      <div className="container-page flex items-center justify-between gap-4 pt-5 lg:pt-8">
        <Link
          to={back.to}
          className="inline-flex shrink-0 items-center gap-2.5 text-sm/[1.2] font-medium transition-colors hover:text-flux lg:text-[15px]/[1.2]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
          {back.label}
        </Link>
        <Eyebrow className="truncate max-lg:text-[10px]/[1.3] lg:text-label-sm">{trail}</Eyebrow>
      </div>

      <div className="container-page flex flex-col gap-6 pt-8 pb-12 lg:gap-12 lg:pt-14 lg:pb-18">
        <Reveal on="mount">
          <Eyebrow className="max-lg:text-[10px]/[1.6]">{eyebrow}</Eyebrow>
        </Reveal>
        <RevealText as="h1" on="mount" delay={0.1} className="text-display-case text-ink">
          {sans}
          <br />
          <Accent className="leading-none lg:text-[1.107em]">{serif}</Accent>
        </RevealText>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-24">
          <Reveal
            on="mount"
            delay={0.3}
            className="flex flex-col items-start gap-6 lg:w-130 lg:shrink-0 lg:gap-8"
          >
            <p className="text-[17px]/[1.55] text-stone lg:text-[1.375rem]/[1.5] lg:text-ink">{intro}</p>
            <ButtonLink to={action.to} className="max-lg:w-full max-lg:justify-between">
              {action.label}
            </ButtonLink>
          </Reveal>
          <Reveal
            as="dl"
            on="mount"
            delay={0.4}
            stagger={0.05}
            className="grid flex-1 grid-cols-2 content-start lg:grid-cols-3"
          >
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col gap-1.5 border-t border-line pt-3.25 pr-4 pb-3.5 lg:pt-4.25 lg:pb-4.5"
              >
                <dt className="font-mono text-[10px]/[1.3] text-stone uppercase lg:text-label-sm">{label}</dt>
                <dd className="text-[15px]/[1.35] font-semibold lg:text-[17px]/[1.35]">{value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </header>
  )
}
