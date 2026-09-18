import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { buttonClass } from '@/components/ui/button-styles'
import { consentCopy, cookieCategories } from '@/content/consent'
import { acceptAll, closeCookieSettings, rejectAll, saveConsent, type ConsentChoices } from '@/lib/consent'
import { cn } from '@fluxstride/design-system/lib/cn'
import { AlwaysOn, Toggle } from './Toggle'

/*
 * Design: "Cookie Consent — Settings" (desktop modal, mobile sheet).
 *
 * Desktop: 640px white dialog, 12vh from the top over an ink/60 scrim, 4px corners,
 *          0 24 64 ink/40 shadow. Head 28/32/20/32 padding (mono 11 flux eyebrow, 28px
 *          title, 40px round close). Rows have 16px vertical padding and hairlines between;
 *          17px name, 15px stone summary. Footer on paper: Reject left, Accept and Save right.
 * Mobile:  sheet from 120px below the top with 16px top corners and a grabber. 24px title,
 *          36px close, 16px names, 14px summaries. Save full width above Reject and Accept.
 *
 * A native <dialog> opened with showModal(): focus stays inside, Escape closes it and the
 * page behind is inert. Toggles start from the visitor's saved choices and are all off
 * for a first visit (consent must be opted into, never pre-ticked).
 */
export function CookieSettings({ initial }: { initial: ConsentChoices }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [choices, setChoices] = useState(initial)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.showModal()
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
    }
  }, [])

  const outline = buttonClass({ variant: 'outline', size: 'dialog' })

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cookie-settings-title"
      aria-describedby="cookie-settings-intro"
      // Escape fires "cancel"; let the store close it so state and DOM stay in step.
      onCancel={(event) => {
        event.preventDefault()
        closeCookieSettings()
      }}
      // A click that lands on the dialog element itself is a click on the scrim.
      onClick={(event) => event.target === event.currentTarget && closeCookieSettings()}
      className={cn(
        'fixed m-0 flex max-h-none w-full max-w-none flex-col overflow-hidden bg-white p-0 text-ink backdrop:bg-ink/60 print:hidden',
        'top-auto bottom-0 h-[calc(100dvh-7.5rem)] rounded-t-2xl',
        'lg:inset-x-0 lg:top-[12vh] lg:bottom-auto lg:mx-auto lg:h-auto lg:max-h-[calc(100dvh-12vh-2rem)] lg:w-160 lg:rounded-sm lg:shadow-[0_24px_64px_rgb(10_15_30/0.4)]',
        'transition-[translate,opacity] duration-500 ease-out-expo starting:translate-y-6 starting:opacity-0',
      )}
    >
      <span aria-hidden="true" className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-xs bg-line lg:hidden" />

      <div className="flex shrink-0 items-center gap-4 px-5 pt-4 pb-2 lg:items-start lg:px-8 lg:pt-7 lg:pb-5">
        <div className="flex flex-1 flex-col gap-1 lg:gap-1.5">
          <p className="font-mono text-[0.625rem]/[1.3] text-flux uppercase lg:text-[0.6875rem]/[0.9375rem]">
            {consentCopy.settings.eyebrow}
          </p>
          <h2 id="cookie-settings-title" className="text-2xl/[1.2] font-semibold lg:text-[1.75rem]/[1.2]">
            {consentCopy.settings.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={closeCookieSettings}
          aria-label="Close cookie settings"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line transition-colors hover:border-ink lg:size-10"
        >
          <X aria-hidden="true" className="size-4 lg:size-4.5" strokeWidth={2} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 lg:px-8 lg:pb-2">
        <p id="cookie-settings-intro" className="text-sm/[1.5] text-stone lg:mb-2 lg:text-[0.9375rem]/[1.55]">
          <span className="lg:hidden">{consentCopy.settings.bodyShort}</span>
          <span className="max-lg:hidden">{consentCopy.settings.body}</span>
        </p>
        <ul>
          {cookieCategories.map((category) => {
            const titleId = `cookie-settings-${category.id}`
            return (
              <li
                key={category.id}
                className="flex items-center gap-4 border-b border-line pt-4 pb-3.75 last:border-b-0 last:pb-4 lg:pb-4"
              >
                <div className="flex flex-1 flex-col gap-1">
                  <h3 id={titleId} className="text-base/[1.2] font-semibold lg:text-[1.0625rem]/[1.2]">
                    {category.name}
                  </h3>
                  <p
                    id={`${titleId}-summary`}
                    className="text-sm/[1.45] text-stone lg:text-[0.9375rem]/[1.45]"
                  >
                    {category.summary}
                  </p>
                </div>
                {category.id === 'necessary' ? (
                  <AlwaysOn />
                ) : (
                  <Toggle
                    checked={choices[category.id]}
                    onChange={(checked) => setChoices((current) => ({ ...current, [category.id]: checked }))}
                    labelledBy={titleId}
                    describedBy={`${titleId}-summary`}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-2.5 border-t border-line bg-paper px-5 pt-3.75 pb-7 lg:flex lg:items-center lg:px-8 lg:pt-4.75 lg:pb-5">
        <button type="button" onClick={rejectAll} className={cn(outline, 'justify-center lg:mr-auto')}>
          Reject all
        </button>
        <button type="button" onClick={acceptAll} className={cn(outline, 'justify-center')}>
          Accept all
        </button>
        <button
          type="button"
          onClick={() => saveConsent(choices)}
          className={cn(buttonClass({ size: 'dialog' }), '-order-1 col-span-2 justify-center lg:order-none')}
        >
          Save preferences
        </button>
      </div>
    </dialog>
  )
}
