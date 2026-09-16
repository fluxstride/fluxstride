/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** POST endpoint that accepts { email } for The Stride newsletter. Unset: sign-up opens an email. */
  readonly VITE_NEWSLETTER_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
