import {
  CalendarDays,
  Coins,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Mail,
  Plane,
  Send,
  Sparkles,
} from 'lucide-react'
import type { LegalSection } from './legal/schema'
import { EMAIL_CAREERS, mailto } from './site'

/**
 * Open roles: the Studio page's Careers list and one page per role at /careers/<slug>.
 *
 * A role page is the role's own sections (the role, what you'll do, what you'll bring,
 * nice to have), then the sections every role shares (what we offer, how we hire). Sections
 * use the legal pages' blocks, so text accepts inline links: "[our work](/work)".
 *
 * PLACEHOLDERS: the roles, salaries, benefits and hiring steps come from the design. Replace
 * them with live vacancies before launch and remove `sample`. Sample roles never get
 * JobPosting structured data (advertising jobs that don't exist breaks Google's policy),
 * and every build lists them in a warning.
 */

export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR'

export type Role = {
  /** URL: /careers/<slug>. */
  slug: string
  title: string
  /** The h1, split where the design switches to the serif: ['Senior Full-stack', 'Engineer.']. */
  heading: [sans: string, serif: string]
  team: string
  /** The Studio list line and the apply card: "Remote · Full-time". */
  terms: string
  /** Header intro and meta description. One or two sentences. */
  summary: string
  /** Six label/value pairs under the header. */
  facts: [label: string, value: string][]
  /** For structured data. */
  employment: EmploymentType
  /** Remote roles list the countries people can work from (ISO codes); others name a city. */
  location: { remote: true; countries: string[] } | { remote: false; locality: string; country: string }
  salary?: { min: number; max: number; currency: 'GBP'; per: 'YEAR' | 'DAY' }
  /** ISO dates. */
  posted: string
  closes?: string
  sections: LegalSection[]
  /** Invented for the design. See the note at the top of the file. */
  sample?: true
}

export const applyHref = (role: Role) => mailto(EMAIL_CAREERS, `Application: ${role.title}`)

/** Shared by every role, after its own sections. */
export function sharedSections(role: Role): LegalSection[] {
  return [
    {
      title: 'What we offer',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: CalendarDays,
              title: 'Four-day focus weeks',
              body: 'Fridays are for learning, side projects or rest. Same salary.',
            },
            {
              icon: Laptop,
              title: 'Remote-first',
              body: 'Work from anywhere in the UK or Europe, with a £1,000 home office budget.',
            },
            {
              icon: GraduationCap,
              title: '£2,000 learning budget',
              body: 'Courses, books and conferences, plus time to use it.',
            },
            {
              icon: Plane,
              title: '30 days off',
              body: 'Plus bank holidays, and the studio closes between Christmas and New Year.',
            },
            {
              icon: Coins,
              title: 'Profit share',
              body: 'Ten per cent of annual profit, split across the team.',
            },
            {
              icon: HeartHandshake,
              title: 'Health & pension',
              body: 'Private health cover and a 6% matched pension from day one.',
            },
          ],
        },
      ],
    },
    {
      title: 'How we hire',
      blocks: [
        {
          type: 'paragraph',
          text: 'Four steps, usually within three weeks. We reply to every application, and we pay for any work we ask you to do.',
        },
        {
          type: 'table',
          monoFirstColumn: true,
          columns: [{ label: 'Step', width: 90 }, { label: 'Stage', width: 220 }, { label: 'What happens' }],
          rows: [
            [
              '01',
              'Intro call · 30 min',
              'A conversation with the hiring lead about you, the role and how we work.',
            ],
            [
              '02',
              'Your work · 2–3 hours',
              'A short, paid exercise, or a walkthrough of something you’ve built or designed.',
            ],
            [
              '03',
              'Team session · 90 min',
              'Work through a real problem from a past project with two people you’d work with.',
            ],
            ['04', 'Offer · within 3 days', 'A decision either way, with feedback if it isn’t a yes.'],
          ],
        },
        {
          type: 'note',
          icon: Sparkles,
          text: 'We hire for craft and care, not for a checklist. If you meet most of what we’re looking for, apply. We welcome people of every background, and we’ll make any adjustments you need to do your best in the process.',
        },
        {
          type: 'actions',
          items: [
            { label: 'Apply for this role', icon: Send, href: applyHref(role) },
            { label: `Ask a question`, icon: Mail, href: mailto(EMAIL_CAREERS, `Question: ${role.title}`) },
          ],
        },
      ],
    },
  ]
}

export const roles: Role[] = [
  {
    slug: 'senior-full-stack-engineer',
    title: 'Senior Full-stack Engineer',
    heading: ['Senior Full-stack', 'Engineer.'],
    team: 'Engineering',
    terms: 'Remote · Full-time',
    summary:
      'Build the websites, platforms and APIs our clients run their businesses on, in a small senior team that owns the work from first commit to launch.',
    facts: [
      ['Team', 'Engineering'],
      ['Location', 'Remote · UK & Europe'],
      ['Type', 'Full-time · Permanent'],
      ['Salary', '£70k–£85k + profit share'],
      ['Start', 'As soon as you can'],
      ['Reports to', 'Head of Engineering'],
    ],
    employment: 'FULL_TIME',
    location: { remote: true, countries: ['GB', 'IE', 'PT', 'ES', 'NL', 'DE'] },
    salary: { min: 70000, max: 85000, currency: 'GBP', per: 'YEAR' },
    posted: '2026-09-01',
    closes: '2026-10-31',
    sample: true,
    sections: [
      {
        title: 'The role',
        blocks: [
          {
            type: 'paragraph',
            text: 'You’ll lead the build on two or three client projects a year: web platforms, customer portals and the APIs behind them. You’ll work alongside our designers from the first workshop, so you shape what gets built as much as how.',
          },
          {
            type: 'paragraph',
            text: 'There are no project managers between you and the client. You’ll talk to their team every week, make the technical calls and see your work in production. See [our work](/work) for the kind of projects you’d join.',
          },
        ],
      },
      {
        title: 'What you’ll do',
        blocks: [
          {
            type: 'list',
            items: [
              'Design and build web apps in TypeScript, React and Next.js',
              'Build APIs, data models and integrations in Node and PostgreSQL',
              'Set up CI/CD, preview environments and monitoring on AWS or Vercel',
              'Review code, pair with other engineers and raise the bar on testing',
              'Scope work with clients and turn fuzzy goals into a plan',
            ],
          },
        ],
      },
      {
        title: 'What you’ll bring',
        blocks: [
          {
            type: 'list',
            items: [
              'Six or more years building and shipping web products',
              'Deep TypeScript and React, and confidence on the backend',
              'Good judgement on architecture, and the sense to keep it simple',
              'Clear writing and a calm way of explaining trade-offs to non-engineers',
            ],
          },
        ],
      },
      {
        title: 'Nice to have',
        blocks: [
          {
            type: 'list',
            items: [
              'React Native or mobile experience',
              'Infrastructure as code with Terraform',
              'Payments, fintech or regulated industries',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'product-designer',
    title: 'Product Designer (UI/UX)',
    heading: ['Product', 'Designer.'],
    team: 'Design',
    terms: 'Hybrid · Full-time',
    summary:
      'Turn research into interfaces people enjoy using, from first sketches to the design systems our engineers build from.',
    facts: [
      ['Team', 'Design'],
      ['Location', 'Hybrid · London'],
      ['Type', 'Full-time · Permanent'],
      ['Salary', '£55k–£70k + profit share'],
      ['Start', 'January 2027'],
      ['Reports to', 'Lead Product Designer'],
    ],
    employment: 'FULL_TIME',
    location: { remote: false, locality: 'London', country: 'GB' },
    salary: { min: 55000, max: 70000, currency: 'GBP', per: 'YEAR' },
    posted: '2026-09-01',
    closes: '2026-10-31',
    sample: true,
    sections: [
      {
        title: 'The role',
        blocks: [
          {
            type: 'paragraph',
            text: 'You’ll design websites, apps and platforms for clients from fintech to healthcare. You’ll run the research, shape the journeys and craft the interfaces, then stay with the project while engineers build it.',
          },
          {
            type: 'paragraph',
            text: 'We meet in our London studio two days a week, and work wherever suits the rest of the time.',
          },
        ],
      },
      {
        title: 'What you’ll do',
        blocks: [
          {
            type: 'list',
            items: [
              'Plan and run interviews, usability tests and workshops',
              'Map journeys and prototype flows in Figma',
              'Design polished interfaces for web and mobile',
              'Build and look after design systems that scale',
              'Work with engineers every day to get the details right in the product',
            ],
          },
        ],
      },
      {
        title: 'What you’ll bring',
        blocks: [
          {
            type: 'list',
            items: [
              'Four or more years designing digital products',
              'A portfolio that shows your process, not only the final screens',
              'Strong interaction and visual design skills',
              'Comfort presenting work and taking feedback from clients',
            ],
          },
        ],
      },
      {
        title: 'Nice to have',
        blocks: [
          {
            type: 'list',
            items: ['Motion and prototyping in ProtoPie', 'Accessibility audits', 'Some front-end code'],
          },
        ],
      },
    ],
  },
  {
    slug: 'cloud-devops-engineer',
    title: 'Cloud & DevOps Engineer',
    heading: ['Cloud & DevOps', 'Engineer.'],
    team: 'Engineering',
    terms: 'Remote · Contract',
    summary:
      'Keep our clients’ products fast, secure and online: cloud architecture, release pipelines and the support plans that follow launch.',
    facts: [
      ['Team', 'Engineering'],
      ['Location', 'Remote · UK & Europe'],
      ['Type', 'Contract · 6 months'],
      ['Day rate', '£500–£600 outside IR35'],
      ['Start', 'November 2026'],
      ['Reports to', 'Head of Engineering'],
    ],
    employment: 'CONTRACTOR',
    location: { remote: true, countries: ['GB', 'IE', 'PT', 'ES', 'NL', 'DE'] },
    salary: { min: 500, max: 600, currency: 'GBP', per: 'DAY' },
    posted: '2026-09-10',
    closes: '2026-10-15',
    sample: true,
    sections: [
      {
        title: 'The role',
        blocks: [
          {
            type: 'paragraph',
            text: 'Our care plans are growing, and we need someone to own the infrastructure behind them. You’ll look after a dozen client platforms, move a few of them to better homes and make releases boring in the best way.',
          },
          {
            type: 'paragraph',
            text: 'It’s a six-month contract to start, with a strong chance of extending or going permanent.',
          },
        ],
      },
      {
        title: 'What you’ll do',
        blocks: [
          {
            type: 'list',
            items: [
              'Design and run cloud infrastructure on AWS and Vercel',
              'Write it all as code with Terraform',
              'Build CI/CD pipelines in GitHub Actions',
              'Set up monitoring, alerting, backups and incident response',
              'Lead migrations and security reviews for client platforms',
            ],
          },
        ],
      },
      {
        title: 'What you’ll bring',
        blocks: [
          {
            type: 'list',
            items: [
              'Five or more years in DevOps, SRE or platform engineering',
              'Hands-on AWS and Terraform in production',
              'Linux, networking and security fundamentals',
              'Calm under pressure, and clear notes after an incident',
            ],
          },
        ],
      },
      {
        title: 'Nice to have',
        blocks: [
          {
            type: 'list',
            items: ['Cloudflare Workers', 'Cost optimisation', 'ISO 27001 or SOC 2 audits'],
          },
        ],
      },
    ],
  },
]

export const findRole = (slug: string) => roles.find((role) => role.slug === slug)
