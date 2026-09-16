import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { ArrowIcon } from '@/components/ui/ArrowIcon'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import { roles } from '@/content/studio'
import { EMAIL_CAREERS, mailto } from '@/content/site'

/*
 * Design: Studio / Careers (paper-2). 112px padding (56px mobile). A 420px column with
 * "Join the stride." 80px left of the open roles. Each role sits under an ink rule with
 * 28px padding: 26/500 title (20px mobile), mono team (140px) and terms (180px), arrow.
 * Mobile stacks each role's details 8px apart.
 *
 * Linked from the footer as /studio#careers.
 */
export function CareersSection() {
  return (
    <section id="careers" aria-labelledby="careers-title" className="scroll-mt-20 bg-paper-2">
      <div className="container-page flex flex-col gap-8 py-14 lg:flex-row lg:gap-20 lg:py-28">
        <div className="flex flex-col gap-5 lg:w-105 lg:shrink-0">
          <Reveal>
            <Eyebrow>Careers</Eyebrow>
          </Reveal>
          <RevealText id="careers-title" className="text-heading-lg text-ink">
            Join the <br />
            <Accent className="text-[1.143em]">stride.</Accent>
          </RevealText>
          <Reveal as="p" delay={0.15} className="text-base/[1.5] text-stone">
            Remote-first, four-day focus weeks, and a small team where your work ships. Don’t see your role?
            Write to{' '}
            <a
              href={mailto(EMAIL_CAREERS)}
              className="underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              {EMAIL_CAREERS}
            </a>
            .
          </Reveal>
        </div>

        <Reveal as="ul" stagger={0.08} className="flex-1 border-b border-ink">
          {roles.map((role) => (
            <li key={role.title} className="border-t border-ink">
              <a
                href={role.href}
                className="group flex flex-col gap-2 pt-6.75 pb-7 lg:flex-row lg:items-center lg:gap-6"
              >
                <span className="flex-1 text-[clamp(1.25rem,1.1107rem+0.5714vw,1.625rem)] leading-[1.2] font-medium text-ink transition-colors group-hover:text-flux">
                  {role.title}
                </span>
                <span className="font-mono text-label/[1.2] text-stone uppercase lg:w-35">{role.team}</span>
                <span className="font-mono text-label/[1.2] text-stone uppercase lg:w-45">{role.terms}</span>
                <ArrowIcon direction="up-right" size={20} className="text-ink" />
                <span className="sr-only">— apply by email</span>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
