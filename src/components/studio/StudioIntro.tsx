import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { Picture } from '@/components/ui/Picture'
import { Accent, Eyebrow } from '@/components/ui/Typography'

/*
 * Design: Studio / Page Header + Studio Image.
 *
 * Desktop: 96px top, 72px under the statement. 96px statement on two lines ending in
 * a dash, then the 108px serif line. A 600px studio photo with a mono caption.
 * Mobile: 40px statement, the dash moves to the start of the 44px serif line; the
 * photo is 300px tall.
 */
export function StudioIntro() {
  return (
    <>
      <header className="container-page flex flex-col gap-5 pt-14 pb-10 lg:gap-7 lg:pt-24 lg:pb-18">
        <Reveal on="mount">
          <Eyebrow>(Studio) About Fluxstride</Eyebrow>
        </Reveal>
        <RevealText as="h1" on="mount" delay={0.1} stagger={0.035} className="text-statement text-ink">
          A senior studio for <br className="max-lg:hidden" />
          software &amp; design<span className="max-lg:hidden"> —</span>
          <br />
          <Accent className="text-[1.1em] lg:text-[1.125em]">
            <span className="mr-[0.25em] lg:hidden">—</span>and every decision in between.
          </Accent>
        </RevealText>
      </header>

      <div className="container-page">
        <ImageReveal
          className="aspect-[35/30] lg:aspect-auto lg:h-150"
          image={
            <Picture
              name="studio/monday-planning"
              alt="Five people reviewing printed wireframes and laptops around a long table in a bright studio"
              sizes="(min-width: 90rem) 1280px, 100vw"
              priority
              className="size-full"
            />
          }
        >
          <p className="absolute bottom-6 left-6 rounded-xs bg-paper px-3 py-2 font-mono text-label-sm/[1.2] text-ink uppercase">
            The studio — Monday planning
          </p>
        </ImageReveal>
      </div>
    </>
  )
}
