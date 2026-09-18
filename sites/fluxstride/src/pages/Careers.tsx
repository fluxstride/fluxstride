import { LegalBlockView } from '@/components/legal/LegalBlocks'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { CtaBand } from '@/components/sections/CtaBand'
import { ValueGrid } from '@/components/sections/ValueGrid'
import { CareersSection } from '@/components/studio/CareersSection'
import { FactRow } from '@/components/studio/StoryAndFacts'
import { StudioPhoto } from '@/components/studio/StudioIntro'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import { benefits, careersPage, hiring, roles } from '@/content/careers'
import { EMAIL_CAREERS, mailto } from '@/content/site'

/*
 * Design: Fluxstride — Careers (desktop 1440, mobile 390). The Studio page's parts, re-cut:
 *
 *   Statement + photo  "Do the best work of your career — in four focused days a week."
 *   Numbers            the Studio numbers row
 *   Open roles         the Studio careers list (paper-2), each role linking to its page
 *   How we work        the values grid (ink)
 *   What we offer      the benefit cards from the role pages, 64px under the heading (32px mobile)
 *   How we hire        the FAQ layout: heading column beside the steps table and note
 *   CTA band           "Don't see your role?", to the careers inbox
 */
export function Careers() {
  return (
    <>
      <header className="container-page flex flex-col gap-5 pt-14 pb-10 lg:gap-7 lg:pt-24 lg:pb-18">
        <Reveal on="mount">
          <Eyebrow>
            (Careers) {roles.length} open {roles.length === 1 ? 'role' : 'roles'}
          </Eyebrow>
        </Reveal>
        <RevealText as="h1" on="mount" delay={0.1} stagger={0.035} className="text-statement text-ink">
          Do the best work <br className="max-lg:hidden" />
          of your career<span className="max-lg:hidden"> —</span>
          <br />
          <Accent className="text-[1.1em] lg:text-[1.125em]">
            <span className="mr-[0.25em] lg:hidden">—</span>in four focused days a week.
          </Accent>
        </RevealText>
      </header>

      <StudioPhoto />
      <FactRow facts={careersPage.facts} />

      <CareersSection page="careers" />

      <ValueGrid
        titleId="culture-title"
        title={
          <>
            How we <Accent className="max-lg:text-[0.925em]">work.</Accent>
          </>
        }
        items={careersPage.culture}
      />

      <section
        aria-labelledby="offer-title"
        className="container-page flex flex-col gap-8 py-18 lg:gap-16 lg:py-32"
      >
        <RevealText id="offer-title" className="text-heading-xl text-ink">
          What we <Accent className="max-lg:text-[0.925em]">offer.</Accent>
        </RevealText>
        <Reveal>
          <LegalBlockView block={benefits} />
        </Reveal>
      </section>

      <section aria-labelledby="hiring-title" className="border-t border-line">
        <div className="container-page flex flex-col gap-8 py-18 lg:flex-row lg:gap-20 lg:py-32">
          <div className="flex flex-col gap-5 lg:w-100 lg:shrink-0">
            <Reveal>
              <Eyebrow>How we hire</Eyebrow>
            </Reveal>
            <RevealText id="hiring-title" className="text-heading-lg text-ink">
              Four steps.
            </RevealText>
            <Reveal as="p" delay={0.15} className="text-base/[1.5] text-stone">
              {careersPage.hiringIntro}
            </Reveal>
          </div>
          <Reveal stagger={0.1} className="flex flex-1 flex-col gap-5 lg:gap-6">
            {hiring.map((block, i) => (
              <LegalBlockView key={i} block={block} />
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Speculative applications"
        title="Don’t see your role?"
        action={{ to: mailto(EMAIL_CAREERS, 'Introducing myself'), label: 'Introduce yourself' }}
        email={EMAIL_CAREERS}
      />
    </>
  )
}
