import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { Section } from '@/components/ui/Section'
import { TextLink } from '@/components/ui/TextLink'
import { Accent, Eyebrow } from '@fluxstride/design-system/ui/Typography'
import { CaseCard } from '@/components/work/CaseCard'
import { caseStudies, PROJECT_COUNT } from '@/content/work'

/*
 * Design: Home / Selected Work (ink).
 *
 * Desktop: two staggered rows with 24px gutters and 64px between rows.
 *   Row 1  first case study (fills, 600px tall) | second (500px column, 460px, bottom-aligned)
 *   Row 2  third (500px column, 520px) | fourth (fills, 520px)
 * The 500px columns are 39.0625% of the 1280px content width, so the layout
 * keeps its proportions on laptops narrower than the canvas.
 *
 * Mobile: one column, 32px between groups, image heights 300 / 230 / 260 / 260 on a
 * 350px-wide canvas, kept here as aspect ratios so tablets scale in proportion.
 *
 * The four cards come from the published case studies, in the curated order in work.ts, so
 * the section holds its shape whether there are two real projects or ten. A row with one card
 * left in it gives that card the full width rather than leaving a gap.
 */
export function SelectedWork() {
  const [first, second, third, fourth] = caseStudies

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
          study={first}
          imageClassName="aspect-[7/6] lg:aspect-auto lg:h-150"
          sizes={second ? '(min-width: 64rem) 58vw, 100vw' : '(min-width: 90rem) 1280px, 100vw'}
          className="lg:flex-1"
        />
        {second ? (
          <CaseCard
            study={second}
            imageClassName="aspect-[35/23] lg:aspect-auto lg:h-115"
            sizes="(min-width: 64rem) 35vw, 100vw"
            className="lg:w-[39.0625%]"
          />
        ) : null}
      </div>

      {third ? (
        <div className="flex flex-col gap-6 lg:flex-row">
          <CaseCard
            study={third}
            imageClassName="aspect-[35/26] lg:aspect-auto lg:h-130"
            sizes={fourth ? '(min-width: 64rem) 35vw, 100vw' : '(min-width: 90rem) 1280px, 100vw'}
            className={fourth ? 'lg:w-[39.0625%]' : 'lg:flex-1'}
          />
          {fourth ? (
            <CaseCard
              study={fourth}
              imageClassName="aspect-[35/26] lg:aspect-auto lg:h-130"
              sizes="(min-width: 64rem) 58vw, 100vw"
              className="lg:flex-1"
            />
          ) : null}
        </div>
      ) : null}
    </Section>
  )
}
