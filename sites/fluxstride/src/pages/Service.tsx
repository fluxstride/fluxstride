import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { PhaseList } from '@/components/process/PhaseList'
import { Faq } from '@/components/process/Faq'
import { CtaBand } from '@/components/sections/CtaBand'
import { DetailHeader } from '@/components/sections/DetailHeader'
import { ValueGrid } from '@/components/sections/ValueGrid'
import { ServiceIndex } from '@/components/services/ServiceIndex'
import { Accent, Eyebrow } from '@fluxstride/design-system/ui/Typography'
import { CaseCard } from '@/components/work/CaseCard'
import { contactHref } from '@/content/brief'
import { findCaseStudy } from '@/content/case-studies'
import { groupLabels, service as findService, serviceHref, services, type Service } from '@/content/services'
import { caseStudies } from '@/content/work'
import { pad } from '@/lib/format'

/** Case studies shown under "Selected work". */
const WORK_LIMIT = 2

/** The service's curated studies first, then any other project tagged with it. */
function selectedWork(service: Service) {
  const tagged = caseStudies.filter((study) => study.disciplines.includes(service.slug))
  const curated = (service.work ?? []).flatMap((slug) => tagged.filter((study) => study.slug === slug))
  return [...curated, ...tagged.filter((study) => !curated.includes(study))].slice(0, WORK_LIMIT)
}

/*
 * Design: Fluxstride Service · Website Design & Frontend Development (desktop 1440, mobile 390).
 * One layout for every service; the words live in content/services.ts.
 *
 *   Header           breadcrumbs, "(Service 03 / 06) Build", headline, intro and button beside
 *                    six facts (the role page header)
 *   What's included  the Studio values grid (ink), with each item's description
 *   How it works     the Process phases with only "You get"; 64px under the heading (32px mobile)
 *   Selected work    up to two case studies tagged with the service (hidden when there are none)
 *   FAQ              the Process FAQ with this service's questions, under a hairline
 *   Other services   the Services page index: the other five, then "All services"
 *   CTA band
 */
export function ServicePage({ service }: { service: Service }) {
  const index = services.indexOf(service)
  const work = selectedWork(service)

  return (
    <>
      <DetailHeader
        back={{ to: '/services', label: 'All services' }}
        trail={`Services / ${service.title}`}
        eyebrow={`(Service ${pad(index + 1)} / ${pad(services.length)}) ${groupLabels[service.group]}`}
        heading={service.headline}
        intro={service.description}
        action={{ to: contactHref([service.need]), label: 'Discuss your project' }}
        facts={[
          ['Timeline', service.timeline],
          ['Investment', service.investment],
          ['Typical team', service.team],
          ['Stack', service.tools.slice(0, 3).join(' · ')],
          ['You keep', service.handover],
          ['Pairs with', service.pairsWith.map((slug) => findService(slug).shortTitle).join(' · ')],
        ]}
      />

      <ValueGrid
        titleId="included-title"
        title={
          <>
            What’s <Accent className="max-lg:text-[0.925em]">included.</Accent>
          </>
        }
        items={service.included}
      />

      <section
        aria-labelledby="how-title"
        className="container-page flex flex-col gap-8 pt-18 lg:gap-16 lg:pt-32"
      >
        <RevealText id="how-title" className="text-heading-xl text-ink">
          How it <Accent className="max-lg:text-[0.925em]">works.</Accent>
        </RevealText>
        <PhaseList
          titleAs="h3"
          className="pb-18 lg:pb-32"
          steps={service.process.map((phase, i) => ({
            number: pad(i + 1),
            duration: phase.duration,
            title: phase.name,
            description: phase.description,
            outcomes: phase.outcomes,
          }))}
        />
      </section>

      {work.length ? (
        <section
          aria-labelledby="work-title"
          className="container-page flex flex-col gap-8 pb-18 lg:gap-16 lg:pb-32"
        >
          <RevealText id="work-title" className="text-heading-xl text-ink">
            Selected <Accent className="max-lg:text-[0.925em]">work.</Accent>
          </RevealText>
          <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-x-6">
            {work.map((study) => (
              <CaseCard
                key={study.slug}
                study={study}
                link={Boolean(findCaseStudy(study.slug))}
                metaClassName="gap-0"
                surface="light"
                imageClassName="aspect-[35/24] lg:aspect-auto lg:h-120"
                sizes="(min-width: 64rem) 50vw, 100vw"
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="border-t border-line">
        <Faq items={service.faqs} />
      </div>

      <nav aria-labelledby="other-services-title" className="border-t border-line">
        <div className="container-page flex flex-col gap-5 py-14 lg:gap-7 lg:pt-24 lg:pb-32">
          <Eyebrow as="h2" id="other-services-title">
            Other services
          </Eyebrow>
          <ServiceIndex
            arrow="right"
            items={[
              ...services
                .map((other, i) => ({ href: serviceHref(other.slug), index: pad(i + 1), title: other.title }))
                .filter((item) => item.href !== serviceHref(service.slug)),
              { href: '/services', index: '·', title: 'All services', accent: true },
            ]}
          />
        </div>
      </nav>

      <CtaBand />
    </>
  )
}
