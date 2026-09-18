import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../lib/motion'

type CollapseProps = {
  open: boolean
  children: ReactNode
  id?: string
  /** Names the region for screen readers, usually the heading of the row it belongs to. */
  label?: string
  className?: string
}

/** An accordion panel that grows open and folds shut instead of popping. */
export function Collapse({ open, children, id, label, className }: CollapseProps) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="panel"
          id={id}
          role={label ? 'region' : undefined}
          aria-label={label}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="overflow-hidden"
        >
          <div className={className}>{children}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
