import { CountUp } from '@fluxstride/design-system/motion/CountUp'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { Eyebrow } from '@fluxstride/design-system/ui/Typography'
import { facts, story } from '@/content/studio'

/*
 * Design: Studio / Story + Numbers.
 *
 * Story: 128px padding (72px mobile). A 400px column with the eyebrow and 32px lead,
 * 80px from three 20px paragraphs (17px on mobile) spaced 24px apart.
 * Numbers: four equal columns under an ink rule, 80px values (42px mobile), 15px
 * labels; hairlines between columns, or between stacked rows on mobile.
 */
export function StoryAndFacts() {
  return (
    <>
      <section
        aria-labelledby="story-title"
        className="container-page flex flex-col gap-6 py-18 lg:flex-row lg:gap-20 lg:py-32"
      >
        <div className="flex flex-col gap-4 lg:w-100 lg:shrink-0">
          <Reveal>
            <Eyebrow as="h2" id="story-title">
              Our story
            </Eyebrow>
          </Reveal>
          <RevealText as="p" className="text-title-lg text-ink">
            {story.lead}
          </RevealText>
        </div>
        <Reveal stagger={0.1} className="flex flex-1 flex-col gap-6">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-lead leading-[1.55] text-ink">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </section>

      <FactRow facts={facts} />
    </>
  )
}

type Fact = { value: string; label: string; count?: boolean }

/** Numbers: also under the photo on /careers. */
export function FactRow({ facts }: { facts: Fact[] }) {
  return (
    <div className="container-page pb-18 lg:pb-32">
      <Reveal as="dl" stagger={0.08} className="flex flex-col border-t border-ink lg:grid lg:grid-cols-4">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col-reverse justify-end gap-1.5 py-6 not-first:border-t not-first:border-line lg:gap-2.5 lg:pt-8 lg:pr-6 lg:pb-0 lg:not-first:border-t-0 lg:not-first:border-l lg:not-first:pl-6"
          >
            {/* Label first in the markup so screen readers hear "Founded: 2019". */}
            <dt className="text-[15px]/[1.2] text-stone">{fact.label}</dt>
            <dd className="text-numeral-md text-ink">
              {fact.count === false ? fact.value : <CountUp value={fact.value} />}
            </dd>
          </div>
        ))}
      </Reveal>
    </div>
  )
}
