import { Reveal } from '@/components/motion/Reveal'
import { Label } from '@/components/ui/Typography'
import type { PaletteSection, TypographySection } from '@/content/case-studies/schema'
import { cn } from '@/lib/cn'
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

export function Palette({ section }: Props<PaletteSection>) {
  return (
    <Reveal as="ul" stagger className="grid gap-2 lg:grid-cols-5 lg:gap-0">
      {section.colours.map((colour, i) => {
        // A bracketed placeholder like "[#RRGGBB]" falls back to the grey ramp.
        const hex =
          colour.hex.trim().match(/^#[0-9a-f]{6}$/i)?.[0] ?? PLACEHOLDER_RAMP[i % PLACEHOLDER_RAMP.length]
        const text = readableOn(hex)
        return (
          <li
            key={colour.name + i}
            className={cn(
              'flex flex-col justify-between gap-6 p-4.5 lg:h-100 lg:p-6',
              text,
              // Pale swatches need an edge against the paper background.
              text === 'text-ink' && 'border border-line',
            )}
            style={{ backgroundColor: hex }}
          >
            <p className="text-lg font-semibold lg:text-[1.375rem]">{colour.name}</p>
            <dl className="flex flex-col gap-1 font-mono text-[10px]/[1.3] uppercase">
              {(['hex', 'rgb', 'cmyk'] as const).map((format) => (
                <div key={format} className="flex gap-1.5">
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

export function Typography({ section, dark }: Props<TypographySection>) {
  const t = tone(dark)
  return (
    <Reveal stagger className="grid gap-4 lg:grid-cols-2">
      {section.specimens.map((specimen) => {
        const font = specimen.style === 'serif' ? 'font-serif' : 'font-sans font-medium'
        return (
          <figure key={specimen.role} className={cn('flex flex-col gap-4 p-5.5 lg:p-10', t.card)}>
            <Label className={t.muted}>
              {specimen.role} · {specimen.typeface}
            </Label>
            <p aria-hidden="true" className={cn('text-[6rem]/[1] lg:text-[11.25rem]/[1]', font)}>
              Aa
            </p>
            <p className={cn('text-2xl/[1.2] lg:text-[2.25rem]/[1.2]', font)}>{specimen.sample}</p>
            <Label className={cn('break-all', t.muted)}>ABCDEFGHIJKLMNOPQRSTUVWXYZ · 0123456789</Label>
          </figure>
        )
      })}
    </Reveal>
  )
}
