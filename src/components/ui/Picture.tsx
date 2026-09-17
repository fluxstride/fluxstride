import { images, type ImageName } from '@/content/images.generated'
import { cn } from '@/lib/cn'

type PictureProps = {
  name: ImageName
  /** Describe what the image shows. Pass "" only for purely decorative images. */
  alt: string
  /** How wide the image renders, so the browser picks the right file, e.g. "(min-width: 64rem) 58vw, 100vw". */
  sizes: string
  /** Classes for the <picture> box. The image fills it and is cropped to cover. */
  className?: string
  imgClassName?: string
  /** Above-the-fold images: load straight away at high priority. */
  priority?: boolean
  /** Art direction: a different image below the lg breakpoint (64rem). */
  mobileName?: ImageName
}

const MOBILE = '(max-width: 63.999rem)'

/**
 * Responsive image from the generated manifest (scripts/import-images.mjs):
 * AVIF with a WebP fallback, several widths, and the image's dominant colour
 * behind it while it loads.
 */
export function Picture({
  name,
  alt,
  sizes,
  className,
  imgClassName,
  priority = false,
  mobileName,
}: PictureProps) {
  const image = images[name]
  const srcSet = (ext: string, source = name) =>
    images[source].widths.map((w) => `/images/${source}-${w}.${ext} ${w}w`).join(', ')
  const largest = image.widths[image.widths.length - 1]

  return (
    <picture className={cn('block overflow-hidden', className)} style={{ backgroundColor: image.color }}>
      {mobileName ? (
        <>
          <source media={MOBILE} type="image/avif" srcSet={srcSet('avif', mobileName)} sizes={sizes} />
          <source media={MOBILE} type="image/webp" srcSet={srcSet('webp', mobileName)} sizes={sizes} />
        </>
      ) : null}
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <img
        src={`/images/${name}-${largest}.webp`}
        srcSet={srcSet('webp')}
        sizes={sizes}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={cn('size-full object-cover', imgClassName)}
      />
    </picture>
  )
}
