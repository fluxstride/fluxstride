import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { ArrowIcon } from '@/components/ui/ArrowIcon'
import { TextLink } from '@/components/ui/TextLink'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import { roles } from '@/content/careers'
import { EMAIL_CAREERS, mailto } from '@/content/site'

/*
 * Design: Studio / Careers (paper-2). 112px padding (56px mobile). A 420px column with
 * "Join the stride." 80px left of the open roles. Each role sits under an ink rule with
 * 28px padding: 26/500 title (20px mobile), mono team (140px) and terms (180px), arrow.
 * Mobile stacks each role's details 8px apart.
 *
 * Each role links to its page at /careers/<slug>. On the Studio page a "View careers" link
 * under the intro leads to /careers, which opens with the same list as "Open roles."
 */
export function CareersSection({ page = 'studio' }: { page?: 'studio' | 'careers' }) {
  const studio = page === 'studio'
  const intro: ReactNode = studio ? (
    <>
      Remote-first, four-day focus weeks, and a small team where your work ships. Don’t see your role? Write
      to{' '}
      <a
        href={mailto(EMAIL_CAREERS)}
        className="underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
      >
        {EMAIL_CAREERS}
      </a>
      .
    </>
  ) : (
    `${roles.length === 1 ? 'One role' : `${numberWord(roles.length)} roles`} open now. Each has its own page with the full description, salary and how we hire.`
  )

  return (
    <section
      id={studio ? 'careers' : 'open-roles'}
      aria-labelledby="careers-title"
      className="scroll-mt-20 bg-paper-2"
    >
      <div className="container-page flex flex-col gap-8 py-14 lg:flex-row lg:gap-20 lg:py-28">
        <div className="flex flex-col gap-5 lg:w-105 lg:shrink-0">
          <Reveal>
            <Eyebrow>{studio ? 'Careers' : 'Open roles'}</Eyebrow>
          </Reveal>
          <RevealText id="careers-title" className="text-heading-lg text-ink">
            {studio ? 'Join the' : 'Open'} <br />
            <Accent className="text-[1.143em]">{studio ? 'stride.' : 'roles.'}</Accent>
          </RevealText>
          <Reveal as="p" delay={0.15} className="text-base/[1.5] text-stone">
            {intro}
          </Reveal>
          {studio ? (
            <Reveal delay={0.2} className="mt-1">
              <TextLink to="/careers" size="sm" className="text-ink">
                View careers
              </TextLink>
            </Reveal>
          ) : null}
        </div>

        <Reveal as="ul" stagger={0.08} className="flex-1 border-b border-ink">
          {roles.map((role) => (
            <li key={role.slug} className="border-t border-ink">
              <Link
                to={`/careers/${role.slug}`}
                className="group flex flex-col gap-2 pt-6.75 pb-7 lg:flex-row lg:items-center lg:gap-6"
              >
                <span className="flex-1 text-[clamp(1.25rem,1.1107rem+0.5714vw,1.625rem)] leading-[1.2] font-medium text-ink transition-colors group-hover:text-flux">
                  {role.title}
                </span>
                <span className="font-mono text-label/[1.2] text-stone uppercase lg:w-35">{role.team}</span>
                <span className="font-mono text-label/[1.2] text-stone uppercase lg:w-45">{role.terms}</span>
                <ArrowIcon direction="right" size={20} className="text-ink" />
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

const words = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
const numberWord = (count: number) => words[count] ?? String(count)
