import type { ReactNode } from 'react'
import { RevealText } from '@/components/motion/RevealText'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Typography'

export type SectionTone = 'paper' | 'paper-2' | 'ink'

const tones: Record<SectionTone, string> = {
  paper: 'bg-paper text-ink',
  'paper-2': 'bg-paper-2 text-ink',
  ink: 'bg-ink text-paper',
}

type SectionProps = {
  children: ReactNode
  tone?: SectionTone
  id?: string
  /** id of the heading that names this section, for assistive tech. */
  labelledBy?: string
  /** Classes for the inner page-width container (layout, gaps). */
  className?: string
  /** Replace the default vertical padding (72px mobile → 128px desktop). */
  padding?: string
}

/**
 * A full-bleed band with the page container inside.
 * Default vertical padding follows the design: 72px on mobile → 128px on desktop.
 */
export function Section({ children, tone = 'paper', id, labelledBy, className, padding }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('scroll-mt-20', tones[tone])}>
      <div className={cn('container-page', padding ?? 'py-section', className)}>{children}</div>
    </section>
  )
}

type SectionHeaderProps = {
  /** e.g. "(02) What we do" */
  eyebrow: string
  /** Heading content. Plain text and <Accent> animate word by word. */
  title: ReactNode
  titleId?: string
  /** Paragraph on the right on desktop, under the heading on mobile. */
  intro?: ReactNode
  /** Extra element on the right instead of (or as well as) the intro, e.g. a TextLink. */
  aside?: ReactNode
  onDark?: boolean
  className?: string
  titleClassName?: string
  introClassName?: string
}

/**
 * The header every Home section opens with: mono eyebrow, big heading, and an
 * intro paragraph pinned to the bottom-right.
 * Design: 20px eyebrow→heading gap; intro 380px wide, 17px/1.5 in stone.
 */
export function SectionHeader({
  eyebrow,
  title,
  titleId,
  intro,
  aside,
  onDark = false,
  className,
  titleClassName,
  introClassName,
}: SectionHeaderProps) {
  return (
    <header
      className={cn('flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10', className)}
    >
      <div className="flex flex-col gap-3.5 lg:gap-5">
        <Reveal>
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </Reveal>
        <RevealText
          as="h2"
          id={titleId}
          className={cn('text-heading-xl', onDark ? 'text-paper' : 'text-ink', titleClassName)}
        >
          {title}
        </RevealText>
      </div>
      {intro ? (
        <Reveal
          as="p"
          delay={0.15}
          className={cn(
            'text-body-lg lg:w-95 lg:shrink-0',
            onDark ? 'text-stone-light' : 'text-stone',
            introClassName,
          )}
        >
          {intro}
        </Reveal>
      ) : null}
      {aside ? (
        <Reveal delay={0.15} className="shrink-0">
          {aside}
        </Reveal>
      ) : null}
    </header>
  )
}
