import { SlidersHorizontal, X } from 'lucide-react'
import { EMAIL_PRIVACY, mailto } from '@/content/site'
import { defineLegalDocument } from './schema'

/*
 * Cookie policy. Wording from the design (Fluxstride: Cookie Policy).
 *
 * The categories in "How we use them" come from content/consent.ts, the same list the
 * cookie banner and Cookie settings use, and their toggles change the visitor's consent.
 *
 * PLACEHOLDERS: the "Cookies we set" table follows the design. Before launch, check it
 * against what the live site really sets (dev tools → Application → Cookies), keep it in
 * step with content/consent.ts, and have the policy reviewed.
 */
export default defineLegalDocument({
  slug: 'cookies',
  name: 'Cookie policy',
  title: ['Cookie', 'policy.'],
  intro:
    'What cookies and similar technologies we use on fluxstride.com, why we use them, and how you can change your choices at any time.',
  blurb: 'The cookies we use, why, and how to change your choices.',
  updated: '2026-09-16',
  effective: '2026-09-16',
  version: '2.1',
  summary: [
    "Essential cookies keep the site working and secure. They're always on.",
    'Analytics and marketing cookies only load after you accept them.',
    'We use privacy-friendly analytics and never sell data to advertisers.',
    'Change your mind any time from the "Cookie settings" link in the footer.',
  ],
  contact: {
    label: 'Your choices',
    title: 'Want to change your cookie settings?',
    link: { label: 'Open cookie settings →', action: 'open-cookie-settings' },
    note: `Or email [${EMAIL_PRIVACY}](${mailto(EMAIL_PRIVACY)}) with any questions.`,
  },
  sections: [
    {
      title: 'What cookies are',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cookies are small text files stored on your device when you visit a website. They help the site remember things like your preferences, and help us understand how the site is used. We also use similar technologies such as local storage and pixels. This policy covers those too.',
        },
      ],
    },
    {
      title: 'How we use them',
      blocks: [
        {
          type: 'paragraph',
          text: 'We group cookies into four categories. You can choose which optional categories to allow:',
        },
        { type: 'cookie-categories' },
      ],
    },
    {
      title: 'Cookies we set',
      blocks: [
        {
          type: 'table',
          monoFirstColumn: true,
          columns: [
            { label: 'Name', width: 190 },
            { label: 'Provider', width: 190 },
            { label: 'Purpose' },
            { label: 'Expires', width: 140 },
          ],
          rows: [
            ['fs_consent', 'Fluxstride', 'Stores your cookie choices', '12 months'],
            ['__Host-session', 'Fluxstride', 'Keeps contact forms secure', 'Session'],
            ['__cf_bm', 'Cloudflare', 'Protects the site from bots', '30 minutes'],
            ['_ga', 'Google Analytics', 'Distinguishes unique visitors', '13 months'],
            ['fs_prefs', 'Fluxstride', 'Remembers display preferences', '6 months'],
            ['li_fat_id', 'LinkedIn', 'Attributes campaign sign-ups', '30 days'],
            ['_gcl_au', 'Google Ads', 'Measures ad conversions', '90 days'],
          ],
        },
      ],
    },
    {
      title: 'Managing cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'You can update your choices at any time using the button below. You can also block or delete cookies in your browser settings, although some parts of the site may not work as expected.',
        },
        {
          type: 'actions',
          items: [
            { label: 'Open cookie settings', icon: SlidersHorizontal, action: 'open-cookie-settings' },
            { label: 'Reject all optional', icon: X, action: 'reject-optional' },
          ],
        },
        {
          type: 'list',
          items: [
            'Chrome: Settings › Privacy and security › Third-party cookies',
            'Safari: Settings › Privacy › Prevent cross-site tracking',
            'Firefox: Settings › Privacy & Security › Enhanced Tracking Protection',
            'Edge: Settings › Cookies and site permissions',
          ],
        },
      ],
    },
    {
      title: 'Changes to this policy',
      blocks: [
        {
          type: 'paragraph',
          text: "If we add new cookies or change how we use them, we'll update this page and ask for your consent again where needed.",
        },
      ],
    },
  ],
})
