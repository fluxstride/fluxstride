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
        card.highlight ? cn('border-2', dark ? 'border-flux-light' : 'border-flux bg-white') : t.card,
      )}
    >
      {card.eyebrow || card.highlight ? (
        <div className="flex items-center justify-between gap-3">
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

function Stars({ size, dark }: { size: string; dark: boolean }) {
  return (
    <span aria-hidden="true" className={cn('flex gap-1', dark ? 'text-flux-light' : 'text-flux')}>
      {[0, 1, 2, 3, 4].map((star) => (
        <Star key={star} className={cn(size, 'fill-current')} strokeWidth={0} />
      ))}
    </span>
  )
}

/** The store rating on the left, review cards on the right. */
export function Reviews({ section, dark }: Props<ReviewsSection>) {
  const t = tone(dark)
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
      <Reveal className="flex flex-col gap-3 lg:w-90 lg:shrink-0">
        <p className="text-[4.5rem]/[1] font-semibold tracking-tight lg:text-[8.75rem]/[1]">
          {section.rating}
          <span className="sr-only"> out of 5</span>
        </p>
        <Stars size="size-4.5 lg:size-5.5" dark={dark} />
        <Label className={t.muted}>{section.ratingLabel}</Label>
      </Reveal>
      <Reveal as="ul" stagger className="flex flex-1 flex-col gap-4">
        {section.reviews.map((review) => (
          <li key={review.quote} className={cn('flex flex-col gap-3 p-5 lg:p-6', t.card)}>
            <Stars size="size-3.5" dark={dark} />
            <blockquote className="font-serif text-xl/[1.2] italic lg:text-[1.625rem]/[1.2]">
              “{review.quote}”
            </blockquote>
            <Label className={t.muted}>{review.author}</Label>
          </li>
        ))}
      </Reveal>
    </div>
  )
}
