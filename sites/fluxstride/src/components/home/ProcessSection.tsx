import { Check } from 'lucide-react'
import { useRef } from 'react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Accent } from '@/components/ui/Typography'
import { processSteps, type ProcessStep } from '@/content/process'
import { cn } from '@fluxstride/design-system/lib/cn'
import { gsap, MOTION_OK } from '@fluxstride/design-system/lib/gsap'
import { useIsomorphicLayoutEffect } from '@fluxstride/design-system/lib/useIsomorphicLayoutEffect'

/*
 * Design: Home / Process.
 * Four steps rising left to right like a staircase: each starts lower than the next
 * (top padding 168 / 112 / 56 / 0 on desktop, 72 / 56 / 32 / 0 stacked on mobile).
 * Each step hangs from a 1px ink rule; the last, current phase has a 3px rule.
 */
const STAIR = ['pt-18 lg:pt-42', 'pt-14 lg:pt-28', 'pt-8 lg:pt-14', 'pt-0']

export function ProcessSection() {
  return (
    <Section id="process" labelledBy="process-title" className="flex flex-col gap-10 lg:gap-20">
      <SectionHeader
        eyebrow="(04) How we work"
        titleId="process-title"
        title={
          <>
            <Accent className="max-lg:text-[0.925em]">The Stride</Accent> Method.
          </>
        }
        intro="Four steps, fixed-scope sprints, a live project board you can see any time. Each phase ends with something real you can use."
      />
      <ProcessSteps />
    </Section>
  )
}

function ProcessSteps() {
  const ref = useRef<HTMLOListElement>(null)

  useIsomorphicLayoutEffect(() => {
    const list = ref.current
    if (!list) return
    const q = gsap.utils.selector(list)

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      gsap.set(q('[data-rule]'), { scaleX: 0 })
      gsap.set(q('[data-step-content]'), { opacity: 0, y: 24 })
      list.dataset.revealReady = ''

      gsap
        .timeline({ scrollTrigger: { trigger: list, start: 'top 80%', once: true } })
        // Each rule draws across, left to right, like steps being taken.
        .to(q('[data-rule]'), { scaleX: 1, duration: 1.1, ease: 'expo.inOut', stagger: 0.18 })
        .to(q('[data-step-content]'), { opacity: 1, y: 0, duration: 0.9, stagger: 0.18 }, 0.35)
    })

    return () => media.revert()
  }, [])

  return (
    <ol ref={ref} data-reveal="self" className="flex flex-col gap-6 lg:flex-row">
      {processSteps.map((step, index) => (
        <Step
          key={step.number}
          step={step}
          current={index === processSteps.length - 1}
          className={STAIR[index]}
        />
      ))}
    </ol>
  )
}

function Step({ step, current, className }: { step: ProcessStep; current: boolean; className: string }) {
  return (
    <li className={cn('flex-1', className)}>
      <div className="relative pt-6">
        <span
          data-rule=""
          aria-hidden="true"
          className={cn('absolute inset-x-0 top-0 origin-left bg-ink', current ? 'h-0.75' : 'h-px')}
        />
        <div data-step-content="" className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-[15px] leading-[1.2] font-semibold">{step.number}</span>
            <span className="font-mono text-label-sm text-stone uppercase">{step.duration}</span>
          </div>
          <h3 className="text-title-lg leading-[1.2]">{step.title}</h3>
          <p className="text-body text-stone">{step.summary}</p>
          <ul className="flex flex-col gap-2 border-t border-line pt-4">
            {step.deliverables.map((deliverable) => (
              <li
                key={deliverable}
                className="flex items-center gap-2 text-body-sm leading-[1.2] font-medium"
              >
                <Check aria-hidden="true" size={14} strokeWidth={2} className="shrink-0" />
                {deliverable}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}
