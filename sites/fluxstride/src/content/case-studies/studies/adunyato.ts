import { CalendarCheck, FileText, MessageCircle, Search, Utensils, Zap } from 'lucide-react'
import { defineCaseStudy } from '../schema'

/**
 * Adunyato · Web & frontend, Product design, Cloud
 *
 * A real, live project: adunyato.fluxstride.com. The figures are facts about what was built
 * and can be checked against the live site or the repository; the client's booking numbers
 * are not ours to publish. When Adunyato approves enquiry or booking figures, swap them into
 * `results.stats` and add an approved quote.
 *
 * Screenshots: `pnpm shots:projects adunyato` recaptures them from the live site.
 */
export default defineCaseStudy({
  slug: 'adunyato',
  status: 'published',
  services: ['web-design-frontend', 'product-design', 'cloud-devops'],
  discipline: 'Website',
  client: 'Adunyato',
  industry: 'Catering & events',
  year: 2026,

  seo: {
    title: 'Adunyato: a Lagos caterer that books on WhatsApp',
    description:
      'A static site for a Lagos catering and event company: two full menus, a gallery of real events, and every call to action opening a WhatsApp chat with the details filled in.',
  },

  hero: {
    title: ['A caterer online,', 'and taking bookings.'],
    intro:
      'Adunyato caters weddings, birthdays and corporate events across Lagos, and plans them too. We designed and built the site: two kitchens, a full menu, real event photography, and a booking path that ends in a WhatsApp message.',
    tags: ['Catering & events', 'Website', '2026'],
    facts: [
      ['Client', 'Adunyato'],
      ['Industry', 'Catering & event planning'],
      ['Location', 'Lagos, Nigeria'],
      ['Services', 'Design, frontend, hosting'],
      ['Pages', '8, prerendered as static HTML'],
      ['Stack', 'React · Vite · GSAP · Cloudflare'],
    ],
    media: {
      image: 'case-studies/adunyato-home',
      alt: 'The Adunyato home page: the headline "A distinct taste for every party" in a serif typeface beside a photograph of party jollof rice, with a December booking note',
      brief: 'Website screenshot · home page · 2880×1800',
      url: 'adunyato.fluxstride.com',
      href: 'https://adunyato.fluxstride.com/',
    },
    frame: 'browser',
  },

  cover: {
    image: 'case-studies/adunyato-cover',
    alt: 'The Adunyato home page, headlined "A distinct taste for every party" beside a photograph of party jollof rice',
    brief: 'Cover · home page on ink · 2400×1600',
  },

  results: {
    timeframe: 'Shipped 2026',
    summary:
      'A site that answers what a caterer is always asked, then hands the conversation to WhatsApp with the event details already written.',
    stats: [
      { value: '8', label: 'pages, prerendered as HTML', detail: 'Served from the edge, no server' },
      { value: '31', label: 'dishes across two kitchens', detail: 'Local and continental, one system' },
      { value: '1 tap', label: 'from any page to WhatsApp', detail: 'Message prefilled from the form' },
      { value: '0', label: 'servers to patch or restart', detail: 'Static files on Cloudflare' },
    ],
  },

  challenge: {
    title: 'Catering is sold in answers, not brochures.',
    paragraphs: [
      'Every enquiry a caterer gets asks the same things: what do you cook, can you do both local and continental, how does pricing work, and are you free on my date. Answering each one by hand is the job that eats the week.',
      'The business also runs on WhatsApp, as most of Lagos does, so a website that ended at a contact form would have added a step rather than removed one.',
    ],
    points: [
      'The same questions, answered by hand',
      'Menus living in photographs and PDFs',
      'Bookings that happen in chat, not forms',
    ],
  },

  approach: {
    title: 'Put the menu online, then get out of the way.',
    paragraphs: [
      'We structured the whole menu as data: two kitchens, their categories and every dish with its own note, so the site, the highlights on the home page and the downloadable menu all come from one source.',
      'The enquiry forms then write a WhatsApp message for the customer, with the event type, date, guest count and menu choices already in it. The site is prerendered to static HTML, so there is no server to keep alive and pages arrive quickly on a phone.',
    ],
  },

  sections: [
    {
      kind: 'screenshot',
      label: 'The menus',
      title: ['Two kitchens,', 'one menu.'],
      intro:
        'Local and continental in one place, with small chops, desserts, drinks and sample packages, plus the full menu as a PDF to forward.',
      frame: 'browser',
      media: {
        image: 'case-studies/adunyato-menus',
        alt: 'The Adunyato menus page: the heading "Two kitchens. One unforgettable table." above tabs for local kitchen, continental kitchen, small chops, desserts and sample packages',
        brief: 'Website screenshot · menus page · 2880×1800',
        url: 'adunyato.fluxstride.com/menus',
        href: 'https://adunyato.fluxstride.com/menus',
      },
      features: [
        {
          icon: Utensils,
          title: 'Every dish is data',
          body: 'Dishes, categories and tags live in one file, so a new signature dish appears on the menu, the home page and the PDF at once.',
        },
        {
          icon: Search,
          title: 'Skim, then dig in',
          body: 'Tabs per kitchen and per course, so a guest planning a wedding and someone ordering party trays both find their section quickly.',
        },
        {
          icon: FileText,
          title: 'A menu to send on',
          body: 'The full menu downloads as a PDF, because the person choosing is rarely the person paying.',
        },
      ],
    },
    {
      kind: 'gallery',
      label: 'The site',
      title: ['Proof you can', 'taste from a phone.'],
      intro:
        'Real events, shot at real parties, filtered by the kind of event a visitor is planning.',
      tone: 'mist',
      frame: 'browser',
      columns: 2,
      items: [
        {
          media: {
            image: 'case-studies/adunyato-catering',
            alt: 'The catering page: the heading "Cooking that becomes the talk of the party" beside photographs of buffet tables and chafing dishes',
            brief: 'Website screenshot · catering page · 1280×800',
            url: 'adunyato.fluxstride.com/catering',
            href: 'https://adunyato.fluxstride.com/catering',
          },
          caption: 'Catering',
          meta: 'Buffet, plated, live stations, trays',
        },
        {
          media: {
            image: 'case-studies/adunyato-gallery',
            alt: 'The gallery page: filter chips for weddings, birthdays, corporate and food close-ups above a grid of event photographs',
            brief: 'Website screenshot · gallery · 1280×800',
            url: 'adunyato.fluxstride.com/gallery',
            href: 'https://adunyato.fluxstride.com/gallery',
          },
          caption: 'Gallery',
          meta: 'Filtered by event type',
        },
      ],
    },
    {
      kind: 'flow',
      label: 'Booking',
      title: ['From browsing', 'to a chat.'],
      intro:
        'The enquiry form does not email anyone. It writes the message, and the customer sends it from their own WhatsApp.',
      style: 'numbered',
      before: {
        label: 'Before',
        steps: [
          'See a photo on Instagram',
          'Ask what they cook',
          'Wait for a reply',
          'Ask about prices',
          'Wait again',
          'Send the event details',
          'Agree a date',
        ],
        meta: 'Every answer typed by hand',
      },
      after: {
        label: 'With the site',
        steps: ['Read the menu', 'Fill in the event details', 'Send the prefilled WhatsApp message'],
        meta: 'The details arrive with the first message',
      },
    },
    {
      kind: 'features',
      label: 'Built for a phone',
      title: ['Fast on the network', 'people actually use.'],
      intro:
        'Most visitors arrive from Instagram on mobile data, so the site was built to arrive quickly and work in one hand.',
      style: 'cards',
      features: [
        {
          icon: Zap,
          title: 'Static, not rendered on demand',
          body: 'Every page is built to HTML ahead of time and served from the edge, so there is no server to wake up and nothing to time out.',
        },
        {
          icon: MessageCircle,
          title: 'WhatsApp is the front door',
          body: 'Call, chat and booking buttons sit in the header, the footer and every section, because that is how the business already talks to customers.',
        },
        {
          icon: CalendarCheck,
          title: 'Seasons the client controls',
          body: 'The booking note on the home page is content, not a code change, so the December owambe rush can be announced in a sentence.',
        },
      ],
    },
  ],

  credits: {
    services: ['Product design (UI/UX)', 'Website design & frontend', 'Photography direction', 'Hosting & deployment'],
    team: ['Samuel Adekoya: Design & engineering'],
    toolsLabel: 'Stack',
    tools: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP', 'Cloudflare'],
  },

  next: 'fluxstride',
})
