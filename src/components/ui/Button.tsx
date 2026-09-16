import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { ArrowIcon, type ArrowDirection } from './ArrowIcon'
import { buttonClass, buttonIconSize, type ButtonStyleOptions } from './button-styles'
import { SmartLink } from './SmartLink'

type ArrowProps = {
  /** Arrow after the label. Pass null for none. */
  arrow?: ArrowDirection | null
}

function ButtonArrow({ arrow, size }: { arrow: ArrowDirection; size: number }) {
  return (
    <span data-icon="" className="transition-colors duration-500">
      <ArrowIcon direction={arrow} size={size} className="block" />
    </span>
  )
}

type ButtonLinkProps = ButtonStyleOptions &
  ArrowProps & {
    to: string
    children: ReactNode
    className?: string
    onClick?: () => void
  }

/** A link styled as a button. Internal paths use client-side navigation. See button-styles.ts for variants. */
export function ButtonLink({ to, children, arrow = 'right', className, onClick, ...style }: ButtonLinkProps) {
  return (
    <SmartLink to={to} onClick={onClick} className={cn(buttonClass(style), className)}>
      {children}
      {arrow ? <ButtonArrow arrow={arrow} size={buttonIconSize[style.size ?? 'md']} /> : null}
    </SmartLink>
  )
}

type ButtonProps = ButtonStyleOptions & ArrowProps & ButtonHTMLAttributes<HTMLButtonElement>

/** A real <button>, for forms and actions. Same look as ButtonLink. */
export function Button({
  children,
  arrow = 'right',
  className,
  variant,
  size,
  surface,
  block,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(buttonClass({ variant, size, surface, block }), className)} {...props}>
      {children}
      {arrow ? <ButtonArrow arrow={arrow} size={buttonIconSize[size ?? 'md']} /> : null}
    </button>
  )
}
