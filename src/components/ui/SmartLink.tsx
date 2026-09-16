import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'

export type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  children: ReactNode
}

/**
 * One link component for every destination:
 *   /internal      → React Router <Link> (client-side navigation)
 *   https://…      → new tab, with rel="noopener noreferrer"
 *   #hash, mailto: → plain <a>
 */
export function SmartLink({ to, children, ...props }: SmartLinkProps) {
  if (to.startsWith('/')) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    )
  }

  const external = /^https?:\/\//.test(to)
  return (
    <a
      href={to}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}
