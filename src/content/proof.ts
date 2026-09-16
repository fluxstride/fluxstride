import type { ImageName } from './images.generated'

/**
 * Home "Proof, not promises": headline stats and client testimonials.
 *
 * PLACEHOLDERS: every figure, quote, name and photo here comes from the design
 * mockups. Replace with real, verifiable numbers and approved quotes before launch.
 */

export const stats = [
  { value: '140+', label: 'Websites, apps & platforms shipped' },
  { value: '£38m', label: 'Client revenue influenced in 2025' },
  { value: '4.9/5', label: 'Average client rating on Clutch' },
  { value: '72%', label: 'Clients who stay on a growth retainer' },
]

export type Testimonial = {
  quote: string
  name: string
  role: string
  avatar: ImageName
}

export const testimonials: Testimonial[] = [
  {
    quote:
      '“Fluxstride didn’t hand us a website and leave. They engineered our platform, launched in nine weeks, and have kept it fast, secure and ranking every month since.”',
    name: 'Amara Okafor',
    role: 'CMO, Northwind',
    avatar: 'people/amara-okafor',
  },
]
