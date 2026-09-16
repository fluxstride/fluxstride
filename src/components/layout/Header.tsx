import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { ButtonLink } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { Eyebrow } from '@/components/ui/Typography'
import { AVAILABILITY, contactLink, EMAIL_NEW_BUSINESS, mailto, primaryNav } from '@/content/site'
import { cn } from '@/lib/cn'
import { EASE_OUT } from '@/lib/motion'

/*
 * Design (Component / Nav): paper background, 28×80 padding, logo left, five
 * 15/500 links (36px apart) in the middle, availability + ink CTA on the right.
 * Mobile (Component / Nav Mobile): 20px padding, 22px logo, 44px ink menu button.
 *
 * Behaviour added on top of the static design:
 *   - Sticky. Hides while scrolling down, returns when scrolling up.
 *   - Once the page has scrolled, gains a translucent paper backdrop and hairline.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(current > 8)
    // Only hide after the header has scrolled out of its own height.
    setHidden(current > previous && current > 120)
  })

  // Close the menu whenever the route changes (including back/forward), adjusting
  // state during render rather than in an effect, as React recommends.
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onBreakpoint = (event: MediaQueryListEvent) => event.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open])

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className={cn(
          'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled && !open ? 'border-line bg-paper/85 backdrop-blur-md' : 'border-transparent bg-paper',
          open && 'border-transparent bg-transparent',
        )}
      >
        <div className="container-page flex items-center justify-between py-5 lg:py-7">
          <Link
            to="/"
            aria-label="Fluxstride home"
            className={cn('relative z-10 transition-colors', open && 'text-paper')}
          >
            <Logo className="text-[22px] lg:text-[26px]" tone={open ? 'paper' : 'ink'} />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'group relative block py-1 text-[15px] leading-[1.2] font-medium text-ink',
                        'after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-ink after:transition-transform after:duration-500 after:ease-out-expo',
                        isActive
                          ? 'after:scale-x-100'
                          : 'after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <Availability />
            <ButtonLink to={contactLink.to} variant="ink" size="sm" arrow="up-right">
              {contactLink.label}
            </ButtonLink>
          </div>

          <MenuButton open={open} onToggle={() => setOpen((value) => !value)} />
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function Availability({ onDark = false }: { onDark?: boolean }) {
  return (
    <p className="flex items-center gap-2">
      <span aria-hidden="true" className="size-1.75 animate-pulse-dot rounded-full bg-flux" />
      <span className={cn('font-mono text-label-sm uppercase', onDark ? 'text-stone-light' : 'text-stone')}>
        {AVAILABILITY}
      </span>
    </p>
  )
}

function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const line = 'absolute left-0 block h-[1.5px] w-5 rounded-full bg-current'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className={cn(
        'relative z-10 flex size-11 items-center justify-center rounded-full transition-colors duration-500 lg:hidden',
        open ? 'bg-paper text-ink' : 'bg-ink text-paper',
      )}
    >
      <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      {/* Three lines (lucide "menu" at 20px) that fold into a cross */}
      <span aria-hidden="true" className="relative block h-3.5 w-5">
        <motion.span
          className={line}
          animate={open ? { top: 6.25, rotate: 45 } : { top: 0, rotate: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />
        <motion.span
          className={cn(line, 'top-[6.25px]')}
          animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className={line}
          animate={open ? { top: 6.25, rotate: -45 } : { top: 12.5, rotate: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />
      </span>
    </button>
  )
}

const menu = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.6, ease: EASE_OUT, when: 'afterChildren' },
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.7, ease: EASE_OUT, staggerChildren: 0.05, delayChildren: 0.2 },
  },
} as const

const menuItem = {
  closed: { y: '110%', transition: { duration: 0.3 } },
  open: { y: '0%', transition: { duration: 0.8, ease: EASE_OUT } },
} as const

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = [{ to: '/', label: 'Home' }, ...primaryNav, { to: '/contact', label: 'Contact' }]

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="menu"
          id="mobile-menu"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menu}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-gutter pt-28 pb-10 text-paper lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="border-t border-line-dark">
              {items.map((item, index) => (
                <li key={item.to} className="overflow-hidden border-b border-line-dark">
                  <motion.div variants={menuItem}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'flex items-baseline justify-between py-4 text-heading-lg transition-colors',
                          isActive ? 'text-paper' : 'text-stone-light hover:text-paper',
                        )
                      }
                    >
                      {item.label}
                      <span className="font-mono text-label text-stone-light">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div variants={menuItem} className="mt-auto flex flex-col gap-6 pt-10">
            <ButtonLink to={contactLink.to} block surface="dark" onClick={onClose}>
              {contactLink.label}
            </ButtonLink>
            <div className="flex flex-col gap-2">
              <Eyebrow onDark>New business</Eyebrow>
              <a href={mailto(EMAIL_NEW_BUSINESS)} className="text-value text-paper">
                {EMAIL_NEW_BUSINESS}
              </a>
            </div>
            <Availability onDark />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
