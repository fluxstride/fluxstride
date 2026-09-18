import { motion } from 'motion/react'
import { useId } from 'react'
import { cn } from '@fluxstride/design-system/lib/cn'
import { springy } from '@fluxstride/design-system/lib/motion'

export type FilterOption<T extends string> = { id: T; label: string }

type FilterChipsProps<T extends string> = {
  options: readonly FilterOption<T>[]
  value: T
  onChange: (value: T) => void
  /** Names the group for screen readers, e.g. "Filter projects by discipline". */
  label: string
  className?: string
}

/*
 * Design: "Filters / Chips" on Work and Insights. 14/500 pills, 10×16 padding, 8px apart;
 * the active one filled with ink, the rest outlined with a hairline.
 *
 * The ink fill is one shared element that slides to the chosen chip. On mobile the
 * row runs off the right edge and scrolls sideways, as drawn.
 */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: FilterChipsProps<T>) {
  const layoutId = useId()

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'scrollbar-none flex gap-2 overflow-x-auto max-lg:-mx-gutter max-lg:px-gutter',
        className,
      )}
    >
      {options.map((option) => {
        const active = option.id === value
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={cn(
              // 1px border inside the 10×16 padding keeps outlined and filled chips the same size.
              'relative isolate shrink-0 rounded-full border px-3.75 py-2.25 text-sm/[1.2] font-medium whitespace-nowrap transition-colors duration-300',
              active ? 'border-transparent text-paper' : 'border-line text-ink hover:border-stone',
            )}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                transition={springy}
                aria-hidden="true"
                className="absolute -inset-px -z-10 rounded-full bg-ink"
              />
            ) : null}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
