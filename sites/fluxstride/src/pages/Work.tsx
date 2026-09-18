import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHeader } from '@/components/sections/PageHeader'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { FilterChips } from '@fluxstride/design-system/ui/FilterChips'
import { Accent } from '@fluxstride/design-system/ui/Typography'
import { CaseCard } from '@/components/work/CaseCard'
import { ProjectIndex } from '@/components/work/ProjectIndex'
import { findCaseStudy } from '@/content/case-studies'
import { caseStudies, disciplines, moreProjects, PROJECT_COUNT, type Discipline } from '@/content/work'
import { ScrollTrigger } from '@fluxstride/design-system/lib/gsap'
import { EASE_OUT } from '@fluxstride/design-system/lib/motion'

type SortOrder = 'newest' | 'oldest'
type DisciplineFilterValue = Discipline | 'all'

const filterOptions = [{ id: 'all' as const, label: 'All' }, ...disciplines]

/** Filters by discipline and orders by year. The sort is stable, so equal years keep their curated order. */
function select<T extends { year: number; disciplines: readonly string[] }>(
  items: T[],
  filter: DisciplineFilterValue,
  order: SortOrder,
) {
  return items
    .filter((item) => filter === 'all' || item.disciplines.includes(filter))
    .sort((a, b) => (order === 'newest' ? b.year - a.year : a.year - b.year))
}

/*
 * Design: Fluxstride — Work (desktop 1440, mobile 390).
 *
 *   Page Header   "Selected work." with the intro on the right
 *   Filters       discipline chips + sort, 48px (32px mobile) above the cases
 *   Cases         the first case full width (640px / 320px tall), the rest in a two-column
 *                 grid (480px tall; one column at 240px on mobile), 72px between rows
 *   Project Index "More projects" table, 104px below the cases (48px on mobile)
 *   CTA Band      after a 128px (64px) spacer
 */
export function Work() {
  const [filter, setFilter] = useState<DisciplineFilterValue>('all')
  const [order, setOrder] = useState<SortOrder>('newest')

  const [featured, ...rest] = select(caseStudies, filter, order)
  const projects = select(moreProjects, filter, order)

  return (
    <>
      <PageHeader
        eyebrow={`(Work) ${PROJECT_COUNT} projects · 2019 — 2026`}
        title={
          <>
            Selected <br className="lg:hidden" />
            <Accent className="text-[1.017em] lg:text-[1.109em]">work.</Accent>
          </>
        }
        intro="Platforms, apps, stores and identities — each measured by what changed for the business after launch."
      />

      <Reveal
        on="mount"
        delay={0.45}
        className="container-page flex flex-col gap-4 pb-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pb-12"
      >
        <FilterChips
          options={filterOptions}
          value={filter}
          onChange={setFilter}
          label="Filter projects by discipline"
        />
        <button
          type="button"
          onClick={() => setOrder(order === 'newest' ? 'oldest' : 'newest')}
          className="self-start font-mono text-label text-stone uppercase transition-colors hover:text-ink lg:shrink-0 lg:self-auto"
        >
          <span className="sr-only">Sorted by </span>
          <span aria-hidden="true">Sort: </span>
          {order === 'newest' ? 'Newest ↓' : 'Oldest ↑'}
          <span className="sr-only">. Change order</span>
        </button>
      </Reveal>

      <div className="container-page flex flex-col gap-12 pb-16 lg:gap-26 lg:pb-32">
        <h2 className="sr-only">Case studies</h2>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${filter}-${order}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            // The page got shorter or taller, so scroll-driven animations re-measure.
            onAnimationComplete={() => ScrollTrigger.refresh()}
            className="flex flex-col gap-8 lg:gap-18"
          >
            {featured ? (
              <CaseCard
                study={featured}
                link={Boolean(findCaseStudy(featured.slug))}
                metaClassName="gap-0"
                surface="light"
                imageClassName="aspect-[35/32] lg:aspect-auto lg:h-160"
                sizes="(min-width: 90rem) 1280px, 100vw"
              />
            ) : (
              <p className="text-body-lg text-stone">No case studies with this service yet.</p>
            )}
            {rest.length ? (
              <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-18">
                {rest.map((study, i) => (
                  <CaseCard
                    key={study.slug}
                    study={study}
                    link={Boolean(findCaseStudy(study.slug))}
                    metaClassName="gap-0"
                    surface="light"
                    imageClassName="aspect-[35/24] lg:aspect-auto lg:h-120"
                    sizes="(min-width: 64rem) 50vw, 100vw"
                    // Mobile pairs sit 24px apart, with 32px between pairs.
                    className={i % 2 === 1 ? 'max-lg:-mt-2' : undefined}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <ProjectIndex projects={projects} />
      </div>

      <CtaBand />
    </>
  )
}
