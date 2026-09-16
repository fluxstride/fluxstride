import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Custom type tokens from src/styles/tokens.css. Keep this list in sync.
 *
 * Why it matters: tailwind-merge doesn't read our CSS. Without this list it
 * would treat `text-heading-xl` as a text *colour*, see it clash with
 * `text-ink`, and silently drop one of them.
 */
const TEXT_TOKENS = [
  'display-2xl',
  'display-xl',
  'display-lg',
  'display-md',
  'display-sm',
  'statement',
  'numeral-xl',
  'numeral-lg',
  'numeral-md',
  'heading-2xl',
  'heading-xl',
  'heading-lg',
  'heading-md',
  'heading-sm',
  'title-xl',
  'title-lg',
  'title-md',
  'title-sm',
  'value',
  'quote',
  'marquee',
  'lead',
  'body-lg',
  'body',
  'body-sm',
  'label',
  'label-sm',
]

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: TEXT_TOKENS,
      spacing: ['gutter', 'section'],
      ease: ['out-expo', 'in-out-quart'],
    },
  },
})

/** Joins class names, dropping falsy values, and resolves Tailwind conflicts so the last one wins. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
