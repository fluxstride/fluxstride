import { Reveal } from '@/components/motion/Reveal'
import { Label } from '@/components/ui/Typography'
import type { BeforeAfterSection, GallerySection, ScreenshotSection } from '@/content/case-studies/schema'
import { images } from '@/content/images.generated'
import { cn } from '@/lib/cn'
import { MediaView } from '../MediaView'
import { FeatureGrid, Tag } from '../parts'
import { tone } from '../tone'

type Props<T> = { section: T; dark: boolean }

const FULL_WIDTH = '(min-width: 90rem) 1280px, 100vw'

export function Screenshot({ section, dark }: Props<ScreenshotSection>) {
  const { media } = section
  const ratio = media.image
    ? images[media.image].width / images[media.image].height
    : (media.aspect ?? 16 / 9)

  // Portrait media (a report page, a poster) would be enormous at full width, so it
  // sits beside its features instead.
  if (ratio < 1) {
    return (
      <div className="grid items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <Reveal>
          <MediaView media={media} frame={section.frame} sizes="(min-width: 64rem) 40vw, 100vw" dark={dark} />
        </Reveal>
        {section.features?.length ? (
          <FeatureGrid features={section.features} dark={dark} variant={section.featureStyle} stacked />
        ) : null}
      </div>
    )
  }

  return (
    <>
      <Reveal>
        <MediaView media={media} frame={section.frame} sizes={FULL_WIDTH} dark={dark} />
      </Reveal>
      {section.features?.length ? (
        <FeatureGrid features={section.features} dark={dark} variant={section.featureStyle} />
      ) : null}
    </>
  )
}

const galleryColumns = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' }

/**
 * Plain galleries crop to 4:3 so rows line up; screenshots and app screens keep their shape.
 * Phones show two columns.
 */
export function Gallery({ section, dark }: Props<GallerySection>) {
  const t = tone(dark)
  if (section.panel) return <PanelGallery section={section} dark={dark} />
  return (
    <Reveal
      as="ul"
      stagger
      className={cn(
        'grid grid-cols-2 gap-x-3 gap-y-5 lg:gap-x-6 lg:gap-y-8',
        galleryColumns[section.columns],
      )}
    >
      {section.items.map((item, i) => (
        <li key={item.caption ?? i} className="flex flex-col gap-2.5 lg:gap-3.5">
          <MediaView
            media={item.media}
            frame={section.frame}
            aspect={section.frame === 'plain' ? 4 / 3 : undefined}
            sizes={`(min-width: 64rem) ${Math.round(100 / section.columns)}vw, 50vw`}
            dark={dark}
          />
          {item.caption || item.meta ? (
            <div className="flex items-baseline justify-between gap-3">
              {item.caption ? (
                <span className="text-[13px]/[1.25] font-semibold lg:text-base/[1.25]">{item.caption}</span>
              ) : null}
              {item.meta ? <Label className={t.muted}>{item.meta}</Label> : null}
            </div>
          ) : null}
        </li>
      ))}
    </Reveal>
  )
}

/*
 * Design: Case Study — Mobile App, "03 — The app". Four 270px phones spread across a
 * tinted panel (48px / 40px padding), a mono caption 20px under each. Mobile: no panel,
 * two 162px phones per row, 10px apart and 16px between rows; captions are read out only.
 */
function PanelGallery({ section, dark }: Props<GallerySection>) {
  const t = tone(dark)
  return (
    <Reveal
      as="ul"
      stagger
      className={cn(
        'grid grid-cols-2 gap-x-2.5 gap-y-4 lg:flex lg:justify-between lg:px-10 lg:py-12',
        dark ? 'lg:bg-ink-2' : 'lg:bg-paper-2',
      )}
    >
      {section.items.map((item, i) => (
        <li key={item.caption ?? i} className="flex flex-col items-center gap-5 lg:w-67.5">
          <MediaView
            media={item.media}
            frame={section.frame}
            sizes="(min-width: 64rem) 252px, 152px"
            dark={dark}
            className={cn('max-lg:max-w-40.5', i % 2 === 0 ? 'max-lg:mr-0' : 'max-lg:ml-0')}
          />
          {item.caption ? (
            <Label className={cn('text-label-sm/[15px] max-lg:sr-only', t.muted)}>{item.caption}</Label>
          ) : null}
        </li>
      ))}
    </Reveal>
  )
}

/** Old and new side by side on desktop, stacked on phones, each with its own metrics. */
export function BeforeAfter({ section, dark }: Props<BeforeAfterSection>) {
  const t = tone(dark)
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {[section.before, section.after].map((side, i) => (
        <Reveal key={side.label} className="flex flex-col gap-4">
          <Tag variant={i === 1 ? 'solid' : 'flux'} dark={dark}>
            {side.label}
          </Tag>
          <MediaView
            media={side.media}
            frame={section.frame}
            sizes="(min-width: 64rem) 50vw, 100vw"
            dark={dark}
          />
          <dl>
            {side.metrics.map((metric) => (
              <div
                key={metric.label}
                className={cn('flex items-center justify-between gap-4 border-t py-3', t.border)}
              >
                <dt className={cn('text-body lg:text-base', t.muted)}>{metric.label}</dt>
                <dd className={cn('text-body font-semibold lg:text-base', i === 1 && t.accent)}>
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ))}
    </div>
  )
}
