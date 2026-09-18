import { cn } from './cn'

/*
 * Buttons from the design:
 *
 *   variant   size  used for                               spec
 *   primary   md    "Start a project" (hero)               flux, 16/600, 18×24 pad, 18px arrow
 *   primary   lg    "Send brief: reply in 24h"            flux, 18/600, 22×30 pad, 20px arrow
 *   outline   md    "See our work"                         1px ink border, 16/500, 18×20 pad
 *   ink       sm    nav "Start a project"                  ink, 14/500, 12×18 pad, 16px flux arrow
 *   any       dialog  cookie banner and Cookie settings     15/600, 13×20 pad, no icon
 *   any       inline  actions inside legal pages            15/600, 15×22 pad, 16px icon
 *
 * Outlined dialog and inline buttons give 1px of padding to the border, so they are the
 * same size as filled ones beside them (Pencil draws strokes inside the frame).
 *
 * All have 2px corners (rounded-xs). Hover: a layer sweeps up from the bottom
 * while the arrow slides out and back in.
 */

export type ButtonVariant = 'primary' | 'outline' | 'ink'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'dialog' | 'inline'
/** The surface the button sits on. Changes the hover sweep so it stays visible on dark sections. */
export type ButtonSurface = 'light' | 'dark'

export type ButtonStyleOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  surface?: ButtonSurface
  /** Stretch to the container and push the arrow to the far edge (mobile CTAs). */
  block?: boolean
}

const base =
  'group relative isolate inline-flex items-center overflow-hidden rounded-xs whitespace-nowrap transition-colors duration-500 ease-out-expo disabled:pointer-events-none disabled:opacity-60 ' +
  // Sweep layer
  'before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-y-100'

const sizes: Record<ButtonSize, string> = {
  sm: 'gap-2 px-4.5 py-3 text-sm/[1.2] font-medium',
  md: 'gap-2.5 px-6 py-4.5 text-base/[1.2] font-semibold',
  lg: 'gap-3 px-7.5 py-5.5 text-lg/[1.2] font-semibold',
  dialog: 'gap-2 px-5 py-3.25 text-[0.9375rem]/[1.2] font-semibold',
  inline: 'gap-2.5 px-5.5 py-3.75 text-[0.9375rem]/[1.2] font-semibold',
}

const outlineSizes: Partial<Record<ButtonSize, string>> = {
  dialog: 'px-4.75 py-3 font-semibold',
  inline: 'px-5.25 py-3.5 font-semibold',
}

/** Arrow size (px) for each button size, as drawn in the design. */
export const buttonIconSize: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20, dialog: 16, inline: 16 }

const variants: Record<ButtonVariant, Record<ButtonSurface, string>> = {
  primary: {
    light: 'bg-flux text-paper before:bg-ink',
    dark: 'bg-flux text-paper before:bg-paper hover:text-ink',
  },
  outline: {
    light: 'border border-ink px-5 py-4.25 font-medium text-ink before:bg-ink hover:text-paper',
    dark: 'border border-paper px-5 py-4.25 font-medium text-paper before:bg-paper hover:text-ink',
  },
  ink: {
    light: 'bg-ink text-paper before:bg-flux [&_[data-icon]]:text-flux hover:[&_[data-icon]]:text-paper',
    dark: 'bg-paper text-ink before:bg-flux hover:text-paper',
  },
}

/** Class string for anything that should look like a button (links, submit buttons, labels). */
export function buttonClass({
  variant = 'primary',
  size = 'md',
  surface = 'light',
  block,
}: ButtonStyleOptions = {}) {
  return cn(
    base,
    sizes[size],
    variants[variant][surface],
    variant === 'outline' && outlineSizes[size],
    block && 'flex w-full justify-between px-5',
  )
}
