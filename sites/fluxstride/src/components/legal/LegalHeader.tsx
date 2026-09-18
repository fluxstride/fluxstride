import { Download, Printer } from 'lucide-react'
import { NavLink } from 'react-router'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import { formatLegalDate, legalDocuments, type LegalDocument } from '@/content/legal'
import { cn } from '@fluxstride/design-system/lib/cn'

/*
 * Design: "Page Header" on the legal pages.
 *
 * Desktop: 96px top, 56px bottom. Eyebrow 24px above a 128px title whose second word is
 *          the 142px serif, 24px apart. On the right a 360px column: 17px stone intro,
 *          then mono 11 effective date and version, 18px below.
 * Mobile:  48px top, 32px bottom, everything 20px apart. The title stacks (56px / 62px).
 */
export function LegalHeader({ doc }: { doc: LegalDocument }) {
  const [sans, serif] = doc.title

  return (
    <header className="container-page flex flex-col gap-5 pt-12 pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-3 lg:pt-24 lg:pb-14">
      <div className="flex flex-col gap-5 lg:gap-6">
        <Reveal on="mount">
          <Eyebrow className="max-lg:text-label-sm">
            (Legal) Last updated — <time dateTime={doc.updated}>{formatLegalDate(doc.updated)}</time>
          </Eyebrow>
        </Reveal>
        {/* Mobile stacks the two words 4px apart; the looser leading makes that gap. */}
        <RevealText
          as="h1"
          on="mount"
          delay={0.1}
          className="text-display-legal text-ink max-lg:leading-[0.935]"
        >
          {sans} <br className="lg:hidden" />
          <Accent className="text-[1.11em]">{serif}</Accent>
        </RevealText>
      </div>

      <Reveal on="mount" delay={0.35} className="flex flex-col gap-5 lg:w-90 lg:shrink-0 lg:gap-4.5">
        <p className="text-body-lg text-stone max-lg:leading-[1.55]">{doc.intro}</p>
        <p className="flex gap-5 font-mono text-[0.625rem]/[1.3] text-stone uppercase lg:gap-6 lg:text-label-sm">
          <span>
            Effective <time dateTime={doc.effective}>{formatLegalDate(doc.effective)}</time>
          </span>
          <span>Version {doc.version}</span>
        </p>
      </Reveal>
    </header>
  )
}

/*
 * Design: "Legal Tabs". A full-width hairline under the three documents; the current one
 * is 600 ink with a 2px ink underline sitting on the hairline, the others 500 stone.
 * Desktop: 15px labels 36px apart, 18px vertical padding, Download PDF and Print on the right.
 * Mobile:  14px labels 22px apart, 14px vertical padding, no actions.
 */
export function LegalTabs({ doc }: { doc: LegalDocument }) {
  return (
    <nav aria-label="Legal documents" className="border-b border-line print:hidden">
      <div className="container-page flex items-center justify-between">
        <ul className="-mb-px flex gap-5.5 lg:gap-9">
          {legalDocuments.map((item) => (
            <li key={item.slug}>
              <NavLink
                to={`/${item.slug}`}
                className={({ isActive }) =>
                  cn(
                    'block border-b-2 pt-3.5 pb-3 text-sm/[1.2] whitespace-nowrap transition-colors lg:pt-4.5 lg:pb-4 lg:text-[0.9375rem]/[1.2]',
                    isActive
                      ? 'border-ink font-semibold text-ink'
                      : 'border-transparent font-medium text-stone hover:text-ink',
                  )
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 max-lg:hidden">
          <a
            href={`/legal/fluxstride-${doc.slug}.pdf`}
            download
            className="inline-flex items-center gap-2 text-sm/[1.2] font-medium text-ink transition-colors hover:text-flux"
          >
            <Download aria-hidden="true" size={15} strokeWidth={2} />
            Download PDF
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 text-sm/[1.2] font-medium text-ink transition-colors hover:text-flux"
          >
            <Printer aria-hidden="true" size={15} strokeWidth={2} />
            Print
          </button>
        </div>
      </div>
    </nav>
  )
}
