import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { sectionId, type LegalSection } from '@/content/legal'
import { cn } from '@/lib/cn'
import { pad } from '@/lib/format'

/*
 * Design: "Sidebar" (desktop) and "On This Page" (mobile).
 *
 * Desktop: mono 11 "On this page", 14px gap, then one row per section: 2px left rule
 *          (flux for the section in view, hairline otherwise), 9×16 padding, mono 11
 *          number 12px before a 15px label (600 ink when current, stone otherwise).
 * Mobile:  a white 50px bar, "On this page · 10 sections" in mono 11 with a chevron.
 *          The design shows it closed; open, it lists the sections in the same style.
 */

/** Tracks which section is being read: the last one whose top has passed 30% of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join(' ')

  useEffect(() => {
    const targets = key.split(' ')
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      let current = targets[0]
      for (const id of targets) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [key])

  return active
}

export function LegalToc({ sections }: { sections: LegalSection[] }) {
  const ids = sections.map(sectionId)
  const active = useActiveSection(ids)

  return (
    <nav aria-labelledby="toc-title" className="flex flex-col gap-3.5">
      <p id="toc-title" className="font-mono text-label-sm text-stone uppercase">
        On this page
      </p>
      <ol>
        {sections.map((section, i) => {
          const current = ids[i] === active
          return (
            <li key={ids[i]}>
              <Link
                to={{ hash: ids[i] }}
                aria-current={current ? 'location' : undefined}
                className={cn(
                  'group flex gap-3 border-l-2 py-2.25 pl-3.5 text-[0.9375rem]/[1.2] transition-colors duration-300',
                  current ? 'border-flux font-semibold text-ink' : 'border-line text-stone hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'pt-px font-mono text-label-sm font-normal transition-colors duration-300',
                    current ? 'text-flux' : 'text-stone',
                  )}
                >
                  {pad(i + 1)}
                </span>
                {section.tocLabel ?? section.title}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function LegalTocMobile({ sections, className }: { sections: LegalSection[]; className?: string }) {
  const details = useRef<HTMLDetailsElement>(null)

  return (
    <details ref={details} className={cn('group border border-line bg-white print:hidden', className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between px-4.25 py-3.75 [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-label-sm text-ink uppercase">
          On this page · {sections.length} sections
        </span>
        <ChevronDown
          aria-hidden="true"
          size={18}
          strokeWidth={2}
          className="transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <ol className="border-t border-line px-4.25 py-2">
        {sections.map((section, i) => (
          <li key={sectionId(section)}>
            <Link
              to={{ hash: sectionId(section) }}
              onClick={() => details.current?.removeAttribute('open')}
              className="flex gap-3 py-2.25 text-[0.9375rem]/[1.2] text-ink"
            >
              <span className="pt-px font-mono text-label-sm text-flux">{pad(i + 1)}</span>
              {section.tocLabel ?? section.title}
            </Link>
          </li>
        ))}
      </ol>
    </details>
  )
}
