import { Reveal } from '@/components/motion/Reveal'
import { ArrowIcon } from '@/components/ui/ArrowIcon'
import { Eyebrow } from '@/components/ui/Typography'
import type { CaseStudy, StoryBlock } from '@/content/case-studies/schema'
import { cn } from '@/lib/cn'

/*
 * Design: Case Study — Results band.
 *   Ink, 112px padding (56px). Label left, 32px summary right (22px, below, on mobile).
 *   Four stats: 72px values (40px) split by vertical hairlines; a 2×2 grid on mobile.
 */
export function ResultsBand({ results }: { results: CaseStudy['results'] }) {
  return (
    <section aria-labelledby="case-results" className="mt-22 bg-ink text-paper lg:mt-40">
      <div className="container-page flex flex-col gap-7 py-14 lg:gap-14 lg:py-28">
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-20">
          <Eyebrow as="h2" id="case-results" onDark className="max-lg:text-label-sm">
            The results · {results.timeframe}
          </Eyebrow>
          <Reveal as="p" className="text-[1.375rem]/[1.35] tracking-tight lg:w-160 lg:text-[2rem]/[1.3]">
            {results.summary}
          </Reveal>
        </div>
        <Reveal as="dl" stagger className="grid grid-cols-2 lg:grid-cols-4">
          {results.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col gap-2 border-line-dark max-lg:border-t max-lg:py-4.5 max-lg:pr-3 lg:px-6 lg:pt-7',
                i === 0 ? 'lg:pl-0' : 'lg:border-l',
              )}
            >
              <dt className="order-2 text-[13px]/[1.4] text-stone-light lg:text-base/[1.4]">{stat.label}</dt>
              <dd className="order-1 text-[2.5rem]/[1] font-semibold tracking-tight lg:text-[4.5rem]/[1]">
                {stat.value}
              </dd>
              {stat.detail ? (
                <dd className="order-3 font-mono text-[10px]/[1.3] text-flux-light uppercase">
                  {stat.detail}
                </dd>
              ) : null}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/*
 * Design: Case Study — Story.
 *   01 The challenge / 02 Our approach. Desktop: 460px label column (eyebrow + 40px
 *   heading) beside 20px body copy, each block under a hairline. Mobile: stacked, 26px heading.
 */
export function CaseStory({ challenge, approach }: Pick<CaseStudy, 'challenge' | 'approach'>) {
  const blocks: [string, string, StoryBlock][] = [
    ['01', 'The challenge', challenge],
    ['02', 'Our approach', approach],
  ]

  return (
    <div className="container-page flex flex-col gap-12 pt-18 lg:gap-24 lg:pt-35">
      {blocks.map(([number, label, block]) => (
        <section
          key={number}
          aria-labelledby={`story-${number}`}
          className="grid gap-4 lg:grid-cols-[28.75rem_1fr] lg:gap-20 lg:border-t lg:border-line lg:pt-12"
        >
          <div className="flex flex-col gap-4">
            <Eyebrow className="text-flux max-lg:text-label-sm">
              {number} — {label}
            </Eyebrow>
            <h2
              id={`story-${number}`}
              className="text-[1.625rem]/[1.15] font-semibold tracking-tight lg:text-[2.5rem]/[1.1]"
            >
              {block.title}
            </h2>
          </div>
          <Reveal className="flex flex-col gap-4 lg:gap-5">
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base/[1.65] lg:text-xl/[1.65]">
                {paragraph}
              </p>
            ))}
            {block.points?.length ? (
              <ul className="flex flex-col gap-2.5 lg:gap-3">
                {block.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px]/[1.5] lg:gap-3.5 lg:text-lg/[1.5]">
                    <ArrowIcon size={18} className="mt-0.5 text-flux" />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </section>
      ))}
    </div>
  )
}
