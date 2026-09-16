import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { ArrowIcon } from './ArrowIcon'
import { SmartLink } from './SmartLink'

type TextLinkProps = {
  to: string
  children: ReactNode
  className?: string
}

/**
 * Underlined link with an arrow: "All case studies (24) →".
 * Design: 16/500, 1px underline in the text colour, 8px below, 10px gap, 18px arrow.
 * Hover: the underline wipes out to the right and draws back in from the left.
 */
export function TextLink({ to, children, className }: TextLinkProps) {
  return (
    <SmartLink
      to={to}
      className={cn(
        'group relative inline-flex items-center gap-2.5 pb-2 text-base leading-[1.2] font-medium',
        // Underline: two stacked lines, one leaving and one arriving
        'before:absolute before:inset-x-0 before:bottom-0 before:h-px before:origin-right before:bg-current before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-x-0',
        'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:delay-200 after:duration-500 after:ease-out-expo hover:after:scale-x-100',
        className,
      )}
    >
      {children}
      <ArrowIcon size={18} />
    </SmartLink>
  )
}
