import { ArrowDown, ArrowRight } from 'lucide-react'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@fluxstride/design-system/lib/cn'

export type ServiceIndexItem = {
  href: string
  /** Mono index, e.g. "03", or "·" for a link that isn't a service */
  index: string
  title: string
  /** Drawn in flux blue, e.g. "All services" */
  accent?: boolean
}

type ServiceIndexProps = {
  items: ServiceIndexItem[]
  /** Arrows point down to anchors on the same page, right to other pages. */
  arrow: 'down' | 'right'
  /** Reveal on mount (at the top of a page) instead of on scroll. */
  onMount?: boolean
  className?: string
}

/*
 * Design: Services / Jump To, and "Other Services" on a service page.
 * Rows: 18px padding with the hairline drawn inside (so 17px below the text here),
 * 12px mono index, 17px/500 name (16px on mobile), 16px arrow. 40px between columns.
 */
export function ServiceIndex({ items, arrow, onMount = false, className }: ServiceIndexProps) {
  const Arrow = arrow === 'down' ? ArrowDown : ArrowRight

  return (
    <Reveal
      as="ul"
      on={onMount ? 'mount' : 'scroll'}
      delay={onMount ? 0.4 : 0}
      stagger={0.03}
      className={cn('grid border-t border-line lg:grid-cols-3 lg:gap-x-10', className)}
    >
      {items.map((item) => (
        <li key={item.href} className="flex">
          <SmartLink
            to={item.href}
            className="group flex flex-1 items-center gap-4 border-b border-line pt-4.5 pb-4.25 transition-colors hover:border-ink"
          >
            <span className="font-mono text-label text-stone">{item.index}</span>
            <span
              className={cn(
                'flex-1 text-base/[1.2] font-medium lg:text-[17px]/[1.2]',
                item.accent ? 'text-flux' : 'text-ink',
              )}
            >
              {item.title}
            </span>
            <Arrow
              aria-hidden="true"
              size={16}
              strokeWidth={2}
              className={cn(
                'shrink-0 transition-[color,translate] duration-500 ease-out-expo',
                arrow === 'down' ? 'group-hover:translate-y-0.5' : 'group-hover:translate-x-0.5',
                item.accent ? 'text-flux' : 'text-stone group-hover:text-ink',
              )}
            />
          </SmartLink>
        </li>
      ))}
    </Reveal>
  )
}
