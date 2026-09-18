import { PERSON } from '@/content/site'

/**
 * Sends the contact form.
 *
 * Set VITE_CONTACT_ENDPOINT to a form backend (Formspree, a Worker…) that accepts form
 * data to deliver messages directly. Without it the form opens a pre-filled email to
 * Samuel instead, so it never pretends to have sent something it didn't.
 */
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

export type ContactMessage = { name: string; email: string; needs: string[]; message: string }
export type SendResult = 'sent' | 'mail-client'

export async function sendMessage(message: ContactMessage): Promise<SendResult> {
  if (!endpoint) {
    const body = [
      `Name: ${message.name}`,
      `Email: ${message.email}`,
      message.needs.length > 0 && `Needs help with: ${message.needs.join(', ')}`,
      message.message && `\n${message.message}`,
    ]
      .filter(Boolean)
      .join('\n')
    const subject = `New project — ${message.name}`
    window.location.href = `mailto:${PERSON.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return 'mail-client'
  }

  const data = new FormData()
  data.append('name', message.name)
  data.append('email', message.email)
  data.append('needs', message.needs.join(', '))
  data.append('message', message.message)

  const response = await fetch(endpoint, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error(`Message failed to send (${response.status})`)
  return 'sent'
}
