import { EngagementModels } from '@/components/process/EngagementModels'
import { Faq } from '@/components/process/Faq'
import { PhaseList } from '@/components/process/PhaseList'
import { PrinciplesStrip } from '@/components/process/PrinciplesStrip'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHeader } from '@/components/sections/PageHeader'
import { Accent } from '@/components/ui/Typography'

/*
 * Design: Fluxstride — Process (desktop 1440, mobile 390).
 *
 *   Page Header        "The Stride Method." (100px; the serif phrase leads at 112px)
 *   Principles Strip   four working principles
 *   Phases             the four phases in detail
 *   Engagement Models  project / retainer / consultancy (ink)
 *   FAQ                then the CTA band
 */
export function Process() {
  return (
    <>
      <PageHeader
        className="pb-10 lg:pb-20"
        eyebrow="(Process) How we work"
        titleClassName="text-display-md"
        introClassName="lg:w-75"
        title={
          <>
            <Accent className="text-[1.13em] lg:text-[1.12em]">The Stride</Accent>{' '}
            <br className="lg:hidden" />
            Method.
          </>
        }
        intro="Four phases, no black boxes. You always know what we’re doing, why, and what it costs."
      />
      <PrinciplesStrip />
      <PhaseList />
      <EngagementModels />
      <Faq />
      <CtaBand />
    </>
  )
}
