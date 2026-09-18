import { Minus, Plus, Star } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Label } from '@/components/ui/Typography'
import type { Card, CardsSection, ReviewsSection } from '@/content/case-studies/schema'
import { cn } from '@/lib/cn'
import { Tag } from '../parts'
import { tone } from '../tone'

type Props<T> = { section: T; dark: boolean }

const cardColumns = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3' }

/**
 * Flexible cards: each field is optional, so the same block covers research insights
 * (eyebrow + quote + body), options (facts + pros/cons + highlight) and architecture
 * layers (body + chips).
 */
export function Cards({ section, dark }: Props<CardsSection>) {
  return (
    <Reveal stagger className={cn('grid gap-3 lg:gap-6', cardColumns[section.columns])}>
      {section.cards.map((card) => (
        <CardView key={card.title + (card.eyebrow ?? '')} card={card} dark={dark} />
      ))}
    </Reveal>
  )
}

function CardView({ card, dark }: { card: Card; dark: boolean }) {
  const t = tone(dark)
  return (
    <article
      className={cn(
        'flex flex-col gap-3.5 p-5 lg:p-7',
        card.highlight
          ? // A ring rather than a thicker border, so highlighted cards line up with their neighbours.
            cn('border ring-1', dark ? 'border-flux-light ring-flux-light' : 'border-flux bg-white ring-flux')
          : t.card,
      )}
    >
      {card.eyebrow || card.highlight ? (
        <div className="flex min-h-6 items-center justify-between gap-3">
          {card.eyebrow ? (
            <Label className={card.highlight ? t.accent : t.muted}>{card.eyebrow}</Label>
          ) : (
            <span />
          )}
          {card.highlight ? <Tag variant="solid">{card.highlight}</Tag> : null}
        </div>
      ) : null}

      <h3 className="text-xl/[1.2] font-semibold tracking-tight lg:text-2xl/[1.2]">{card.title}</h3>

      {card.quote ? (
        <blockquote className="font-serif text-[1.375rem]/[1.2] italic lg:text-[1.625rem]/[1.2]">
          “{card.quote}”
        </blockquote>
      ) : null}
      {card.body ? <p className={cn('text-body lg:text-base/[1.55]', t.muted)}>{card.body}</p> : null}

      {card.facts?.length ? (
        <dl>
          {card.facts.map(([label, value]) => (
            <div
              key={label}
              className={cn('flex justify-between gap-4 border-t py-2.5 text-body-sm', t.border)}
            >
              <dt className={t.muted}>{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {card.pros?.length || card.cons?.length ? (
        <ul className="flex flex-col gap-2 text-body-sm">
          {card.pros?.map((pro) => (
            <li key={pro} className="flex gap-2.5">
              <Plus aria-hidden="true" className={cn('size-4 shrink-0', t.accent)} />
              <span className="sr-only">Pro: </span>
              {pro}
            </li>
          ))}
          {card.cons?.map((con) => (
            <li key={con} className={cn('flex gap-2.5', t.muted)}>
              <Minus aria-hidden="true" className="size-4 shrink-0" />
              <span className="sr-only">Con: </span>
              {con}
            </li>
          ))}
        </ul>
      ) : null}

      {card.chips?.length ? (
        <ul className="flex flex-wrap gap-2">
          {card.chips.map((chip) => (
            <li
              key={chip}
              className={cn('rounded-full border px-3.5 py-2 text-[13px]/[1.2] font-medium', t.border)}
            >
              {chip}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

function Stars({ size, gap, dark }: { size: string; gap: string; dark: boolean }) {
  return (
    <span aria-hidden="true" className={cn('flex', gap, dark ? 'text-flux-light' : 'text-flux')}>
      {[0, 1, 2, 3, 4].map((star) => (
        <Star key={star} className={size} strokeWidth={2} />
      ))}
    </span>
  )
}

/*
 * Design: Case Study — Mobile App, "05 — Ratings". The rating (120px, 80px mobile) with
 * outline stars in a 320px column, then review cards side by side, 16px apart and aligned
 * to the top: 24px padding, 14px stars, 18px quote (16px mobile), mono author. Stacked on mobile.
 */
export function Reviews({ section, dark }: Props<ReviewsSection>) {
  const t = tone(dark)
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <Reveal className="flex flex-col gap-2.5 lg:w-80 lg:shrink-0">
        <p className="text-[5rem]/[1] font-semibold lg:text-[7.5rem]/[1]">
          {section.rating}
          <span className="sr-only"> out of 5</span>
        </p>
        <Stars size="size-5" gap="gap-1" dark={dark} />
        <Label className={cn('text-label-sm/[15px]', t.muted)}>{section.ratingLabel}</Label>
      </Reveal>
      <Reveal as="ul" stagger className="flex flex-col gap-4 lg:flex-1 lg:flex-row lg:items-start">
        {section.reviews.map((review) => (
          // The border sits inside the design's 24px padding.
          <li
            key={review.quote}
            className={cn(
              'flex flex-col gap-3.5 p-5.75 lg:flex-1',
              dark ? 'border border-line-dark bg-ink-2' : t.card,
            )}
          >
            <Stars size="size-3.5" gap="gap-0.75" dark={dark} />
            <blockquote className="text-base/[1.5] lg:text-lg/[1.5]">“{review.quote}”</blockquote>
            <Label className={cn('text-[10px]/[1.3]', t.muted)}>{review.author}</Label>
          </li>
        ))}
      </Reveal>
    </div>
  )
}
