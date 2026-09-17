import { ArrowRight, CirclePause, Download, Eye, Hand, Info, Mail, Pencil, Trash2 } from 'lucide-react'
import { EMAIL_PRIVACY, mailto } from '@/content/site'
import { defineLegalDocument } from './schema'

/*
 * Privacy policy. Wording from the design (Fluxstride — Privacy Policy).
 *
 * PLACEHOLDERS — must be replaced and the whole text reviewed by a lawyer before launch
 * (they are also listed in content/legal/index.ts, which makes the build warn):
 *   - company number, registered address and ICO registration reference (section 01)
 *   - "Data Protection Lead: Hannah Cole" (contact card)
 *   - the provider list (section 04): hosting says Vercel and AWS, but this site deploys to
 *     Cloudflare; confirm which tools are really used (CRM, accounting, analytics)
 *   - retention periods (section 06)
 */
export default defineLegalDocument({
  slug: 'privacy',
  name: 'Privacy policy',
  title: ['Privacy', 'policy.'],
  intro:
    'How Fluxstride collects, uses and protects personal information when you visit our website, work with us or apply to join the team.',
  blurb: 'How we collect, use and protect your personal information.',
  updated: '2026-09-16',
  effective: '2026-09-16',
  version: '3.2',
  summary: [
    'We only collect what we need to reply to you, deliver your project and run the business.',
    'We never sell your data or use it for third-party advertising.',
    'Analytics and marketing cookies only run if you say yes.',
    'You can see, correct or delete your data at any time — just email us.',
  ],
  contact: {
    label: 'Data protection',
    title: 'Questions about your data?',
    link: { label: EMAIL_PRIVACY, href: mailto(EMAIL_PRIVACY) },
    note: 'We reply within 5 working days. Data Protection Lead: Hannah Cole.',
  },
  sections: [
    {
      title: 'Who we are',
      blocks: [
        {
          type: 'paragraph',
          text: 'Fluxstride Ltd ("Fluxstride", "we", "us") is a software and design studio registered in England & Wales (company no. 00000000) at 00 Example Street, London EC1A 0AA. We are the data controller for the personal information described in this policy and are registered with the Information Commissioner\'s Office (ICO) under reference ZA000000.',
        },
        {
          type: 'note',
          icon: Info,
          text: "Where we build software that processes your customers' data, we act as your data processor under a separate Data Processing Agreement.",
        },
      ],
    },
    {
      title: 'What we collect',
      blocks: [
        {
          type: 'paragraph',
          text: 'We collect information you give us directly, and a limited amount automatically when you use our website.',
        },
        {
          type: 'table',
          columns: [
            { label: 'Category', width: 210 },
            { label: 'Examples' },
            { label: 'Source', width: 230 },
          ],
          rows: [
            ['Contact details', 'Name, email, phone, company, job title', 'Forms, email, calls'],
            ['Project information', 'Briefs, budgets, files and feedback you share', 'You and your team'],
            [
              'Billing details',
              'Billing contact, address, VAT number',
              'You; card details are handled by Stripe',
            ],
            ['Website usage', 'Pages viewed, device, approximate location', 'Cookies — only with consent'],
            ['Job applications', 'CV, portfolio, interview notes', 'You and recruiters'],
          ],
        },
      ],
    },
    {
      title: 'How we use it',
      blocks: [
        {
          type: 'paragraph',
          text: 'We only use personal information when we have a lawful basis under UK GDPR:',
        },
        {
          type: 'table',
          columns: [{ label: 'Purpose' }, { label: 'Lawful basis', width: 320 }],
          rows: [
            ['Replying to enquiries and preparing proposals', 'Legitimate interests'],
            ['Delivering projects and support', 'Performance of a contract'],
            ['Invoicing, accounting and tax records', 'Legal obligation'],
            ['Sending The Stride newsletter', 'Consent — unsubscribe any time'],
            ['Website analytics and improvement', 'Consent via [cookie settings](/cookies)'],
          ],
        },
      ],
    },
    {
      title: 'Who we share it with',
      blocks: [
        {
          type: 'paragraph',
          text: 'We share data only with trusted providers who help us run Fluxstride, under contracts that require them to protect it. We never sell personal information.',
        },
        {
          type: 'list',
          items: [
            'Google Workspace — email, documents and calendars',
            'HubSpot — enquiries and client relationships',
            'Stripe and Xero — payments and accounting',
            'Vercel and AWS (London region) — website hosting',
            'Plausible Analytics — privacy-friendly website statistics',
          ],
        },
      ],
    },
    {
      title: 'International transfers',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most data is stored in the UK or EU. Where a provider processes data outside the UK, we rely on UK adequacy regulations or the International Data Transfer Agreement (IDTA) to keep it protected.',
        },
      ],
    },
    {
      title: 'How long we keep it',
      blocks: [
        {
          type: 'list',
          items: [
            "Enquiries that don't become projects — 24 months",
            'Client project records — 6 years after the project ends',
            'Financial records — 6 years, as required by HMRC',
            'Newsletter subscribers — until you unsubscribe',
            'Job applications — 12 months, unless you ask us to delete sooner',
          ],
        },
      ],
    },
    {
      title: 'Your rights',
      blocks: [
        {
          type: 'paragraph',
          text: 'You have the following rights over your personal information. Most requests are free and answered within one month.',
        },
        {
          type: 'cards',
          items: [
            { icon: Eye, title: 'Access', body: 'Ask for a copy of the data we hold about you.' },
            {
              icon: Pencil,
              title: 'Rectification',
              body: 'Ask us to correct anything inaccurate or incomplete.',
            },
            {
              icon: Trash2,
              title: 'Erasure',
              body: 'Ask us to delete your data where we no longer need it.',
            },
            { icon: CirclePause, title: 'Restriction', body: 'Ask us to limit how we use your data.' },
            { icon: Download, title: 'Portability', body: 'Receive your data in a machine-readable format.' },
            { icon: Hand, title: 'Objection', body: 'Object to processing based on legitimate interests.' },
          ],
        },
        {
          type: 'actions',
          items: [
            { label: 'Make a data request', icon: ArrowRight, href: mailto(EMAIL_PRIVACY, 'Data request') },
            { label: `Email ${EMAIL_PRIVACY}`, icon: Mail, href: mailto(EMAIL_PRIVACY) },
          ],
        },
      ],
    },
    {
      title: 'Security',
      blocks: [
        {
          type: 'paragraph',
          text: "We protect data with encryption in transit and at rest, single sign-on with two-factor authentication, least-privilege access and regular reviews of the tools we use. If a breach affects you, we'll tell you and the ICO within 72 hours where required.",
        },
      ],
    },
    {
      title: 'Changes to this policy',
      blocks: [
        {
          type: 'paragraph',
          text: "We review this policy at least once a year. If we make significant changes, we'll update the date at the top and let clients and subscribers know by email.",
        },
      ],
    },
    {
      title: 'Complaints',
      blocks: [
        {
          type: 'paragraph',
          text: "If you're unhappy with how we've handled your data, please contact us first so we can put it right. You also have the right to complain to the Information Commissioner's Office at [ico.org.uk](https://ico.org.uk) or on [0303 123 1113](tel:+443031231113).",
        },
      ],
    },
  ],
})
