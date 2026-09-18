import { Fragment } from 'react'
import { Link, useLocation } from 'react-router'
import { StandaloneScreen } from '@/components/layout/StandaloneScreen'
import { ButtonLink } from '@/components/ui/Button'
import { Accent } from '@/components/ui/Typography'
import { useSeo } from '@/lib/useSeo'

const footLinks = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

/* Design: page-404-light. The layout is shared with the maintenance screen. */
export function NotFound() {
  const { pathname } = useLocation()
  useSeo(pathname)

  return (
    <StandaloneScreen
      tag="Error 404"
      title={
        <>
          This page took <br />
          <Accent>a wrong turn.</Accent>
        </>
      }
      intro="The link may be broken or the page may have moved. Let's get you back on track."
      actions={
        <>
          <ButtonLink to="/" className="px-5.5 py-4">
            Back to home
          </ButtonLink>
          <ButtonLink to="/work" variant="outline" arrow={null} className="px-4.75 py-3.75">
            View our work
          </ButtonLink>
        </>
      }
      foot={
        <nav aria-label="Popular pages">
          {footLinks.map((link, i) => (
            <Fragment key={link.to}>
              {i > 0 ? ' · ' : null}
              <Link to={link.to} className="transition-colors hover:text-ink">
                {link.label}
              </Link>
            </Fragment>
          ))}
        </nav>
      }
    />
  )
}
