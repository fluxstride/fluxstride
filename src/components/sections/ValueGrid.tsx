import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import { pad } from '@/lib/format'

type ValueGridProps = {
  /** id for the heading, which names the section */
  titleId: string
  /** Plain text and <Accent> animate word by word. */
  title: ReactNode
  items: { title: string; body: string }[]
}

/*
 * Design: Studio / Values (ink), reused for Careers "How we work" and a service's "What's included".
 * 128px padding, heading 64px above a 2×2 grid under a hairline. Cells: 48px padding (none on the
 * outer edge), a flux-light mono index 32px left of a 36px title and 17px body. Hairlines below
 * every cell and between columns.
 * Mobile: 72px padding, each item stacked (index, title, body) under a hairline.
 */
export function ValueGrid({ titleId, title, items }: ValueGridProps) {
  return (
    <Section
      tone="ink"
      labelledBy={titleId}
      padding="py-18 lg:py-32"
      className="flex flex-col gap-8 lg:gap-16"
    >
      <RevealText id={titleId} className="text-heading-xl text-paper">
        {title}
      </RevealText>

      <Reveal as="ul" stagger={0.08} className="grid border-t border-line-dark lg:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={item.title}
            className={cn(
              'flex flex-col gap-5 border-b border-line-dark py-8 lg:flex-row lg:gap-8 lg:py-12',
              index % 2 === 0 ? 'lg:pr-12' : 'lg:border-l lg:pl-12',
            )}
          >
            <span className="font-mono text-label text-flux-light">{pad(index + 1)}</span>
            <div className="flex flex-col gap-3.5">
              <h3 className="text-title-xl leading-[1.2] text-paper">{item.title}</h3>
              <p className="text-body-lg leading-[1.55] text-stone-light">{item.body}</p>
            </div>
          </li>
        ))}
      </Reveal>
    </Section>
  )
}
