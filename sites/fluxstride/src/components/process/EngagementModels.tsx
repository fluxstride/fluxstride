import { ArrowUpRight, Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { SmartLink } from '@/components/ui/SmartLink'
import { Accent } from '@/components/ui/Typography'
import { engagementModels, type EngagementModel } from '@/content/process'
import { cn } from '@/lib/cn'

/*
 * Design: Process / Engagement Models (ink). 128px padding, header 64px above a row of
 * three cards sharing hairlines. The Retainer card is lifted onto ink-2 with a
 * "Most popular" badge and a filled arrow button.
 * Mobile: 72px padding, cards stacked, 24px card padding, smaller name and price.
 */
export function EngagementModels() {
  return (
    <Section
      tone="ink"
      labelledBy="models-title"
      padding="py-18 lg:py-32"
      className="flex flex-col gap-8 lg:gap-16"
    >
      <SectionHeader
        onDark
        eyebrow="Ways to work with us"
        titleId="models-title"
        title={
          <>
            Pick the <Accent className="max-lg:text-[0.925em]">right pace.</Accent>
          </>
        }
        intro="Most clients start with a project and stay on a retainer. Consultancy is there when you just need a clear answer."
        introClassName="lg:w-90"
      />
      <Reveal as="ul" stagger={0.1} y={32} className="grid border-t border-l border-line-dark lg:grid-cols-3">
        {engagementModels.map((model) => (
          <li key={model.name} className="flex">
            <ModelCard model={model} />
          </li>
        ))}
      </Reveal>
    </Section>
  )
}

function ModelCard({ model }: { model: EngagementModel }) {
  const { featured } = model

  return (
    <article
      className={cn(
        'group relative flex flex-1 flex-col gap-8 border-r border-b border-line-dark p-6 transition-colors duration-500 lg:p-10',
        featured ? 'bg-ink-2' : 'hover:bg-ink-2/60',
      )}
    >
      <div className="flex min-h-5.5 items-center justify-between gap-4">
        <p className="font-mono text-label text-stone-light uppercase">{model.kicker}</p>
        {featured ? (
          <span className="rounded-full bg-flux px-2.5 py-1.25 font-mono text-[10px]/[1.2] text-paper uppercase">
            Most popular
          </span>
        ) : null}
      </div>

      <h3 className="text-heading-md leading-[1.2] text-paper">{model.name}</h3>
      <p className="text-base/[1.55] text-stone-light">{model.description}</p>

      <ul className="flex flex-col gap-3 border-y border-line-dark py-6">
        {model.includes.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[15px]/[1.2] font-medium text-paper">
            <Check aria-hidden="true" size={15} strokeWidth={2} className="shrink-0 text-flux-light" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-label-sm/[1.2] text-stone-light uppercase">
            Best for: {model.bestFor}
          </p>
          <p className="text-[clamp(1.25rem,1.1107rem+0.5714vw,1.625rem)] leading-[1.2] font-medium text-paper">
            {model.price}
          </p>
        </div>
        {/* The whole card is clickable: the link's ::after covers it. */}
        <SmartLink
          to={model.href}
          aria-label={`Start a ${model.name.toLowerCase()} engagement`}
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-full text-paper transition-colors duration-500 after:absolute after:inset-0',
            featured
              ? 'bg-flux group-hover:bg-paper group-hover:text-ink'
              : 'border border-line-dark group-hover:border-flux group-hover:bg-flux',
          )}
        >
          <ArrowUpRight
            aria-hidden="true"
            size={20}
            strokeWidth={2}
            className="transition-transform duration-500 ease-out-expo group-hover:rotate-45"
          />
        </SmartLink>
      </div>
    </article>
  )
}
