/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional form backend for the contact form. Without it the form opens a pre-filled email. */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
