import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { Section } from '@/components/ui/Section'
import { TextLink } from '@/components/ui/TextLink'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import { CaseCard } from '@/components/work/CaseCard'
import { caseStudy, PROJECT_COUNT } from '@/content/work'

/*
 * Design: Home / Selected Work (ink).
 *
 * Desktop: two staggered rows with 24px gutters and 64px between rows.
 *   Row 1  Northwind (fills, 600px tall) | Halden Coffee (500px column, 460px, bottom-aligned)
 *   Row 2  Orbit Health (500px column, 520px) | Kinetic Labs (fills, 520px)
 * The 500px columns are 39.0625% of the 1280px content width, so the layout
 * keeps its proportions on laptops narrower than the canvas.
 *
 * Mobile: one column, 32px between groups, image heights 300 / 230 / 260 / 260 on a
 * 350px-wide canvas, kept here as aspect ratios so tablets scale in proportion.
 */
export function SelectedWork() {
  return (
    <Section tone="ink" id="work" labelledBy="work-title" className="flex flex-col gap-8 lg:gap-16">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow onDark>(03) Selected work</Eyebrow>
          </Reveal>
          {/* Mobile stacks the two phrases 20px apart: a 1.42 line-height gives that gap,
              and the negative margin cancels the extra half-leading above and below. */}
          <RevealText
            id="work-title"
            className="text-heading-xl text-paper max-lg:-mt-2 max-lg:-mb-2.5 max-lg:leading-[1.42]"
          >
            Work that <br className="lg:hidden" />
            <Accent className="max-lg:text-[0.925em]">moved the needle.</Accent>
          </RevealText>
        </div>
        <Reveal delay={0.15} className="shrink-0">
          <TextLink to="/work" className="text-paper">
            All case studies ({PROJECT_COUNT})
          </TextLink>
        </Reveal>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
        <CaseCard
          study={caseStudy('northwind')}
          imageClassName="aspect-[7/6] lg:aspect-auto lg:h-150"
          sizes="(min-width: 64rem) 58vw, 100vw"
          className="lg:flex-1"
        />
        <CaseCard
          study={caseStudy('halden-coffee')}
          imageClassName="aspect-[35/23] lg:aspect-auto lg:h-115"
          sizes="(min-width: 64rem) 35vw, 100vw"
          className="lg:w-[39.0625%]"
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <CaseCard
          study={caseStudy('orbit-health')}
          imageClassName="aspect-[35/26] lg:aspect-auto lg:h-130"
          sizes="(min-width: 64rem) 35vw, 100vw"
          className="lg:w-[39.0625%]"
        />
        <CaseCard
          study={caseStudy('kinetic-labs')}
          imageClassName="aspect-[35/26] lg:aspect-auto lg:h-130"
          sizes="(min-width: 64rem) 58vw, 100vw"
          className="lg:flex-1"
        />
      </div>
    </Section>
  )
}
