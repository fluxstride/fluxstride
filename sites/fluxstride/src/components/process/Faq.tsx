import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { RichText } from '@/components/legal/RichText'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { Eyebrow } from '@fluxstride/design-system/ui/Typography'
import { faqs as processFaqs } from '@/content/process'
import { EMAIL_NEW_BUSINESS, mailto } from '@/content/site'
import { cn } from '@fluxstride/design-system/lib/cn'
import { EASE_OUT } from '@fluxstride/design-system/lib/motion'

/*
 * Design: Process / FAQ. 128px padding; a 400px heading column 80px left of the questions.
 * Each question sits under an ink rule with 28px padding: 22/500 question, 20px toggle
 * (flux minus when open, ink plus when closed), 16px stone answer up to 640px wide.
 * Mobile: heading above the list, 72px padding, 20px questions.
 *
 * Also on each service page with that service's questions. Answers accept inline links.
 * The answers are also published as FAQPage structured data (lib/seo.ts), from the same list.
 */
export function Faq({ items = processFaqs }: { items?: { question: string; answer: string }[] }) {
  // The first question starts open, as drawn. Any number can be open at once.
  const [open, setOpen] = useState<number[]>([0])

  const toggle = (index: number) =>
    setOpen((current) => (current.includes(index) ? current.filter((i) => i !== index) : [...current, index]))

  return (
    <section
      aria-labelledby="faq-title"
      className="container-page flex flex-col gap-8 py-18 lg:flex-row lg:gap-20 lg:py-32"
    >
      <div className="flex flex-col gap-5 lg:w-100 lg:shrink-0">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
        </Reveal>
        <RevealText id="faq-title" className="text-heading-lg text-ink">
          Good to know.
        </RevealText>
        <Reveal as="p" delay={0.15} className="text-base/[1.5] text-stone">
          Can’t find your answer? Email{' '}
          <a
            href={mailto(EMAIL_NEW_BUSINESS)}
            className="underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            {EMAIL_NEW_BUSINESS}
          </a>{' '}
          — a real person replies within one working day.
        </Reveal>
      </div>

      <Reveal as="ul" stagger={0.06} className="flex-1 border-b border-ink">
        {items.map((faq, index) => (
          <Question
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            open={open.includes(index)}
            onToggle={() => toggle(index)}
          />
        ))}
      </Reveal>
    </section>
  )
}

function Question({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  const panelId = useId()
  const Toggle = open ? Minus : Plus

  return (
    <li className="border-t border-ink">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          // 28px padding with the rule drawn inside: 27px + the 1px border. Open, the answer
          // follows 16px below the question instead.
          className={cn(
            'group flex w-full items-center justify-between gap-4 pt-6.75 text-left transition-[padding] duration-500 ease-out-expo',
            open ? 'pb-4' : 'pb-7',
          )}
        >
          <span className="text-value leading-[1.2] text-ink transition-colors group-hover:text-flux">
            {question}
          </span>
          <Toggle
            aria-hidden="true"
            size={20}
            strokeWidth={2}
            className={cn('shrink-0 transition-colors', open ? 'text-flux' : 'text-ink')}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="answer"
            id={panelId}
            role="region"
            aria-label={question}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="max-w-160 pb-7 text-base/[1.55] text-stone">
              <RichText text={answer} linkClassName="hover:text-ink" />
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  )
}
