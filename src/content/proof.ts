import type { ImageName } from './images.generated'

/**
 * Home "Proof, not promises": headline stats and client testimonials.
 *
 * PLACEHOLDERS: every figure, quote, name and photo here is invented for the
 * design. Replace with real, verifiable numbers and quotes clients have approved
 * before launch. Never publish these as they are.
 */

export const stats = [
  { value: '140+', label: 'Websites, apps & platforms shipped' },
  { value: '£38m', label: 'Client revenue influenced in 2025' },
  { value: '4.9/5', label: 'Average client rating on Clutch' },
  { value: '72%', label: 'Clients who stay on a growth retainer' },
]

export type Testimonial = {
  /** Include the typographic quote marks: “…” */
  quote: string
  name: string
  role: string
  /** A photo from the image manifest. Without one, the person's initials are shown. */
  avatar?: ImageName
}

export const testimonials: Testimonial[] = [
  {
    quote:
      '“Fluxstride didn’t hand us a website and leave. They engineered our platform, launched in nine weeks, and have kept it fast, secure and ranking every month since.”',
    name: 'Amara Okafor',
    role: 'CMO, Northwind',
    avatar: 'people/amara-okafor',
  },
  {
    quote:
      '“Our old shop was costing us sales. The new store paid for itself in the first quarter, and packaging, site and socials finally look like one brand.”',
    name: 'Tom Halden',
    role: 'Founder, Halden Coffee',
  },
  {
    quote:
      '“They sat in on patient interviews before drawing a single screen. That’s why people actually open the app every morning.”',
    name: 'Dr Priya Raman',
    role: 'Head of Product, Orbit Health',
  },
  {
    quote:
      '“Honest advice, even when it meant less work for them. The audit alone saved us from a six-figure replatforming we didn’t need.”',
    name: 'Marcus Lindqvist',
    role: 'CEO, Kinetic Labs',
  },
  {
    quote:
      '“Weekly demos, a live board and no surprises. Dispatch software that used to take our team hours now runs in the background.”',
    name: 'Sarah Whitfield',
    role: 'Operations Director, Atlas Freight',
  },
  {
    quote:
      '“It feels like having a senior product team in-house. Design, engineering and security reviews all move at the same pace.”',
    name: 'Daniel Mensah',
    role: 'CTO, Meridian Bank',
  },
]
