import { ArrowDown, ArrowRight, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

export type ArrowDirection = 'right' | 'up-right' | 'down'

const icons: Record<ArrowDirection, LucideIcon> = {
  right: ArrowRight,
  'up-right': ArrowUpRight,
  down: ArrowDown,
}

// Where the resting arrow leaves to, and where its replacement enters from.
const motion: Record<ArrowDirection, { exit: string; enter: string }> = {
  right: {
    exit: 'group-hover:translate-x-[130%]',
    enter: '-translate-x-[130%] group-hover:translate-x-0',
  },
  'up-right': {
    exit: 'group-hover:translate-x-[130%] group-hover:-translate-y-[130%]',
    enter: '-translate-x-[130%] translate-y-[130%] group-hover:translate-0',
  },
  down: {
    exit: 'group-hover:translate-y-[130%]',
    enter: '-translate-y-[130%] group-hover:translate-y-0',
  },
}

type ArrowIconProps = {
  direction?: ArrowDirection
  /** Draw another icon (a download tray, say) that still slides the arrow's way. */
  icon?: LucideIcon
  /** Pixel size, matching the design's icon frames (14, 16, 18, 20). */
  size?: number
  strokeWidth?: number
  className?: string
}

/**
 * The arrow used on buttons and links. On hover of the nearest `.group`, it slides
 * out in its own direction while an identical arrow slides in behind it.
 */
export function ArrowIcon({
  direction = 'right',
  icon,
  size = 18,
  strokeWidth = 2,
  className,
}: ArrowIconProps) {
  const Icon = icon ?? icons[direction]
  const transition = 'transition-transform duration-500 ease-out-expo'

  return (
    <span
      aria-hidden="true"
      className={cn('relative inline-block shrink-0 overflow-hidden', className)}
      style={{ width: size, height: size }}
    >
      <Icon
        size={size}
        strokeWidth={strokeWidth}
        className={cn('absolute inset-0', transition, motion[direction].exit)}
      />
      <Icon
        size={size}
        strokeWidth={strokeWidth}
        className={cn('absolute inset-0', transition, motion[direction].enter)}
      />
    </span>
  )
}
