import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Typography'
import { contactLink, EMAIL_NEW_BUSINESS, mailto } from '@/content/site'

/*
 * Design: Component / CTA Band, closing every inner page except Contact.
 *
 * Desktop: ink, 120px vertical padding. Eyebrow and 88px headline on the left;
 * the large primary button with the email line under it, right-aligned and
 * sitting on the headline's baseline.
 *
 * Mobile: 72px padding, everything stacked 28px apart, the button full width.
 */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-band-title" className="bg-ink text-paper">
      <div className="container-page flex flex-col gap-7 py-18 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:py-30">
        <div className="flex flex-col gap-7 lg:gap-5">
          <Reveal>
            <Eyebrow onDark className="max-lg:text-label-sm">
              Start a project
            </Eyebrow>
          </Reveal>
          <RevealText id="cta-band-title" className="text-heading-3xl">
            Ready when you are.
          </RevealText>
        </div>

        <Reveal stagger={0.1} className="flex flex-col gap-7 lg:shrink-0 lg:items-end lg:gap-5">
          <ButtonLink to={contactLink.to} surface="dark" className="lg:hidden" block>
            {contactLink.label}
          </ButtonLink>
          <ButtonLink to={contactLink.to} surface="dark" size="lg" className="max-lg:hidden">
            {contactLink.label}
          </ButtonLink>
          <p className="text-base/[1.2] font-medium text-stone-light lg:text-lg/[1.2]">
            or email{' '}
            <a
              href={mailto(EMAIL_NEW_BUSINESS)}
              className="underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              {EMAIL_NEW_BUSINESS}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
