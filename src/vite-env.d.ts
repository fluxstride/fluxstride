/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** POST endpoint that accepts { email } for The Stride newsletter. Unset: sign-up opens an email. */
  readonly VITE_NEWSLETTER_ENDPOINT?: string
  /** POST endpoint that accepts the Contact form as multipart form data. Unset: the brief opens as an email. */
  readonly VITE_BRIEF_ENDPOINT?: string
  /** Booking page for "Book a 20-min intro call". Unset: the link opens an email. */
  readonly VITE_INTRO_CALL_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
