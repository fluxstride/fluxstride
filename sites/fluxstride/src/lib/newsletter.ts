import { EMAIL_NEW_BUSINESS, mailto } from '@/content/site'

/**
 * Newsletter sign-up for The Stride.
 *
 * TODO before launch: choose a provider (Buttondown, ConvertKit, Mailchimp…) and
 * set VITE_NEWSLETTER_ENDPOINT to a URL that accepts a JSON POST of { email }.
 * Until then, sign-up opens a pre-filled email instead of pretending to succeed.
 */
const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT

export type SubscribeResult = 'subscribed' | 'mail-client'

export async function subscribe(email: string): Promise<SubscribeResult> {
  if (!endpoint) {
    window.location.href = mailto(EMAIL_NEW_BUSINESS, `Subscribe ${email} to The Stride`)
    return 'mail-client'
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!response.ok) throw new Error(`Newsletter sign-up failed (${response.status})`)
  return 'subscribed'
}
