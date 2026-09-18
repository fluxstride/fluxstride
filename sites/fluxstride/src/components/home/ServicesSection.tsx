import { Minus, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { useId, useState } from 'react'
import { Collapse } from '@fluxstride/design-system/motion/Collapse'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { ArrowIcon } from '@fluxstride/design-system/ui/ArrowIcon'
import { IconCircle } from '@fluxstride/design-system/ui/IconCircle'
import { Section, SectionHeader } from '@/components/ui/Section'
import { SmartLink } from '@/components/ui/SmartLink'
import { serviceHref, services, type Service } from '@/content/services'
import { cn } from '@fluxstride/design-system/lib/cn'
import { pad } from '@/lib/format'
import { EASE_OUT } from '@fluxstride/design-system/lib/motion'

/*
 * Design: Home / Services (desktop grid) and Home Mobile / Services (accordion).
 *
 * Desktop: 3×2 grid of 380px cards on hairlines, in Design → Build → Run order. One card is drawn "highlighted"
 * (ink fill, solid icon, flux arrow). Here that highlight follows the pointer and
 * keyboard focus, gliding between cards, and rests on the first card.
 *
 * Mobile: a ruled list. The open row turns ink and shows its description; the
 * first row starts open, as drawn.
 */
export function ServicesSection() {
  return (
    <Section
      id="services"
      labelledBy="services-title"
      padding="py-16 lg:py-section"
      className="flex flex-col gap-8 lg:gap-18"
    >
      <SectionHeader
        eyebrow="(02) What we do"
        title="Six services. One team that ships."
        titleId="services-title"
        titleClassName="max-lg:text-[2.375rem] lg:max-w-195"
        introClassName="max-lg:hidden"
        intro="From a single website to a full platform. Design, engineering and infrastructure share one roadmap, one channel and one definition of done."
      />
      <ServiceGrid />
      <ServiceAccordion />
    </Section>
  )
}

/* ------------------------------------------------------------------ desktop */

function ServiceGrid() {
  const [active, setActive] = useState(services[0].slug)

  return (
    <Reveal
      as="ul"
      stagger={0.05}
      y={32}
      className="grid grid-cols-3 border-t border-l border-line max-lg:hidden"
    >
      {services.map((service, index) => (
        <li key={service.slug} className="relative min-h-95 border-r border-b border-line">
          <ServiceCard
            service={service}
            index={index}
            active={active === service.slug}
            onActivate={() => setActive(service.slug)}
          />
        </li>
      ))}
    </Reveal>
  )
}

function ServiceCard({
  service,
  index,
  active,
  onActivate,
}: {
  service: Service
  index: number
  active: boolean
  onActivate: () => void
}) {
  const colour = 'transition-colors duration-500 ease-out-expo'

  return (
    <SmartLink
      to={serviceHref(service.slug)}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      className="group relative isolate flex h-full flex-col justify-between gap-8 p-9 focus-visible:outline-offset-[-4px]"
    >
      {active ? (
        <motion.span
          layoutId="service-highlight"
          aria-hidden="true"
          transition={{ duration: 0.55, ease: EASE_OUT }}
          // -1px so the ink also covers this card's own hairlines, as in the design.
          className="absolute -inset-px -z-10 bg-ink"
        />
      ) : null}

      <div className="flex flex-col gap-7">
        <div className="flex items-start justify-between">
          <IconCircle icon={service.icon} size="lg" tone={active ? 'solid' : 'soft'} />
          <span className={cn('font-mono text-label', colour, active ? 'text-stone-light' : 'text-stone')}>
            {pad(index + 1)}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className={cn('text-title-md', colour, active ? 'text-paper' : 'text-ink')}>{service.title}</h3>
          <p className={cn('text-body', colour, active ? 'text-stone-light' : 'text-stone')}>
            {service.summary}
          </p>
        </div>
      </div>

      <div
        className={cn(
          'flex items-center justify-between gap-4 border-t pt-4.5',
          colour,
          active ? 'border-line-dark' : 'border-line',
        )}
      >
        <Tags tags={service.tags} className={cn(colour, active ? 'text-stone-light' : 'text-stone')} />
        <ArrowIcon direction="up-right" size={18} className={cn(colour, active ? 'text-flux' : 'text-ink')} />
      </div>
    </SmartLink>
  )
}

/** "WEB APPS · APIS · CLOUD". Upper-cased in CSS, except brand spellings such as "iOS". */
function Tags({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <p className={cn('font-mono text-label-sm', className)}>
      {tags.map((tag, index) => (
        <span key={tag}>
          {index > 0 ? ' · ' : null}
          <span className={/^[a-z]+[A-Z]/.test(tag) ? undefined : 'uppercase'}>{tag}</span>
        </span>
      ))}
    </p>
  )
}

/* ------------------------------------------------------------------- mobile */

function ServiceAccordion() {
  const [open, setOpen] = useState<string | null>(services[0].slug)

  return (
    <Reveal as="ul" stagger={0.04} y={16} className="border-b border-ink lg:hidden">
      {services.map((service) => (
        <AccordionRow
          key={service.slug}
          service={service}
          open={open === service.slug}
          onToggle={() => setOpen((current) => (current === service.slug ? null : service.slug))}
        />
      ))}
    </Reveal>
  )
}

function AccordionRow({
  service,
  open,
  onToggle,
}: {
  service: Service
  open: boolean
  onToggle: () => void
}) {
  const panelId = useId()
  const Toggle = open ? Minus : Plus

  return (
    <li
      className={cn(
        'border-t border-ink transition-[background-color,padding] duration-500 ease-out-expo',
        open ? 'bg-ink px-3.5 text-paper' : 'px-0 text-ink',
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            'flex w-full items-center gap-3.5 pt-4.25 text-left transition-[padding] duration-500 ease-out-expo',
            // Design: 18px padding around each row, strokes drawn inside, so 17px + the 1px top border.
            // Open rows leave 14px between head and description.
            open ? 'pb-3.5' : 'pb-4.5',
          )}
        >
          <IconCircle icon={service.icon} size="sm" tone={open ? 'solid' : 'soft'} />
          <span className="flex-1 text-lg leading-[1.2] font-medium">{service.title}</span>
          <Toggle aria-hidden="true" size={18} strokeWidth={2} />
        </button>
      </h3>
      <Collapse open={open} id={panelId} label={service.title}>
        <p className="pb-4.5 text-body leading-normal text-stone-light">{service.summary}</p>
      </Collapse>
    </li>
  )
}
