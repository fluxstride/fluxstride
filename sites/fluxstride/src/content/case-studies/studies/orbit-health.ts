import { Accessibility, Bell, Moon, ScanFace, Type, WifiOff } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * Orbit Health · Mobile, Product design
 * Design: "Case Study: Mobile App" (desktop) and "(Mobile)" in the Pencil file.
 *
 * SAMPLE CONTENT: the client, figures, reviews, team credits and quote are invented for the
 * design mockups. Replace them with a real, client-approved project and remove `sample`
 * before launch. The step names in "04: Journey" are only read out to screen readers.
 */
export default defineCaseStudy({
  slug: 'orbit-health',
  status: 'published',
  sample: true,
  services: ['mobile-development', 'product-design'],
  discipline: 'Mobile app',
  client: 'Orbit Health',
  industry: 'Healthcare',
  year: 2026,

  seo: {
    title: 'Orbit Health: booking a GP in four taps',
    description:
      'Booking time down 64% and a 4.8★ App Store rating. How we redesigned and rebuilt the Orbit Health app around the one journey that mattered most.',
  },

  hero: {
    title: ['Booking a GP', 'in four taps.'],
    intro:
      "Orbit Health's patients were abandoning bookings halfway through. We redesigned and rebuilt the iOS and Android app around the one journey that mattered most.",
    tags: ['Healthcare', 'Mobile app', 'UX research', '2026'],
    facts: [
      ['Client', 'Orbit Health'],
      ['Industry', 'Healthcare · Private GP'],
      ['Services', 'UX research, app design, React Native'],
      ['Timeline', '16 weeks · 2026'],
      ['Platforms', 'iOS · Android'],
      ['Users', '210k patients'],
    ],
    media: {
      image: 'case-studies/orbit-health-hero',
      alt: 'A hand holding a phone that shows a daily wellbeing score with steps and sleep tracking',
      brief: 'Hero image · app in use · 2880×1520',
    },
    frame: 'plain',
  },

  results: {
    timeframe: '4 months after release',
    summary: "Patients book faster, finish what they start, and rate the app like one they'd recommend.",
    stats: [
      { value: '−64%', label: 'time to book an appointment', detail: '4m 10s → 1m 30s' },
      { value: '4.8★', label: 'App Store rating', detail: 'was 3.1★' },
      { value: '2.1×', label: 'monthly bookings in the app', detail: 'vs web' },
      { value: '−33%', label: 'booking-related support calls', detail: 'first month' },
    ],
  },

  challenge: {
    title: 'Eleven steps between a patient and a GP.',
    paragraphs: [
      'The old app asked for insurance details, symptoms and preferences before showing a single appointment. 58% of patients who started a booking gave up, and called the clinic instead.',
    ],
    points: [
      '58% booking abandonment',
      '3.1★ rating, mostly about booking',
      'Separate codebases for iOS and Android',
    ],
  },

  approach: {
    title: 'Show times first, ask later.',
    paragraphs: [
      "We ran 20 usability sessions with patients aged 19 to 81. The fix was simple to say and hard to build: show real availability immediately, and only ask for what's needed to confirm.",
      'We rebuilt both apps in React Native with a shared design system, NHS login and full VoiceOver and TalkBack support.',
    ],
  },

  sections: [
    {
      kind: 'gallery',
      label: 'The app',
      title: ['Four screens,', 'one journey.'],
      intro: 'From home screen to confirmed appointment in under 90 seconds.',
      frame: 'phone',
      columns: 4,
      panel: true,
      items: [
        {
          caption: '01 Home',
          media: {
            image: 'case-studies/orbit-health-home',
            alt: 'Home screen greeting Sarah, with a Book a GP card showing the next available time, shortcuts for repeat prescriptions and a nurse, and an upcoming blood test',
            brief: 'App screen · home · 756×1626',
          },
        },
        {
          caption: '02 Choose a time',
          media: {
            image: 'case-studies/orbit-health-choose-time',
            alt: 'Choose a time screen: a strip of dates with Tuesday 16 selected and a grid of afternoon times with 14:20 selected',
            brief: 'App screen · choose a time · 756×1626',
          },
        },
        {
          caption: '03 Confirm',
          media: {
            image: 'case-studies/orbit-health-confirm',
            alt: 'Confirm screen: Dr. Anil Patel, Tuesday 16 September at 14:20, a 10-minute video call from Orbit Clinic, Leeds, an optional reason and a Confirm booking button',
            brief: 'App screen · confirm · 756×1626',
          },
        },
        {
          caption: '04 Booked',
          media: {
            image: 'case-studies/orbit-health-booked',
            alt: "Confirmation screen reading You're booked, with Add to calendar and Back to home buttons",
            brief: 'App screen · booked · 756×1626',
          },
        },
      ],
    },
    {
      kind: 'flow',
      style: 'numbered',
      label: 'Journey',
      title: ['Eleven steps', 'became four.'],
      before: {
        label: 'Before',
        meta: '4 min 10 s · 58% abandoned',
        steps: [
          'Choose a clinic',
          'Insurance provider',
          'Policy number',
          'Symptoms',
          'Symptom details',
          'Preferred GP',
          'Appointment type',
          'Contact preferences',
          'Choose a date',
          'Choose a time',
          'Confirm',
        ],
      },
      after: {
        label: 'After',
        meta: '1 min 30 s · 9% abandoned',
        steps: ['Home', 'Choose a time', 'Confirm', 'Booked'],
      },
    },
    {
      kind: 'reviews',
      tone: 'ink',
      label: 'Ratings',
      title: ['Patients', 'noticed.'],
      rating: '4.8',
      ratingLabel: '12,400 ratings · App Store',
      reviews: [
        {
          quote: 'Booked a same-day appointment in the time it took the kettle to boil.',
          author: 'Sophie, Leeds',
        },
        {
          quote: 'Finally an app my mum can use. The big text and clear buttons make all the difference.',
          author: 'Raj, Manchester',
        },
        { quote: 'Found a slot, picked video, done. No phone queue.', author: 'Tom, London' },
      ],
    },
    {
      kind: 'features',
      label: 'Built in',
      title: ['Accessible', 'for everyone.'],
      features: [
        { icon: Type, title: 'Dynamic type', body: 'Every screen tested at 200% text size.' },
        {
          icon: Accessibility,
          title: 'VoiceOver & TalkBack',
          body: 'Full screen reader support and labels.',
        },
        { icon: ScanFace, title: 'NHS login', body: 'Face ID sign-in and verified identity.' },
        { icon: Bell, title: 'Smart reminders', body: 'Push, SMS and calendar reminders.' },
        { icon: WifiOff, title: 'Offline records', body: 'Letters and results available offline.' },
        { icon: Moon, title: 'Dark mode', body: 'Easier on the eyes for evening use.' },
      ],
    },
  ],

  quote: {
    text: "The booking journey used to be our biggest complaint. Now it's the thing patients mention when they recommend us.",
    name: 'Dr. Amara Kofi',
    role: 'Head of Digital, Orbit Health',
    initials: 'AK',
  },

  credits: {
    services: [
      'UX research',
      'Mobile app design',
      'React Native development',
      'Accessibility audit',
      'App Store launch',
    ],
    team: [
      'Priya Raman, Design Lead',
      'Daniel Mensah, Technical Lead',
      'Leo Park, Engineer',
      'Hannah Cole, Client Partner',
    ],
    tools: ['React Native', 'Expo', 'TypeScript', 'NHS login', 'Twilio', 'Sentry'],
    toolsLabel: 'Stack',
  },

  next: 'kinetic-labs',
})
