import type { ReactNode } from 'react'
import type { ArrowDirection } from '@fluxstride/design-system/ui/ArrowIcon'
import { ButtonArrow } from '@fluxstride/design-system/ui/Button'
import { cn } from '@fluxstride/design-system/lib/cn'
import {
  buttonClass,
  buttonIconSize,
  type ButtonStyleOptions,
} from '@fluxstride/design-system/lib/button-styles'
import { SmartLink } from './SmartLink'

type ButtonLinkProps = ButtonStyleOptions & {
  to: string
  children: ReactNode
  /** Arrow after the label. Pass null for none. */
  arrow?: ArrowDirection | null
  className?: string
  onClick?: () => void
}

/**
 * A link styled as a button. Internal paths use client-side navigation.
 * See button-styles.ts for variants; the real <button> lives in the design system.
 */
export function ButtonLink({ to, children, arrow = 'right', className, onClick, ...style }: ButtonLinkProps) {
  return (
    <SmartLink to={to} onClick={onClick} className={cn(buttonClass(style), className)}>
      {children}
      {arrow ? <ButtonArrow arrow={arrow} size={buttonIconSize[style.size ?? 'md']} /> : null}
    </SmartLink>
  )
}
