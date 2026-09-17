import { cn } from '@/lib/cn'

type ToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  /** id of the element that names the switch, e.g. the category title. */
  labelledBy: string
  describedBy?: string
  className?: string
}

/**
 * On/off switch. Design ("Toggle On" / "Toggle Off"): 44×24 pill, Flux blue when on
 * and hairline grey when off, with an 18px white knob 3px from the edge.
 */
export function Toggle({ checked, onChange, labelledBy, describedBy, className }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flux',
        checked ? 'bg-flux' : 'bg-line',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-0.75 left-0.75 size-4.5 rounded-full bg-white shadow-[0_1px_2px_rgb(10_15_30/0.15)] transition-transform duration-300 ease-out-expo',
          checked && 'translate-x-5',
        )}
      />
    </button>
  )
}

/** "Always on" pill for strictly necessary cookies: flux-soft, 5×10 padding, mono 10px. */
export function AlwaysOn() {
  return (
    <span className="shrink-0 rounded-full bg-flux-soft px-2.5 py-1.25 font-mono text-[0.625rem]/[1.3] text-flux uppercase">
      Always on
    </span>
  )
}
