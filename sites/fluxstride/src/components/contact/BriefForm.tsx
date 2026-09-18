import { Paperclip, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Children, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { Button } from '@fluxstride/design-system/ui/Button'
import { Chip } from '@fluxstride/design-system/ui/Chip'
import {
  briefFromSearch,
  budgets,
  needs,
  timelines,
  type BudgetId,
  type NeedId,
  type TimelineId,
} from '@/content/brief'
import { EMAIL_NEW_BUSINESS, mailto } from '@/content/site'
import { MAX_ATTACHMENT_BYTES, sendBrief } from '@/lib/brief'
import { cn } from '@fluxstride/design-system/lib/cn'
import { EASE_OUT } from '@fluxstride/design-system/lib/motion'

type Status = 'idle' | 'sending' | 'sent' | 'mail-client' | 'error'

const fieldClass =
  'w-full border-b border-line bg-transparent pt-3 pb-2.75 text-body-lg/[1.2] text-ink transition-colors placeholder:text-stone-light hover:border-stone focus:border-ink focus:outline-none'

/*
 * Design: Contact / Form. White card, 1px line border, 4px corners, 48px padding (24px
 * mobile), 36px between groups. Text fields sit in pairs 32px apart (stacked 24px apart on
 * mobile); chip groups have a mono label 12px above (8px mobile); the submit row sits on
 * a hairline 28px below the attachment.
 *
 * Links built with contactHref() (Home's brief builder, "Discuss this" on Services) arrive
 * with ?need=…&budget=… and those chips start ticked. The mockup's ticked chips are only
 * illustrative, so otherwise nothing is preselected.
 */
export function BriefForm() {
  const ids = {
    name: useId(),
    email: useId(),
    company: useId(),
    website: useId(),
    needs: useId(),
    budget: useId(),
    timeline: useId(),
    message: useId(),
    attachment: useId(),
  }
  const { search } = useLocation()
  const [selectedNeeds, setSelectedNeeds] = useState<NeedId[]>([])
  const [budget, setBudget] = useState<BudgetId | null>(null)
  const [timeline, setTimeline] = useState<TimelineId | null>(null)
  const [attachment, setAttachment] = useState<File | null>(null)
  const [attachmentError, setAttachmentError] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const fileRef = useRef<HTMLInputElement>(null)

  // Applied after hydration: the prerendered page has no query string, so reading it
  // during render would make the server and client markup disagree.
  useEffect(() => {
    const preset = briefFromSearch(search)
    /* eslint-disable react-hooks/set-state-in-effect -- syncing from the URL once it is known */
    if (preset.needs.length) setSelectedNeeds(preset.needs)
    if (preset.budget) setBudget(preset.budget)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [search])

  const toggleNeed = (id: NeedId) =>
    setSelectedNeeds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )

  const chooseFile = (file: File | undefined) => {
    if (file && file.size > MAX_ATTACHMENT_BYTES) {
      setAttachment(null)
      setAttachmentError(`${file.name} is over 20MB. Send a link in the message instead.`)
      if (fileRef.current) fileRef.current.value = ''
      return
    }
    setAttachmentError('')
    setAttachment(file ?? null)
  }

  const removeFile = () => {
    chooseFile(undefined)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const text = (name: string) => String(form.get(name) ?? '').trim()
    setStatus('sending')
    try {
      const result = await sendBrief({
        name: text('name'),
        email: text('email'),
        company: text('company'),
        website: text('website'),
        needs: selectedNeeds,
        budget,
        timeline,
        message: text('message'),
        attachment,
      })
      setStatus(result)
    } catch {
      setStatus('error')
    }
  }

  return (
    <Reveal
      delay={0.2}
      on="mount"
      className="relative flex-1 rounded-sm border border-line bg-white p-5.75 lg:p-11.75"
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex flex-col items-start gap-4 py-10"
          >
            <p className="font-mono text-label text-flux uppercase">Brief received</p>
            <p className="text-heading-sm text-ink">Thank you. We&apos;ll reply within one working day.</p>
            <p className="text-body-lg text-stone">A senior member of the team will read it first.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onSubmit={onSubmit}
            aria-labelledby="brief-title"
            className="flex flex-col gap-9"
          >
            <h2
              id="brief-title"
              className="text-[clamp(1.4375rem,1.3214rem+0.4762vw,1.75rem)]/[1.2] font-semibold text-ink"
            >
              Project brief
            </h2>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <Field id={ids.name} label="Your name">
                <input
                  id={ids.name}
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={fieldClass}
                />
              </Field>
              <Field id={ids.email} label="Email">
                <input
                  id={ids.email}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jane@company.com"
                  className={fieldClass}
                />
              </Field>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <Field id={ids.company} label="Company">
                <input
                  id={ids.company}
                  name="company"
                  autoComplete="organization"
                  placeholder="Company Ltd"
                  className={fieldClass}
                />
              </Field>
              <Field id={ids.website} label="Website">
                <input
                  id={ids.website}
                  name="website"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="company.com"
                  className={fieldClass}
                />
              </Field>
            </div>

            <ChipGroup id={ids.needs} label="What do you need?" rows={[4]}>
              {needs.map((need) => (
                <Chip
                  key={need.id}
                  surface="light"
                  size="sm"
                  selected={selectedNeeds.includes(need.id)}
                  onToggle={() => toggleNeed(need.id)}
                >
                  {need.label}
                </Chip>
              ))}
            </ChipGroup>

            <ChipGroup id={ids.budget} label="Budget">
              {budgets.map((option) => (
                <Chip
                  key={option.id}
                  surface="light"
                  size="sm"
                  selected={budget === option.id}
                  onToggle={() => setBudget(budget === option.id ? null : option.id)}
                >
                  {option.label}
                </Chip>
              ))}
            </ChipGroup>

            <ChipGroup id={ids.timeline} label="Timeline">
              {timelines.map((option) => (
                <Chip
                  key={option.id}
                  surface="light"
                  size="sm"
                  selected={timeline === option.id}
                  onToggle={() => setTimeline(timeline === option.id ? null : option.id)}
                >
                  {option.label}
                </Chip>
              ))}
            </ChipGroup>

            <Field id={ids.message} label="Tell us about the project">
              <textarea
                id={ids.message}
                name="message"
                placeholder="What are you building, who is it for, and what does success look like?"
                className={cn(fieldClass, 'h-30 resize-none')}
              />
            </Field>

            <div className="flex flex-col items-start gap-2">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <input
                  ref={fileRef}
                  id={ids.attachment}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) => chooseFile(event.target.files?.[0])}
                  className="peer sr-only"
                />
                <Paperclip aria-hidden="true" size={16} strokeWidth={2} className="text-stone" />
                {attachment ? (
                  <>
                    <span className="max-w-60 truncate text-[15px]/[1.2] font-medium text-ink">
                      {attachment.name}
                    </span>
                    <button
                      type="button"
                      onClick={removeFile}
                      aria-label={`Remove ${attachment.name}`}
                      className="-m-1 p-1 text-stone transition-colors hover:text-ink"
                    >
                      <X size={14} strokeWidth={2} />
                    </button>
                  </>
                ) : (
                  <label
                    htmlFor={ids.attachment}
                    className="cursor-pointer text-[15px]/[1.2] font-medium text-ink underline-offset-4 peer-focus-visible:underline hover:underline"
                  >
                    <span className="lg:hidden">Attach a brief (PDF, DOCX)</span>
                    <span className="max-lg:hidden">Attach a brief or RFP</span>
                  </label>
                )}
                <span className="text-sm/[1.2] text-stone max-lg:hidden">PDF, DOCX — up to 20MB</span>
              </div>
              {attachmentError ? (
                <p role="alert" className="text-sm/[1.2] text-flux">
                  {attachmentError}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-5 border-t border-line pt-6.75 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <p className="text-[13px]/[1.5] text-stone lg:w-75">
                We&apos;ll only use your details to reply to this enquiry. See our{' '}
                <Link to="/privacy" className="underline underline-offset-4 transition-colors hover:text-ink">
                  privacy policy
                </Link>
                .
              </p>
              <Button
                type="submit"
                disabled={status === 'sending'}
                className="gap-3 px-7 py-5 text-body-lg/[1.2] max-lg:w-full max-lg:justify-center"
              >
                {status === 'sending' ? 'Sending…' : 'Send project brief'}
              </Button>
            </div>

            <StatusMessage status={status} />
          </motion.form>
        )}
      </AnimatePresence>
    </Reveal>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="font-mono text-label-sm/[1.2] text-stone uppercase">
        {label}
      </label>
      {children}
    </div>
  )
}

/**
 * Chips wrap freely on mobile. On desktop they sit in the design's fixed rows (`rows` lists
 * how many chips go on each row before the last), so ticking one never reflows the rest.
 */
function ChipGroup({
  id,
  label,
  rows = [],
  children,
}: {
  id: string
  label: string
  rows?: number[]
  children: ReactNode
}) {
  const chips = Children.toArray(children)
  const lines: ReactNode[][] = []
  let offset = 0
  for (const size of rows) {
    lines.push(chips.slice(offset, offset + size))
    offset += size
  }
  lines.push(chips.slice(offset))

  return (
    <div className="flex flex-col gap-2 lg:gap-3">
      <p id={id} className="font-mono text-label-sm/[1.2] text-stone uppercase">
        {label}
      </p>
      <div role="group" aria-labelledby={id} className="flex flex-wrap gap-2 lg:flex-col lg:gap-3">
        {lines.map((line, i) => (
          // display: contents on mobile, so the chips wrap as one list there.
          <div key={i} className="contents lg:flex lg:gap-2">
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}

const messages: Partial<Record<Status, ReactNode>> = {
  'mail-client': (
    <>
      Your email app should have opened with the brief filled in. Send it from there
      {' — '}and attach your file if you chose one.
    </>
  ),
  error: (
    <>
      That did not send. Try again, or email{' '}
      <a href={mailto(EMAIL_NEW_BUSINESS)} className="underline underline-offset-4">
        {EMAIL_NEW_BUSINESS}
      </a>
      .
    </>
  ),
}

function StatusMessage({ status }: { status: Status }) {
  const message = messages[status]
  return (
    // Stays mounted (sr-only when empty, which also keeps it out of the flex gap) so updates are announced.
    <div role="status" className={message ? '-mt-5' : 'sr-only'}>
      {message ? <p className="text-sm/[1.5] text-stone">{message}</p> : null}
    </div>
  )
}
