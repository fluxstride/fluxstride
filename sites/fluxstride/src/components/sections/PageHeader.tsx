import type { ReactNode } from 'react'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { Eyebrow } from '@/components/ui/Typography'
import { cn } from '@fluxstride/design-system/lib/cn'

type PageHeaderProps = {
  /** e.g. "(Work) 24 projects · 2019 — 2026" */
  eyebrow: ReactNode
  /** The page's h1. Plain text and <Accent> animate word by word. */
  title: ReactNode
  /** Paragraph on the right on desktop, under the title on mobile. */
  intro?: ReactNode
  titleClassName?: string
  /** Set the intro's desktop width here (the design uses 340px or 300px). */
  introClassName?: string
  className?: string
}

/*
 * Design: "Page Header" on Work, Services, Process and Insights.
 *
 * Desktop: 96px top, 56px bottom. Eyebrow 24px above the 128px title; the 17px
 * stone intro pinned to the bottom-right.
 * Mobile: 56px top, 32px bottom, the intro 20px under the title.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  titleClassName,
  introClassName,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'container-page flex flex-col gap-5 pt-14 pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pt-24 lg:pb-14',
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <Reveal on="mount">
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <RevealText as="h1" on="mount" delay={0.1} className={cn('text-display-lg text-ink', titleClassName)}>
          {title}
        </RevealText>
      </div>
      {intro ? (
        <Reveal
          as="p"
          on="mount"
          delay={0.35}
          className={cn('text-body-lg text-stone lg:w-85 lg:shrink-0', introClassName)}
        >
          {intro}
        </Reveal>
      ) : null}
    </header>
  )
}
