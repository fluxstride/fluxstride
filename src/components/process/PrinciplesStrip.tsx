import { Reveal } from '@/components/motion/Reveal'
import { principles } from '@/content/process'

/*
 * Design: Process / Principles Strip. Four columns between hairlines, 112px above the
 * phases: 22px flux icon, 18/600 title, 15px stone body, 14px apart. Columns after the
 * first get a hairline on the left and 24px padding either side.
 * Mobile: stacked rows with 24px padding and a hairline between them; 16px titles.
 */
export function PrinciplesStrip() {
  return (
    <div className="container-page pb-14 lg:pb-28">
      <Reveal as="ul" stagger={0.08} className="flex flex-col border-y border-line lg:grid lg:grid-cols-4">
        {principles.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="flex flex-1 flex-col gap-3.5 py-6 not-first:border-t not-first:border-line lg:py-7 lg:pr-6 lg:not-first:border-t-0 lg:not-first:border-l lg:not-first:pl-6"
          >
            <Icon aria-hidden="true" size={22} strokeWidth={2} className="text-flux" />
            <h2 className="text-base/[1.2] font-semibold text-ink lg:text-lg/[1.2]">{title}</h2>
            <p className="text-[15px]/[1.5] text-stone">{body}</p>
          </li>
        ))}
      </Reveal>
    </div>
  )
}
