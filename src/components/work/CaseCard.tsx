import { ImageReveal } from '@/components/motion/ImageReveal'
import { Picture } from '@/components/ui/Picture'
import { SmartLink } from '@/components/ui/SmartLink'
import type { CaseStudy } from '@/content/work'
import { cn } from '@/lib/cn'

type CaseCardProps = {
  study: CaseStudy
  /** Size the image frame: a height or an aspect ratio per breakpoint. */
  imageClassName: string
  /** `sizes` for the responsive image. */
  sizes: string
  /** Section background the card sits on. */
  surface?: 'dark' | 'light'
  className?: string
}

/*
 * Design: "Case — <client>" on Home / Selected Work and the Work page.
 *   image  20px padding, paper metric badge bottom-left (metric 18/600 → 16 on mobile,
 *          label mono 11 stone, 10×14 padding, 10px gap)
 *   meta   hairline, 16px above; client 24/500 → 20 and mono 12 services; side by side
 *          on desktop, stacked with a 6px gap on mobile
 */
export function CaseCard({ study, imageClassName, sizes, surface = 'dark', className }: CaseCardProps) {
  const dark = surface === 'dark'

  return (
    <SmartLink to={`/work#${study.slug}`} className={cn('group flex flex-col gap-5', className)}>
      <ImageReveal
        className={imageClassName}
        image={
          <Picture
            name={study.image}
            alt={study.imageAlt}
            sizes={sizes}
            className="size-full"
            imgClassName="transition-[scale] duration-1000 ease-out-expo group-hover:scale-105"
          />
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
          'flex flex-col gap-1.5 border-t pt-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6',
          dark ? 'border-line-dark' : 'border-line',
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
          {study.industry} — {study.services.join(', ')}
        </p>
      </div>
    </SmartLink>
  )
}
