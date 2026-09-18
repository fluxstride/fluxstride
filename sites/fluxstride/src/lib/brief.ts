import { budgets, needs, timelines, type BudgetId, type NeedId, type TimelineId } from '@/content/brief'
import { EMAIL_NEW_BUSINESS, mailto } from '@/content/site'

/**
 * Sends the Contact page's project brief.
 *
 * TODO before launch: set VITE_BRIEF_ENDPOINT to a form backend (Formspree, a Worker,
 * the CRM…) that accepts multipart form data, so the attachment travels with it.
 * Until then the brief opens as a pre-filled email instead of pretending to succeed.
 */
const endpoint = import.meta.env.VITE_BRIEF_ENDPOINT

export type Brief = {
  name: string
  email: string
  company: string
  website: string
  needs: NeedId[]
  budget: BudgetId | null
  timeline: TimelineId | null
  message: string
  attachment: File | null
}

export type SendResult = 'sent' | 'mail-client'

/** Largest attachment the form accepts, in bytes. */
export const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024

const labelOf = <T extends { id: string; label: string }>(options: readonly T[], id: string | null) =>
  options.find((option) => option.id === id)?.label ?? ''

export async function sendBrief(brief: Brief): Promise<SendResult> {
  const fields = {
    name: brief.name,
    email: brief.email,
    company: brief.company,
    website: brief.website,
    needs: brief.needs.map((id) => labelOf(needs, id)).join(', '),
    budget: labelOf(budgets, brief.budget),
    timeline: labelOf(timelines, brief.timeline),
    message: brief.message,
  }

  if (!endpoint) {
    const body = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      fields.company && `Company: ${fields.company}`,
      fields.website && `Website: ${fields.website}`,
      fields.needs && `Needs: ${fields.needs}`,
      fields.budget && `Budget: ${fields.budget}`,
      fields.timeline && `Timeline: ${fields.timeline}`,
      fields.message && `\n${fields.message}`,
      brief.attachment && `\n(Attaching ${brief.attachment.name})`,
    ]
      .filter(Boolean)
      .join('\n')
    const subject = `Project brief${fields.company ? `: ${fields.company}` : ''}`
    window.location.href = `${mailto(EMAIL_NEW_BUSINESS, subject)}&body=${encodeURIComponent(body)}`
    return 'mail-client'
  }

  const data = new FormData()
  for (const [key, value] of Object.entries(fields)) data.append(key, value)
  if (brief.attachment) data.append('attachment', brief.attachment)

  const response = await fetch(endpoint, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error(`Brief failed to send (${response.status})`)
  return 'sent'
}
