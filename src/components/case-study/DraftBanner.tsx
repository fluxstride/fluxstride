import { PencilLine } from 'lucide-react'
import type { Placeholder } from '@/content/case-studies/placeholders'

type DraftBannerProps = {
  /** "Draft" or "Starter template · SEO" */
  title: string
  placeholders: Placeholder[]
  /** File to edit, e.g. src/content/case-studies/studies/northwind.ts */
  file: string
}

/**
 * Development-only notice on drafts and templates, echoing the yellow template notes
 * in the design file: what's left to fill in and where. Never rendered in production.
 */
export function DraftBanner({ title, placeholders, file }: DraftBannerProps) {
  return (
    <aside className="bg-[#fff3c4] text-[#5c4500]">
      <details className="container-page py-3 text-sm/[1.45]">
        <summary className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-2 font-mono text-label uppercase">
            <PencilLine aria-hidden="true" size={16} />
            {title}
          </span>
          <span>
            {placeholders.length
              ? `${placeholders.length} placeholder${placeholders.length === 1 ? '' : 's'} left in `
              : 'No placeholders left. Set status to "published" in '}
            <code className="font-mono text-[13px]">{file}</code>
          </span>
        </summary>
        {placeholders.length ? (
          <ul className="mt-3 grid gap-1 font-mono text-[12px]/[1.4] lg:grid-cols-2">
            {placeholders.map((placeholder) => (
              <li key={placeholder.path}>
                {placeholder.path}: <strong>{placeholder.value}</strong>
              </li>
            ))}
          </ul>
        ) : null}
      </details>
    </aside>
  )
}
