import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Custom type tokens from styles/tokens.css. Keep this list in sync.
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
  'display-legal',
  'display-case',
  'heading-next',
  'heading-case',
  'statement',
  'numeral-xl',
  'numeral-lg',
  'numeral-md',
  'heading-3xl',
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

/**
 * Builds a `cn` that also knows a site's own type tokens. A site that adds
 * `--text-*` tokens in its stylesheet passes their names here, for the same
 * reason as TEXT_TOKENS above.
 */
export function createCn(extraTextTokens: string[] = []) {
  const twMerge = extendTailwindMerge({
    extend: {
      theme: {
        text: [...TEXT_TOKENS, ...extraTextTokens],
        spacing: ['gutter', 'section'],
        ease: ['out-expo', 'in-out-quart'],
      },
    },
  })

  return (...inputs: ClassValue[]) => twMerge(clsx(inputs))
}

/** Joins class names, dropping falsy values, and resolves Tailwind conflicts so the last one wins. */
export const cn = createCn()
