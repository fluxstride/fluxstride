import { OtherRoles, RoleApplyCard, RoleHeader } from '@/components/careers/RoleParts'
import { LegalSectionView } from '@/components/legal/LegalParts'
import { LegalToc, LegalTocMobile } from '@/components/legal/LegalToc'
import { sharedSections, type Role } from '@/content/careers'

/*
 * Design: Fluxstride Careers · Job Description (desktop 1440, mobile 390). One layout for
 * every role; the wording lives in content/careers.ts.
 *
 *   Header        breadcrumbs, title, intro and Apply beside the role's facts
 *   Content       desktop: 290px sticky sidebar (apply card, contents), 100px gap, the numbered
 *                 sections 72px apart, as on the legal pages. Mobile: contents, sections, apply card
 *   Other roles   the rest of the open roles, then the footer (no CTA band)
 */
export function RolePage({ role }: { role: Role }) {
  const sections = [...role.sections, ...sharedSections(role)]

  return (
    <>
      <RoleHeader role={role} />

      <div className="container-page flex flex-col gap-13 border-t border-line pt-8 pb-18 lg:grid lg:grid-cols-[18.125rem_minmax(0,1fr)] lg:gap-25 lg:pt-18 lg:pb-30">
        <div className="max-lg:hidden">
          <div className="sticky top-28 flex max-h-[calc(100dvh-8rem)] flex-col gap-9 overflow-y-auto">
            <RoleApplyCard role={role} />
            <LegalToc sections={sections} />
          </div>
        </div>

        <LegalTocMobile sections={sections} className="lg:hidden" />

        <article aria-label={role.title} className="flex flex-col gap-13 lg:gap-18">
          {sections.map((section, i) => (
            <LegalSectionView key={section.title} section={section} index={i} />
          ))}
        </article>
      </div>

      <OtherRoles role={role} />
    </>
  )
}
