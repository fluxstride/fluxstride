import { Link } from 'react-router'
import { buttonClass } from '@/components/ui/button-styles'
import { consentCopy } from '@/content/consent'
import { acceptAll, openCookieSettings, rejectAll } from '@/lib/consent'
import { cn } from '@/lib/cn'

/*
 * Design: "Cookie Consent — Banner" (desktop and mobile).
 *
 * Desktop: 600px ink card, 40px from the bottom-right corner, 28px padding, 20px gaps,
 *          4px corners, white/12 hairline, 0 16 48 ink/25 shadow. Accept (flux), Reject
 *          (line-dark outline) and Customise (text) on one row, "Cookie policy" pushed right.
 * Mobile:  full-width ink sheet with 16px top corners and a grabber, 24/20/28 padding,
 *          16px gaps. Accept full width; Reject and Customise share the row below.
 *
 * It doesn't block the page: nothing optional runs until a choice is made, so there is
 * no need to force one. Rendered before the page in the DOM so keyboard users reach it first.
 */
export function CookieBanner() {
  const outline = cn(buttonClass({ variant: 'outline', size: 'dialog', surface: 'dark' }), 'border-line-dark')

  return (
    <section
      aria-labelledby="cookie-banner-title"
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex flex-col gap-4 rounded-t-2xl bg-ink px-5 pt-6 pb-7 text-paper print:hidden',
        'lg:inset-x-auto lg:right-10 lg:bottom-10 lg:w-150 lg:gap-5 lg:rounded-sm lg:border lg:border-white/12 lg:p-6.75 lg:shadow-[0_16px_48px_rgb(10_15_30/0.25)]',
        'transition-[translate,opacity] duration-700 ease-out-expo starting:translate-y-6 starting:opacity-0',
      )}
    >
      <span aria-hidden="true" className="mx-auto h-1 w-10 rounded-xs bg-line-dark lg:hidden" />

      <div className="flex items-center gap-2.5 lg:gap-3">
        <span aria-hidden="true" className="size-5 shrink-0 shape-mark bg-flux lg:size-5.5" />
        <h2 id="cookie-banner-title" className="text-lg/[1.2] font-semibold lg:text-xl/[1.2]">
          {consentCopy.banner.title}
        </h2>
      </div>

      <p className="text-[0.9375rem]/[1.5] text-stone-light lg:leading-[1.55]">
        <span className="lg:hidden">{consentCopy.banner.bodyShort}</span>
        <span className="max-lg:hidden">{consentCopy.banner.body}</span>
      </p>

      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
        <button
          type="button"
          onClick={acceptAll}
          className={cn(buttonClass({ size: 'dialog', surface: 'dark' }), 'justify-center max-lg:w-full')}
        >
          Accept all
        </button>
        <div className="flex gap-2.5 lg:contents">
          <button
            type="button"
            onClick={rejectAll}
            className={cn(outline, 'flex-1 justify-center lg:flex-none')}
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={openCookieSettings}
            className={cn(
              outline,
              'flex-1 justify-center lg:flex-none lg:border-transparent lg:px-1.75 lg:before:hidden lg:hover:text-flux-light',
            )}
          >
            Customise
          </button>
        </div>
        <Link
          to="/cookies"
          className="text-sm/[1.2] text-stone-light underline-offset-4 transition-colors hover:text-paper hover:underline max-lg:hidden lg:ml-auto"
        >
          Cookie policy
        </Link>
      </div>
    </section>
  )
}
