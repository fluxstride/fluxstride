import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHeader } from '@/components/sections/PageHeader'
import { ServiceIndex } from '@/components/services/ServiceIndex'
import { IconCircle } from '@/components/ui/IconCircle'
import { TextLink } from '@/components/ui/TextLink'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import { serviceHref, services, type Service } from '@/content/services'
import { pad } from '@/lib/format'

/*
 * Design: Fluxstride — Services (desktop 1440, mobile 390).
 *
 *   Page Header      "What we do." (64px below; 40px on mobile)
 *   Jump To          3×2 index of anchor links on hairlines, 96px (56px) above the details
 *   Service Details  one ruled block per service, each linking to its own page, then the CTA band
 */
export function Services() {
  return (
    <>
      <PageHeader
        className="pb-10 lg:pb-16"
        eyebrow="(Services) Six services, one team"
        title={
          <>
            What we <br className="lg:hidden" />
            <Accent className="text-[1.017em] lg:text-[1.109em]">do.</Accent>
          </>
        }
        intro="Hire us for one service or all six. Every engagement gets senior people, a fixed scope and a shared roadmap."
      />
      <JumpTo />
      <div className="container-page pb-18 lg:pb-32">
        {services.map((service, index) => (
          <ServiceDetail key={service.slug} service={service} index={index} />
        ))}
      </div>
      <CtaBand />
    </>
  )
}

function JumpTo() {
  return (
    <nav aria-label="Jump to a service" className="container-page pb-14 lg:pb-24">
      <ServiceIndex
        onMount
        arrow="down"
        items={services.map((service, index) => ({
          href: `#${service.slug}`,
          index: pad(index + 1),
          title: service.title,
        }))}
      />
    </nav>
  )
}

/*
 * Desktop: 56px padding under an ink rule (55px, since the rule is drawn inside).
 *   Left 400px    52px icon circle + "01 / 09", 40px title
 *   Middle fills  20px description, "What's included" in two columns, tools
 *   Right 220px   timeline, investment, "View service"
 * Mobile: the three stack 24px apart with 32px padding; the checklist is one column.
 */
function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const titleId = `${service.slug}-title`

  return (
    <section
      id={service.slug}
      aria-labelledby={titleId}
      className="flex scroll-mt-24 flex-col gap-6 border-t border-ink pt-7.75 pb-8 lg:flex-row lg:gap-12 lg:pt-13.75 lg:pb-14"
    >
      <div className="flex flex-col gap-6 lg:w-100 lg:shrink-0">
        <Reveal className="flex items-center gap-4">
          <IconCircle icon={service.icon} />
          <span className="font-mono text-label text-stone">
            {pad(index + 1)} / {pad(services.length)}
          </span>
        </Reveal>
        <RevealText id={titleId} className="text-heading-sm text-ink">
          {service.title}
        </RevealText>
      </div>

      <Reveal stagger={0.08} className="flex flex-1 flex-col gap-8">
        <p className="text-lead text-ink">{service.description}</p>
        <div className="flex flex-col gap-3">
          <Eyebrow as="h3" className="text-label-sm/[1.2]">
            What’s included
          </Eyebrow>
          {/* Items come in pairs with 12px between pairs: side by side on desktop, stacked on mobile. */}
          <ul className="grid gap-x-6 lg:grid-cols-2 lg:gap-y-3 max-lg:[&>li:nth-child(2n+3)]:mt-3">
            {service.included.map(({ title }) => (
              <li key={title} className="flex items-center gap-2.5 border-b border-line pt-2.5 pb-2.25">
                <Check aria-hidden="true" size={15} strokeWidth={2} className="shrink-0 text-flux" />
                <span className="text-[15px]/[1.2] font-medium text-ink">{title}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="font-mono text-label-sm/[1.2] text-stone uppercase">
          <span className="sr-only">Tools: </span>
          {service.tools.join(' · ')}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="flex flex-col items-start gap-6 lg:w-55 lg:shrink-0">
        <dl className="flex flex-col gap-6">
          <MetaItem label="Timeline" value={service.timeline} />
          <MetaItem label="Investment" value={service.investment} />
        </dl>
        <TextLink to={serviceHref(service.slug)} size="sm" className="text-ink">
          View service<span className="sr-only">: {service.title}</span>
        </TextLink>
      </Reveal>
    </section>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="font-mono text-label-sm/[1.2] text-stone uppercase">{label}</dt>
      <dd className="text-[clamp(1.25rem,1.2036rem+0.1905vw,1.375rem)] leading-[1.2] font-medium text-ink">
        {value}
      </dd>
    </div>
  )
}
