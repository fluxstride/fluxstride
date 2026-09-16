/** Joins items with the design's middle-dot separator: "Web apps · APIs · Cloud". */
export function dotted(items: string[]) {
  return items.join(' · ')
}

/** Zero-pads an index for display: 1 → "01". */
export function pad(n: number) {
  return String(n).padStart(2, '0')
}
