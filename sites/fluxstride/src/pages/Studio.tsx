import { CtaBand } from '@/components/sections/CtaBand'
import { CareersSection } from '@/components/studio/CareersSection'
import { StoryAndFacts } from '@/components/studio/StoryAndFacts'
import { StudioIntro } from '@/components/studio/StudioIntro'
import { TeamSection } from '@/components/studio/TeamSection'
import { ValuesSection } from '@/components/studio/ValuesSection'

/*
 * Design: Fluxstride — Studio (desktop 1440, mobile 390).
 *
 *   Statement + studio photo, Story, Numbers, Values (ink), Team, Careers (paper-2),
 *   then the CTA band.
 */
export function Studio() {
  return (
    <>
      <StudioIntro />
      <StoryAndFacts />
      <ValuesSection />
      <TeamSection />
      <CareersSection />
      <CtaBand />
    </>
  )
}
