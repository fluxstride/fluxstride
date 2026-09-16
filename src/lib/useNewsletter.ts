import { useState, type FormEvent } from 'react'
import { subscribe } from './newsletter'

export type NewsletterStatus = 'idle' | 'sending' | 'done' | 'error'

/** State and submit handler shared by every newsletter sign-up form (footer, Insights). */
export function useNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<NewsletterStatus>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    try {
      const result = await subscribe(email)
      setStatus(result === 'subscribed' ? 'done' : 'idle')
    } catch {
      setStatus('error')
    }
  }

  return { email, setEmail, status, onSubmit }
}

export const newsletterMessages: Partial<Record<NewsletterStatus, string>> = {
  done: 'Subscribed. See you next month.',
  error: 'That did not work. Try again?',
}
