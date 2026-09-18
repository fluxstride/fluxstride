import { Minus } from 'lucide-react'
import type { CSSProperties } from 'react'
import { AlwaysOn, Toggle } from '@/components/consent/Toggle'
import { buttonClass } from '@/components/ui/button-styles'
import { IconCircle } from '@/components/ui/IconCircle'
import { SmartLink } from '@/components/ui/SmartLink'
import { cookieCategories } from '@/content/consent'
import type { LegalAction, LegalBlock, LegalColumn } from '@/content/legal'
import { cn } from '@/lib/cn'
import { setCategory, useConsent } from '@/lib/consent'
import { dotted } from '@/lib/format'
import { legalActions } from './actions'
import { RichText } from './RichText'

/*
 * Design: the blocks inside a legal section (Privacy, Terms and Cookie policy pages).
 * Desktop sizes first, mobile second. Pencil draws strokes inside the frame, so boxes
 * with a CSS border give 1px of their padding to it.
 *
 *   paragraph   18/16px ink, 1.7 leading
 *   note        paper-2, 22/18px padding, 20px flux icon, 16/15px text
 *   list        6px flux dots centred on the first line, 10px apart
 *   table       mono 11 heads over a 1.5px ink rule, 18px rows on hairlines.
 *               Mobile: one white card per row, each cell labelled (mono 10)
 *   cards       three across, 16px gaps; 24/20px padding, 40px icon circle, 19/17px title
 *   actions     15/600 buttons, 15×22 padding, 16px icon after the label; stacked on mobile
 *   stats       44/32px figures between hairlines, four across (two on mobile)
 *   split       two white cards, the highlighted one with a flux border
 *   categories  white cards: 20/17px name + switch, 15px description, mono cookie names
 */
export function LegalBlockView({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-doc-body text-ink">
          <RichText text={block.text} />
        </p>
      )

    case 'note': {
      const Icon = block.icon
      return (
        <div role="note" className="flex break-inside-avoid gap-3.5 bg-paper-2 p-4.5 lg:p-5.5">
          <Icon aria-hidden="true" size={20} strokeWidth={2} className="shrink-0 text-flux" />
          <p className="text-doc-note text-ink">
            <RichText text={block.text} />
          </p>
        </div>
      )
    }

    case 'list':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3.5 text-doc-body text-ink">
              <span aria-hidden="true" className="flex h-[1.7em] w-1.5 shrink-0 items-center">
                <span className="size-1.5 rounded-full bg-flux" />
              </span>
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      )

    case 'table':
      return <LegalTable columns={block.columns} rows={block.rows} monoFirstColumn={block.monoFirstColumn} />

    case 'cards':
      return (
        <ul className="grid gap-4 lg:grid-cols-3">
          {block.items.map((card) => (
            <li
              key={card.title}
              className="flex break-inside-avoid flex-col gap-2.5 border border-line bg-white p-4.75 lg:min-h-49 lg:p-5.75"
            >
              <IconCircle icon={card.icon} size="sm" />
              <span aria-hidden="true" className="h-0.5" />
              <h3 className="text-doc-card-sm text-ink">{card.title}</h3>
              <p className="text-body text-stone">{card.body}</p>
            </li>
          ))}
        </ul>
      )

    case 'actions':
      return (
        <div className="flex flex-col items-start gap-3 lg:flex-row">
          {block.items.map((action, i) => (
            <ActionButton key={action.label} action={action} primary={i === 0} />
          ))}
        </div>
      )

    case 'stats':
      return (
        <dl className="grid break-inside-avoid grid-cols-2 lg:grid-cols-4">
          {block.items.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col gap-1.5 border-y border-line py-4.75',
                // The first stat on each row sits on the text edge; the others have a divider.
                i > 0 && 'border-l pr-5 pl-4.75',
                i === 2 && 'max-lg:border-l-0 max-lg:px-0',
              )}
            >
              <dt className="order-2 text-sm/[1.45] text-stone">{stat.label}</dt>
              <dd className="order-1 text-doc-stat text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )

    case 'split':
      return (
        <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
          {block.columns.map((column) => {
            const Icon = column.icon
            return (
              <div
                key={column.title}
                className={cn(
                  'flex break-inside-avoid flex-col gap-3.5 border bg-white p-5.75',
                  column.highlight ? 'border-flux' : 'border-line',
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    aria-hidden="true"
                    size={20}
                    strokeWidth={2}
                    className={cn('shrink-0', column.highlight ? 'text-flux' : 'text-ink')}
                  />
                  <h3 className="text-doc-card-md text-ink">{column.title}</h3>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-body text-stone">
                      <Minus aria-hidden="true" size={14} strokeWidth={2} className="shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )

    case 'cookie-categories':
      return <CookieCategoryList />
  }
}

function LegalTable({
  columns,
  rows,
  monoFirstColumn,
}: {
  columns: LegalColumn[]
  rows: string[][]
  monoFirstColumn?: boolean
}) {
  // Desktop column widths, e.g. "210px 1fr 230px".
  const style = {
    '--cols': columns.map((column) => (column.width ? `${column.width}px` : 'minmax(0,1fr)')).join(' '),
  } as CSSProperties

  // Rows become cards on mobile, which a real table layout can't do. The elements keep
  // their table roles explicitly, so assistive tech still reads a table.
  return (
    <table role="table" style={style} className="block w-full">
      <thead role="rowgroup" className="block max-lg:hidden">
        <tr role="row" className="grid grid-cols-(--cols) gap-6 border-b-[1.5px] border-ink pb-[12.5px]">
          {columns.map((column) => (
            <th
              key={column.label}
              role="columnheader"
              scope="col"
              className="text-left font-mono text-label-sm font-normal text-stone uppercase"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup" className="flex flex-col gap-3 lg:block">
        {rows.map((row) => (
          <tr
            key={row[0]}
            role="row"
            className="flex break-inside-avoid flex-col gap-2.5 border border-line bg-white p-4.25 lg:grid lg:grid-cols-(--cols) lg:gap-6 lg:border-0 lg:border-b lg:bg-transparent lg:px-0 lg:pt-4.5 lg:pb-4.25"
          >
            {row.map((cell, i) => (
              <td
                key={columns[i].label}
                role="cell"
                data-label={columns[i].label}
                className={cn(
                  'flex flex-col gap-0.75 text-[0.9375rem]/[1.5] text-ink lg:block lg:text-base/[1.55]',
                  // Mobile cell label, from the column heading.
                  'before:font-mono before:text-[0.625rem]/[1.3] before:font-normal before:text-stone before:uppercase before:content-[attr(data-label)] lg:before:hidden',
                  i === 0 ? 'font-semibold' : 'lg:text-stone',
                  i === 0 && monoFirstColumn && 'lg:font-mono',
                )}
              >
                {/* One flex item, so a link inside the text doesn't break onto its own line. */}
                <span>
                  <RichText text={cell} />
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ActionButton({ action, primary }: { action: LegalAction; primary: boolean }) {
  const Icon = action.icon
  const className = buttonClass({ variant: primary ? 'primary' : 'outline', size: 'inline' })
  const content = (
    <>
      {action.label}
      <Icon aria-hidden="true" size={16} strokeWidth={2} />
    </>
  )

  if (action.action) {
    return (
      <button type="button" onClick={legalActions[action.action]} className={className}>
        {content}
      </button>
    )
  }
  return (
    <SmartLink to={action.href} className={className}>
      {content}
    </SmartLink>
  )
}

/**
 * The consent categories, with switches that save straight away. They show the visitor's
 * saved choices, and stay off until the page has read them (or while no choice exists).
 */
function CookieCategoryList() {
  const { status, choices } = useConsent()

  return (
    <ul className="flex flex-col gap-3">
      {cookieCategories.map((category) => {
        const { id } = category
        const titleId = `cookie-category-${id}`
        return (
          <li
            key={id}
            className="flex break-inside-avoid flex-col gap-3 border border-line bg-white p-4.75 lg:p-5.75"
          >
            <div className="flex min-h-6 items-center gap-4">
              <h3 id={titleId} className="flex-1 text-doc-card text-ink">
                {category.name}
              </h3>
              {id === 'necessary' ? (
                <AlwaysOn />
              ) : (
                <Toggle
                  checked={status === 'decided' && choices[id]}
                  onChange={(granted) => setCategory(id, granted)}
                  labelledBy={titleId}
                  describedBy={`${titleId}-description`}
                />
              )}
            </div>
            <p id={`${titleId}-description`} className="text-body text-stone">
              {category.description}
            </p>
            <p className="font-mono text-[0.625rem]/[1.3] text-ink lg:text-label-sm">
              {dotted(category.displayCookies ?? category.cookies)}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
