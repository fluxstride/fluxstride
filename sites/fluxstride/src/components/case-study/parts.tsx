import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { Label } from '@/components/ui/Typography'
import type { Feature, FeaturesSection, FeatureStyle, Stat } from '@/content/case-studies/schema'
import { cn } from '@fluxstride/design-system/lib/cn'
import { tone } from './tone'

/*
 * Small pieces shared by several case study sections.
 */

/** Pill label: a ranking, an impact level, a risk. */
export function Tag({
  children,
  variant = 'flux',
  dark = false,
}: {
  children: ReactNode
  variant?: 'flux' | 'risk' | 'solid'
  dark?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex w-fit shrink-0 items-center rounded-full px-2.5 py-1 font-mono text-label-sm whitespace-nowrap uppercase',
        variant === 'risk' && 'bg-[#fde8e8] text-[#b42318]',
        variant === 'solid' && 'bg-flux text-white',
        variant === 'flux' &&
          (dark ? 'border border-flux-light/50 text-flux-light' : 'bg-flux-soft text-flux'),
      )}
    >
      {children}
    </span>
  )
}

/** Figures in a row under a hairline. Closes a section when it has `stats`. */
/*
 * Figures in a row, each under a heavy rule: 40px value (28px on phones) over a short label.
 * Design: "Case Study Section — Content Clusters". Three stay in a row on phones.
 */
export function StatRow({ stats, dark }: { stats: Stat[]; dark: boolean }) {
  const t = tone(dark)
  return (
    <Reveal
      as="dl"
      stagger
      className={cn(
        'grid gap-3 lg:gap-6',
        stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2 gap-y-6 lg:grid-cols-4',
      )}
    >
      {stats.map((stat) => (
        // The rule sits inside the design's 20px padding.
        <div key={stat.label} className={cn('flex flex-col gap-1.5 border-t pt-4.75', t.rule)}>
          <dt className={cn('order-2 text-xs/[1.4] lg:text-[15px]/[1.4]', t.muted)}>{stat.label}</dt>
          <dd className="order-1 text-[1.75rem]/[1] font-semibold tracking-tight lg:text-[2.5rem]/[1]">
            {stat.value}
          </dd>
          {stat.detail ? (
            <dd className={cn('order-3 font-mono text-label-sm uppercase', t.accent)}>{stat.detail}</dd>
          ) : null}
        </div>
      ))}
    </Reveal>
  )
}

/*
 * Features with an icon, three to a row on desktop.
 *   ruled  Orbit Health "06 — Built in": 20px under a hairline, 40px apart; two columns on mobile
 *   plain  Northwind "04 — The product": no rule, under a screenshot; one column on mobile
 *   cards  Halden "06 — Checkout": white cards, icon in a 44px square tinted in the client's colours
 */
export function FeatureGrid({
  features,
  dark,
  variant = 'ruled',
  tint,
  stacked = false,
}: {
  features: Feature[]
  dark: boolean
  variant?: FeatureStyle
  tint?: FeaturesSection['tint']
  /** One column on every screen, for a list beside portrait media. */
  stacked?: boolean
}) {
  const t = tone(dark)
  const columns = stacked ? '' : 'lg:grid-cols-3'

  if (variant === 'cards') {
    return (
      <Reveal as="ul" stagger className={cn('grid gap-4 lg:gap-5', columns)}>
        {features.map(({ icon: Icon, title, body }) => (
          // The border sits inside the design's 18px / 24px padding.
          <li key={title} className={cn('flex gap-4 p-4.25 lg:p-5.75', t.card)}>
            <span
              aria-hidden="true"
              className={cn(
                'flex size-11 shrink-0 items-center justify-center',
                !tint && 'bg-flux-soft text-flux',
              )}
              style={tint ? { backgroundColor: tint.background, color: tint.icon } : undefined}
            >
              <Icon className="size-5" strokeWidth={2} />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-base/[1.2] font-semibold lg:text-lg/[1.2]">{title}</h3>
              <p className={cn('text-sm/[1.5] lg:text-[15px]/[1.5]', t.muted)}>{body}</p>
            </div>
          </li>
        ))}
      </Reveal>
    )
  }

  const ruled = variant === 'ruled'
  return (
    <Reveal
      as="ul"
      stagger
      className={cn('grid gap-5 lg:gap-10', ruled && !stacked && 'max-lg:grid-cols-2', columns)}
    >
      {features.map(({ icon: Icon, title, body }) => (
        <li key={title} className={cn('flex flex-col gap-2.5', ruled && cn('border-t pt-5', t.border))}>
          <Icon aria-hidden="true" className={cn('size-6', t.accent)} strokeWidth={2} />
          <h3 className={cn('font-semibold lg:text-xl/[1.2]', ruled ? 'text-base/[1.2]' : 'text-lg/[1.2]')}>
            {title}
          </h3>
          <p className={cn(ruled ? 'text-sm/[1.5] lg:text-[15px]/[1.5]' : 'text-[15px]/[1.55]', t.muted)}>
            {body}
          </p>
        </li>
      ))}
    </Reveal>
  )
}

/** "Before / After" key for charts and bars. */
/**
 * Colour keys for a chart. `swatch` is the key's background class; `strong` sets the label
 * in the text colour instead of muted, e.g. the "After" key of a funnel.
 */
export function Legend({
  keys,
  dark,
  size = 'md',
  className,
}: {
  keys: { label: string; swatch: string; strong?: boolean }[]
  dark: boolean
  /** md: 14px keys, 11px labels (funnels). sm: 12px keys, 10px labels. xs: 10px keys, 10px labels. */
  size?: 'xs' | 'sm' | 'md'
  className?: string
}) {
  const t = tone(dark)
  return (
    <ul className={cn('flex gap-5', className)}>
      {keys.map((key) => (
        <li key={key.label} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn('shrink-0', { xs: 'size-2.5', sm: 'size-3', md: 'size-3.5' }[size], key.swatch)}
          />
          <Label
            className={cn(
              size === 'md' ? 'text-label-sm/[15px]' : 'text-[10px]/[13px]',
              key.strong ? t.text : t.muted,
            )}
          >
            {key.label}
          </Label>
        </li>
      ))}
    </ul>
  )
}

/** Where the numbers come from. */
export function Source({ children, dark }: { children: ReactNode; dark: boolean }) {
  return <Label className={dark ? 'text-stone' : 'text-stone-light'}>{children}</Label>
}

export function CheckIcon({ dark }: { dark: boolean }) {
  return (
    <Check aria-hidden="true" className={cn('mt-0.5 size-4.5 shrink-0', tone(dark).accent)} strokeWidth={2} />
  )
}

/** Five dots, `value` of them filled. */
export function Rating({ value, dark }: { value: number; dark: boolean }) {
  const t = tone(dark)
  return (
    <span className="inline-flex gap-1.25">
      <span className="sr-only">{value} out of 5</span>
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          aria-hidden="true"
          className={cn('size-2.5 rounded-full', dot <= value ? t.accentBg : t.quiet)}
        />
      ))}
    </span>
  )
}
