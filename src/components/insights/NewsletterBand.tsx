import { AnimatePresence, motion } from 'motion/react'
import { useId } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { RevealText } from '@/components/motion/RevealText'
import { Button } from '@/components/ui/Button'
import { Accent, Eyebrow } from '@/components/ui/Typography'
import { EASE_OUT } from '@/lib/motion'
import { newsletterMessages, useNewsletter } from '@/lib/useNewsletter'

/*
 * Design: Insights / Newsletter (ink). 112px padding (56px mobile). "Get The Stride." on
 * the left, a 520px form bottom-right: outlined email field and a flux "Subscribe" button,
 * 12px apart. Mobile stacks the heading above the full-width form, 28px apart.
 */
export function NewsletterBand() {
  const { email, setEmail, status, onSubmit } = useNewsletter()
  const inputId = useId()
  const message = newsletterMessages[status]

  return (
    <section aria-labelledby="stride-newsletter-title" className="bg-ink text-paper">
      <div className="container-page flex flex-col gap-7 py-14 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:py-28">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Eyebrow onDark>Newsletter — monthly, no spam</Eyebrow>
          </Reveal>
          <RevealText id="stride-newsletter-title" className="text-heading-2xl">
            Get <Accent className="text-[1.135em] lg:text-[1.111em]">The Stride.</Accent>
          </RevealText>
        </div>

        <Reveal delay={0.15} className="relative lg:w-130 lg:shrink-0">
          <form
            onSubmit={onSubmit}
            aria-labelledby="stride-newsletter-title"
            className="flex items-center gap-3"
          >
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <input
              id={inputId}
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              // 18×20 padding with the border drawn inside, matching the button's height.
              className="min-w-0 flex-1 rounded-xs border border-line-dark bg-transparent px-4.75 py-4.25 text-base/[1.2] text-paper transition-colors placeholder:text-stone-light hover:border-stone focus:border-paper focus:outline-none"
            />
            <Button type="submit" surface="dark" arrow={null} disabled={status === 'sending'}>
              Subscribe
            </Button>
          </form>
          <AnimatePresence>
            {message ? (
              <motion.p
                role="status"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="absolute top-full pt-3 font-mono text-label-sm text-stone-light uppercase"
              >
                {message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
