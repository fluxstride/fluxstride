import { useId } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { DetailHeader } from '@/components/sections/DetailHeader'
import { ArrowIcon } from '@fluxstride/design-system/ui/ArrowIcon'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@fluxstride/design-system/ui/Typography'
import { applyHref, roles, type Role } from '@/content/careers'
import { EMAIL_CAREERS, mailto } from '@/content/site'

/* Design: Careers · Job Description, header. See DetailHeader. */
export function RoleHeader({ role }: { role: Role }) {
  return (
    <DetailHeader
      back={{ to: '/careers', label: 'All roles' }}
      trail={`Careers / ${role.title}`}
      eyebrow={`(Careers) ${role.team} · Open role`}
      heading={role.heading}
      intro={role.summary}
      action={{ to: applyHref(role), label: 'Apply for this role' }}
      facts={role.facts}
    />
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
