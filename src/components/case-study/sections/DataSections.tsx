import { Reveal } from '@/components/motion/Reveal'
import { Label } from '@/components/ui/Typography'
import type {
  BarsSection,
  ChartSection,
  ClustersSection,
  ScoresSection,
  TableCell,
  TableSection,
} from '@/content/case-studies/schema'
import { cn } from '@/lib/cn'
import { Legend, Rating, Source, Tag } from '../parts'
import { tone } from '../tone'

type Props<T> = { section: T; dark: boolean }

/** Before/after bars per row. Bars are decorative; the labels carry the numbers. */
export function Bars({ section, dark }: Props<BarsSection>) {
  const t = tone(dark)
  const bar = (value: number, className: string) => (
    // Bars top out at 75% so the label always fits beside the longest one.
    <span
      aria-hidden="true"
      className={cn('h-2.5 shrink-0 lg:h-3.5', className)}
      style={{ width: `${Math.max(1, Math.min(100, value)) * 0.75}%` }}
    />
  )

  return (
    <div className="flex flex-col gap-5">
      <Legend labels={section.legend} dark={dark} />
      <Reveal as="ul" stagger={0.06}>
        {section.rows.map((row) => (
          <li
            key={row.label}
            className={cn(
              'flex flex-col gap-2.5 border-t py-4 lg:flex-row lg:items-center lg:gap-10 lg:py-5.5',
              t.border,
            )}
          >
            <span
              className={cn(
                'text-base font-semibold lg:w-70 lg:shrink-0 lg:text-lg',
                row.highlight && t.accent,
              )}
            >
              {row.label}
            </span>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2.5">
                {bar(row.before.value, t.quiet)}
                <Label className={t.muted}>
                  {section.legend[0]} · {row.before.display}
                </Label>
              </div>
              <div className="flex items-center gap-2.5">
                {bar(row.after.value, t.accentBg)}
                <Label className={t.accent}>
                  {section.legend[1]} · {row.after.display}
                </Label>
              </div>
            </div>
          </li>
        ))}
      </Reveal>
      {section.source ? <Source dark={dark}>{section.source}</Source> : null}
    </div>
  )
}

/** Column chart. Heights are relative to the largest value. */
export function Chart({ section, dark }: Props<ChartSection>) {
  const t = tone(dark)
  const max = Math.max(...section.points.map((point) => point.value), 1)
  const changeAt = section.changeAt ?? 0

  return (
    <Reveal
      as="figure"
      className={cn('flex flex-col gap-6 lg:gap-10', !dark && 'border border-line bg-white p-5 lg:p-12')}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1.5">
          <Label className={t.muted}>{section.kpi.label}</Label>
          <p className="flex items-end gap-3">
            <span className="text-[2.5rem]/[1] font-semibold tracking-tight lg:text-[4rem]/[1]">
              {section.kpi.value}
            </span>
            {section.kpi.detail ? <Label className={cn('pb-1', t.accent)}>{section.kpi.detail}</Label> : null}
          </p>
        </div>
        {section.legend ? <Legend labels={section.legend} dark={dark} /> : null}
      </div>

      <div aria-hidden="true" className="flex h-45 lg:h-90">
        {section.points.map((point, i) => (
          <div key={point.label + i} className="flex flex-1 flex-col items-center">
            <div
              className={cn(
                'flex w-full flex-1 flex-col items-center justify-end gap-1.5 border-b px-0.5 lg:px-3',
                t.rule,
              )}
            >
              {i === changeAt && section.markerLabel ? (
                <Label className={cn('max-lg:text-[8px]', t.accent)}>{section.markerLabel}</Label>
              ) : null}
              <span
                className={cn('w-full', i < changeAt ? t.quiet : t.accentBg)}
                style={{ height: `${(point.value / max) * 85}%` }}
              />
            </div>
            <Label className={cn('pt-2.5 max-lg:text-[9px]', t.muted)}>{point.label}</Label>
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
          <Source dark={dark}>{section.source}</Source>
        </figcaption>
      ) : null}
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

/** Score rings, then before → after vitals. */
export function Scores({ section, dark }: Props<ScoresSection>) {
  const t = tone(dark)
  return (
    <>
      <Reveal as="ul" stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {section.scores.map((score) => (
          <li key={score.label} className="flex flex-col items-center gap-3">
            <span
              className={cn(
                'flex size-24 items-center justify-center rounded-full border-3 text-[1.625rem] font-semibold lg:size-35 lg:border-4 lg:text-[2.5rem]',
                dark ? 'border-flux-light' : 'border-flux',
              )}
            >
              {score.value}
            </span>
            <Label className={t.muted}>{score.label}</Label>
          </li>
        ))}
      </Reveal>
      {section.vitals?.length ? (
        <Reveal as="dl" stagger className="grid lg:grid-cols-3 lg:gap-x-6">
          {section.vitals.map((vital) => (
            <div
              key={vital.name}
              className={cn('flex items-center justify-between gap-4 border-t py-4', t.border)}
            >
              <dt>
                <Label className={t.muted}>{vital.name}</Label>
              </dt>
              <dd className="flex items-center gap-2.5">
                <span className={cn('text-body', t.muted)}>was {vital.before}</span>
                <span aria-hidden="true" className={t.accent}>
                  →
                </span>
                <span className="text-[1.375rem] font-semibold lg:text-[1.75rem]">{vital.after}</span>
              </dd>
            </div>
          ))}
        </Reveal>
      ) : null}
    </>
  )
}

/** Pillar page cards with their supporting articles hanging off a blue line. */
export function Clusters({ section, dark }: Props<ClustersSection>) {
  const t = tone(dark)
  const line = dark ? 'border-flux-light' : 'border-flux'
  return (
    <Reveal stagger className="grid gap-10 lg:grid-cols-3 lg:gap-6">
      {section.clusters.map((cluster, i) => (
        <div key={cluster.pillar}>
          <div className={cn('flex flex-col gap-3 p-5 lg:p-6', t.card)}>
            <div className="flex items-center justify-between">
              <Label className={t.accent}>Pillar {String(i + 1).padStart(2, '0')}</Label>
              <Tag dark={dark}>{cluster.rank}</Tag>
            </div>
            <h3 className="text-xl/[1.2] font-semibold lg:text-[1.375rem]/[1.2]">{cluster.pillar}</h3>
            <p className="flex items-end gap-2">
              <span className="text-2xl/[1] font-semibold lg:text-[1.75rem]/[1]">{cluster.visits}</span>
              <span className={cn('text-body-sm', t.muted)}>visits / month</span>
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
                  <span className="text-body/[1.35] font-medium">{article.title}</span>
                  <Label className={t.muted}>
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
