import { Activity, Gauge, ListChecks, ShieldCheck } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * STARTER TEMPLATE · Website Maintenance
 * Design: "Case Study Template — Website Maintenance" in the Pencil file.
 *
 * Copy it with `pnpm new:case-study website-maintenance <slug>`.
 * Guide: docs/case-studies.md
 */
export default defineCaseStudy({
  slug: 'template-website-maintenance',
  status: 'draft',
  service: 'website-maintenance',
  client: '[Client name]',
  industry: '[Industry]',
  year: 0,

  seo: {
    title: '[Client]: [the result in a few words]',
    description:
      '[Lead with the reliability result, then say what the care plan covers and for whom. 140–160 characters.]',
  },

  // HERO: e.g. ['Two years without', 'a minute of downtime.']
  hero: {
    title: ['[Outcome-led headline,', 'one italic phrase.]'],
    intro:
      '[Who the client is, what the site does for them and how we look after it. Two or three sentences, 45 words max. Lead with the outcome.]',
    facts: [
      ['Client', '[Client name]'],
      ['Industry', '[Industry]'],
      ['Plan', '[Care plan name]'],
      ['Since', '[Month YEAR — ongoing]'],
      ['Platform', '[CMS · hosting]'],
      ['Response', '[0h critical fix SLA]'],
    ],
    media: {
      image: null,
      alt: '[What the image shows]',
      brief: 'Hero image · client site on devices or monitoring view · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '[Last 12 months]',
    summary: "[One sentence on what the care plan means for the business, in the client's own terms.]",
    stats: [
      { value: '[99.99%]', label: '[Uptime]', detail: '[Last 12 months]' },
      { value: '[0h 00m]', label: '[Average time to fix]', detail: '[Critical issues]' },
      { value: '[000]', label: '[Updates and improvements shipped]', detail: '[Since Month Year]' },
      { value: '[0.0s]', label: '[Average load time]', detail: '[Was 0.0s]' },
    ],
  },

  challenge: {
    title: '[The problem, in one line.]',
    paragraphs: [
      '[What went wrong before the care plan, or what the client was worried about. 60–90 words.]',
    ],
    points: ['[Symptom one, with a number if possible]', '[Symptom two]', '[Symptom three]'],
  },
  approach: {
    title: '[How we look after it, in one line.]',
    paragraphs: ['[The routine: monitoring, updates, reporting and how the client reaches us. 60–90 words.]'],
  },

  sections: [
    // SCOPE: what's actually in this client's plan. Response times must match the signed SLA.
    {
      kind: 'checklist',
      columns: 2,
      label: "What's included",
      title: ['[Everything the', 'site needs.]'],
      intro: '[What the care plan covers each month.]',
      items: [
        '[Security & plugin updates]',
        '[Daily off-site backups]',
        '[Uptime monitoring]',
        '[Performance checks]',
        '[Content changes · 0 hours]',
        '[Monthly report]',
        '[Accessibility checks]',
        '[Priority support]',
      ].map((title) => ({ title })),
      stats: [
        { value: '[0 hours]', label: 'Critical response', detail: '[Site down or checkout broken]' },
        { value: '[0 hours]', label: 'High response', detail: '[A key feature not working]' },
        { value: '[0 days]', label: 'Routine response', detail: '[Changes and small fixes]' },
      ],
    },
    // RELIABILITY: 12 months of uptime from your monitoring tool. Explain any dip honestly.
    {
      kind: 'chart',
      tone: 'ink',
      label: 'Reliability',
      title: ['[Always on,', 'always fast.]'],
      kpi: {
        value: '[99.99%]',
        label: 'Uptime · last 12 months',
        detail: '[Monitoring tool] · checks every minute',
      },
      points: [100, 100, 100, 97, 100, 100, 100, 100, 99, 100, 100, 100].map((value) => ({
        label: '[Mon]',
        value,
        display: '[99.99%] uptime',
      })),
      stats: [
        { value: '[0]', label: 'Incidents' },
        { value: '[00m]', label: 'Average recovery' },
        { value: '[0.0s]', label: 'Average load time' },
      ],
    },
    // REPORT: one real monthly report page (remove sensitive data), beside the four
    // sections every report covers.
    {
      kind: 'screenshot',
      label: 'Reporting',
      title: ['[A clear report', 'every month.]'],
      intro: '[What the client sees each month and how they use it.]',
      frame: 'plain',
      media: {
        image: null,
        alt: '[A page from the monthly care report]',
        brief: 'Monthly report page · 1240×1754 (A4)',
        aspect: 1240 / 1754,
      },
      features: [
        {
          icon: Activity,
          title: '[Uptime & incidents]',
          body: '[What the report shows and why it matters to the client.]',
        },
        {
          icon: ShieldCheck,
          title: '[Security & updates]',
          body: '[What the report shows and why it matters to the client.]',
        },
        {
          icon: Gauge,
          title: '[Performance]',
          body: '[What the report shows and why it matters to the client.]',
        },
        {
          icon: ListChecks,
          title: '[Work completed]',
          body: '[What the report shows and why it matters to the client.]',
        },
      ],
    },
    // LOG: four to six representative issues with real dates and fix times.
    {
      kind: 'table',
      label: 'Support log',
      title: ['[Fixed before', 'anyone noticed.]'],
      intro: '[A sample of issues from the last few months.]',
      columns: [
        { key: 'date', label: 'Date', width: 'sm', emphasis: 'muted' },
        { key: 'issue', label: 'Issue and fix', width: 'fill' },
        { key: 'priority', label: 'Priority', width: 'sm' },
        { key: 'fixed', label: 'Time to fix', width: 'sm', emphasis: 'strong' },
      ],
      rows: [
        {
          date: '[DD MMM]',
          issue: '[Short description of the issue and the fix]',
          priority: { tag: '[Critical]', tone: 'risk' },
          fixed: '[0h 00m]',
        },
        {
          date: '[DD MMM]',
          issue: '[Short description of the issue and the fix]',
          priority: { tag: '[High]' },
          fixed: '[0h 00m]',
        },
        {
          date: '[DD MMM]',
          issue: '[Short description of the issue and the fix]',
          priority: { tag: '[Routine]' },
          fixed: '[0d]',
        },
        {
          date: '[DD MMM]',
          issue: '[Short description of the issue and the fix]',
          priority: { tag: '[Routine]' },
          fixed: '[0d]',
        },
      ],
    },
  ],

  quote: {
    text: '[A short quote from the client about the result, in their own words.]',
    name: '[Full name]',
    role: '[Role, Company]',
    initials: '[AB]',
  },

  credits: {
    services: [
      '[Care plan]',
      '[Hosting & monitoring]',
      '[Security updates]',
      '[Content support]',
      '[Performance improvements]',
    ],
    team: ['[Name] — [Role]', '[Name] — [Role]', '[Name] — [Role]'],
    tools: ['[e.g. Sentry]', '[e.g. UptimeRobot]', '[e.g. Cloudflare]', '[e.g. Linear]'],
  },
})
