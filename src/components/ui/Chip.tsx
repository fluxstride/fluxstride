import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { springy } from '@/lib/motion'

type ChipProps = {
  children: ReactNode
  selected: boolean
  onToggle: () => void
  /** Surface the chip sits on. */
  surface?: 'dark' | 'light'
  className?: string
}

/**
 * Pill toggle used by the brief builder ("I need help with", "Budget").
 * Design: 15/500, 12×18 padding, fully rounded. Selected chips fill with paper
 * and gain a 14px check; unselected ones are outlined.
 */
export function Chip({ children, selected, onToggle, surface = 'dark', className }: ChipProps) {
  const dark = surface === 'dark'

  return (
    <motion.button
      type="button"
      layout
      transition={springy}
      aria-pressed={selected}
      onClick={onToggle}
      className={cn(
        'inline-flex items-center rounded-full border px-4.25 py-2.75 text-[15px] leading-[1.2] font-medium transition-colors duration-300',
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
            // 22px = 14px check + the design's 8px gap, so the label slides over as it grows.
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 22, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={springy}
            className="inline-flex overflow-hidden"
          >
            <Check size={14} strokeWidth={2.25} />
          </motion.span>
        ) : null}
      </AnimatePresence>
      {children}
    </motion.button>
  )
}
