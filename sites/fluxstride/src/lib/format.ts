/** Joins items with the design's middle-dot separator: "Web apps · APIs · Cloud". */
export function dotted(items: string[]) {
  return items.join(' · ')
}

/** Zero-pads an index for display: 1 → "01". */
export function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** Up to two initials for an avatar placeholder, ignoring titles: "Dr Elena Novak" → "EN". */
export function initials(name: string) {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/, '')
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
}
