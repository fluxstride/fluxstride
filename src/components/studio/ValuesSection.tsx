import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { Section } from '@/components/ui/Section'
import { Accent } from '@/components/ui/Typography'
import { values } from '@/content/studio'
import { cn } from '@/lib/cn'
import { pad } from '@/lib/format'

/*
 * Design: Studio / Values (ink). 128px padding, heading 64px above a 2×2 grid under a
 * hairline. Cells: 48px padding (none on the outer edge), a flux-light mono index 32px
 * left of a 36px title and 17px body. Hairlines below every cell and between columns.
 * Mobile: 72px padding, each value stacked (index, title, body) under a hairline.
 */
export function ValuesSection() {
  return (
    <Section
      tone="ink"
      labelledBy="values-title"
      padding="py-18 lg:py-32"
      className="flex flex-col gap-8 lg:gap-16"
    >
      <RevealText id="values-title" className="text-heading-xl text-paper">
        What we <Accent className="max-lg:text-[0.925em]">stand for.</Accent>
      </RevealText>

      <Reveal as="ul" stagger={0.08} className="grid border-t border-line-dark lg:grid-cols-2">
        {values.map((value, index) => (
          <li
            key={value.title}
            className={cn(
              'flex flex-col gap-5 border-b border-line-dark py-8 lg:flex-row lg:gap-8 lg:py-12',
              index % 2 === 0 ? 'lg:pr-12' : 'lg:border-l lg:pl-12',
            )}
          >
            <span className="font-mono text-label text-flux-light">{pad(index + 1)}</span>
            <div className="flex flex-col gap-3.5">
              <h3 className="text-title-xl leading-[1.2] text-paper">{value.title}</h3>
              <p className="text-body-lg leading-[1.55] text-stone-light">{value.body}</p>
            </div>
          </li>
        ))}
      </Reveal>
    </Section>
  )
}
