import { Check, Sparkles } from 'lucide-react'
import { useId } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { ArrowIcon } from '@/components/ui/ArrowIcon'
import { SmartLink } from '@/components/ui/SmartLink'
import { Eyebrow } from '@/components/ui/Typography'
import { legalDocuments, sectionId, type LegalDocument, type LegalSection } from '@/content/legal'
import { cn } from '@fluxstride/design-system/lib/cn'
import { pad } from '@/lib/format'
import { legalActions } from './actions'
import { LegalBlockView } from './LegalBlocks'
import { RichText } from './RichText'

/*
 * Design: "Summary". White, hairline border that is 3px along the top, 32/22px padding.
 * Sparkles + mono 12 flux "The short version", then check-marked 17/15px points, 16px apart.
 */
export function LegalSummary({ points }: { points: string[] }) {
  return (
    <section
      aria-labelledby="summary-title"
      className="flex flex-col gap-4 border border-t-3 border-line bg-white px-5.25 pt-4.75 pb-5.25 lg:px-7.75 lg:pt-7.25 lg:pb-7.75"
    >
      <h2 id="summary-title" className="flex items-center gap-2.5 font-mono text-label text-flux uppercase">
        <Sparkles aria-hidden="true" size={18} strokeWidth={2} className="shrink-0" />
        The short version
      </h2>
      <ul className="flex flex-col gap-4">
        {points.map((point) => (
          <li key={point} className="flex gap-3.5 text-doc-summary text-ink">
            <Check aria-hidden="true" size={18} strokeWidth={2} className="shrink-0 text-flux" />
            {point}
          </li>
        ))}
      </ul>
    </section>
  )
}

/*
 * Design: "Section 01 — Who we are". Mono 13 flux number on a hairline rule, 36/26px
 * heading, then the blocks, all 20px apart.
 */
export function LegalSectionView({ section, index }: { section: LegalSection; index: number }) {
  const id = sectionId(section)
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex scroll-mt-24 flex-col gap-5 lg:scroll-mt-28"
    >
      <div aria-hidden="true" className="flex items-center gap-4">
        <span className="font-mono text-[0.8125rem]/[1.3] text-flux">{pad(index + 1)}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <h2 id={`${id}-title`} className="text-doc-heading text-ink">
        {section.title}
      </h2>
      {section.blocks.map((block, i) => (
        <LegalBlockView key={i} block={block} />
      ))}
    </section>
  )
}

/*
 * Design: "Contact Card". Paper-2, 22px padding, 12px gaps: mono 11 label, 18px title,
 * 15/600 flux link, 14px stone note.
 */
export function LegalContactCard({ doc, className }: { doc: LegalDocument; className?: string }) {
  const { contact } = doc
  // The card is rendered twice (sidebar on desktop, end of the page on mobile).
  const titleId = useId()
  const linkClass =
    'text-left text-[0.9375rem]/[1.2] font-semibold text-flux underline-offset-4 transition-colors hover:underline'

  return (
    <aside
      aria-labelledby={titleId}
      className={cn('flex break-inside-avoid flex-col gap-3 bg-paper-2 p-5.5', className)}
    >
      <p className="font-mono text-label-sm text-stone uppercase">{contact.label}</p>
      <h2 id={titleId} className="text-lg/[1.35] font-semibold text-ink">
        {contact.title}
      </h2>
      {'href' in contact.link ? (
        <SmartLink to={contact.link.href} className={linkClass}>
          {contact.link.label}
        </SmartLink>
      ) : (
        <button type="button" onClick={legalActions[contact.link.action]} className={linkClass}>
          {contact.link.label}
        </button>
      )}
      <p className="text-sm/[1.5] text-stone">
        <RichText text={contact.note} />
      </p>
    </aside>
  )
}

/*
 * Design: "Related". Hairline on top, 96/56px padding, mono 12 "Related policies", then
 * the other two documents as white cards (32/22px padding): 28/22px title with an
 * up-right arrow, 15px stone blurb.
 */
export function RelatedPolicies({ doc }: { doc: LegalDocument }) {
  const others = legalDocuments.filter((item) => item.slug !== doc.slug)

  return (
    <section aria-labelledby="related-title" className="border-t border-line print:hidden">
      <div className="container-page flex flex-col gap-5 pt-13.75 pb-14 lg:gap-7 lg:pt-23.75 lg:pb-24">
        <Eyebrow as="h2" id="related-title" className="max-lg:text-label-sm">
          Related policies
        </Eyebrow>
        <Reveal as="ul" stagger className="grid gap-4 lg:grid-cols-2">
          {others.map((item) => (
            <li key={item.slug} className="flex">
              <Link
                to={`/${item.slug}`}
                className="group flex flex-1 flex-col gap-3.5 border border-line bg-white p-5.25 transition-colors duration-500 hover:border-ink lg:p-7.75"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-doc-card-lg text-ink">{item.name}</span>
                  <ArrowIcon direction="up-right" size={24} className="max-lg:hidden" />
                  <ArrowIcon direction="up-right" size={20} className="lg:hidden" />
                </span>
                <span className="text-[0.9375rem]/[1.5] text-stone">{item.blurb}</span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
