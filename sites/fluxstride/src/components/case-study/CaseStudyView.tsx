import { CtaBand } from '@/components/sections/CtaBand'
import { serviceNames, serviceTitle } from '@/content/case-studies'
import { findPlaceholders } from '@/content/case-studies/placeholders'
import type { CaseStudy } from '@/content/case-studies/schema'
import { CaseHero } from './CaseHero'
import { ClientQuote, Credits, NextProject } from './CaseClosing'
import { CaseSection } from './CaseSection'
import { CaseStory, ResultsBand } from './CaseStory'
import { DraftBanner } from './DraftBanner'

type CaseStudyViewProps = {
  study: CaseStudy
  next?: CaseStudy
  /** Development-only banner: which file to edit, and what's still a placeholder. */
  draft?: { title: string; file: string }
}

/*
 * Design: "Case Study: <service>" (desktop 1440, mobile 390) and the starter templates.
 *
 *   Hero → Results band → Story (01, 02) → numbered sections (03…) → Testimonial
 *   → Credits → Next project → CTA band
 *
 * Everything comes from the CaseStudy data; see docs/case-studies.md.
 */
export function CaseStudyView({ study, next, draft }: CaseStudyViewProps) {
  return (
    <>
      {draft ? <DraftBanner {...draft} placeholders={findPlaceholders(study)} /> : null}
      <article>
        <CaseHero study={study} serviceNames={serviceNames(study)} />
        <ResultsBand results={study.results} />
        <CaseStory challenge={study.challenge} approach={study.approach} />
        {study.sections.map((section, i) => (
          <CaseSection key={`${section.kind}-${i}`} section={section} number={i + 3} />
        ))}
        {study.quote ? <ClientQuote quote={study.quote} /> : null}
        <Credits credits={study.credits} />
      </article>
      <NextProject next={next} serviceTitle={next ? serviceTitle(next) : undefined} />
      <CtaBand />
    </>
  )
}
