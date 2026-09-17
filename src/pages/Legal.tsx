import { LegalHeader, LegalTabs } from '@/components/legal/LegalHeader'
import {
  LegalContactCard,
  LegalSectionView,
  LegalSummary,
  RelatedPolicies,
} from '@/components/legal/LegalParts'
import { LegalToc, LegalTocMobile } from '@/components/legal/LegalToc'
import type { LegalDocument } from '@/content/legal'

/*
 * Design: Fluxstride — Privacy Policy / Terms of Service / Cookie Policy (desktop 1440,
 * mobile 390). One layout for all three; the wording lives in content/legal.
 *
 *   Page Header   title, intro, effective date and version
 *   Legal Tabs    switch between the three documents; Download PDF and Print
 *   Content       desktop: 290px sticky sidebar (contents + contact card), 100px gap, the
 *                 document (summary, then numbered sections 72px apart). 72/120px padding.
 *                 mobile: "On this page", summary, sections, contact card, 52px apart
 *   Related       the other two documents, then straight into the footer (no CTA band)
 */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <LegalHeader doc={doc} />
      <LegalTabs doc={doc} />

      <div className="container-page flex flex-col gap-13 pt-8 pb-18 lg:grid lg:grid-cols-[18.125rem_minmax(0,1fr)] lg:gap-25 lg:pt-18 lg:pb-30">
        <div className="max-lg:hidden print:hidden">
          <div className="sticky top-28 flex max-h-[calc(100dvh-8rem)] flex-col gap-9 overflow-y-auto">
            <LegalToc sections={doc.sections} />
            <LegalContactCard doc={doc} />
          </div>
        </div>

        <LegalTocMobile sections={doc.sections} className="lg:hidden" />

        <article aria-label={doc.name} className="flex flex-col gap-13 lg:gap-18">
          <LegalSummary points={doc.summary} />
          {doc.sections.map((section, i) => (
            <LegalSectionView key={section.title} section={section} index={i} />
          ))}
          <LegalContactCard doc={doc} className="lg:hidden" />
        </article>
      </div>

      <RelatedPolicies doc={doc} />
    </>
  )
}
