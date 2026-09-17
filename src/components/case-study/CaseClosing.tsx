import { Quote } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { ArrowIcon } from '@/components/ui/ArrowIcon'
import { Eyebrow } from '@/components/ui/Typography'
import type { CaseStudy } from '@/content/case-studies/schema'
import { MediaView } from './MediaView'

/*
 * Design: Case Study — Testimonial. 200px side inset on desktop; 52px serif quote (28px),
 * then an avatar with the client's initials, name and role.
 */
export function ClientQuote({ quote }: { quote: NonNullable<CaseStudy['quote']> }) {
  return (
    <figure className="container-page flex flex-col gap-6 pt-22 lg:gap-10 lg:px-50 lg:pt-40">
      <Quote aria-hidden="true" className="size-7 text-flux lg:size-10" strokeWidth={2} />
      <Reveal as="div">
        <blockquote className="font-serif text-quote/[1.15] italic">“{quote.text}”</blockquote>
      </Reveal>
      <figcaption className="flex items-center gap-3.5">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full bg-ink text-sm font-semibold text-paper lg:size-14 lg:text-[17px]"
        >
          {quote.initials}
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[15px]/[1.2] font-semibold lg:text-lg/[1.2]">{quote.name}</span>
          <span className="text-[13px]/[1.3] text-stone lg:text-[15px]/[1.3]">{quote.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/* Design: Case Study — Credits. Three columns (stacked on mobile): services, team, tool chips. */
export function Credits({ credits }: { credits: CaseStudy['credits'] }) {
  const lists = [
    ['Services', credits.services],
    ['Team', credits.team],
  ] as const

  return (
    <section aria-label="Credits" className="container-page pt-22 lg:pt-40">
      <Reveal stagger className="grid gap-8 lg:grid-cols-3 lg:gap-10">
        {lists.map(([heading, items]) => (
          <div key={heading} className="flex flex-col gap-3.5">
            <Eyebrow as="h2" className="text-label-sm">
              {heading}
            </Eyebrow>
            <ul className="flex flex-col gap-3.5 text-[15px]/[18px] lg:text-[17px]/[21px]">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col gap-3.5">
          <Eyebrow as="h2" className="text-label-sm">
            {credits.toolsLabel ?? 'Tools'}
          </Eyebrow>
          <ul className="flex flex-wrap gap-2">
            {credits.tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-line px-3.5 py-2 text-[13px]/[1.2] font-medium"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

type NextProjectProps = {
  /** The case study to link to. Templates have none and show a placeholder. */
  next?: CaseStudy
  serviceTitle?: string
}

/*
 * Design: Case Study — Next Project. Rule, "Next project" and the discipline, a 96px
 * client name (40px) with an up-right arrow, then its cover image (480px / 220px tall).
 */
export function NextProject({ next, serviceTitle }: NextProjectProps) {
  const title = next?.client ?? '[Next case study]'
  const content = (
    <>
      <div className="flex items-center justify-between border-t border-ink pt-6">
        <Eyebrow className="max-lg:text-[10px]/[1.3]">Next project</Eyebrow>
        <Eyebrow className="max-lg:text-[10px]/[1.3]">
          {next ? `${next.discipline ?? serviceTitle ?? ''} · ${next.industry}` : '[Service · Industry]'}
        </Eyebrow>
      </div>
      <div className="flex items-center justify-between gap-4">
        <RevealText as="h2" className="text-heading-next">
          {title}
        </RevealText>
        <ArrowIcon direction="up-right" size={72} className="max-lg:hidden" />
        <ArrowIcon direction="up-right" size={32} className="lg:hidden" />
      </div>
      <MediaView
        media={
          next?.cover ??
          next?.hero.media ?? { image: null, alt: '', brief: 'Next project cover image · 2560×960' }
        }
        frame="plain"
        sizes="(min-width: 90rem) 1280px, 100vw"
        aspectClassName="aspect-[35/22] lg:aspect-[128/48]"
      />
    </>
  )

  const className = 'container-page group flex flex-col gap-5 py-22 lg:gap-8 lg:py-40'
  return next ? (
    <Link to={`/work/${next.slug}`} className={className} aria-label={`Next project: ${next.client}`}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  )
}
