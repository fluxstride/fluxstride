import { ImageIcon } from 'lucide-react'
import { Picture } from '@/components/ui/Picture'
import type { Media, MediaFrame } from '@/content/case-studies/schema'
import { images } from '@/content/images.generated'
import { cn } from '@/lib/cn'

type MediaViewProps = {
  media: Media
  frame: MediaFrame
  /** `sizes` for the responsive image. */
  sizes: string
  /**
   * Force a crop with aspect classes, e.g. "aspect-[35/42] lg:aspect-[128/76]" for a hero photo.
   * Leave out for screenshots so they keep their own proportions.
   */
  aspectClassName?: string
  /** Width / height when the image is cropped to a fixed ratio (galleries). */
  aspect?: number
  dark?: boolean
  priority?: boolean
  className?: string
}

const DEFAULT_ASPECT: Record<MediaFrame, number> = { browser: 16 / 9, phone: 9 / 19.5, plain: 4 / 3 }

/**
 * An image in its frame, or a grey slot describing the image still to come.
 *
 * Browser screenshots are shown at their real proportions on every screen size:
 * phones get the desktop screenshot scaled down, not a reflowed mobile layout.
 */
export function MediaView({
  media,
  frame,
  sizes,
  aspectClassName,
  aspect,
  dark = false,
  priority = false,
  className,
}: MediaViewProps) {
  const source = media.image ? images[media.image] : null
  const ratio = aspect ?? (source ? source.width / source.height : (media.aspect ?? DEFAULT_ASPECT[frame]))

  const box = (
    <div
      className={cn('relative w-full', aspectClassName)}
      style={aspectClassName ? undefined : { aspectRatio: ratio }}
    >
      {media.image ? (
        <Picture
          name={media.image}
          alt={media.alt}
          sizes={sizes}
          priority={priority}
          className="absolute inset-0 size-full"
        />
      ) : (
        <EmptySlot brief={media.brief} dark={dark && frame === 'plain'} />
      )}
    </div>
  )

  if (frame === 'browser') {
    return (
      <figure
        className={cn(
          'overflow-hidden rounded-md border border-line bg-white shadow-[0_24px_60px_rgb(10_15_30/0.08)]',
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="flex items-center gap-2 border-b border-line px-2.5 py-1.5 lg:gap-3 lg:px-4 lg:py-3"
        >
          <span className="flex gap-1 lg:gap-1.5">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="size-1.5 rounded-full bg-line lg:size-2.5" />
            ))}
          </span>
          <span className="h-2.5 w-20 rounded-full bg-paper lg:h-5 lg:w-40" />
        </div>
        {box}
      </figure>
    )
  }

  if (frame === 'phone') {
    return (
      <figure
        className={cn(
          'mx-auto w-full max-w-65 rounded-[1.75rem] bg-ink p-1.5 lg:rounded-[2.25rem] lg:p-2.5',
          className,
        )}
      >
        <div className="overflow-hidden rounded-[1.4rem] lg:rounded-[1.75rem]">{box}</div>
      </figure>
    )
  }

  return <figure className={cn('overflow-hidden', className)}>{box}</figure>
}

/** Stand-in for a missing image. Only ever seen on drafts and templates. */
function EmptySlot({ brief, dark }: { brief: string; dark: boolean }) {
  return (
    <div
      role="img"
      aria-label={`Image to come: ${brief}`}
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center gap-2 border p-3 text-center',
        dark ? 'border-line-dark bg-ink-2 text-stone-light' : 'border-line bg-paper-2 text-stone',
      )}
    >
      <ImageIcon aria-hidden="true" className="size-4 lg:size-6" strokeWidth={1.75} />
      <span className="max-w-90 font-mono text-[9px]/[1.5] uppercase lg:text-label-sm">{brief}</span>
    </div>
  )
}
