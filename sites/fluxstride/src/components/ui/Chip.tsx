import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@fluxstride/design-system/lib/cn'
import { springy } from '@fluxstride/design-system/lib/motion'

type ChipProps = {
  children: ReactNode
  selected: boolean
  onToggle: () => void
  /** Surface the chip sits on. */
  surface?: 'dark' | 'light'
  /** md: Home's brief builder. sm: the Contact form (14/500, 10×14, 13px check 6px from the label). */
  size?: 'md' | 'sm'
  className?: string
}

/**
 * Pill toggle used by the brief builder ("I need help with", "Budget").
 * Design: 15/500, 12×18 padding, fully rounded. Selected chips fill with paper
 * and gain a 14px check; unselected ones are outlined.
 */
export function Chip({ children, selected, onToggle, surface = 'dark', size = 'md', className }: ChipProps) {
  const dark = surface === 'dark'
  const small = size === 'sm'

  return (
    <motion.button
      type="button"
      layout
      transition={springy}
      aria-pressed={selected}
      onClick={onToggle}
      className={cn(
        'inline-flex items-center rounded-full border font-medium transition-colors duration-300',
        small ? 'px-3.25 py-2.25 text-sm/[1.2]' : 'px-4.25 py-2.75 text-[15px]/[1.2]',
        dark
          ? selected
            ? 'border-paper bg-paper text-ink'
            : 'border-line-dark text-paper hover:border-stone'
          : selected
            ? 'border-ink bg-ink text-paper'
            : 'border-line text-ink hover:border-stone',
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {selected ? (
          <motion.span
            key="check"
            aria-hidden="true"
            // 22px = 14px check + the design's 8px gap (19px = 13 + 6 when small), so the label slides over as it grows.
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: small ? 19 : 22, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={springy}
            className="inline-flex overflow-hidden"
          >
            <Check size={small ? 13 : 14} strokeWidth={2.25} />
          </motion.span>
        ) : null}
      </AnimatePresence>
      {children}
    </motion.button>
  )
}
