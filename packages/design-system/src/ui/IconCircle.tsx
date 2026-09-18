import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

type IconCircleProps = {
  icon: LucideIcon
  /** lg: 56px circle / 22px icon (Home cards). md: 52px / 22px (Services page). sm: 40px / 18px (mobile rows). */
  size?: 'sm' | 'md' | 'lg'
  /** soft: blue tint with a blue icon. solid: Flux blue with a paper icon (highlighted card). */
  tone?: 'soft' | 'solid'
  className?: string
}

const sizes = {
  sm: { circle: 'size-10', icon: 18 },
  md: { circle: 'size-13', icon: 22 },
  lg: { circle: 'size-14', icon: 22 },
}

export function IconCircle({ icon: Icon, size = 'md', tone = 'soft', className }: IconCircleProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-500 ease-out-expo',
        sizes[size].circle,
        tone === 'soft' ? 'bg-flux-soft text-flux' : 'bg-flux text-paper',
        className,
      )}
    >
      <Icon size={sizes[size].icon} strokeWidth={2} />
    </span>
  )
}
