import type { CaseStudy } from './schema'

/** Text written as [Like this] is a placeholder waiting for real content. */
const PLACEHOLDER = /\[[^\]]+\]/

export type Placeholder = {
  /** Where it is, e.g. "results.stats[0].value" */
  path: string
  /** The placeholder text, or "image" for an empty image slot. */
  value: string
}

/**
 * Lists every unfinished field in a case study: [bracketed] text and images still
 * set to null. Used by the draft banner in development and by the build, which
 * refuses to publish a case study that still has any.
 */
export function findPlaceholders(study: CaseStudy): Placeholder[] {
  const found: Placeholder[] = []

  const walk = (value: unknown, path: string) => {
    if (typeof value === 'string') {
      const match = value.match(PLACEHOLDER)
      if (match) found.push({ path, value: match[0] })
      return
    }
    if (Array.isArray(value)) {
      value.forEach((item, i) => walk(item, `${path}[${i}]`))
      return
    }
    // Lucide icons are functions or forwardRef objects; they carry no content.
    if (value && typeof value === 'object' && !('$$typeof' in value)) {
      const record = value as Record<string, unknown>
      if ('image' in record && 'brief' in record && record.image === null) {
        found.push({ path: `${path}.image`, value: 'image' })
      }
      for (const [key, child] of Object.entries(record)) {
        if (key === 'brief') continue // the slot description, not page content
        walk(child, path ? `${path}.${key}` : key)
      }
    }
  }

  walk(study, '')
  return found
}
