import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useState } from 'react'
import { navUnderline } from '@fluxstride/design-system/lib/link-styles'
import { EASE_OUT, menuItem, menuPanel } from '@fluxstride/design-system/lib/motion'
import { useActiveSection } from '@fluxstride/design-system/lib/useActiveSection'
import { useHeaderScroll, useMenuLock } from '@fluxstride/design-system/lib/useHeaderScroll'
import { ButtonAnchor } from '@fluxstride/design-system/ui/Button'
import { MenuButton } from '@fluxstride/design-system/ui/MenuButton'
import { AVAILABILITY, NAV, PERSON, SOCIALS } from '@/content/site'
import { cn } from '@/lib/cn'
import { external, samButton } from '@/lib/external'
import { SocialIcon } from './SocialIcon'
import { Img } from './ui'

/*
 * Breakpoints: the full bar needs ~1140px of content, so the links and CTA appear at
 * xl (1280) and the availability pill joins them at 1440, where everything fits with
 * the design's gaps. Below xl the menu button takes over rather than squeezing.
 */
const DESKTOP_QUERY = '(min-width: 80rem)'
const SECTION_IDS = NAV.map((item) => item.id)
const pad = (index: number) => String(index + 1).padStart(2, '0')

/** "Open for projects" pill with a pulsing green dot. */
export function Availability({ className, onDark }: { className?: string; onDark?: boolean }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-label-sm whitespace-nowrap uppercase',
        onDark ? 'border-line-dark text-paper' : 'border-line text-ink',
        className,
      )}
    >
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#16A34A] opacity-40 motion-reduce:hidden" />
        <span className="relative size-2 rounded-full bg-[#16A34A]" />
      </span>
      {AVAILABILITY}
    </p>
  )
}

function Brand({ onDark }: { onDark: boolean }) {
  return (
    <a
      href="#top"
      className="relative z-10 flex shrink-0 items-center gap-3"
      aria-label={`${PERSON.name}, back to top`}
    >
      <Img name="portrait" alt="" sizes="36px" eager className="size-8 rounded-full object-cover xl:size-9" />
      <span className="flex flex-col gap-0.5">
        <span
          className={cn(
            'text-base/[1.2] font-semibold whitespace-nowrap transition-colors duration-500 xl:text-[1.0625rem]',
            onDark && 'text-paper',
          )}
        >
          {PERSON.name}
        </span>
        <span className="font-mono text-[0.625rem]/[1.2] text-stone uppercase max-xl:hidden">
          Designer & engineer
        </span>
      </span>
    </a>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const { hidden, scrolled } = useHeaderScroll()
  const active = useActiveSection(SECTION_IDS)
  const close = useCallback(() => setOpen(false), [])
  useMenuLock(open, close, DESKTOP_QUERY)

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className={cn(
          'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          open
            ? 'border-transparent bg-transparent'
            : scrolled
              ? 'border-line bg-paper/85 backdrop-blur-md'
              : 'border-transparent bg-paper',
        )}
      >
        <div className="container-page flex items-center justify-between gap-8 py-4 xl:py-6">
          <Brand onDark={open} />

          <nav aria-label="Sections" className="max-xl:hidden">
            <ol className="flex items-center gap-9">
              {NAV.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className="group flex items-baseline gap-1.5 text-[0.9375rem] font-medium whitespace-nowrap"
                  >
                    <span
                      className={cn(
                        'font-mono text-label-sm transition-colors duration-500',
                        active === item.id ? 'text-flux' : 'text-stone-light',
                      )}
                    >
                      {pad(index)}
                    </span>
                    <span className={cn('py-0.5', navUnderline(active === item.id))}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex items-center gap-5 max-xl:hidden">
            <Availability className="max-[90rem]:hidden" />
            <ButtonAnchor href="#contact" variant="ink" size="sm" arrow="up-right" className={samButton}>
              Let&apos;s talk
            </ButtonAnchor>
          </div>

          <MenuButton
            open={open}
            onToggle={() => setOpen((value) => !value)}
            controls="mobile-menu"
            className="xl:hidden"
          />
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={close} active={active} />
    </>
  )
}

function MobileMenu({
  open,
  onClose,
  active,
}: {
  open: boolean
  onClose: () => void
  active: string | null
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="menu"
          id="mobile-menu"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuPanel}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-gutter pt-24 pb-10 text-paper xl:hidden"
        >
          <nav aria-label="Sections" className="mx-auto w-full max-w-2xl">
            <ol className="border-t border-line-dark">
              {NAV.map((item, index) => (
                <li key={item.id} className="overflow-hidden border-b border-line-dark">
                  <motion.div variants={menuItem}>
                    <a
                      href={`#${item.id}`}
                      onClick={onClose}
                      className={cn(
                        'group flex items-baseline gap-4 py-4 text-[clamp(2rem,1.5rem+2vw,2.75rem)]/[1.1] font-semibold tracking-[-0.02em] transition-colors duration-300',
                        active === item.id ? 'text-paper' : 'text-stone-light hover:text-paper',
                      )}
                    >
                      <span className="font-mono text-label font-normal tracking-normal text-flux-light">
                        {pad(index)}
                      </span>
                      <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                        {item.label}
                      </span>
                    </a>
                  </motion.div>
                </li>
              ))}
            </ol>
          </nav>

          <motion.div
            variants={menuItem}
            className="mx-auto mt-auto flex w-full max-w-2xl flex-col gap-6 pt-10"
          >
            <ButtonAnchor
              href="#contact"
              onClick={onClose}
              block
              surface="dark"
              size="inline"
              className={samButton}
            >
              Start a project
            </ButtonAnchor>
            <div className="flex flex-col gap-2">
              <p className="font-mono text-label-sm text-stone-light uppercase">Email me</p>
              <a href={`mailto:${PERSON.email}`} className="text-lg font-semibold break-all">
                {PERSON.email}
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Availability onDark />
              <ul className="flex gap-2">
                {SOCIALS.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      {...external}
                      aria-label={social.label}
                      className="flex size-10 items-center justify-center rounded-full border border-line-dark transition-colors duration-300 hover:border-paper"
                    >
                      <SocialIcon id={social.id} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
