import { ArrowUp } from 'lucide-react'
import type { ReactNode } from 'react'
import { textLinkUnderline } from '@fluxstride/design-system/lib/link-styles'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { ArrowIcon } from '@fluxstride/design-system/ui/ArrowIcon'
import { UnderlineOnHover } from '@fluxstride/design-system/ui/UnderlineOnHover'
import { NAV, PERSON, SOCIALS, STUDIO } from '@/content/site'
import { cn } from '@/lib/cn'
import { external } from '@/lib/external'
import { FluxDot } from './ui'

const label = 'font-mono text-[0.625rem] text-stone-light uppercase lg:text-label-sm'

/*
 * Motion: link columns rise in; each link underlines itself on hover the way the
 * studio's footer does. The wordmark rises word by word and its full stop drops in
 * last. "Back to top" nudges its arrow up.
 */

function FooterLink({ href, children, newTab }: { href: string; children: ReactNode; newTab?: boolean }) {
  return (
    <li className="flex">
      <a
        href={href}
        {...(newTab ? external : {})}
        className="group inline-flex text-[0.9375rem] transition-colors duration-300 hover:text-flux-light lg:text-base"
      >
        <UnderlineOnHover>{children}</UnderlineOnHover>
      </a>
    </li>
  )
}

export function Footer() {
  const elsewhere = [
    ...SOCIALS.map(({ label: text, href }) => ({ text, href })),
    { text: 'Résumé (PDF)', href: PERSON.resume },
  ]

  return (
    <footer className="overflow-x-clip bg-ink text-paper">
      <div className="container-page flex flex-col gap-10 pt-14 pb-8 lg:gap-18 lg:pt-18 lg:pb-10">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <Reveal stagger={0.08} className="flex flex-col gap-2.5 md:max-w-105 lg:gap-3">
            <p className={label}>Also running</p>
            <p className="text-[0.9375rem]/[1.5] lg:text-[1.0625rem]/[1.5]">
              {STUDIO.name} — the design & engineering studio I founded, for projects that need a full team.
            </p>
            <a
              href={STUDIO.url}
              {...external}
              className={cn(
                'group relative inline-flex items-center gap-1.5 self-start pb-1 text-[0.9375rem] font-semibold',
                textLinkUnderline,
              )}
            >
              {STUDIO.host}
              <ArrowIcon direction="up-right" size={16} className="text-flux-light" />
            </a>
          </Reveal>

          <Reveal stagger={0.1} className="grid grid-cols-2 gap-6 md:flex md:gap-16 lg:gap-24">
            <nav aria-label="Footer" className="flex flex-col gap-2.5 lg:gap-3">
              <p className={label}>Index</p>
              <ul className="flex flex-col gap-2.5 lg:gap-3">
                {NAV.map((item) => (
                  <FooterLink key={item.id} href={`#${item.id}`}>
                    {item.label}
                  </FooterLink>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-2.5 lg:gap-3">
              <p className={label}>Elsewhere</p>
              <ul className="flex flex-col gap-2.5 lg:gap-3">
                {elsewhere.map((link) => (
                  <FooterLink key={link.text} href={link.href} newTab>
                    {link.text}
                  </FooterLink>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Decorative: the name is already in the nav and the copyright line. */}
        <div
          aria-hidden="true"
          className="flex flex-col min-[90rem]:flex-row min-[90rem]:items-end min-[90rem]:gap-9"
        >
          <RevealText as="span" className="text-sam-wordmark">
            {PERSON.firstName}
          </RevealText>
          <RevealText
            as="span"
            delay={0.12}
            className="font-serif text-sam-wordmark-accent font-normal whitespace-nowrap italic"
          >
            {PERSON.lastName}
            <FluxDot delay={0.7} className="size-[0.19em]" />
          </RevealText>
        </div>

        <div className={`flex justify-between gap-4 border-t border-line-dark pt-5 lg:pt-6 ${label}`}>
          <p>
            © {new Date().getFullYear()} {PERSON.name}{' '}
            <span className="max-lg:hidden">— Designed & built by me</span>
          </p>
          <p className="max-lg:hidden">Lagos · Worldwide</p>
          <a href="#top" className="group inline-flex items-center gap-1 transition-colors hover:text-paper">
            Back to top
            <ArrowUp
              aria-hidden="true"
              size={12}
              strokeWidth={2}
              className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
