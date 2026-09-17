/**
 * Class sets for content that sits on either a paper or an ink section.
 * Keeps every case study block readable on both without repeating ternaries.
 */
export function tone(dark: boolean) {
  return {
    text: dark ? 'text-paper' : 'text-ink',
    muted: dark ? 'text-stone-light' : 'text-stone',
    accent: dark ? 'text-flux-light' : 'text-flux',
    accentBg: dark ? 'bg-flux-light' : 'bg-flux',
    /** Hairlines between rows */
    border: dark ? 'border-line-dark' : 'border-line',
    /** The heavier rule above phases and stats */
    rule: dark ? 'border-line-dark' : 'border-ink',
    /** Bordered card surface */
    card: dark ? 'border border-line-dark' : 'border border-line bg-white',
    /** "Before" bars and inactive dots */
    quiet: dark ? 'bg-line-dark' : 'bg-line',
  }
}
