import type { ReactNode } from 'react'
import { ImageReveal } from '@fluxstride/design-system/motion/ImageReveal'
import { Picture } from '@/components/ui/Picture'
import { SmartLink } from '@/components/ui/SmartLink'
import { TextLink } from '@/components/ui/TextLink'
import { formatDate, type Article } from '@/content/insights'
import { cn } from '@fluxstride/design-system/lib/cn'
import { initials } from '@/lib/format'

/** Wraps a card title in a link when the article has a URL. */
function TitleLink({ article, children }: { article: Article; children: ReactNode }) {
  if (!article.href) return <>{children}</>
  // The link's ::after stretches over the whole card, so anywhere on it is clickable.
  return (
    <SmartLink to={article.href} className="after:absolute after:inset-0">
      {children}
    </SmartLink>
  )
}

/*
 * Design: Insights / Featured. A 760×500 image 56px left of the text (image 250px tall and
 * stacked on mobile): mono meta, 44px title (32px mobile), 17px excerpt, then the author
 * and "Read article" 40px below. An ink rule 56px (32px) under the block.
 */
export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="group relative flex flex-col gap-6 border-b border-ink pb-8 lg:flex-row lg:items-center lg:gap-14 lg:pb-14">
      <ImageReveal
        className="aspect-[35/25] lg:aspect-auto lg:h-125 lg:w-[59.375%] lg:shrink-0"
        image={
          <Picture
            name={article.image}
            alt={article.imageAlt}
            sizes="(min-width: 64rem) 53vw, 100vw"
            priority
            className="size-full"
            imgClassName="transition-[scale] duration-1000 ease-out-expo group-hover:scale-105"
          />
        }
      />
      <div className="flex flex-1 flex-col gap-6">
        <p className="font-mono text-label text-stone uppercase">
          Featured · {article.category} · {article.readTime} min read
        </p>
        <h2 className="text-heading-md text-ink">
          <TitleLink article={article}>{article.title}</TitleLink>
        </h2>
        {article.excerpt ? <p className="text-body-lg leading-[1.55] text-stone">{article.excerpt}</p> : null}
        <div className="flex items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-3">
            {article.author ? (
              <>
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-flux-soft text-sm font-semibold text-flux"
                >
                  {initials(article.author)}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px]/[1.2] font-semibold text-ink">{article.author}</span>
                  <time dateTime={article.date} className="text-[13px]/[1.2] text-stone">
                    {formatDate(article.date)}
                  </time>
                </span>
              </>
            ) : null}
          </div>
          {article.href ? (
            <TextLink to={article.href} size="sm" className="relative z-10 text-ink">
              Read article
            </TextLink>
          ) : null}
        </div>
      </div>
    </article>
  )
}

/*
 * Design: Insights / Article. 300px image, then 18px apart: mono 11 meta, 24/600 title
 * (20px mobile), 14px date.
 */
export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  return (
    <article className={cn('group relative flex flex-col gap-4.5', className)}>
      <ImageReveal
        className="h-75"
        image={
          <Picture
            name={article.image}
            alt={article.imageAlt}
            sizes="(min-width: 64rem) 30vw, 100vw"
            className="size-full"
            imgClassName="transition-[scale] duration-1000 ease-out-expo group-hover:scale-105"
          />
        }
      />
      <p className="font-mono text-label-sm/[1.2] text-stone uppercase">
        {article.category} · {article.readTime} min
      </p>
      <h3 className="text-title-sm text-ink">
        <TitleLink article={article}>{article.title}</TitleLink>
      </h3>
      <time dateTime={article.date} className="text-sm/[1.2] text-stone">
        {formatDate(article.date)}
      </time>
    </article>
  )
}
