import { ArrowDown, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Label } from '@/components/ui/Typography'
import type {
  ChecklistSection,
  FeaturesSection,
  FlowSection,
  RoadmapSection,
  StepsSection,
} from '@/content/case-studies/schema'
import { cn } from '@/lib/cn'
import { CheckIcon, FeatureGrid, Tag } from '../parts'
import { tone } from '../tone'

type Props<T> = { section: T; dark: boolean }

const stepColumns = ['', 'lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4']

const two = (n: number) => String(n).padStart(2, '0')

/** phases: project phases under a rule. journey: numbered circles joined by a line. */
export function Steps({ section, dark }: Props<StepsSection>) {
  const t = tone(dark)
  const phases = section.variant === 'phases'

  return (
    <Reveal
      as="ol"
      stagger
      className={cn('grid gap-7 lg:gap-6', stepColumns[Math.min(section.steps.length, 4)])}
    >
      {section.steps.map((step, i) => (
        <li
          key={step.title + i}
          className={cn('flex flex-col gap-2.5', phases && cn('border-t pt-5', t.rule))}
        >
          {phases ? (
            <Label className={t.accent}>
              Phase {two(i + 1)}
              {step.meta ? ` · ${step.meta}` : ''}
            </Label>
          ) : (
            <span aria-hidden="true" className="mb-1 flex items-center gap-3">
              <span
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-label',
                  dark ? 'bg-flux-light/15 text-flux-light' : 'bg-flux-soft text-flux',
                )}
              >
                {two(i + 1)}
              </span>
              <span className={cn('h-px flex-1', t.quiet)} />
            </span>
          )}
          <h3 className="text-xl/[1.2] font-semibold tracking-tight lg:text-2xl/[1.2]">{step.title}</h3>
          <p className={cn('text-body lg:text-base/[1.55]', t.muted)}>{step.body}</p>
          {!phases && step.meta ? <Label className={t.accent}>{step.meta}</Label> : null}
        </li>
      ))}
    </Reveal>
  )
}

export function Features({ section, dark }: Props<FeaturesSection>) {
  return <FeatureGrid features={section.features} dark={dark} />
}

export function Checklist({ section, dark }: Props<ChecklistSection>) {
  const t = tone(dark)
  return (
    <Reveal
      as="ul"
      stagger={0.05}
      className={cn('grid', section.columns === 2 && 'lg:grid-cols-2 lg:gap-x-10')}
    >
      {section.items.map((item) => (
        <li key={item.title} className={cn('flex gap-3.5 border-t py-4 lg:py-5', t.border)}>
          <CheckIcon dark={dark} />
          <div className="flex flex-1 flex-col gap-1.5 lg:flex-row lg:items-start lg:gap-6">
            <div className="flex flex-1 flex-col gap-1">
              <p className={cn('text-base/[1.35] lg:text-lg/[1.35]', item.body && 'font-semibold')}>
                {item.title}
              </p>
              {item.body ? <p className={cn('text-body', t.muted)}>{item.body}</p> : null}
            </div>
            {item.tag ? (
              <span className="self-start">
                <Tag dark={dark}>{item.tag}</Tag>
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </Reveal>
  )
}

/** Now / Next / Later columns. The first horizon is highlighted. */
export function Roadmap({ section, dark }: Props<RoadmapSection>) {
  const t = tone(dark)
  return (
    <Reveal stagger className="grid gap-10 lg:grid-cols-3 lg:gap-4">
      {section.horizons.map((horizon, i) => (
        <section key={horizon.name} className="flex flex-col gap-3">
          <header
            className={cn(
              'flex items-center justify-between pb-3',
              i === 0
                ? cn('border-b-2', dark ? 'border-flux-light' : 'border-flux')
                : cn('border-b', t.border),
            )}
          >
            <h3 className={cn('text-xl font-semibold lg:text-2xl', i === 0 && t.accent)}>{horizon.name}</h3>
            <Label className={t.muted}>{horizon.when}</Label>
          </header>
          <ul className="flex flex-col gap-3">
            {horizon.items.map((item) => (
              <li key={item.title} className={cn('flex flex-col gap-1.5 p-4 lg:p-4.5', t.card)}>
                <p className="text-body font-semibold lg:text-[17px]/[1.35]">{item.title}</p>
                <Label className={t.muted}>{item.meta}</Label>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Reveal>
  )
}

/** The key task as boxes joined by arrows: across on desktop, two columns down on phones. */
export function Flow({ section, dark }: Props<FlowSection>) {
  const t = tone(dark)
  return (
    <Reveal className={cn('grid grid-cols-2 gap-4 p-5 lg:grid-cols-1 lg:gap-10 lg:p-10', t.card)}>
      {[section.before, section.after].map((flow, f) => {
        const after = f === 1
        return (
          <div key={flow.label} className="flex flex-col gap-2.5 lg:gap-4">
            <Label className={after ? t.accent : t.muted}>{flow.label}</Label>
            <ol className="flex flex-col items-stretch gap-1.5 lg:flex-row lg:items-center lg:gap-2.5">
              {flow.steps.map((step, i) => (
                <li key={step + i} className="flex flex-col items-center gap-1.5 lg:flex-row lg:gap-2.5">
                  {i > 0 ? (
                    <>
                      <ArrowDown aria-hidden="true" className={cn('size-4 lg:hidden', t.muted)} />
                      <ArrowRight aria-hidden="true" className={cn('size-4 max-lg:hidden', t.muted)} />
                    </>
                  ) : null}
                  <span
                    className={cn(
                      'w-full border px-3 py-2.5 text-center text-[13px]/[1.3] font-medium lg:w-auto lg:px-5 lg:py-3.5 lg:text-[15px]/[1.3]',
                      after ? 'border-flux bg-flux text-white' : cn(t.border, dark ? '' : 'bg-white'),
                    )}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )
      })}
    </Reveal>
  )
}
