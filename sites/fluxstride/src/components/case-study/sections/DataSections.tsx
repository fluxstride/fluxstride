import { ArrowDown, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { Label } from '@fluxstride/design-system/ui/Typography'
import type {
  BarsSection,
  ChartSection,
  ClustersSection,
  RankingsSection,
  ScoresSection,
  TableCell,
  TableSection,
} from '@/content/case-studies/schema'
import { cn } from '@fluxstride/design-system/lib/cn'
import { Legend, Rating, Source, Tag } from '../parts'
import { tone } from '../tone'

type Props<T> = { section: T; dark: boolean }

/*
 * Design: Case Study: E-commerce, "04: Conversion". A legend, then one row per stage
 * under a hairline: 220px name beside two bars (20px, 14px on phones) with their figure,
 * old in grey and new in Flux blue. Phones put the name above the bars.
 * Bars are decorative; the figures carry the numbers.
 */
export function Bars({ section, dark }: Props<BarsSection>) {
  if (section.style === 'compare') return <CompareBars section={section} dark={dark} />
  const t = tone(dark)
  const max = Math.max(...section.rows.flatMap((row) => [row.before.value, row.after.value]), 1)
  const bar = (value: number, className: string) => (
    // The longest bar spans 77% of the track (70% on phones), leaving room for its figure.
    <span
      aria-hidden="true"
      className={cn('h-3.5 w-[calc(var(--bar)*70%)] shrink-0 lg:h-5 lg:w-[calc(var(--bar)*77%)]', className)}
      style={{ '--bar': Math.max(0, value) / max } as CSSProperties}
    />
  )

  return (
    <div className="flex flex-col gap-7 lg:gap-12">
      <Legend
        keys={[
          { label: section.legend[0], swatch: t.quiet },
          { label: section.legend[1], swatch: t.accentBg, strong: true },
        ]}
        dark={dark}
        className="max-lg:flex-col max-lg:gap-2"
      />
      <Reveal as="ul" stagger={0.06} className="flex flex-col gap-4.5 lg:gap-5.5">
        {section.rows.map((row) => (
          // The rule sits inside the design's bottom padding (16px, 22px on desktop).
          <li
            key={row.label}
            className={cn(
              'flex flex-col gap-2 border-b pb-3.75 lg:flex-row lg:items-center lg:gap-6 lg:pb-5.25',
              t.border,
            )}
          >
            <span
              className={cn(
                'text-[15px]/[1.2] font-semibold lg:w-55 lg:shrink-0 lg:text-lg/[1.2]',
                row.highlight && t.accent,
              )}
            >
              {row.label}
            </span>
            <dl className="flex flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">{section.legend[0]}</dt>
                {bar(row.before.value, t.quiet)}
                <dd className={cn('font-mono text-label-sm/[15px] uppercase', t.muted)}>
                  {row.before.display}
                </dd>
              </div>
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">{section.legend[1]}</dt>
                {bar(row.after.value, t.accentBg)}
                <dd className={cn('font-mono text-label-sm/[15px] uppercase', t.text)}>
                  {row.after.display}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </Reveal>
      {section.source ? <Source dark={dark}>{section.source}</Source> : null}
    </div>
  )
}

/** Column chart. Heights are relative to the largest value. */
export function Chart({ section, dark }: Props<ChartSection>) {
  if (section.points.some((point) => point.stack != null))
    return <StackedChart section={section} dark={dark} />
  const t = tone(dark)
  const max = Math.max(...section.points.map((point) => point.value), 1)
  const changeAt = section.changeAt ?? 0

  return (
    <Reveal
      as="figure"
      className={cn(
        'flex flex-col gap-6 border p-4.75 lg:gap-10 lg:p-11.75',
        dark ? 'border-line-dark' : 'border-line bg-white',
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        {section.kpi ? (
          <div className="flex flex-col gap-1.5">
            <Label className={cn('text-[10px]/[13px] lg:text-label-sm/[15px]', t.muted)}>
              {section.kpi.label}
            </Label>
            <p className="flex items-end gap-3">
              <span className="text-[2.5rem]/[1] font-semibold tracking-[-0.04em] lg:text-[4rem]/[1]">
                {section.kpi.value}
              </span>
              {section.kpi.detail ? (
                <Label className={cn('text-xs/[16px] lg:text-sm/[18px]', t.accent)}>
                  {section.kpi.detail}
                </Label>
              ) : null}
            </p>
          </div>
        ) : null}
        {section.legend ? (
          <Legend
            keys={[
              { label: section.legend[0], swatch: t.baseline },
              { label: section.legend[1], swatch: t.accentBg },
            ]}
            dark={dark}
            size="xs"
          />
        ) : null}
      </div>

      {/* Design: 385px of columns (222px on phones); the tallest reaches 96% of the plot. */}
      <div aria-hidden="true" className="flex h-55.5 lg:h-96.25">
        {section.points.map((point, i) => (
          <div key={point.label + i} className="flex flex-1 flex-col items-center gap-2.5">
            <div
              className={cn(
                'flex w-full flex-1 flex-col items-center justify-end gap-1.5 border-b px-0.5 lg:px-3',
                t.rule,
              )}
            >
              {i === changeAt && section.markerLabel ? (
                <>
                  <ArrowDown className={cn('size-3 lg:hidden', t.accent)} strokeWidth={2} />
                  <Label className={cn('text-[10px]/[13px] max-lg:hidden', t.accent)}>
                    {section.markerLabel}
                  </Label>
                </>
              ) : null}
              {point.callout ? (
                <Label className="text-label-sm/[15px] max-lg:hidden">{point.callout}</Label>
              ) : null}
              <span
                className={cn('w-full shrink-0', i < changeAt ? t.baseline : t.accentBg)}
                style={{ height: `${(point.value / max) * 96}%` }}
              />
            </div>
            <Label className={cn('text-[9px]/[12px] lg:text-label-sm/[15px]', t.muted)}>
              <span className="lg:hidden">{point.label.slice(0, 1)}</span>
              <span className="max-lg:hidden">{point.label}</span>
            </Label>
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {section.points.map((point, i) => (
          <li key={point.label + i}>
            {point.label}: {point.display ?? point.value}
          </li>
        ))}
      </ul>

      {section.source ? (
        <figcaption>
          <SmallSource dark={dark}>{section.source}</SmallSource>
        </figcaption>
      ) : null}
    </Reveal>
  )
}

/** Source line under Atlas Freight's charts and tables: 10px, 9px on phones. */
function SmallSource({ children, dark }: { children: ReactNode; dark: boolean }) {
  return (
    <Label
      className={cn('block text-[9px]/[1.5] lg:text-[10px]/[13px]', dark ? 'text-stone' : 'text-stone-light')}
    >
      {children}
    </Label>
  )
}

/*
 * Design: "Case Study Section: Share of Voice". One row per competitor under a
 * hairline: 260px name beside two thin bars labelled "2025 · 6%". The highlighted row
 * (the client) is in Flux blue, the others' new bars in grey. Name above the bars on phones.
 */
function CompareBars({ section, dark }: Props<BarsSection>) {
  const t = tone(dark)
  const max = Math.max(...section.rows.flatMap((row) => [row.before.value, row.after.value]), 1)
  const bar = (value: number, className: string) => (
    // The longest bar spans 78% of the track (66% on phones).
    <span
      aria-hidden="true"
      className={cn('h-2 w-[calc(var(--bar)*66%)] shrink-0 lg:h-3 lg:w-[calc(var(--bar)*78%)]', className)}
      style={{ '--bar': Math.max(0, value) / max } as CSSProperties}
    />
  )
  const figure = 'font-mono text-[10px]/[13px] uppercase'

  return (
    <div className="flex flex-col gap-8 lg:gap-14">
      <Reveal as="ul" stagger={0.06}>
        {section.rows.map((row) => (
          // The rule sits inside the design's padding (16px, 22px on desktop).
          <li
            key={row.label}
            className={cn(
              'flex flex-col gap-2.5 border-t pt-3.75 pb-4 lg:flex-row lg:items-center lg:gap-10 lg:pt-5.25 lg:pb-5.5',
              t.border,
            )}
          >
            <span
              className={cn(
                'text-base/[19px] lg:w-65 lg:shrink-0 lg:text-lg/[22px]',
                row.highlight ? cn('font-semibold', t.accent) : 'font-medium',
              )}
            >
              {row.label}
            </span>
            <div className="flex flex-1 flex-col gap-2">
              <p className="flex items-center gap-2.5">
                {bar(row.before.value, t.baseline)}
                <span className={cn(figure, t.muted)}>
                  {section.legend[0]} · {row.before.display}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                {bar(row.after.value, row.highlight ? t.accentBg : dark ? 'bg-stone-light' : 'bg-stone')}
                <span className={cn(figure, row.highlight ? t.accent : t.text)}>
                  {section.legend[1]} · {row.after.display}
                </span>
              </p>
            </div>
          </li>
        ))}
      </Reveal>
      {section.source ? <SmallSource dark={dark}>{section.source}</SmallSource> : null}
    </div>
  )
}

/*
 * Design: Case Study: E-commerce, "05: Revenue", on ink. Twelve columns 14px apart (4px on
 * phones) on a 340px baseline (200px): `value` at the bottom, `stack` 2px above it in the
 * lighter blue. Columns before `changeAt` are grey. Month labels 12px below, the legend
 * 56px under the chart (32px, stacked).
 */
function StackedChart({ section, dark }: Props<ChartSection>) {
  const t = tone(dark)
  const total = (point: ChartSection['points'][number]) => point.value + (point.stack ?? 0)
  const max = Math.max(...section.points.map(total), 1)
  const changeAt = section.changeAt ?? 0
  // Flux blue below, the lighter blue stacked on top (on paper, a tint of Flux).
  const stackColour = dark ? 'bg-flux-light' : 'bg-flux/40'

  return (
    <Reveal as="figure" className="flex flex-col gap-8 lg:gap-14">
      <div aria-hidden="true" className="flex flex-col gap-3">
        <div className={cn('flex h-50 items-end gap-1 border-b lg:h-85 lg:gap-3.5', t.border)}>
          {section.points.map((point, i) => (
            // The tallest column reaches 94% of the chart (97% on desktop).
            <div
              key={point.label + i}
              className="flex h-[calc(var(--column)*94%)] flex-1 flex-col justify-end gap-0.5 lg:h-[calc(var(--column)*97%)]"
              style={{ '--column': total(point) / max } as CSSProperties}
            >
              {point.stack ? <span className={stackColour} style={{ flexGrow: point.stack }} /> : null}
              <span className={i < changeAt ? t.quiet : 'bg-flux'} style={{ flexGrow: point.value }} />
            </div>
          ))}
        </div>
        <div className="flex gap-1 lg:gap-3.5">
          {section.points.map((point, i) => (
            <Label key={point.label + i} className={cn('flex-1 text-center text-[10px]/[13px]', t.muted)}>
              {point.label}
            </Label>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {section.points.map((point, i) => (
          <li key={point.label + i}>
            {point.label}: {point.display ?? total(point)}
          </li>
        ))}
      </ul>
      <figcaption className="flex flex-col gap-4">
        <Legend
          keys={[
            ...(section.legend ? [{ label: section.legend[1], swatch: 'bg-flux' }] : []),
            ...(section.stackLabel ? [{ label: section.stackLabel, swatch: stackColour }] : []),
            ...(section.legend && changeAt > 0 ? [{ label: section.legend[0], swatch: t.quiet }] : []),
          ]}
          dark={dark}
          size="sm"
          className="max-lg:flex-col max-lg:gap-2"
        />
        {section.source ? <Source dark={dark}>{section.source}</Source> : null}
      </figcaption>
    </Reveal>
  )
}

const columnWidth = { sm: 'lg:w-35', md: 'lg:w-50', fill: '' }

function Cell({ cell, emphasis, dark }: { cell: TableCell; emphasis?: 'strong' | 'muted'; dark: boolean }) {
  const t = tone(dark)
  if (typeof cell === 'string') {
    return (
      <span className={cn(emphasis === 'strong' && 'font-semibold', emphasis === 'muted' && t.muted)}>
        {cell}
      </span>
    )
  }
  if ('rating' in cell) return <Rating value={cell.rating} dark={dark} />
  return (
    <Tag variant={cell.tone === 'risk' ? 'risk' : 'flux'} dark={dark}>
      {cell.tag}
    </Tag>
  )
}

/** A real table on desktop; each row becomes a small card on phones. */
export function Table({ section, dark }: Props<TableSection>) {
  const t = tone(dark)
  const [first, ...rest] = section.columns

  return (
    <div className="flex flex-col gap-5">
      <Reveal className="max-lg:hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              {section.columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'pr-6 pb-3.5 font-mono text-label-sm font-normal uppercase',
                    t.muted,
                    columnWidth[column.width ?? 'md'],
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-base lg:text-[17px]/[1.4]">
            {section.rows.map((row, i) => (
              <tr key={i} className={cn('border-t', t.border)}>
                {section.columns.map((column) => (
                  <td key={column.key} className="py-5 pr-6 align-middle">
                    <Cell cell={row[column.key] ?? ''} emphasis={column.emphasis} dark={dark} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <ul className="lg:hidden">
        {section.rows.map((row, i) => (
          <li key={i} className={cn('flex flex-col gap-2 border-t py-4', t.border)}>
            <p className="text-base/[1.35] font-semibold">
              <Cell cell={row[first.key] ?? ''} dark={dark} />
            </p>
            <dl className="flex flex-col gap-1.5">
              {rest.map((column) => (
                <div key={column.key} className="flex items-center justify-between gap-4 text-body">
                  <dt>
                    <Label className={t.muted}>{column.label}</Label>
                  </dt>
                  <dd className="text-right">
                    <Cell cell={row[column.key] ?? ''} emphasis={column.emphasis} dark={dark} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {section.source ? <Source dark={dark}>{section.source}</Source> : null}
    </div>
  )
}

/*
 * Design: Case Study: Website, "06: Performance". Four white cards 20px apart (2×2, 12px
 * on phones): a 120px ring (88px) with the score, the category under it. Vitals follow as
 * rows: mono code, name, old value, new value and a verdict tag on desktop.
 */
export function Scores({ section, dark }: Props<ScoresSection>) {
  const t = tone(dark)
  return (
    <div className="flex flex-col gap-8 lg:gap-14">
      <Reveal as="ul" stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {section.scores.map((score) => (
          <li
            key={score.label}
            className={cn(
              'flex flex-col items-center gap-3.5 p-4.75 lg:p-7.75',
              dark ? 'border border-line-dark bg-ink-2' : t.card,
            )}
          >
            <span
              className={cn(
                'flex size-22 items-center justify-center rounded-full border-5 text-[1.875rem]/[1.2] font-semibold tracking-[-0.03em] lg:size-30 lg:border-7 lg:text-[2.5rem]/[1.2]',
                dark ? 'border-flux-light' : 'border-flux',
              )}
            >
              {score.value}
            </span>
            <span className="text-center text-sm/[1.2] font-medium lg:text-base/[1.2]">{score.label}</span>
          </li>
        ))}
      </Reveal>
      {section.vitals?.length ? (
        <Reveal as="dl" stagger>
          {section.vitals.map((vital) => (
            // The rule sits inside the design's 16px padding.
            <div key={vital.name} className={cn('flex items-center gap-4 border-b pt-4 pb-3.75', t.border)}>
              <dt className="flex flex-1 items-center gap-4">
                {vital.key ? (
                  <Label className={cn('w-12 shrink-0 text-label/[16px]', t.accent)}>{vital.key}</Label>
                ) : null}
                <span className="text-sm/[1.2] font-medium lg:text-[17px]/[1.2]">{vital.name}</span>
              </dt>
              <dd className="flex items-center gap-4">
                <span className={cn('text-[13px]/[1.2] lg:text-[15px]/[1.2]', t.muted)}>
                  <span className="sr-only">was </span>
                  {vital.before}
                </span>
                <span className="text-[15px]/[1.2] font-semibold lg:text-[17px]/[1.2]">
                  <span className="sr-only">, now </span>
                  {vital.after}
                </span>
                {vital.status ? (
                  <span
                    className={cn(
                      'rounded-xl px-2.5 py-1 font-mono text-[10px]/[1.2] uppercase max-lg:hidden',
                      dark ? 'bg-ink-2 text-flux-light' : 'bg-flux-soft text-flux',
                    )}
                  >
                    {vital.status}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </Reveal>
      ) : null}
    </div>
  )
}

/** A position like "#3" in a Flux pill. */
function Position({
  children,
  dark,
  large = false,
}: {
  children: ReactNode
  dark: boolean
  large?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 rounded-full font-semibold',
        large
          ? 'px-2.5 py-1 text-[13px]/[16px] lg:px-3 lg:py-1.5 lg:text-[15px]/[18px]'
          : 'px-2.5 py-1 text-[13px]/[16px]',
        dark ? 'bg-ink-2 text-flux-light' : 'bg-flux-soft text-flux',
      )}
    >
      {children}
    </span>
  )
}

/*
 * Design: "Case Study Section: Content Clusters". Three clusters 24px apart (stacked 40px
 * apart on phones): a white pillar card, then its articles hanging off a Flux line.
 */
export function Clusters({ section, dark }: Props<ClustersSection>) {
  const t = tone(dark)
  const line = dark ? 'border-flux-light' : 'border-flux'
  return (
    <Reveal stagger className="grid items-start gap-10 lg:grid-cols-3 lg:gap-6">
      {section.clusters.map((cluster, i) => (
        <div key={cluster.pillar}>
          <div className={cn('flex flex-col gap-3.5 p-4.75 lg:p-5.75', t.card)}>
            <div className="flex items-center justify-between gap-3">
              <Label className={cn('text-[10px]/[13px]', t.accent)}>
                Pillar {String(i + 1).padStart(2, '0')}
              </Label>
              <Position dark={dark}>{cluster.rank}</Position>
            </div>
            <h3 className="text-xl/[1.2] font-semibold lg:text-[1.375rem]/[1.2]">{cluster.pillar}</h3>
            <p className="flex items-end gap-2">
              <span className="text-2xl/[1] font-semibold lg:text-[1.75rem]/[1]">{cluster.visits}</span>
              <span className={cn('text-sm/[17px]', t.muted)}>visits / month</span>
            </p>
          </div>
          <ul className={cn('ml-5 border-l pt-2 lg:ml-7', line)}>
            {cluster.articles.map((article) => (
              <li key={article.title} className="flex items-center gap-3 py-3">
                <span
                  aria-hidden="true"
                  className={cn('h-px w-4 shrink-0', dark ? 'bg-flux-light' : 'bg-flux')}
                />
                <span className="flex flex-col gap-1">
                  <span className="text-[15px]/[1.35] font-medium">{article.title}</span>
                  <Label className={cn('text-[10px]/[13px]', t.muted)}>
                    {article.rank} · {article.visits} visits / mo
                  </Label>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Reveal>
  )
}

/*
 * Design: Case Study: Website Rebuild, "04: Rankings". A table on desktop: mono headings,
 * 70px rows, the new position in a Flux pill and the change with a trend arrow. On phones
 * each keyword is a row with its searches on the left and "38 → #3" on the right.
 */
export function Rankings({ section, dark }: Props<RankingsSection>) {
  const t = tone(dark)
  const heading = cn('pb-4 font-mono text-label-sm/[15px] font-normal uppercase', t.muted)

  return (
    <div className="flex flex-col gap-8 lg:gap-14">
      <Reveal className="max-lg:hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th scope="col" className={heading}>
                Keyword
              </th>
              <th scope="col" className={cn(heading, 'w-50')}>
                Searches / month
              </th>
              <th scope="col" className={cn(heading, 'w-37.5')}>
                Before
              </th>
              <th scope="col" className={cn(heading, 'w-37.5')}>
                After
              </th>
              <th scope="col" className={cn(heading, 'w-40')}>
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row) => {
              const Trend = /^[−-]/.test(row.change) ? TrendingDown : TrendingUp
              return (
                // The rule sits inside the design's 20px padding.
                <tr key={row.keyword} className={cn('border-t', t.border)}>
                  <th scope="row" className="pt-4.75 pb-5 align-middle text-xl/[24px] font-medium">
                    {row.keyword}
                  </th>
                  <td className={cn('pt-4.75 pb-5 align-middle text-[17px]/[21px]', t.muted)}>
                    {row.volume}
                  </td>
                  <td className={cn('pt-4.75 pb-5 align-middle text-[17px]/[21px]', t.muted)}>
                    {row.before}
                  </td>
                  <td className="pt-4.75 pb-5 align-middle">
                    <Position dark={dark} large>
                      {row.after}
                    </Position>
                  </td>
                  <td className="pt-4.75 pb-5 align-middle">
                    <span className="flex items-center gap-2 text-base/[19px] font-medium">
                      <Trend
                        aria-hidden="true"
                        className={cn('size-4.5 shrink-0', t.accent)}
                        strokeWidth={2}
                      />
                      {row.change}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Reveal>

      <Reveal as="ul" stagger={0.05} className="lg:hidden">
        {section.rows.map((row) => (
          <li key={row.keyword} className={cn('flex flex-col gap-2.5 border-t pt-3.75 pb-4', t.border)}>
            <p className="text-[17px]/[21px] font-semibold">{row.keyword}</p>
            <div className="flex items-center justify-between gap-3">
              <Label className={cn('text-[10px]/[13px]', t.muted)}>{row.volume} / mo</Label>
              <p className={cn('flex items-center gap-2 text-sm/[17px]', t.muted)}>
                <span className="sr-only">Position </span>
                {row.before}
                <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={2} />
                <span className="sr-only"> now </span>
                <Position dark={dark}>{row.after}</Position>
                <span className="sr-only">, {row.change}</span>
              </p>
            </div>
          </li>
        ))}
      </Reveal>

      {section.source ? <SmallSource dark={dark}>{section.source}</SmallSource> : null}
    </div>
  )
}
