import type { LegalActionId } from '@/content/legal'
import { openCookieSettings, rejectAll } from '@/lib/consent'

/** What the non-link buttons on legal pages do ("Open cookie settings", "Reject all optional"). */
export const legalActions: Record<LegalActionId, () => void> = {
  'open-cookie-settings': openCookieSettings,
  'reject-optional': rejectAll,
}
