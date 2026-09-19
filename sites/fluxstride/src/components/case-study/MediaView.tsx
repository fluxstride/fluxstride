import { ArrowUpRight, ImageIcon, Lock } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Picture } from '@/components/ui/Picture'
import type { Media, MediaFrame } from '@/content/case-studies/schema'
import { images } from '@/content/images.generated'
import { cn } from '@fluxstride/design-system/lib/cn'

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
  /**
   * Browser frame: the frame's width in the desktop design (1280 full width, 620 in a
   * before/after pair). Below that width the chrome shrinks in proportion.
   */
  designWidth?: number
  /** Browser frame: the soft drop shadow on desktop. */
  shadow?: boolean
  /** Plain frame: a hairline edge, for thumbnails with white in them. */
  outline?: boolean
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
  designWidth = 1280,
  shadow = true,
  outline = false,
}: MediaViewProps) {
  const source = media.image ? images[media.image] : null
  const mobile = media.image && media.mobileImage ? images[media.mobileImage] : null
  const ratio = aspect ?? (source ? source.width / source.height : (media.aspect ?? DEFAULT_ASPECT[frame]))

  // A mobile crop brings its own proportions below lg.
  const boxStyle: CSSProperties | undefined = aspectClassName
    ? undefined
    : mobile && !aspect
      ? ({ '--ratio': ratio, '--ratio-mobile': mobile.width / mobile.height } as CSSProperties)
      : { aspectRatio: ratio }

  const box = (
    <div
      className={cn(
        'relative w-full',
        mobile && !aspect && !aspectClassName && 'aspect-(--ratio-mobile) lg:aspect-(--ratio)',
        aspectClassName,
      )}
      style={boxStyle}
    >
      {media.image ? (
        <Picture
          name={media.image}
          alt={media.alt}
          sizes={sizes}
          priority={priority}
          mobileName={media.mobileImage}
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
          '@container overflow-hidden rounded-md border border-line bg-white',
          shadow && 'lg:shadow-[0_24px_60px_rgb(10_15_30/0.08)]',
          className,
        )}
      >
        <BrowserChrome url={media.url} href={media.href} designWidth={designWidth} />
        {box}
      </figure>
    )
  }

  if (frame === 'phone') {
    return (
      // Design: Phone. 270px wide on desktop, 9px bezel, 40px corners (screen 32px);
      // 162px on mobile, 5px bezel, 24px corners (screen 19px). Soft ink shadow.
      <figure
        className={cn(
          'mx-auto w-full max-w-67.5 rounded-3xl bg-ink p-1.25 shadow-[0_12px_30px_rgb(10_15_30/0.15)] lg:rounded-[2.5rem] lg:p-2.25 lg:shadow-[0_20px_50px_rgb(10_15_30/0.15)]',
          className,
        )}
      >
        <div className="overflow-hidden rounded-[1.1875rem] lg:rounded-[2rem]">{box}</div>
      </figure>
    )
  }

  return <figure className={cn('overflow-hidden', outline && 'border border-line', className)}>{box}</figure>
}

/*
 * Design: Browser chrome, 47px tall on desktop at any width. 16px side padding, three 10px
 * dots, then an address pill (lock icon, 12px URL). Sizes are in em from a 16px base so
 * that on phones the whole frame scales down like the desktop screenshot it holds.
 */
function BrowserChrome({ url, href, designWidth }: { url?: string; href?: string; designWidth: number }) {
  return (
    <div
      className="flex items-center gap-[0.875em] border-b border-line bg-white px-[1em] pt-[0.6875em] pb-[0.625em] text-(length:--chrome-size) lg:text-base"
      // 100cqw is the frame's width; at designWidth it resolves to exactly 16px.
      style={{ '--chrome-size': `calc(100cqw / ${designWidth / 16})` } as CSSProperties}
    >
      <span aria-hidden="true" className="flex gap-[0.375em]">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-[0.625em] rounded-full bg-line" />
        ))}
      </span>
      {/* A live page is reachable from its own screenshot; an invented address stays decoration. */}
      {url && href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group/url flex items-center gap-[0.5em] rounded-[0.75em] bg-paper px-[0.75em] py-[0.3125em] text-stone transition-colors hover:bg-flux-soft hover:text-flux"
        >
          <Lock aria-hidden="true" className="size-[0.6875em]" strokeWidth={2} />
          <span className="text-[0.75em]/[1.25] whitespace-nowrap">{url}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-[0.75em] opacity-0 transition-opacity group-hover/url:opacity-100"
            strokeWidth={2}
          />
          <span className="sr-only">Opens in a new tab</span>
        </a>
      ) : (
        <span
          aria-hidden="true"
          className="flex items-center gap-[0.5em] rounded-[0.75em] bg-paper px-[0.75em] py-[0.3125em] text-stone"
        >
          <Lock className="size-[0.6875em]" strokeWidth={2} />
          {url ? (
            <span className="text-[0.75em]/[1.25] whitespace-nowrap">{url}</span>
          ) : (
            <span className="h-[0.9375em] w-[6.25em]" />
          )}
        </span>
      )}
    </div>
  )
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
