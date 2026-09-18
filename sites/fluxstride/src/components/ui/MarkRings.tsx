import { cn } from '@/lib/cn'

/*
 * Concentric Stride-mark rings around a solid Flux core: the hero's "Momentum" figure and
 * the 404 page. Both designs use the same proportions, so sizes are multiples of one unit
 * the parent sets with --rings-unit (e.g. [--rings-unit:100cqh]).
 *
 * Rings are centred on the wrapper's origin with negative margins rather than transforms,
 * so GSAP stays free to scale and move them. Animations select [data-ring] and [data-core].
 */

const RING_SIZES = [1.7, 1.3, 0.95, 0.62]
const CORE_SIZE = 0.26

/** Outer → inner. The two outer rings are neutral, the inner two pick up Flux. */
const ringTones = {
  dark: ['border-white/8', 'border-white/12', 'border-flux-light/25', 'border-flux-light/50'],
  light: ['border-ink/6', 'border-ink/9', 'border-flux/20', 'border-flux/40'],
}

function centred(size: number) {
  const length = `calc(${size} * var(--rings-unit))`
  const offset = `calc(${size} * var(--rings-unit) / -2)`
  return { width: length, height: length, margin: `${offset} 0 0 ${offset}` }
}

type MarkRingsProps = {
  /** Surface the rings sit on. */
  tone?: 'dark' | 'light'
  /** Position the origin (e.g. top-[52%] left-[66%]) and set --rings-unit. */
  className?: string
  /** Ring stroke width, e.g. border-2. Defaults to 1px. */
  ringClassName?: string
}

export function MarkRings({ tone = 'dark', className, ringClassName = 'border' }: MarkRingsProps) {
  return (
    <div className={cn('absolute', className)}>
      {RING_SIZES.map((size, i) => (
        <span
          key={size}
          data-ring=""
          className={cn('absolute shape-ring', ringClassName, ringTones[tone][i])}
          style={centred(size)}
        />
      ))}
      <span data-core="" className="absolute shape-mark bg-flux" style={centred(CORE_SIZE)} />
    </div>
  )
}
