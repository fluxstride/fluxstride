import { ImageReveal } from '@fluxstride/design-system/motion/ImageReveal'
import { CaseCover } from '@/components/work/CaseCover'
import { Picture } from '@/components/ui/Picture'
import { SmartLink } from '@/components/ui/SmartLink'
import { caseStudyHref } from '@/content/case-studies'
import type { CaseStudy } from '@/content/work'
import { cn } from '@fluxstride/design-system/lib/cn'

type CaseCardProps = {
  study: CaseStudy
  /** Size the image frame: a height or an aspect ratio per breakpoint. */
  imageClassName: string
  /** `sizes` for the responsive image. */
  sizes: string
  /** Section background the card sits on. */
  surface?: 'dark' | 'light'
  className?: string
  /**
   * Link the card to its case study page (or its anchor on /work until that page exists).
   * Off on the Work page for projects without a page: the card is the destination there,
   * rendered as an article carrying the slug as its anchor id.
   */
  link?: boolean
  /** Extra classes for the client/services row (spacing differs between Home and Work). */
  metaClassName?: string
}

/*
 * Design: "Case: <client>" on Home / Selected Work and the Work page.
 *   image  20px padding, paper metric badge bottom-left (metric 18/600 → 16 on mobile,
 *          label mono 11 stone, 10×14 padding, 10px gap)
 *   meta   hairline, 16px above; client 24/500 → 20, then the mono services line directly
 *          under it, 6px below
 */
export function CaseCard({
  study,
  imageClassName,
  sizes,
  surface = 'dark',
  className,
  link = true,
  metaClassName,
}: CaseCardProps) {
  const dark = surface === 'dark'
  const cardClass = cn('group flex scroll-mt-28 flex-col gap-5', className)

  const content = (
    <>
      <ImageReveal
        className={imageClassName}
        // A drawn cover is a composition, not a photo: drifting it would push the wordmark out.
        drift={!study.cover}
        image={
          study.cover ? (
            <CaseCover cover={study.cover} sizes={sizes} />
          ) : (
            <Picture
              name={study.image}
              alt={study.imageAlt}
              sizes={sizes}
              className="size-full"
              imgClassName="transition-[scale] duration-1000 ease-out-expo group-hover:scale-105"
            />
          )
        }
      >
        <p className="absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-xs bg-paper px-3.5 py-2.5">
          <span className="text-[clamp(1rem,0.9536rem+0.1905vw,1.125rem)] leading-[1.2] font-semibold text-ink">
            {study.metric}
          </span>
          <span className="font-mono text-label-sm text-stone uppercase">{study.metricLabel}</span>
        </p>
      </ImageReveal>

      <div
        className={cn(
          'flex flex-col gap-1.5 border-t pt-4',
          dark ? 'border-line-dark' : 'border-line',
          metaClassName,
        )}
      >
        <h3
          className={cn(
            'text-[clamp(1.25rem,1.1571rem+0.381vw,1.5rem)] leading-[1.2] font-medium',
            dark ? 'text-paper' : 'text-ink',
          )}
        >
          {study.client}
        </h3>
        <p className={cn('font-mono text-label uppercase', dark ? 'text-stone-light' : 'text-stone')}>
          {study.industry}: {study.services.join(', ')}
        </p>
      </div>
    </>
  )

  return link ? (
    <SmartLink to={caseStudyHref(study.slug)} className={cardClass}>
      {content}
    </SmartLink>
  ) : (
    <article id={study.slug} className={cardClass}>
      {content}
    </article>
  )
}
