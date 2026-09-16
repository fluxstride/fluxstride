import { ArrowRight, Check, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { Eyebrow } from '@/components/ui/Typography'
import { processSteps, type ProcessStep } from '@/content/process'
import { cn } from '@/lib/cn'

/** The phase drawn in flux blue: where most of the work (and most of the calendar) happens. */
const HIGHLIGHTED = '03'

/*
 * Design: Process / Phases. Each phase sits under an ink rule with 64px padding
 * (40px on mobile):
 *   Number col 280px   160px numeral (67px mobile), mono duration 12px below
 *   Content            56px name (360px wide) beside the 20px description, then three
 *                      columns under a hairline: what happens, you get, your involvement
 * Mobile stacks everything: number, name, description, then the three lists 24px apart.
 */
export function PhaseList() {
  return (
    <ol aria-label="The four phases" className="container-page pb-18 lg:pb-32">
      {processSteps.map((step) => (
        <Phase key={step.number} step={step} />
      ))}
    </ol>
  )
}

function Phase({ step }: { step: ProcessStep }) {
  const titleId = `phase-${step.number}-title`

  return (
    <li className="flex flex-col gap-6 border-t border-ink pt-9.75 pb-10 lg:flex-row lg:gap-16 lg:pt-15.75 lg:pb-16">
      <div className="flex flex-col gap-3 lg:w-70 lg:shrink-0">
        <RevealText
          as="p"
          stagger={0.08}
          className={cn('text-numeral-xl', step.number === HIGHLIGHTED ? 'text-flux' : 'text-ink')}
        >
          {step.number}
        </RevealText>
        <Reveal>
          <Eyebrow>{step.duration}</Eyebrow>
        </Reveal>
      </div>

      <div className="flex flex-1 flex-col gap-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
          <RevealText id={titleId} as="h2" className="text-heading-lg text-ink lg:w-90 lg:shrink-0">
            {step.title}
          </RevealText>
          <Reveal as="p" delay={0.1} className="flex-1 text-lead text-ink">
            {step.description}
          </Reveal>
        </div>

        <Reveal
          stagger={0.08}
          className="flex flex-col gap-6 border-t border-line pt-6.75 lg:flex-row lg:gap-8"
        >
          <Column title="What happens" items={step.activities} icon={ArrowRight} iconClass="text-stone" />
          <Column title="You get" items={step.outcomes} icon={Check} iconClass="text-flux" />
          <div className="flex flex-1 flex-col gap-3">
            <Eyebrow as="h3" className="text-label-sm/[1.2]">
              Your involvement
            </Eyebrow>
            <p className="text-[15px]/[1.5] text-stone">{step.involvement}</p>
          </div>
        </Reveal>
      </div>
    </li>
  )
}

function Column({
  title,
  items,
  icon: Icon,
  iconClass,
}: {
  title: string
  items: string[]
  icon: LucideIcon
  iconClass: string
}) {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <Eyebrow as="h3" className="text-label-sm/[1.2]">
        {title}
      </Eyebrow>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[15px]/[1.2] font-medium text-ink">
            <Icon aria-hidden="true" size={14} strokeWidth={2} className={cn('shrink-0', iconClass)} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
