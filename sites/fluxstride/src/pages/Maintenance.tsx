import { StandaloneScreen } from '@/components/layout/StandaloneScreen'
import { ButtonLink } from '@/components/ui/Button'
import { Accent } from '@fluxstride/design-system/ui/Typography'
import { EMAIL_NEW_BUSINESS, mailto } from '@/content/site'
import { useSeo } from '@/lib/useSeo'

/** Shown in the foot. Change it for longer work, e.g. "Back at 14:00 UTC". */
const STATUS = 'Status: Upgrading'

/**
 * The holding page every URL shows while the site is down for maintenance.
 * Design: page-maintenance-light. Turn it on with `pnpm cf:maintenance` and off with
 * `pnpm cf:deploy`; see worker/maintenance.mjs.
 *
 * `screen="maintenance"` matters: the page is served at any URL, so main.tsx looks for
 * it to hydrate this screen instead of whatever route the address points to.
 */
export function Maintenance() {
  useSeo('/maintenance')

  return (
    <StandaloneScreen
      screen="maintenance"
      tag="Scheduled maintenance"
      title={
        <>
          Back in <br />
          <Accent>a moment.</Accent>
        </>
      }
      intro={`We're making a few improvements. The site will be back shortly — for anything urgent, email ${EMAIL_NEW_BUSINESS}.`}
      actions={
        <ButtonLink to={mailto(EMAIL_NEW_BUSINESS, 'Urgent: during maintenance')} className="px-5.5 py-4">
          Email us
        </ButtonLink>
      }
      foot={<p>{STATUS}</p>}
    />
  )
}
