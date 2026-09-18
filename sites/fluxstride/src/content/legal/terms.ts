import { CircleCheck, FileCheck, Lock } from 'lucide-react'
import { EMAIL_ACCOUNTS, EMAIL_LEGAL, mailto } from '@/content/site'
import { defineLegalDocument } from './schema'

/*
 * Terms of service. Wording from the design (Fluxstride: Terms of Service).
 *
 * PLACEHOLDERS: the commercial terms (deposit, payment terms, late interest, warranty
 * period, liability cap, notice periods) are design copy, not agreed policy. Have them
 * confirmed by the business and the whole text reviewed by a lawyer before launch.
 */
export default defineLegalDocument({
  slug: 'terms',
  name: 'Terms of service',
  title: ['Terms of', 'service.'],
  intro:
    'The agreement between you and Fluxstride Ltd for using this website and for the projects, retainers and consultancy we deliver.',
  blurb: 'The agreement that covers using our website and working with us.',
  updated: '2026-09-16',
  effective: '2026-09-16',
  version: '4.0',
  summary: [
    'Every project starts with a written proposal. It sets the scope, price and timeline.',
    'Invoices are due within 14 days. Projects start once the deposit is paid.',
    'You own everything we make for you once the final invoice is paid.',
    'We fix defects found within 30 days of launch, free of charge.',
  ],
  contact: {
    label: 'Contracts & billing',
    title: 'Questions about these terms?',
    link: { label: EMAIL_LEGAL, href: mailto(EMAIL_LEGAL) },
    note: `For invoices and payments, contact [${EMAIL_ACCOUNTS}](${mailto(EMAIL_ACCOUNTS)}).`,
  },
  sections: [
    {
      title: 'About these terms',
      blocks: [
        {
          type: 'paragraph',
          text: 'These terms apply when you use fluxstride.com and when you engage Fluxstride Ltd for services. Each engagement is also governed by a signed proposal or statement of work (SOW). If a proposal and these terms disagree, the proposal wins.',
        },
      ],
    },
    {
      title: 'Using our website',
      blocks: [
        {
          type: 'list',
          items: [
            "Don't misuse the site: no scraping, attacks or attempts to access areas that aren't public.",
            'Content on the site is ours or licensed to us; you may share links but not republish it.',
            'Articles and guides are general information, not professional advice for your situation.',
          ],
        },
      ],
    },
    {
      title: 'Proposals & scope',
      blocks: [
        {
          type: 'paragraph',
          text: "A proposal describes deliverables, timeline, team, fees and assumptions. It's valid for 30 days and becomes binding when both parties sign it or you confirm in writing and pay the deposit.",
        },
        {
          type: 'note',
          icon: FileCheck,
          text: "Anything not listed in the proposal is out of scope. We'll always flag it before doing extra work.",
        },
      ],
    },
    {
      title: 'Fees & payment',
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '30%', label: 'deposit to book your team and start date' },
            { value: '14 days', label: 'payment terms on every invoice' },
            { value: '8%', label: 'annual interest above base rate on late payments' },
            { value: '20%', label: 'UK VAT added where applicable' },
          ],
        },
        {
          type: 'paragraph',
          text: "Fixed-price projects are invoiced by milestone. Retainers and Care Plans are billed monthly in advance. Hourly work is billed monthly in arrears with a timesheet. If an invoice is more than 30 days overdue, we may pause work until it's paid.",
        },
      ],
    },
    {
      title: 'Change requests',
      blocks: [
        {
          type: 'paragraph',
          text: "If priorities change, we'll write up a change request describing the impact on cost and timeline. Work on a change only starts once you approve it in writing, no surprise invoices.",
        },
      ],
    },
    {
      title: 'Your responsibilities',
      blocks: [
        {
          type: 'list',
          items: [
            'Give us timely feedback, content and access to the systems we need.',
            'Nominate one decision-maker who can approve work.',
            'Make sure you have the rights to any content, data or brand assets you provide.',
            'Delays in feedback of more than 5 working days may move the timeline.',
          ],
        },
      ],
    },
    {
      title: 'Intellectual property',
      blocks: [
        {
          type: 'split',
          columns: [
            {
              title: 'You own',
              icon: CircleCheck,
              highlight: true,
              items: [
                'All final designs, code and content we create for you',
                'Full transfer on payment of the final invoice',
                'Your data, content and brand assets: always',
              ],
            },
            {
              title: 'We keep',
              icon: Lock,
              items: [
                'Our pre-existing tools, libraries and know-how',
                'A licence for you to use them within your project',
                'The right to show the work in our portfolio (unless agreed otherwise)',
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Warranty & support',
      blocks: [
        {
          type: 'paragraph',
          text: "For 30 days after launch we'll fix any defect that stops the work behaving as specified, at no cost. After that, support is available through a Care Plan or on an hourly basis.",
        },
      ],
    },
    {
      title: 'Liability',
      blocks: [
        {
          type: 'paragraph',
          text: 'Our total liability under any engagement is limited to the fees paid for that engagement in the previous 12 months. Neither party is liable for indirect or consequential losses such as lost profits. Nothing limits liability for death, personal injury or fraud.',
        },
      ],
    },
    {
      title: 'Confidentiality',
      blocks: [
        {
          type: 'paragraph',
          text: "We both keep each other's confidential information private during the project and for three years afterwards. We're happy to sign your NDA before a first conversation.",
        },
      ],
    },
    {
      title: 'Ending an engagement',
      blocks: [
        {
          type: 'paragraph',
          text: "Either party can end a retainer with 30 days' written notice. If a fixed-price project ends early, you pay for work completed to date and receive everything produced so far.",
        },
      ],
    },
    {
      title: 'Governing law',
      blocks: [
        {
          type: 'paragraph',
          text: 'These terms are governed by the laws of England & Wales, and the courts of England & Wales have exclusive jurisdiction.',
        },
      ],
    },
  ],
})
