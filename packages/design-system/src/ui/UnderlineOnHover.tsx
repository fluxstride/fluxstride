import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/**
 * Wraps a link's label so a 1px line draws in under it when the nearest `.group` is
 * hovered, and leaves to the right when the pointer does. Used by footer links.
 */
export function UnderlineOnHover({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('relative', className)}>
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
      />
    </span>
  )
}
