import { Picture } from '@/components/ui/Picture'
import type { BrandCover } from '@/content/case-studies/schema'
import { cn } from '@fluxstride/design-system/lib/cn'

type CaseCoverProps = {
  cover: BrandCover
  /** `sizes` for the screenshot. The panel is about two thirds of the card's width. */
  sizes: string
  className?: string
}

/*
 * Design: the `case-cover-*` frames in fluxstride.pen (1200×800).
 *   copy    the client's colour field: mono eyebrow, wordmark, accent rule, one line
 *   screen  their live site in a browser panel, bleeding off the right edge
 *
 * Every size is in cqw, so the composition scales with the card instead of being cropped to
 * it: the same cover serves the 1280px featured card and a 350px phone card. The lines that
 * stop being legible drop out rather than shrinking into noise, so a narrow card keeps only
 * the wordmark, the rule and the screen. Below 24rem the split becomes a stack, because two
 * columns in 350px leaves room for neither.
 */
export function CaseCover({ cover, sizes, className }: CaseCoverProps) {
  const serif = cover.wordmarkFace === 'serif'

  return (
    // The query container has to be an ancestor of what responds to it, never the same node.
    <div className={cn('@container size-full', className)} style={{ backgroundColor: cover.background }}>
      <div className="flex size-full flex-col overflow-hidden @sm:flex-row @sm:items-center">
        <div className="flex min-w-0 flex-col gap-[2.5cqw] px-[6cqw] pt-[6cqw] pb-[4cqw] @sm:w-[40%] @sm:shrink-0 @sm:gap-[2cqw] @sm:px-[5cqw] @sm:py-0">
          <p
            className="hidden font-mono text-[1.25cqw] leading-none tracking-[0.2em] uppercase @4xl:block"
            style={{ color: cover.accent }}
          >
            {cover.eyebrow}
          </p>
          <p
            className={cn(
              'text-[6cqw] leading-[1.05]',
              serif ? 'font-serif' : 'font-semibold tracking-[-0.02em]',
            )}
            style={{ color: cover.foreground }}
          >
            {cover.wordmark}
          </p>
          <span
            aria-hidden="true"
            className="h-[0.35cqw] min-h-px w-[7cqw] transition-[width] duration-700 ease-out-expo group-hover:w-[11cqw]"
            style={{ backgroundColor: cover.accent }}
          />
          <p className="hidden text-[2cqw] leading-[1.4] @3xl:block" style={{ color: cover.muted }}>
            {cover.line}
          </p>
          <p
            className="mt-[2cqw] hidden font-mono text-[1.1cqw] leading-none tracking-[0.2em] uppercase @5xl:block"
            style={{ color: cover.muted }}
          >
            {cover.services}
          </p>
        </div>

        {/* items-start so a panel taller than the space keeps its masthead and loses its footer. */}
        <div className="flex min-h-0 flex-1 items-start overflow-hidden pl-[6cqw] @sm:items-center @sm:pl-0">
          <div
            className="w-full shrink-0 overflow-hidden @sm:w-[118%]"
            style={{ backgroundColor: cover.panel }}
          >
            <div
              className="flex items-center gap-[0.8cqw] px-[1.4cqw] py-[1.1cqw]"
              style={{ backgroundColor: cover.chrome }}
            >
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-[0.85cqw] min-h-0.5 min-w-0.5 rounded-full"
                  style={{ backgroundColor: cover.dot }}
                />
              ))}
            </div>
            <Picture
              name={cover.screen.image}
              alt={cover.screen.alt}
              sizes={sizes}
              className="block aspect-1440/900 w-full"
              imgClassName="transition-[scale] duration-1000 ease-out-expo group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
