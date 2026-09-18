import { Fragment } from 'react'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@fluxstride/design-system/lib/cn'

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

/**
 * Text with Markdown-style inline links: "complain at [ico.org.uk](https://ico.org.uk)".
 * Only links are supported; everything else renders as written.
 */
export function RichText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const parts = []
  let last = 0
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match
    parts.push(text.slice(last, match.index))
    parts.push(
      <SmartLink
        key={match.index}
        to={href}
        className={cn(
          'underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-current',
          linkClassName,
        )}
      >
        {label}
      </SmartLink>,
    )
    last = match.index + whole.length
  }
  parts.push(text.slice(last))

  return parts.map((part, i) => (typeof part === 'string' ? <Fragment key={`t${i}`}>{part}</Fragment> : part))
}
