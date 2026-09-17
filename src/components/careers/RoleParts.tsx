import { ArrowLeft } from 'lucide-react'
import { useId } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { ArrowIcon } from '@/components/ui/ArrowIcon'
import { ButtonLink } from '@/components/ui/Button'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import { applyHref, roles, type Role } from '@/content/careers'
import { EMAIL_CAREERS, mailto } from '@/content/site'

/*
 * Design: Careers · Job Description, header.
 *   Breadcrumbs  "← All roles" left, "Studio / Careers / Role" right; as the case study hero
 *   Header       eyebrow, the title with its serif word on a second line (display-case),
 *                then the intro and Apply beside a 3×2 grid of facts (2 columns on mobile)
 */
export function RoleHeader({ role }: { role: Role }) {
  const [sans, serif] = role.heading

  return (
    <header>
      <div className="container-page flex items-center justify-between gap-4 pt-5 lg:pt-8">
        <Link
          to="/studio#careers"
          className="inline-flex shrink-0 items-center gap-2.5 text-sm/[1.2] font-medium transition-colors hover:text-flux lg:text-[15px]/[1.2]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
          All roles
        </Link>
        <Eyebrow className="truncate max-lg:text-[10px]/[1.3] lg:text-label-sm">
          Studio / Careers / {role.title}
        </Eyebrow>
      </div>

      <div className="container-page flex flex-col gap-6 pt-8 pb-12 lg:gap-12 lg:pt-14 lg:pb-18">
        <Reveal on="mount">
          <Eyebrow className="max-lg:text-[10px]/[1.6]">(Careers) {role.team} · Open role</Eyebrow>
        </Reveal>
        <RevealText as="h1" on="mount" delay={0.1} className="text-display-case text-ink">
          {sans}
          <br />
          <Accent className="leading-none lg:text-[1.107em]">{serif}</Accent>
        </RevealText>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-24">
          <Reveal
            on="mount"
            delay={0.3}
            className="flex flex-col items-start gap-6 lg:w-130 lg:shrink-0 lg:gap-8"
          >
            <p className="text-[17px]/[1.55] text-stone lg:text-[1.375rem]/[1.5] lg:text-ink">
              {role.summary}
            </p>
            <ButtonLink to={applyHref(role)} className="max-lg:w-full max-lg:justify-between">
              Apply for this role
            </ButtonLink>
          </Reveal>
          <Reveal
            as="dl"
            on="mount"
            delay={0.4}
            stagger={0.05}
            className="grid flex-1 grid-cols-2 content-start lg:grid-cols-3"
          >
            {role.facts.map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col gap-1.5 border-t border-line pt-3.25 pr-4 pb-3.5 lg:pt-4.25 lg:pb-4.5"
              >
                <dt className="font-mono text-[10px]/[1.3] text-stone uppercase lg:text-label-sm">{label}</dt>
                <dd className="text-[15px]/[1.35] font-semibold lg:text-[17px]/[1.35]">{value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </header>
  )
}

/*
 * Design: "Apply Card". The legal contact card's style: paper-2, 22px padding, 12px gaps.
 * Mono 11 label, 18px title, 14px stone terms, a full-width Apply button, then the email.
 * Desktop sidebar only; on mobile the header and "How we hire" carry the Apply buttons.
 */
export function RoleApplyCard({ role }: { role: Role }) {
  const titleId = useId()

  return (
    <aside aria-labelledby={titleId} className="flex flex-col gap-3 bg-paper-2 p-5.5">
      <p className="font-mono text-label-sm text-stone uppercase">Open role</p>
      <h2 id={titleId} className="text-lg/[1.35] font-semibold text-ink">
        {role.title}
      </h2>
      <p className="text-sm/[1.5] text-stone">{role.terms}</p>
      <ButtonLink to={applyHref(role)} size="inline" block className="mt-2">
        Apply now
      </ButtonLink>
      <p className="text-sm/[1.5] text-stone">
        Or email{' '}
        <a
          href={mailto(EMAIL_CAREERS, `Application: ${role.title}`)}
          className="font-semibold text-flux underline-offset-4 hover:underline"
        >
          {EMAIL_CAREERS}
        </a>{' '}
        with your CV or LinkedIn, and a link to work you’re proud of.
      </p>
    </aside>
  )
}

/*
 * Design: "Other Open Roles". The legal pages' Related section: hairline on top, mono 12
 * label, then white cards (32/22px padding) with a 28/22px title, arrow and mono terms.
 */
export function OtherRoles({ role }: { role: Role }) {
  const others = roles.filter((item) => item.slug !== role.slug)
  if (!others.length) return null

  return (
    <section aria-labelledby="other-roles-title" className="border-t border-line">
      <div className="container-page flex flex-col gap-5 pt-13.75 pb-14 lg:gap-7 lg:pt-23.75 lg:pb-24">
        <Eyebrow as="h2" id="other-roles-title" className="max-lg:text-label-sm">
          Other open roles
        </Eyebrow>
        <Reveal as="ul" stagger className="grid gap-4 lg:grid-cols-2">
          {others.map((item) => (
            <li key={item.slug} className="flex">
              <Link
                to={`/careers/${item.slug}`}
                className="group flex flex-1 flex-col gap-3.5 border border-line bg-white p-5.25 transition-colors duration-500 hover:border-ink lg:p-7.75"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-doc-card-lg text-ink">{item.title}</span>
                  <ArrowIcon direction="right" size={24} className="shrink-0 max-lg:hidden" />
                  <ArrowIcon direction="right" size={20} className="shrink-0 lg:hidden" />
                </span>
                <span className="font-mono text-label-sm text-stone uppercase lg:text-label">
                  {item.team} · {item.terms}
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
