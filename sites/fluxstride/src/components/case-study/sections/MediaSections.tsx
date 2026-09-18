import { Reveal } from '@/components/motion/Reveal'
import { Label } from '@/components/ui/Typography'
import type { BeforeAfterSection, GallerySection, ScreenshotSection } from '@/content/case-studies/schema'
import { images } from '@/content/images.generated'
import { cn } from '@/lib/cn'
import { MediaView } from '../MediaView'
import { FeatureGrid } from '../parts'
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
      {section.deliverables?.length ? <Deliverables items={section.deliverables} dark={dark} /> : null}
    </>
  )
}

/*
 * Design: Case Study — Brand Identity, "06 — Applications". Four columns 24px apart (two,
 * 16px apart, on phones): name and mono count on one line under a hairline.
 */
function Deliverables({ items, dark }: { items: [string, string][]; dark: boolean }) {
  const t = tone(dark)
  return (
    <Reveal as="dl" stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {items.map(([label, meta]) => (
        // The rule sits inside the design's 14px padding.
        <div
          key={label}
          className={cn('flex items-center justify-between gap-1 border-t pt-3.25 pb-3.5', t.border)}
        >
          <dt className="text-sm/[17px] font-semibold lg:text-[17px]/[21px]">{label}</dt>
          <dd className={cn('shrink-0 font-mono text-[10px]/[13px] uppercase', t.muted)}>{meta}</dd>
        </div>
      ))}
    </Reveal>
  )
}

const galleryColumns = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' }

/*
 * Design: Case Study — Website, "04 — Templates". Cards 20px apart (12px on phones), the
 * caption 12px under each: 17px name (14px) with a mono number on the right.
 * Plain galleries crop to 4:3 so rows line up, unless outlined; screenshots and app screens
 * keep their shape. Phones show two columns.
 */
export function Gallery({ section, dark }: Props<GallerySection>) {
  const t = tone(dark)
  if (section.panel) return <PanelGallery section={section} dark={dark} />
  return (
    <Reveal
      as="ul"
      stagger
      className={cn('grid grid-cols-2 gap-3 lg:gap-5', galleryColumns[section.columns])}
    >
      {section.items.map((item, i) => (
        <li key={item.caption ?? i} className="flex flex-col gap-3">
          <MediaView
            media={item.media}
            frame={section.frame}
            aspect={section.frame === 'plain' && !section.outline ? 4 / 3 : undefined}
            outline={section.outline}
            sizes={`(min-width: 64rem) ${Math.round(100 / section.columns)}vw, 50vw`}
            dark={dark}
          />
          {item.caption || item.meta ? (
            <div className="flex items-baseline justify-between gap-3">
              {item.caption ? (
                <span className="text-sm/[1.2] font-semibold lg:text-[17px]/[1.2]">{item.caption}</span>
              ) : null}
              {item.meta ? <Label className={cn('text-[10px]/[1.3]', t.muted)}>{item.meta}</Label> : null}
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

/*
 * Design: Case Study — Website, "03 — Redesign". Two 620px browsers 40px apart (stacked on
 * phones), each under a tag and its address, with metric rows below: 15px label and value,
 * the new figures in Flux blue.
 */
export function BeforeAfter({ section, dark }: Props<BeforeAfterSection>) {
  const t = tone(dark)
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {[section.before, section.after].map((side, i) => (
        <Reveal key={side.label} className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                'rounded-xl px-2.5 py-1.25 font-mono text-[10px]/[1.2] uppercase',
                i === 1
                  ? dark
                    ? 'bg-paper text-ink'
                    : 'bg-ink text-paper'
                  : dark
                    ? 'bg-ink-2 text-stone-light'
                    : 'bg-paper-2 text-stone',
              )}
            >
              {side.label}
            </span>
            {side.media.url ? (
              <Label className={cn('text-[10px]/[1.2] normal-case', t.muted)}>{side.media.url}</Label>
            ) : null}
          </div>
          <MediaView
            media={side.media}
            frame={section.frame}
            sizes="(min-width: 90rem) 620px, (min-width: 64rem) 50vw, 100vw"
            dark={dark}
            designWidth={620}
            shadow={false}
          />
          <dl>
            {side.metrics.map((metric) => (
              <div
                key={metric.label}
                className={cn(
                  'flex items-center justify-between gap-4 border-b pt-3 pb-2.75 text-[15px]/[1.2]',
                  t.border,
                )}
              >
                <dt className={t.muted}>{metric.label}</dt>
                <dd className={cn('font-semibold', i === 1 && t.accent)}>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ))}
    </div>
  )
}
