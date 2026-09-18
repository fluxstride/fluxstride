import { motion } from 'motion/react'
import { cn } from '../lib/cn'
import { EASE_OUT } from '../lib/motion'

type MenuButtonProps = {
  open: boolean
  onToggle: () => void
  /** id of the menu panel it controls. */
  controls: string
  /** Hide it at the site's desktop breakpoint here, e.g. "lg:hidden". */
  className?: string
}

/**
 * The 44px round mobile menu button. Its three lines (lucide "menu" at 20px) fold into
 * a cross when the menu opens, and the button swaps from ink to paper to sit on the
 * ink menu panel.
 */
export function MenuButton({ open, onToggle, controls, className }: MenuButtonProps) {
  const line = 'absolute left-0 block h-[1.5px] w-5 rounded-full bg-current'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      className={cn(
        'relative z-10 flex size-11 items-center justify-center rounded-full transition-colors duration-500',
        open ? 'bg-paper text-ink' : 'bg-ink text-paper',
        className,
      )}
    >
      <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      <span aria-hidden="true" className="relative block h-3.5 w-5">
        <motion.span
          className={line}
          animate={open ? { top: 6.25, rotate: 45 } : { top: 0, rotate: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />
        <motion.span
          className={cn(line, 'top-[6.25px]')}
          animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className={line}
          animate={open ? { top: 6.25, rotate: -45 } : { top: 12.5, rotate: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />
      </span>
    </button>
  )
}
