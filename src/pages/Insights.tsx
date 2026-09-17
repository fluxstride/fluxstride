import { ArrowDown, Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useDeferredValue, useId, useState } from 'react'
import { ArticleCard, FeaturedArticle } from '@/components/insights/ArticleCards'
import { NewsletterBand } from '@/components/insights/NewsletterBand'
import { Reveal } from '@/components/motion/Reveal'
import { PageHeader } from '@/components/sections/PageHeader'
import { buttonClass } from '@/components/ui/button-styles'
import { FilterChips } from '@/components/ui/FilterChips'
import { Accent } from '@/components/ui/Typography'
import { articles, categories, featuredArticle, type Article, type Category } from '@/content/insights'
import { cn } from '@/lib/cn'
import { ScrollTrigger } from '@/lib/gsap'
import { EASE_OUT } from '@/lib/motion'

/** Articles shown before "Load more articles". */
const PAGE_SIZE = 6

type CategoryFilter = Category | 'all'

const filterOptions = [
  { id: 'all' as const, label: 'All' },
  ...categories.map((category) => ({ id: category, label: category })),
]

function matches(article: Article, category: CategoryFilter, query: string) {
  if (category !== 'all' && article.category !== category) return false
  if (!query) return true
  const haystack = `${article.title} ${article.excerpt ?? ''} ${article.category}`.toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word))
}

/*
 * Design: Fluxstride — Insights (desktop 1440, mobile 390).
 *
 *   Page Header   "Insights & notes."
 *   Filters       category chips + search, 56px (32px) above the featured article
 *   Featured      96px (56px) above the grid
 *   Articles      three columns, 32px gutters, 64px between rows; "Load more articles"
 *   Newsletter    ink band, then the footer (no CTA band on this page)
 *
 * Chips and search filter the featured article and the grid together. "Load more" only
 * appears when there are more than PAGE_SIZE matching articles.
 */
export function Insights() {
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(PAGE_SIZE)
  const deferredQuery = useDeferredValue(query.trim())
  const searchId = useId()

  const showFeatured = matches(featuredArticle, category, deferredQuery)
  const results = articles.filter((article) => matches(article, category, deferredQuery))
  const visible = results.slice(0, limit)
  const nothingFound = !showFeatured && results.length === 0

  const changeCategory = (next: CategoryFilter) => {
    setCategory(next)
    setLimit(PAGE_SIZE)
  }

  return (
    <>
      <PageHeader
        eyebrow="(Insights) Notes from the studio"
        title={
          <>
            Insights <br className="lg:hidden" />
            <Accent className="text-[1.017em] lg:text-[1.109em]">&amp; notes.</Accent>
          </>
        }
        intro="Practical thinking on design, engineering and growth — written by the people doing the work."
        introClassName="lg:w-75"
      />

      <Reveal
        on="mount"
        delay={0.45}
        className="container-page flex flex-col gap-4 pb-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pb-14"
      >
        <FilterChips
          options={filterOptions}
          value={category}
          onChange={changeCategory}
          label="Filter articles by topic"
        />
        <div
          role="search"
          className="flex items-center gap-2.5 border-b border-ink pt-2.5 pb-2.25 lg:w-70 lg:shrink-0"
        >
          <Search aria-hidden="true" size={16} strokeWidth={2} className="shrink-0 text-stone" />
          <label htmlFor={searchId} className="sr-only">
            Search articles
          </label>
          <input
            id={searchId}
            type="search"
            placeholder="Search articles"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setLimit(PAGE_SIZE)
            }}
            className="min-w-0 flex-1 bg-transparent text-[15px]/[1.2] text-ink placeholder:text-stone focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="-m-1 p-1 text-stone transition-colors hover:text-ink"
            >
              <X size={14} strokeWidth={2} />
            </button>
          ) : null}
        </div>
      </Reveal>

      {/* Announces the result count to screen readers as the filters change. */}
      <p role="status" className="sr-only">
        {nothingFound ? 'No articles found' : `${results.length + (showFeatured ? 1 : 0)} articles`}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${category}-${deferredQuery}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onAnimationComplete={() => ScrollTrigger.refresh()}
        >
          {showFeatured ? (
            <div className="container-page pb-14 lg:pb-24">
              <FeaturedArticle article={featuredArticle} />
            </div>
          ) : null}

          {nothingFound ? (
            <div className="container-page flex flex-col items-start gap-5 pb-14 lg:pb-24">
              <p className="text-title-sm text-ink">Nothing matches that yet.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  changeCategory('all')
                }}
                className={buttonClass({ variant: 'outline' })}
              >
                Show all articles
              </button>
            </div>
          ) : null}

          {visible.length ? (
            <section
              aria-label="Latest articles"
              className="container-page flex flex-col gap-8 pb-14 lg:gap-16 lg:pb-24"
            >
              {/* Mobile keeps the design's rows of three: 24px between cards, 32px between rows. */}
              <ul className="grid gap-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 max-lg:[&>li:nth-child(3n+4)]:mt-2">
                {visible.map((article) => (
                  <li key={article.slug}>
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>
              {results.length > limit ? (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setLimit((current) => current + PAGE_SIZE)}
                    className={cn(
                      buttonClass({ variant: 'outline' }),
                      'gap-2.5 px-5.75 py-3.75 text-[15px]/[1.2]',
                    )}
                  >
                    Load more articles
                    <ArrowDown aria-hidden="true" size={16} strokeWidth={2} />
                  </button>
                </div>
              ) : null}
            </section>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <NewsletterBand />
    </>
  )
}
