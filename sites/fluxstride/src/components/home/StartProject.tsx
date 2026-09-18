import { useId, useState } from 'react'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { ButtonLink } from '@/components/ui/Button'
import { Chip } from '@fluxstride/design-system/ui/Chip'
import { SmartLink } from '@/components/ui/SmartLink'
import { Accent, Eyebrow } from '@fluxstride/design-system/ui/Typography'
import { briefHref, budgets, quickNeeds, type BudgetId } from '@/content/brief'
import { EMAIL_CAREERS, EMAIL_NEW_BUSINESS, mailto, STUDIO_HOURS } from '@/content/site'

/*
 * Design: Home / CTA (desktop) and Home Mobile / CTA.
 *
 * Desktop: 140px top, 120px bottom. Headline, then a quick brief builder (chips for
 * what you need and budget) beside a 400px contact column on a hairline.
 * The builder's choices are carried to the Contact form (content/brief.ts).
 *
 * Mobile: the design drops the builder and contact column, but everything is kept here
 * (by request) and stacked: chips wrap, the button goes full width, and the contact
 * details sit under a hairline instead of beside one.
 */
export function StartProject() {
  return (
    <section aria-labelledby="start-title" className="bg-ink py-16 text-paper lg:pt-35 lg:pb-30">
      <div className="container-page flex flex-col gap-7 lg:gap-18">
        <div className="@container flex flex-col gap-7">
          <Reveal>
            <Eyebrow onDark className="max-lg:text-label-sm">
              (06) Start a project
            </Eyebrow>
          </Reveal>
          {/* Desktop size also capped at 10.625cqw (136px on the 1280px canvas) so the first
              line never overflows on narrower laptops. */}
          <RevealText
            id="start-title"
            className="text-display-xl lg:text-[length:min(var(--text-display-xl),10.625cqw)]"
          >
            Got something that <br className="max-lg:hidden" />
            needs to <br className="lg:hidden" />
            <Accent className="text-[1.192em] lg:text-[1.147em]">move?</Accent>
          </RevealText>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <BriefBuilder />
          <Reveal
            as="dl"
            stagger={0.08}
            className="flex flex-col gap-6 border-t border-line-dark pt-8 lg:w-100 lg:shrink-0 lg:gap-7 lg:self-start lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
          >
            <ContactItem label="New business" value={EMAIL_NEW_BUSINESS} href={mailto(EMAIL_NEW_BUSINESS)} />
            <ContactItem label="Careers" value={EMAIL_CAREERS} href={mailto(EMAIL_CAREERS)} />
            <ContactItem label="Studio hours" value={STUDIO_HOURS} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function BriefBuilder() {
  // Starts with the selection shown in the design.
  const [selected, setSelected] = useState<string[]>(['Website', 'Mobile app'])
  // The design showed £40–100k; the nearest band on the shared scale is £50–100k.
  const [budget, setBudget] = useState<BudgetId | null>('50-100k')
  const needsId = useId()
  const budgetId = useId()

  const toggleNeed = (label: string) =>
    setSelected((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    )

  return (
    <Reveal stagger={0.1} className="flex flex-1 flex-col gap-8">
      <div className="flex flex-col gap-3.5">
        <Eyebrow as="h3" onDark id={needsId}>
          I need help with
        </Eyebrow>
        <div role="group" aria-labelledby={needsId} className="flex flex-wrap gap-2.5">
          {quickNeeds.map(({ label }) => (
            <Chip key={label} selected={selected.includes(label)} onToggle={() => toggleNeed(label)}>
              {label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <Eyebrow as="h3" onDark id={budgetId}>
          Budget
        </Eyebrow>
        <div role="group" aria-labelledby={budgetId} className="flex flex-wrap gap-2.5">
          {budgets.map(({ id, label }) => (
            <Chip
              key={id}
              selected={budget === id}
              onToggle={() => setBudget((current) => (current === id ? null : id))}
            >
              {label}
            </Chip>
          ))}
        </div>
      </div>

      {/* Mobile: full-width button with the call link centred underneath. */}
      <div className="flex flex-col items-center gap-5 pt-2 lg:flex-row lg:gap-6">
        <ButtonLink
          to={briefHref(selected, budget)}
          size="lg"
          surface="dark"
          className="max-lg:flex max-lg:w-full max-lg:justify-between max-lg:px-5"
        >
          Send brief: reply in 24h
        </ButtonLink>
        <SmartLink
          to="/contact#call"
          className="text-[15px] leading-[1.2] text-stone-light underline-offset-4 transition-colors hover:text-paper hover:underline"
        >
          or book a 20-min intro call
        </SmartLink>
      </div>
    </Reveal>
  )
}

function ContactItem({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="font-mono text-label text-stone-light uppercase">{label}</dt>
      <dd className="text-value">
        {href ? (
          <a href={href} className="transition-colors hover:text-flux-light">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}
