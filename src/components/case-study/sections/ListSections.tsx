import { ArrowDown, ArrowRight, Check } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { Label } from '@/components/ui/Typography'
import type {
  ArchitectureSection,
  ChecklistSection,
  FeaturesSection,
  FlowSection,
  RoadmapSection,
  Step,
  StepsSection,
} from '@/content/case-studies/schema'
import { cn } from '@/lib/cn'
import { FeatureGrid } from '../parts'
import { tone } from '../tone'

type Props<T> = { section: T; dark: boolean }

const stepColumns = ['', 'lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4']

const two = (n: number) => String(n).padStart(2, '0')

/** phases: project phases under a rule. journey: numbered circles joined by a line. */
export function Steps({ section, dark }: Props<StepsSection>) {
  const t = tone(dark)
  const phases = section.variant === 'phases'
  if (section.variant === 'cards') return <PhaseCards steps={section.steps} dark={dark} />

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
          {step.body ? <p className={cn('text-body lg:text-base/[1.55]', t.muted)}>{step.body}</p> : null}
          {!phases && step.meta ? <Label className={t.accent}>{step.meta}</Label> : null}
        </li>
      ))}
    </Reveal>
  )
}

/*
 * Design: Case Study — Software Platform, "03 — Process". Four white cards, 16px apart
 * (stacked on mobile): 24px padding (20px), mono meta and number, a 3px rule (Flux blue
 * when highlighted), 26px title (22px), then ticked deliverables at 15px/1.45.
 */
function PhaseCards({ steps, dark }: { steps: Step[]; dark: boolean }) {
  const t = tone(dark)
  return (
    <Reveal as="ol" stagger className={cn('grid gap-4', stepColumns[Math.min(steps.length, 4)])}>
      {steps.map((step, i) => (
        // Borders sit inside the design's padding, so each side loses a pixel.
        <li key={step.title + i} className={cn('flex flex-col gap-3 p-4.75 lg:p-5.75', t.card)}>
          <div className="flex items-center justify-between gap-3">
            <Label className={cn('text-label-sm/[15px]', t.accent)}>{step.meta}</Label>
            <Label className={cn('text-label-sm/[15px] max-lg:hidden', t.muted)}>{two(i + 1)}</Label>
          </div>
          <span
            aria-hidden="true"
            className={cn('h-0.75', step.highlight ? t.accentBg : dark ? 'bg-paper' : 'bg-ink')}
          />
          <h3 className="text-[1.375rem]/[1.2] font-semibold lg:text-[1.625rem]/[1.2]">{step.title}</h3>
          {step.body ? <p className={cn('text-body/[1.45]', t.muted)}>{step.body}</p> : null}
          {step.points?.length ? (
            <ul className="flex flex-col gap-3">
              {step.points.map((point) => (
                <li key={point} className={cn('flex gap-2.5 text-[15px]/[1.45]', t.muted)}>
                  <Check aria-hidden="true" className={cn('size-3.75 shrink-0', t.accent)} strokeWidth={2} />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </Reveal>
  )
}

export function Features({ section, dark }: Props<FeaturesSection>) {
  return <FeatureGrid features={section.features} dark={dark} variant={section.style} tint={section.tint} />
}

/*
 * Design: Case Study — Software Platform, "05 — Engineering". Three columns 24px apart
 * (stacked 12px apart on mobile): a mono layer name with a hairline and arrow, then boxes
 * 10px apart (15px title, 10px mono meta, 14/16px padding). A "Stack" row of chips follows.
 */
export function Architecture({ section, dark }: Props<ArchitectureSection>) {
  const t = tone(dark)
  const box = dark ? 'border border-line-dark bg-ink-2' : 'border border-line bg-white'
  return (
    <div className="flex flex-col gap-8 lg:gap-14">
      <Reveal stagger className={cn('grid gap-3 lg:gap-6', stepColumns[Math.min(section.layers.length, 4)])}>
        {section.layers.map((layer, i) => {
          const last = i === section.layers.length - 1
          return (
            <section key={layer.name} aria-label={layer.name} className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Label className={cn('text-label-sm/[15px]', t.accent)}>{layer.name}</Label>
                {last ? null : (
                  <>
                    <span aria-hidden="true" className={cn('h-px flex-1 max-lg:hidden', t.quiet)} />
                    <ArrowRight
                      aria-hidden="true"
                      className={cn('size-3.5 max-lg:hidden', t.accent)}
                      strokeWidth={2}
                    />
                  </>
                )}
              </div>
              <ul className="flex flex-col gap-2.5">
                {layer.nodes.map((node) => (
                  <li key={node.title} className={cn('flex flex-col gap-1 px-3.75 pt-3.25 pb-3.25', box)}>
                    <span className="text-[15px]/[1.2] font-semibold">{node.title}</span>
                    <span className={cn('font-mono text-[10px]/[1.3]', t.muted)}>{node.meta}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </Reveal>
      {section.stack ? (
        <Reveal className="flex items-center gap-3 lg:gap-6">
          <Label className={cn('shrink-0 text-label-sm/[15px]', t.muted)}>{section.stack.label}</Label>
          <ul className="flex flex-wrap gap-2">
            {section.stack.items.map((item) => (
              <li
                key={item}
                className={cn('rounded-full border px-3.25 py-1.75 text-[13px]/[1.2] font-medium', t.border)}
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}
    </div>
  )
}

export function Checklist({ section, dark }: Props<ChecklistSection>) {
  const t = tone(dark)
  const list = (
    <Reveal
      as="ul"
      stagger={0.05}
      className={cn('grid lg:flex-1', section.columns === 2 && 'lg:grid-cols-2 lg:gap-x-10')}
    >
      {section.items.map((item) => (
        // The rule sits inside the design's padding (16px, 22px on desktop).
        <li
          key={item.title}
          className={cn('flex gap-3 border-t pt-3.75 pb-4 lg:gap-4 lg:pt-5.25 lg:pb-5.5', t.border)}
        >
          <Check aria-hidden="true" className={cn('size-4.5 shrink-0 lg:size-5', t.accent)} strokeWidth={2} />
          <div className="flex flex-1 flex-col gap-1.5 lg:flex-row lg:items-start lg:gap-4">
            <div className="flex flex-1 flex-col gap-1.5 lg:gap-1">
              <p className={cn('text-base/[21px] lg:text-[19px]/[25px]', item.body && 'font-semibold')}>
                {item.title}
              </p>
              {item.body ? (
                <p className={cn('text-sm/[21px] lg:text-[15px]/[23px]', t.muted)}>{item.body}</p>
              ) : null}
            </div>
            {item.tag ? (
              <span
                className={cn(
                  'self-start rounded-full border px-2.5 py-1 font-mono text-[10px]/[13px] uppercase',
                  dark ? 'border-flux-light/50 text-flux-light' : 'border-flux/50 text-flux',
                )}
              >
                {item.tag}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </Reveal>
  )

  if (!section.panel) return list
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
      {list}
      <ResultsPanel panel={section.panel} dark={dark} />
    </div>
  )
}

/*
 * Design: Case Study — Website Rebuild, "05 — The Rebuild". A 440px outlined panel: each
 * metric with a green verdict, its value (40px, 32px on phones) beside the old one and a
 * 4px bar, then two figures split by a hairline.
 */
function ResultsPanel({ panel, dark }: { panel: NonNullable<ChecklistSection['panel']>; dark: boolean }) {
  const t = tone(dark)
  return (
    <Reveal
      className={cn('flex flex-col gap-5.5 border p-4.75 lg:w-110 lg:shrink-0 lg:gap-7 lg:p-7.75', t.border)}
    >
      <Label className={cn('text-[10px]/[15px]', t.muted)}>{panel.label}</Label>
      <dl className="flex flex-col gap-5.5 lg:gap-7">
        {panel.metrics.map((metric) => (
          <div key={metric.name} className="flex flex-col gap-2.5">
            <dt className="flex items-center justify-between gap-3">
              <span className="text-sm/[17px] font-medium lg:text-[15px]/[18px]">{metric.name}</span>
              {metric.status ? (
                // Green reads clearly on ink; the design only uses this panel on dark bands.
                <span
                  className={cn(
                    'font-mono text-[10px]/[13px] uppercase',
                    dark ? 'text-[#34d399]' : 'text-[#047857]',
                  )}
                >
                  {metric.status}
                </span>
              ) : null}
            </dt>
            <dd className="flex flex-col gap-2.5">
              <p className="flex items-end gap-2.5">
                <span className="text-[2rem]/[1] font-semibold tracking-[-0.04em] lg:text-[2.5rem]/[1]">
                  {metric.value}
                </span>
                <span className={cn('text-sm/[17px]', t.muted)}>was {metric.before}</span>
              </p>
              <span aria-hidden="true" className={cn('flex h-1', t.quiet)}>
                <span
                  className={t.accentBg}
                  style={{ width: `${Math.min(100, Math.max(0, metric.score))}%` }}
                />
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {panel.stats?.length ? (
        <dl className={cn('grid grid-cols-2 border-t', t.border)}>
          {panel.stats.map(([value, label], i) => (
            // The rule sits inside the design's 18px padding.
            <div
              key={label}
              className={cn('flex flex-col gap-1 pt-4.25', i > 0 && cn('border-l pl-4.5', t.border))}
            >
              <dt className={cn('order-2 font-mono text-[9px]/[12px] uppercase', t.muted)}>{label}</dt>
              <dd className="order-1 text-[1.75rem]/[34px] font-semibold lg:text-[2rem]/[39px]">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
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

/*
 * Design: Case Study — Mobile App, "04 — Journey". One row per path under a hairline
 * (28px padding, 20px mobile): mono label and summary, then a numbered box per step.
 * Every box is as wide as one step of the longer path, so the shorter row visibly shrinks.
 * Desktop 56px boxes 10px apart (16px numbers); mobile six to a row, 36px, 6px apart.
 */
function NumberedFlow({ section, dark }: Props<FlowSection>) {
  const t = tone(dark)
  const longest = Math.max(section.before.steps.length, section.after.steps.length)
  return (
    <div className="flex flex-col gap-7 lg:gap-12">
      {[section.before, section.after].map((flow, f) => {
        const after = f === 1
        return (
          <Reveal
            key={flow.label}
            className={cn('flex flex-col gap-3.5 border-t pt-4.75 pb-5 lg:pt-6.75 lg:pb-7', t.border)}
          >
            <div className="flex items-baseline justify-between gap-4">
              <Label
                className={cn('text-label-sm/[15px]', after ? t.accent : dark ? 'text-paper' : 'text-ink')}
              >
                {flow.label}
              </Label>
              {flow.meta ? (
                <Label className={cn('text-[9px]/[1.3] lg:text-label-sm/[15px]', t.muted)}>{flow.meta}</Label>
              ) : null}
            </div>
            <ol
              className="grid grid-cols-6 gap-1.5 lg:grid-cols-(--steps) lg:gap-2.5"
              style={{ '--steps': `repeat(${longest}, minmax(0, 1fr))` } as CSSProperties}
            >
              {flow.steps.map((step, i) => (
                <li
                  key={step + i}
                  className={cn(
                    'flex h-9 items-center justify-center rounded-sm text-[13px]/[1.2] font-semibold lg:h-14 lg:text-base/[1.2]',
                    after ? 'bg-flux text-white' : cn(t.quiet, t.muted),
                  )}
                >
                  <span aria-hidden="true">{i + 1}</span>
                  <span className="sr-only">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        )
      })}
    </div>
  )
}

/** The key task as boxes joined by arrows: across on desktop, two columns down on phones. */
export function Flow({ section, dark }: Props<FlowSection>) {
  const t = tone(dark)
  if (section.style === 'numbered') return <NumberedFlow section={section} dark={dark} />
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
