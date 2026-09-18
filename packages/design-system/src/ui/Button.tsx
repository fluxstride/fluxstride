import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { buttonClass, buttonIconSize, type ButtonStyleOptions } from '../lib/button-styles'
import { cn } from '../lib/cn'
import { ArrowIcon, type ArrowDirection } from './ArrowIcon'

type ArrowProps = {
  /** Arrow after the label. Pass null for none. */
  arrow?: ArrowDirection | null
}

/** The trailing arrow, tagged so variants can recolour it on hover (see button-styles.ts). */
export function ButtonArrow({ arrow, size }: { arrow: ArrowDirection; size: number }) {
  return (
    <span data-icon="" className="transition-colors duration-500">
      <ArrowIcon direction={arrow} size={size} className="block" />
    </span>
  )
}

type ButtonProps = ButtonStyleOptions & ArrowProps & ButtonHTMLAttributes<HTMLButtonElement>

/** A real <button>, for forms and actions. See button-styles.ts for variants. */
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

type ButtonAnchorProps = ButtonStyleOptions & ArrowProps & AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * A plain <a> styled as a button, for sites without a router. Sites with one wrap
 * their own link component the same way (the studio's ButtonLink).
 */
export function ButtonAnchor({
  children,
  arrow = 'right',
  className,
  variant,
  size,
  surface,
  block,
  ...props
}: ButtonAnchorProps) {
  return (
    <a className={cn(buttonClass({ variant, size, surface, block }), className)} {...props}>
      {children}
      {arrow ? <ButtonArrow arrow={arrow} size={buttonIconSize[size ?? 'md']} /> : null}
    </a>
  )
}
