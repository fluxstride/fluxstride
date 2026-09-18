import { ButtonAnchor } from '@fluxstride/design-system/ui/Button'
import { PERSON } from '@/content/site'
import { samButton } from '@/lib/external'
import { Accent, Eyebrow, FluxDot } from './ui'

export function NotFound() {
  return (
    <main className="container-page flex min-h-svh flex-col justify-center gap-8 py-18">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="text-sam-title">
        Nothing lives <Accent className="text-sam-title-accent">here</Accent>
        <FluxDot on="mount" delay={0.3} />
      </h1>
      <p className="max-w-110 text-body-lg text-stone">
        The page you asked for doesn&apos;t exist. Everything {PERSON.firstName} has made is on the home page.
      </p>
      <ButtonAnchor href="/" size="inline" className={`${samButton} self-start`}>
        Back to the home page
      </ButtonAnchor>
    </main>
  )
}
