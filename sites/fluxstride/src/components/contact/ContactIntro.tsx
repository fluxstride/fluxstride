import { ArrowUpRight, Briefcase, Calendar, Mail, type LucideIcon } from 'lucide-react'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { SmartLink } from '@/components/ui/SmartLink'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import { nextSteps } from '@/content/brief'
import { EMAIL_CAREERS, EMAIL_NEW_BUSINESS, INTRO_CALL_URL, mailto } from '@/content/site'
import { pad } from '@/lib/format'

type ContactDetail = { id?: string; icon: LucideIcon; label: string; value: string; href: string }

const details: ContactDetail[] = [
  { icon: Mail, label: 'New business', value: EMAIL_NEW_BUSINESS, href: mailto(EMAIL_NEW_BUSINESS) },
  // Home's "or book a 20-min intro call" links here.
  {
    id: 'call',
    icon: Calendar,
    label: 'Prefer to talk?',
    value: 'Book a 20-min intro call',
    href: INTRO_CALL_URL,
  },
  { icon: Briefcase, label: 'Careers', value: EMAIL_CAREERS, href: mailto(EMAIL_CAREERS) },
]

/*
 * Design: Contact / Left. A 480px column 96px left of the form (stacked above it on
 * mobile): heading group, contact rows between ink rules, then "What happens next".
 * 40px between the three blocks (24px mobile).
 */
export function ContactIntro() {
  return (
    <div className="flex flex-col gap-6 lg:w-120 lg:shrink-0 lg:gap-10">
      <div className="flex flex-col gap-6">
        <Reveal on="mount">
          <Eyebrow>(Contact) Start a project</Eyebrow>
        </Reveal>
        <RevealText as="h1" on="mount" className="text-display-sm">
          Let&apos;s build <br />
          <Accent className="text-[1em] lg:text-[1.125em]">something.</Accent>
        </RevealText>
        <Reveal on="mount" delay={0.3}>
          <p className="text-[clamp(1rem,0.9536rem+0.1905vw,1.125rem)] leading-[1.5] text-stone">
            Tell us a little about your project. A senior member of the team — not a salesperson — will reply
            within one working day.
          </p>
        </Reveal>
      </div>

      <Reveal as="ul" stagger={0.08} className="border-b border-ink">
        {details.map((detail) => (
          <li key={detail.label} id={detail.id} className="scroll-mt-24 border-t border-ink">
            <DetailLink detail={detail} />
          </li>
        ))}
      </Reveal>

      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow as="h2">What happens next</Eyebrow>
        </Reveal>
        <Reveal as="ol" stagger={0.08} className="flex flex-col gap-5">
          {nextSteps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="font-mono text-label/[1.2] text-flux">{pad(i + 1)}</span>
              <span className="flex flex-col gap-1">
                <span className="text-body-lg/[1.2] font-semibold text-ink">{step.title}</span>
                <span className="text-[15px]/[1.2] text-stone">{step.body}</span>
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </div>
  )
}

function DetailLink({ detail }: { detail: ContactDetail }) {
  const Icon = detail.icon
  return (
    <SmartLink to={detail.href} className="group flex items-center gap-4 pt-5.25 pb-5.5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-flux-soft text-flux transition-colors duration-300 group-hover:bg-flux group-hover:text-paper">
        <Icon aria-hidden="true" size={18} strokeWidth={2} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-mono text-label-sm/[1.2] text-stone uppercase">{detail.label}</span>
        <span className="text-[clamp(1rem,0.9304rem+0.2857vw,1.1875rem)]/[1.2] font-medium text-ink">
          {detail.value}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        size={18}
        strokeWidth={2}
        className="shrink-0 text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </SmartLink>
  )
}
