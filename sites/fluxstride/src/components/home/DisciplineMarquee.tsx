import { Fragment } from 'react'
import { Marquee } from '@fluxstride/design-system/motion/Marquee'
import { Mark } from '@/components/ui/Logo'

/*
 * Design: Home / Marquee Band (desktop) and Home Mobile / Marquee.
 * Ink band; items 40px/500 → 26px on mobile, separated by small Stride marks
 * (18px → 12px) with 36px → 20px gaps. Mobile uses shorter labels, so each item carries
 * its mobile label, or null to hide it there.
 */
const DISCIPLINES: { label: string; mobile: string | null }[] = [
  { label: 'Product design', mobile: 'Product' },
  { label: 'Branding', mobile: 'Brand' },
  { label: 'Web development', mobile: 'Web' },
  { label: 'Mobile apps', mobile: 'Apps' },
  { label: 'Backend', mobile: 'Backend' },
  { label: 'Cloud & DevOps', mobile: 'Cloud' },
]

// Gap between every item and mark, 20px → 36px. Also used as the group's end padding
// so the seam between the two copies in the loop is the same width.
const GAP = 'gap-[clamp(1.25rem,0.8786rem+1.5238vw,2.25rem)] pr-[clamp(1.25rem,0.8786rem+1.5238vw,2.25rem)]'

export function DisciplineMarquee() {
  return (
    <section aria-label="Services" className="bg-ink py-[clamp(1rem,0.7679rem+0.9524vw,1.625rem)] text-paper">
      <Marquee duration={45}>
        <ul className={`flex items-center ${GAP}`}>
          {DISCIPLINES.map(({ label, mobile }) => (
            <Fragment key={label}>
              <li className={`text-marquee whitespace-nowrap ${mobile === null ? 'max-lg:hidden' : ''}`}>
                {mobile !== null && mobile !== label ? (
                  <>
                    <span className="lg:hidden">{mobile}</span>
                    <span className="max-lg:hidden">{label}</span>
                  </>
                ) : (
                  label
                )}
              </li>
              <li aria-hidden="true" className={mobile === null ? 'flex max-lg:hidden' : 'flex'}>
                <Mark className="size-[clamp(0.75rem,0.6107rem+0.5714vw,1.125rem)]" />
              </li>
            </Fragment>
          ))}
        </ul>
      </Marquee>
    </section>
  )
}
