import { BriefForm } from '@/components/contact/BriefForm'
import { ContactIntro } from '@/components/contact/ContactIntro'

/*
 * Design: Fluxstride — Contact (desktop 1440, mobile 390).
 *
 *   Main   96px top, 128px bottom (56 / 72 mobile). The 480px intro column sits 96px left
 *          of the brief form; mobile stacks them 48px apart.
 *
 * No CTA band: the form is the call to action, so the footer follows directly.
 */
export function Contact() {
  return (
    <div className="container-page flex flex-col gap-12 pt-14 pb-18 lg:flex-row lg:items-start lg:gap-24 lg:pt-24 lg:pb-32">
      <ContactIntro />
      <section id="brief" aria-label="Project brief" className="flex flex-1 scroll-mt-24 flex-col">
        <BriefForm />
      </section>
    </div>
  )
}
