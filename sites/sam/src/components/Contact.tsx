import { Check, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { textLinkUnderline } from '@fluxstride/design-system/lib/link-styles'
import { EASE_OUT } from '@fluxstride/design-system/lib/motion'
import { ClipReveal } from '@fluxstride/design-system/motion/ClipReveal'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { Button } from '@fluxstride/design-system/ui/Button'
import { Chip } from '@fluxstride/design-system/ui/Chip'
import { NEEDS, PERSON, SOCIALS } from '@/content/site'
import { cn } from '@/lib/cn'
import { sendMessage } from '@/lib/contact'
import { external, samButton } from '@/lib/external'
import { SocialIcon } from './SocialIcon'
import { Accent, Eyebrow } from './ui'

type Status = 'idle' | 'sending' | 'sent' | 'mail-client' | 'error'

const statusMessage: Record<Exclude<Status, 'idle' | 'sending'>, string> = {
  sent: 'Thanks — your message is in. I will reply within a day.',
  'mail-client': 'Your email app should have opened with the message ready to send.',
  error: `That didn't send. Please email me at ${PERSON.email} instead.`,
}

const fieldLabel = 'font-mono text-[0.625rem] text-stone uppercase lg:text-label-sm'
const fieldInput =
  'w-full border-b border-ink bg-transparent pb-2.5 text-base text-ink outline-none transition-colors duration-300 placeholder:text-stone-light focus-visible:border-flux focus-visible:outline-none lg:pb-3 lg:text-[1.0625rem]'

/*
 * Motion: the headline rises word by word and the form card wipes open beside it.
 * The "I need help with" chips are the studio's: they spring to their new width as the
 * check slides in. Social pills fill with white from the bottom on hover, the email's
 * underline wipes out and redraws, and the copy icon morphs into a tick.
 *
 * Layout: pitch → form → email stacked until 1440, where the form takes its own column.
 */

function ContactForm() {
  const [needs, setNeeds] = useState<string[]>(['Website', 'Mobile app'])
  const [status, setStatus] = useState<Status>('idle')

  const toggle = (need: string) =>
    setNeeds((current) => (current.includes(need) ? current.filter((n) => n !== need) : [...current, need]))

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Keep the element: React clears event.currentTarget once the handler awaits.
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const result = await sendMessage({
        name: String(data.get('name')),
        email: String(data.get('email')),
        needs: NEEDS.filter((need) => needs.includes(need)),
        message: String(data.get('message')),
      })
      setStatus(result)
      if (result === 'sent') form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 rounded-lg bg-paper p-6 text-ink sm:p-8 lg:gap-7 lg:p-10"
    >
      <h3 className="text-xl font-semibold lg:text-2xl">Start a project</h3>

      <div className="flex flex-col gap-6 sm:flex-row">
        <label className="flex flex-1 flex-col gap-2 lg:gap-2.5">
          <span className={fieldLabel}>Your name</span>
          <input name="name" required autoComplete="name" placeholder="Jane Doe" className={fieldInput} />
        </label>
        <label className="flex flex-1 flex-col gap-2 lg:gap-2.5">
          <span className={fieldLabel}>Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={fieldInput}
          />
        </label>
      </div>

      <div role="group" aria-labelledby="needs-label" className="flex flex-col gap-3 lg:gap-4">
        <p id="needs-label" className={fieldLabel}>
          I need help with
        </p>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map((need) => (
            <Chip
              key={need}
              surface="light"
              size="sm"
              selected={needs.includes(need)}
              onToggle={() => toggle(need)}
            >
              {need}
            </Chip>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-2 lg:gap-2.5">
        <span className={fieldLabel}>Tell me about it</span>
        <textarea
          name="message"
          required
          rows={3}
          placeholder="A few lines on what you're building and when…"
          className={cn(fieldInput, 'resize-none')}
        />
      </label>

      <Button
        type="submit"
        variant="ink"
        size="inline"
        block
        disabled={status === 'sending'}
        className={cn(samButton, 'py-4.5')}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </Button>

      <div aria-live="polite" className="-mt-2 empty:hidden">
        <AnimatePresence>
          {status !== 'idle' && status !== 'sending' ? (
            <motion.p
              key={status}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="text-sm text-stone"
            >
              {statusMessage[status]}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  )
}

function EmailCopy() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(PERSON.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${PERSON.email}`
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <p className="font-mono text-[0.625rem] text-white/70 uppercase lg:text-label-sm">
        Or email me directly
      </p>
      <div className="flex items-center gap-3 self-start">
        <a
          href={`mailto:${PERSON.email}`}
          className={cn(
            'relative pb-1.5 text-lg font-semibold break-all sm:text-2xl lg:pb-2 lg:text-[2rem]/[1.2]',
            textLinkUnderline,
            'before:h-0.5 after:h-0.5',
          )}
        >
          {PERSON.email}
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Email copied' : 'Copy email address'}
          className="relative flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 hover:bg-white/15"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={copied ? 'done' : 'copy'}
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="flex"
            >
              {copied ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? 'Copied' : ''}
        </span>
      </div>
    </div>
  )
}

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-16 overflow-x-clip bg-flux py-18 text-white lg:scroll-mt-24 lg:py-30"
    >
      <div className="container-page grid gap-10 min-[90rem]:grid-cols-[1fr_35rem] min-[90rem]:grid-rows-[auto_1fr] min-[90rem]:gap-x-20 min-[90rem]:gap-y-14">
        <div className="flex flex-col gap-8 lg:gap-10">
          <Reveal>
            <Eyebrow className="text-white/70">(05) Contact</Eyebrow>
          </Reveal>
          <RevealText as="h2" id="contact-title" className="text-sam-contact">
            Got an idea?
            <br /> <Accent className="text-sam-contact-accent">Let&apos;s ship it.</Accent>
          </RevealText>
          <Reveal as="p" delay={0.3} className="text-base/[1.5] lg:max-w-115 lg:text-[1.1875rem]/[1.5]">
            Tell me what you&apos;re building. I reply to every message myself, usually within a day.
          </Reveal>
        </div>

        <ClipReveal
          delay={0.2}
          className="max-w-2xl min-[90rem]:col-start-2 min-[90rem]:row-span-2 min-[90rem]:row-start-1 min-[90rem]:max-w-none"
        >
          <ContactForm />
        </ClipReveal>

        <Reveal stagger={0.12} className="flex flex-col gap-8">
          <EmailCopy />
          <ul className="flex flex-wrap gap-2 lg:gap-2.5">
            {SOCIALS.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  {...external}
                  className={cn(
                    'group relative isolate flex items-center gap-2 overflow-hidden rounded-full border border-white/40 px-3.5 py-2.25 text-[0.8125rem] font-medium transition-[color,border-color] duration-500 ease-out-expo hover:border-white hover:text-flux lg:px-4 lg:py-2.5 lg:text-sm',
                    'before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-white before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-y-100',
                  )}
                >
                  <span className="inline-flex transition-transform duration-500 ease-out-expo group-hover:-rotate-12">
                    <SocialIcon id={social.id} />
                  </span>
                  <span className="lg:hidden">{'short' in social ? social.short : social.label}</span>
                  <span className="max-lg:hidden">{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
