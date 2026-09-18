import { cn } from '@fluxstride/design-system/lib/cn'

type MarkProps = { className?: string }

/**
 * The Stride mark: a forward-leaning drop in Flux blue.
 * Size it with `size-*`; colour defaults to Flux and can be overridden with `bg-*`.
 */
export function Mark({ className }: MarkProps) {
  return <span aria-hidden="true" className={cn('inline-block shrink-0 shape-mark bg-flux', className)} />
}

type LogoProps = {
  className?: string
  /** Wordmark colour. The mark is always Flux blue. */
  tone?: 'ink' | 'paper'
}

/**
 * Horizontal lockup: mark + "fluxstride" wordmark.
 *
 * Proportions follow the logo spec in the brand guidelines, expressed in em so
 * the lockup scales from a single font size: wordmark = 1.23 × mark,
 * gap = 0.27 × mark. Set the size with a text-[…] class on the Logo.
 *   Nav desktop: text-[26px]   Nav mobile: text-[22px]   Footer: fluid
 */
export function Logo({ className, tone = 'ink' }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[0.22em] leading-none font-semibold',
        tone === 'ink' ? 'text-ink' : 'text-paper',
        className,
      )}
    >
      <Mark className="size-[0.813em]" />
      <span>fluxstride</span>
    </span>
  )
}
