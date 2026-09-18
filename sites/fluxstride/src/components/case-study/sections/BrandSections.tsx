import { Mail } from 'lucide-react'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { Label } from '@fluxstride/design-system/ui/Typography'
import type {
  DesignSystemSection,
  PaletteSection,
  SampleComponent,
  TypographySection,
} from '@/content/case-studies/schema'
import { cn } from '@fluxstride/design-system/lib/cn'
import { tone } from '../tone'

type Props<T> = { section: T; dark: boolean }

/** Greys used while a swatch's hex is still a placeholder. */
const PLACEHOLDER_RAMP = ['#1f2433', '#5b6477', '#97a0b3', '#d5dae5', '#f0f2f7']

/** Picks ink or white text for a background colour (WCAG relative luminance). */
function readableOn(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.4 ? 'text-ink' : 'text-white'
}

/*
 * Design: Case Study: Brand Identity, "04: Colour". Five 420px swatches edge to edge, the
 * name at the top (24px) and the values at the bottom; stacked 8px apart on phones, 115px
 * tall with the values straight under the name.
 */
export function Palette({ section }: Props<PaletteSection>) {
  return (
    <Reveal as="ul" stagger className="grid gap-2 lg:grid-cols-5 lg:gap-0">
      {section.colours.map((colour, i) => {
        // A bracketed placeholder like "[#RRGGBB]" falls back to the grey ramp.
        const hex =
          colour.hex.trim().match(/^#[0-9a-f]{6}$/i)?.[0] ?? PLACEHOLDER_RAMP[i % PLACEHOLDER_RAMP.length]
        return (
          <li
            key={colour.name + i}
            className={cn('flex flex-col gap-1.5 p-4.5 lg:h-105 lg:p-6', !colour.text && readableOn(hex))}
            style={{ backgroundColor: hex, color: colour.text }}
          >
            <p className="text-lg/[22px] font-semibold lg:text-2xl/[29px]">{colour.name}</p>
            <dl className="flex flex-col gap-1.5 font-mono text-[10px]/[13px] uppercase lg:mt-auto">
              {(['hex', 'rgb', 'cmyk'] as const).map((format) => (
                <div key={format} className="flex gap-[1ch]">
                  <dt>{format}</dt>
                  <dd>{colour[format]}</dd>
                </div>
              ))}
            </dl>
          </li>
        )
      })}
    </Reveal>
  )
}

/** Weight names a specimen can list, set in that weight. */
const FONT_WEIGHTS: Record<string, number> = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

/*
 * Design: Case Study: Brand Identity, "05: Typography", on ink. Two outlined cards 16px
 * apart (stacked on phones), aligned to the top: mono label, 180px "Aa" (96px), a sample line
 * (serif 40px / sans 24px; 26px / 18px on phones), then the alphabet or the weights.
 */
export function Typography({ section, dark }: Props<TypographySection>) {
  const t = tone(dark)
  return (
    <Reveal stagger className="flex flex-col gap-4 lg:flex-row lg:items-start">
      {section.specimens.map((specimen) => {
        const serif = specimen.style === 'serif'
        return (
          <figure
            key={specimen.role}
            className={cn(
              'flex flex-col gap-4 border p-5.25 lg:flex-1 lg:p-9.75',
              dark ? 'border-line-dark' : 'border-line bg-white',
            )}
          >
            <Label className={cn('text-label-sm/[15px]', t.muted)}>
              {specimen.role} · {specimen.typeface}
            </Label>
            <div className="flex flex-col gap-4" style={{ color: section.colour }}>
              <p
                aria-hidden="true"
                className={cn(
                  'text-[6rem]/[1] lg:text-[11.25rem]/[1]',
                  serif ? 'font-serif' : 'font-sans font-medium tracking-[-0.04em]',
                )}
              >
                Aa
              </p>
              <p
                className={
                  serif
                    ? 'font-serif text-[1.625rem]/[1.15] lg:text-[2.5rem]/[1.15]'
                    : 'text-lg/[1.4] lg:text-2xl/[1.4]'
                }
              >
                {specimen.sample}
              </p>
            </div>
            {specimen.weights?.length ? (
              <ul className={cn('flex flex-wrap gap-4 text-[13px]/[16px] lg:text-[15px]/[18px]', t.muted)}>
                {specimen.weights.map((weight) => (
                  <li key={weight} style={{ fontWeight: FONT_WEIGHTS[weight.toLowerCase()] ?? 400 }}>
                    {weight}
                  </li>
                ))}
              </ul>
            ) : (
              <Label className={cn('text-[9px]/[12px] break-all lg:text-label-sm/[15px]', t.muted)}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ · 0123456789
              </Label>
            )}
          </figure>
        )
      })}
    </Reveal>
  )
}

/*
 * Design: Case Study: Website, "05: Design system", on a mist band. A palette card (five
 * swatches 220px tall, 120px on phones) beside a 440px type card, 16px apart and stacked on
 * phones; the sample components 56px below (32px), buttons only on phones.
 */
export function DesignSystem({ section, dark }: Props<DesignSystemSection>) {
  const t = tone(dark)
  const card = cn('flex flex-col p-4.25 lg:p-5.75', dark ? 'border border-line-dark bg-ink-2' : t.card)
  const cardLabel = cn('font-mono text-label-sm/[15px] uppercase', t.muted)
  const { type, components } = section

  return (
    <div className="flex flex-col gap-8 lg:gap-14">
      <Reveal stagger className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <figure className={cn(card, 'lg:min-w-0 lg:flex-1')}>
          <figcaption className={cardLabel}>Colour</figcaption>
          <ul className="mt-3 flex">
            {section.colours.map((colour) => (
              <li
                key={colour.hex}
                className={cn(
                  'flex h-30 min-w-0 flex-1 flex-col justify-end gap-1 p-3 whitespace-nowrap lg:h-55',
                  readableOn(colour.hex),
                )}
                style={{ backgroundColor: colour.hex }}
              >
                <span className="text-[13px]/[1.2] font-semibold">{colour.name}</span>
                <Label className="text-[10px]/[13px]">{colour.hex}</Label>
              </li>
            ))}
          </ul>
        </figure>

        <figure className={cn(card, 'gap-2 lg:w-110 lg:shrink-0')}>
          <figcaption className={cardLabel}>Type</figcaption>
          <div className="flex items-center gap-5">
            <p
              aria-hidden="true"
              className="text-[4.5rem]/[1] font-semibold tracking-[-0.04em] lg:text-[7.5rem]/[1]"
            >
              {type.sample ?? 'Aa'}
            </p>
            <dl className="flex min-w-0 flex-1 flex-col gap-1.5">
              {type.scale.map(([name, value]) => (
                // The rule sits inside the design's 6px padding.
                <div
                  key={name}
                  className={cn('flex items-center justify-between gap-3 border-b pt-1.5 pb-1.25', t.border)}
                >
                  <dt className="text-sm/[1.2] font-semibold">{name}</dt>
                  <dd className={cn('font-mono text-[10px]/[13px] whitespace-nowrap', t.muted)}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className={cn('text-sm/[1.2]', t.muted)}>{type.note}</p>
        </figure>
      </Reveal>

      {components ? (
        <Reveal>
          <p className="sr-only">{components.description}</p>
          <div aria-hidden="true" className="flex flex-wrap items-center gap-2.5">
            {components.items.map((item) => (
              <SampleComponentView
                key={item.kind + ('label' in item ? item.label : item.placeholder)}
                item={item}
                colours={components.colours}
                dark={dark}
              />
            ))}
          </div>
        </Reveal>
      ) : null}
    </div>
  )
}

function SampleComponentView({
  item,
  colours,
  dark,
}: {
  item: SampleComponent
  colours: NonNullable<DesignSystemSection['components']>['colours']
  dark: boolean
}) {
  const t = tone(dark)
  switch (item.kind) {
    case 'button':
      return item.variant === 'outline' ? (
        <span
          className="rounded-3xl border px-4.25 py-2.25 text-[13px]/[1.2] font-semibold"
          style={{ borderColor: colours.primary, color: colours.primary }}
        >
          {item.label}
        </span>
      ) : (
        <span
          className="rounded-3xl px-4.5 py-2.5 text-[13px]/[1.2] font-semibold text-white"
          style={{ backgroundColor: colours.primary }}
        >
          {item.label}
        </span>
      )
    case 'input':
      return (
        <span className="flex w-55 items-center gap-2 rounded-3xl border border-line bg-white px-3.25 py-2.25 text-[13px]/[1.2] text-stone max-lg:hidden">
          <Mail className="size-3.5" strokeWidth={2} />
          {item.placeholder}
        </span>
      )
    case 'badge':
      return (
        <span
          className="rounded-xl px-2.5 py-1.25 font-mono text-[10px]/[13px] uppercase max-lg:hidden"
          style={{ backgroundColor: colours.soft, color: colours.accent }}
        >
          {item.label}
        </span>
      )
    case 'note':
      return <Label className={cn('text-label-sm/[15px] max-lg:hidden', t.muted)}>{item.label}</Label>
  }
}
