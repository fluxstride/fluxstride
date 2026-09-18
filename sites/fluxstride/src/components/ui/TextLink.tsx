import type { ReactNode } from 'react'
import { cn } from '@fluxstride/design-system/lib/cn'
import { ArrowIcon } from '@fluxstride/design-system/ui/ArrowIcon'
import { textLinkUnderline } from '@fluxstride/design-system/lib/link-styles'
import { SmartLink } from './SmartLink'

type TextLinkProps = {
  to: string
  children: ReactNode
  /** md: 16/500, 8px under, 18px arrow. sm: 15/500, 4px under, 16px arrow ("Discuss this"). */
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Underlined link with an arrow: "All case studies (24) →".
 * Design: 16/500, 1px underline in the text colour, 8px below, 10px gap, 18px arrow.
 * Hover: the underline wipes out to the right and draws back in from the left.
 */
export function TextLink({ to, children, size = 'md', className }: TextLinkProps) {
  return (
    <SmartLink
      to={to}
      className={cn(
        'group relative inline-flex items-center font-medium',
        size === 'md' ? 'gap-2.5 pb-2 text-base/[1.2]' : 'gap-2 pb-1 text-[15px]/[1.2]',
        textLinkUnderline,
        className,
      )}
    >
      {children}
      <ArrowIcon size={size === 'md' ? 18 : 16} />
    </SmartLink>
  )
}
