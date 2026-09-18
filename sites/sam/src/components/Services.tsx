import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { EASE_OUT } from '@fluxstride/design-system/lib/motion'
import { Collapse } from '@fluxstride/design-system/motion/Collapse'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { ArrowIcon } from '@fluxstride/design-system/ui/ArrowIcon'
import { SERVICES, SERVICES_INTRO, STUDIO } from '@/content/site'
import { cn } from '@/lib/cn'
import { external } from '@/lib/external'
import { Eyebrow, SectionTitle } from './ui'

type Service = (typeof SERVICES)[number]

const pad = (index: number) => String(index + 1).padStart(2, '0')
// Every colour change runs on the same curve as the gliding highlight, so text and
// background arrive together instead of the text snapping ahead.
const colour = 'transition-colors duration-500 ease-out-expo'

/*
 * Desktop: a ruled list. One ink highlight follows the pointer (and keyboard focus),
 * gliding from row to row rather than each row flashing on and off, and fades away
 * when the pointer leaves the list. Tags join the row at 1440, where they fit.
 *
 * Mobile: an accordion. The open row turns ink and its summary folds open.
 */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-16 bg-paper-2 py-18 lg:scroll-mt-24 lg:py-30"
    >
      <div className="container-page flex flex-col gap-8 lg:gap-16">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Eyebrow>(03) Services</Eyebrow>
            </Reveal>
            <SectionTitle id="services-title" plain="How I can" accent="help." />
          </div>
          <Reveal
            as="p"
            delay={0.2}
            className="text-[0.9375rem]/[1.5] text-stone lg:max-w-90 lg:text-[1.0625rem]/[1.5]"
          >
            {SERVICES_INTRO}
          </Reveal>
        </header>

        <ServiceList />
        <ServiceAccordion />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ desktop */

function ServiceList() {
  const [active, setActive] = useState<number | null>(null)

  return (
    // Leaving the whole list (not each row) clears the highlight, so moving between rows glides.
    <div onPointerLeave={() => setActive(null)} className="max-lg:hidden">
      <Reveal as="ol" stagger={0.06} y={24} className="border-t border-ink">
        {SERVICES.map((service, index) => (
          <li key={service.slug} className="border-b border-line">
            <ServiceRow
              service={service}
              index={index}
              active={active === index}
              onActivate={() => setActive(index)}
              onDeactivate={() => setActive(null)}
            />
          </li>
        ))}
      </Reveal>
    </div>
  )
}

function ServiceRow({
  service,
  index,
  active,
  onActivate,
  onDeactivate,
}: {
  service: Service
  index: number
  active: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  return (
    <a
      href={`${STUDIO.url}/services/${service.slug}`}
      {...external}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      className="group relative isolate grid grid-cols-[2.5rem_minmax(0,1fr)_17rem_3rem] items-center gap-8 px-6 py-8 focus-visible:-outline-offset-4 min-[90rem]:grid-cols-[2.5rem_minmax(0,1fr)_18rem_13rem_3rem]"
    >
      <AnimatePresence>
        {active ? (
          <motion.span
            layoutId="service-highlight"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="absolute inset-0 -z-10 rounded bg-ink"
          />
        ) : null}
      </AnimatePresence>

      <span className={cn('font-mono text-[0.8125rem]', colour, active ? 'text-flux-light' : 'text-stone')}>
        {pad(index)}
      </span>
      <span
        className={cn(
          'text-sam-service transition-[color,translate] duration-500 ease-out-expo',
          active ? 'translate-x-2 text-paper' : 'text-ink',
        )}
      >
        {service.name}
      </span>
      <span className={cn('text-base/[1.5]', colour, active ? 'text-stone-light' : 'text-stone')}>
        {service.summary}
      </span>
      <span
        className={cn(
          'font-mono text-label-sm uppercase max-[90rem]:hidden',
          colour,
          active ? 'text-stone-light' : 'text-stone',
        )}
      >
        {service.tags}
      </span>
      <span
        className={cn(
          'relative flex size-12 items-center justify-center rounded-full border',
          colour,
          active ? 'border-flux bg-flux text-white' : 'border-line text-ink',
        )}
      >
        {/* The plus turns away as the arrow arrives. */}
        <Plus
          size={20}
          strokeWidth={1.75}
          aria-hidden="true"
          className={cn(
            'absolute transition-[rotate,opacity,scale] duration-500 ease-out-expo',
            active ? 'scale-50 rotate-90 opacity-0' : 'opacity-100',
          )}
        />
        <span
          className={cn(
            'transition-[opacity,scale] duration-500 ease-out-expo',
            active ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
          )}
        >
          <ArrowIcon direction="up-right" size={20} strokeWidth={1.75} />
        </span>
      </span>
      <span className="sr-only">(how Fluxstride does it, opens in a new tab)</span>
    </a>
  )
}

/* ------------------------------------------------------------------- mobile */

function ServiceAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Reveal as="ol" stagger={0.05} y={16} className="border-t border-ink lg:hidden">
      {SERVICES.map((service, index) => (
        <AccordionRow
          key={service.slug}
          service={service}
          index={index}
          open={open === index}
          onToggle={() => setOpen((current) => (current === index ? null : index))}
        />
      ))}
    </Reveal>
  )
}

function AccordionRow({
  service,
  index,
  open,
  onToggle,
}: {
  service: Service
  index: number
  open: boolean
  onToggle: () => void
}) {
  const panelId = useId()

  return (
    <li
      className={cn(
        'rounded border-b border-line transition-[background-color,color] duration-500 ease-out-expo',
        open ? 'bg-ink text-paper' : 'text-ink',
      )}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center gap-3 px-4 py-5.5 text-left"
        >
          <span className={cn('font-mono text-label-sm', colour, open ? 'text-flux-light' : 'text-stone')}>
            {pad(index)}
          </span>
          <span className="flex-1 text-sam-service">{service.name}</span>
          <span className="relative size-4.5" aria-hidden="true">
            <Plus
              size={18}
              className={cn(
                'absolute inset-0 transition-[rotate,opacity] duration-500 ease-out-expo',
                open ? 'rotate-90 opacity-0' : 'opacity-100',
              )}
            />
            <Minus
              size={18}
              className={cn(
                'absolute inset-0 transition-[rotate,opacity] duration-500 ease-out-expo',
                open ? 'opacity-100' : '-rotate-90 opacity-0',
              )}
            />
          </span>
        </button>
      </h3>
      <Collapse open={open} id={panelId} label={service.name} className="px-4 pb-5.5">
        <p className="text-[0.9375rem]/[1.5] text-stone-light">{service.summary}</p>
        <p className="mt-3 font-mono text-[0.625rem] text-stone-light uppercase">{service.tags}</p>
      </Collapse>
    </li>
  )
}
