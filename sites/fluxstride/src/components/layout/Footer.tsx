import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { ArrowIcon } from '@fluxstride/design-system/ui/ArrowIcon'
import { Logo } from '@/components/ui/Logo'
import { SmartLink } from '@/components/ui/SmartLink'
import { UnderlineOnHover } from '@fluxstride/design-system/ui/UnderlineOnHover'
import { Eyebrow } from '@fluxstride/design-system/ui/Typography'
import { serviceHref, services } from '@/content/services'
import { LEGAL_NAME, socialLinks, studioLinks } from '@/content/site'
import { cn } from '@fluxstride/design-system/lib/cn'
import { openCookieSettings } from '@/lib/consent'
import { newsletterMessages, useNewsletter } from '@/lib/useNewsletter'
import { EASE_OUT } from '@fluxstride/design-system/lib/motion'

/*
 * Design (Component / Footer): ink, 80px gutters, 64px between rows.
 *   Row 1  hairline, 56px top padding: newsletter (460px) + Services / Studio / Social columns
 *   Row 2  giant lockup filling the full content width
 *   Row 3  hairline bar: copyright · legal · back to top (mono 12, stone-light)
 * Mobile (Component / Footer Mobile): single column, 40px gaps, Studio and Social side by side.
 */
export function Footer() {
  return (
    <footer className="bg-ink text-paper print:hidden">
      <div className="container-page flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-10 border-t border-line-dark pt-12 lg:flex-row lg:pt-14">
          <Newsletter />

          <FooterColumn title="Services" className="lg:flex-1">
            {services.map((service) => (
              <FooterLink key={service.slug} to={serviceHref(service.slug)}>
                {service.shortTitle}
              </FooterLink>
            ))}
          </FooterColumn>

          <div className="flex gap-6 lg:contents">
            <FooterColumn title="Studio" className="flex-1">
              {studioLinks.map((link) => (
                <FooterLink key={link.label} to={link.to}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
            <FooterColumn title="Social" className="flex-1">
              {socialLinks.map((link) => (
                <FooterLink key={link.label} to={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <GiantLockup />

        <div className="flex flex-col gap-2.5 border-t border-line-dark pt-5 pb-7 font-mono text-label-sm text-stone-light uppercase lg:flex-row lg:justify-between lg:text-label">
          {/* Mobile: Cookie settings shares the copyright row, so the legal row still fits. */}
          <div className="flex justify-between lg:contents">
            <p>
              © {new Date().getFullYear()} {LEGAL_NAME}
            </p>
            <CookieSettingsButton className="lg:hidden" />
          </div>
          <div className="flex justify-between lg:contents">
            <nav aria-label="Legal">
              <ul className="flex">
                {legalLinks.map((link, i) => (
                  <li key={link.to}>
                    {i > 0 ? (
                      <span aria-hidden="true" className="whitespace-pre">
                        {' '}
                        ·{' '}
                      </span>
                    ) : null}
                    <Link to={link.to} className="transition-colors hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="max-lg:hidden">
                  <span aria-hidden="true" className="whitespace-pre">
                    {' '}
                    ·{' '}
                  </span>
                  <CookieSettingsButton />
                </li>
              </ul>
            </nav>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Eyebrow as="h2" onDark className="max-lg:text-label-sm">
        {title}
      </Eyebrow>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <li className="flex">
      <SmartLink
        to={to}
        className="group inline-flex items-center gap-1.5 text-[15px] leading-[1.2] text-paper transition-colors hover:text-flux-light"
      >
        <UnderlineOnHover>{children}</UnderlineOnHover>
      </SmartLink>
    </li>
  )
}

function Newsletter() {
  const { email, setEmail, status, onSubmit } = useNewsletter()

  return (
    <div className="flex flex-col gap-3.5 lg:w-115 lg:shrink-0 lg:gap-4">
      <h2 id="newsletter-title" className="text-value max-lg:text-[20px]">
        The Stride — monthly notes on design &amp; engineering
      </h2>
      <form onSubmit={onSubmit} aria-labelledby="newsletter-title" className="relative">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="group flex items-center justify-between border-b border-stone py-3.5 transition-colors focus-within:border-paper">
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent text-base leading-[1.2] text-paper placeholder:text-stone-light focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            aria-label="Subscribe"
            className="group -m-2 p-2 text-paper disabled:opacity-50"
          >
            <ArrowIcon size={20} className="block" />
          </button>
        </div>
        <AnimatePresence>
          {status === 'done' || status === 'error' ? (
            <motion.p
              role="status"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="absolute top-full pt-2 font-mono text-label-sm text-stone-light uppercase"
            >
              {newsletterMessages[status]}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </form>
    </div>
  )
}

/**
 * The lockup scales with its container so it always spans the full content width,
 * as in the design (desktop: 243px wordmark across 1280px; mobile: 65px across 350px).
 */
function GiantLockup() {
  return (
    <Reveal y={40} className="@container">
      <Logo tone="paper" className="w-full text-[18.57cqw] leading-none lg:text-[18.98cqw]" />
    </Reveal>
  )
}

const legalLinks = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/cookies', label: 'Cookies' },
]

/** Withdrawing consent must be as easy as giving it, so Cookie settings is on every page. */
function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={cn('uppercase transition-colors hover:text-paper', className)}
    >
      Cookie settings
    </button>
  )
}

function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group inline-flex items-center gap-1 uppercase transition-colors hover:text-paper"
    >
      Back to top
      <ArrowUp
        aria-hidden="true"
        size={12}
        strokeWidth={2}
        className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
      />
    </button>
  )
}
