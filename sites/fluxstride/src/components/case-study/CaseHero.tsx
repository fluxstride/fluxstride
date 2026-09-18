import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import type { CaseStudy } from '@/content/case-studies/schema'
import { MediaView } from './MediaView'

type CaseHeroProps = { study: CaseStudy; serviceNames: string[] }

/*
 * Design: Case Study — Hero.
 *   Breadcrumbs  "← All work" left, "Work / Industry / Client" right; 32px from the nav (20px)
 *   Hero         eyebrow, 112px title with the serif phrase on its own line (48px mobile),
 *                520px intro beside a 3×2 grid of facts (2 columns on mobile)
 *   Visual       full container width: 760px photo (420px mobile), or a browser screenshot
 *                at its own proportions
 */
export function CaseHero({ study, serviceNames }: CaseHeroProps) {
  const { hero } = study
  const tags = hero.tags ?? [study.industry, ...serviceNames, study.year || '[Year]']

  return (
    <header>
      <div className="container-page flex items-center justify-between gap-4 pt-5 lg:pt-8">
        <Link
          to="/work"
          className="inline-flex items-center gap-2.5 text-sm/[1.2] font-medium transition-colors hover:text-flux lg:text-[15px]/[1.2]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
          All work
        </Link>
        <Eyebrow className="truncate max-lg:text-[10px]/[1.3] lg:text-label-sm">
          Work / {study.industry} / {study.client}
        </Eyebrow>
      </div>

      <div className="container-page flex flex-col gap-6 pt-8 pb-10 lg:gap-12 lg:pt-14 lg:pb-18">
        <Reveal on="mount">
          <Eyebrow className="max-lg:text-[10px]/[1.6]">(Case study) {tags.join(' · ')}</Eyebrow>
        </Reveal>
        <RevealText as="h1" on="mount" delay={0.1} className="text-display-case text-ink">
          {hero.title[0]}
          <br />
          <Accent className="leading-none lg:text-[1.107em]">{hero.title[1]}</Accent>
        </RevealText>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-24">
          <Reveal
            as="p"
            on="mount"
            delay={0.3}
            className="text-[17px]/[1.55] text-stone lg:w-130 lg:shrink-0 lg:text-[1.375rem]/[1.5] lg:text-ink"
          >
            {hero.intro}
          </Reveal>
          <Reveal
            as="dl"
            on="mount"
            delay={0.4}
            stagger={0.05}
            className="grid flex-1 grid-cols-2 lg:grid-cols-3"
          >
            {hero.facts.map(([label, value]) => (
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

      <Reveal on="mount" delay={0.5} className="container-page">
        <MediaView
          media={hero.media}
          frame={hero.frame}
          sizes="(min-width: 90rem) 1280px, 100vw"
          aspectClassName={hero.frame === 'plain' ? 'aspect-[35/42] lg:aspect-[128/76]' : undefined}
          priority
        />
      </Reveal>
    </header>
  )
}
