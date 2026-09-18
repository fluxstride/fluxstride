import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Typography'
import { contactLink, EMAIL_NEW_BUSINESS, mailto, type NavLink } from '@/content/site'

type CtaBandProps = {
  eyebrow?: string
  title?: string
  action?: NavLink
  email?: string
}

/*
 * Design: Component / CTA Band, closing every inner page except Contact.
 *
 * Desktop: ink, 120px vertical padding. Eyebrow and 88px headline on the left;
 * the large primary button with the email line under it, right-aligned and
 * sitting on the headline's baseline.
 *
 * Mobile: 72px padding, everything stacked 28px apart, the button full width.
 *
 * Careers swaps the words: "Don’t see your role?" with the careers email.
 */
export function CtaBand({
  eyebrow = 'Start a project',
  title = 'Ready when you are.',
  action = contactLink,
  email = EMAIL_NEW_BUSINESS,
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-band-title" className="bg-ink text-paper">
      <div className="container-page flex flex-col gap-7 py-18 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:py-30">
        <div className="flex flex-col gap-7 lg:gap-5">
          <Reveal>
            <Eyebrow onDark className="max-lg:text-label-sm">
              {eyebrow}
            </Eyebrow>
          </Reveal>
          <RevealText id="cta-band-title" className="text-heading-3xl">
            {title}
          </RevealText>
        </div>

        <Reveal stagger={0.1} className="flex flex-col gap-7 lg:shrink-0 lg:items-end lg:gap-5">
          <ButtonLink to={action.to} surface="dark" className="lg:hidden" block>
            {action.label}
          </ButtonLink>
          <ButtonLink to={action.to} surface="dark" size="lg" className="max-lg:hidden">
            {action.label}
          </ButtonLink>
          <p className="text-base/[1.2] font-medium text-stone-light lg:text-lg/[1.2]">
            or email{' '}
            <a
              href={mailto(email)}
              className="underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              {email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
