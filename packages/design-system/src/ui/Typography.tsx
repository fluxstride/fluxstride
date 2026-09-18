import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type TextProps = { children: ReactNode; className?: string }

/**
 * Mono uppercase label: section eyebrows like "(02) What we do", column headings,
 * metadata. Write the content in normal case; CSS uppercases it, so screen
 * readers say words instead of spelling out letters.
 */
type EyebrowProps = TextProps & {
  onDark?: boolean
  /** Render as a heading when the eyebrow is the only title a block has. */
  as?: 'p' | 'h2' | 'h3' | 'span'
  id?: string
}

export function Eyebrow({ children, className, onDark = false, as: Tag = 'p', id }: EyebrowProps) {
  return (
    <Tag
      id={id}
      className={cn('font-mono text-label uppercase', onDark ? 'text-stone-light' : 'text-stone', className)}
    >
      {children}
    </Tag>
  )
}

/** Inline mono label, for tags, durations and captions inside other elements. */
export function Label({ children, className }: TextProps) {
  return <span className={cn('font-mono text-label-sm uppercase', className)}>{children}</span>
}

/**
 * The one serif italic phrase in a heading: "keeps *moving.*", "*The Stride* Method."
 * Sized relative to its heading (1.125em, the ratio used throughout the design),
 * so it scales with whatever type token the heading uses.
 */
export function Accent({ children, className }: TextProps) {
  return <em className={cn('font-serif text-[1.125em] font-normal italic', className)}>{children}</em>
}
