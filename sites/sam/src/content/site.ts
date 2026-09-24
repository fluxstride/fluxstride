import type { ImageName } from './images.generated'

/**
 * Everything the page says, in one place. Components only lay it out.
 *
 * TO_CONFIRM lists copy that was written for the design and has not been checked
 * by Samuel yet. The build prints it as a warning; empty the list once each item is
 * confirmed or corrected.
 */
export const TO_CONFIRM = [
  'Location "Lagos, Nigeria" (hero clock, spec sheet, footer).',
  'Availability badge "Open for projects · Oct" (AVAILABILITY below).',
  'The two bio paragraphs, including "In 2025 I started Fluxstride".',
  'Project category tags (guessed from each live site).',
  '"24h typical reply to a new brief".',
  'Design tools: Adobe Photoshop, After Effects and Framer were added as likely tools.',
  'Portrait: only a 148px image exists. Supply a high-resolution photo.',
]

export const PERSON = {
  name: 'Samuel Adekoya',
  firstName: 'Samuel',
  lastName: 'Adekoya',
  role: 'Designer & Software Engineer',
  email: 'samuel.adekoya@fluxstride.com',
  location: 'Lagos, Nigeria',
  /** IANA zone for the live clock in the hero. */
  timeZone: 'Africa/Lagos',
  timeZoneLabel: 'WAT',
  // coordinates: '6°31′N 3°23′E',
  resume: 'https://drive.google.com/file/d/1NUs_xOvx6NpFnuopfRynHLtVjOp4-W4g/view?usp=sharing',
}

export const STUDIO = { name: 'Fluxstride', url: 'https://fluxstride.com', host: 'fluxstride.com' }

// export const AVAILABILITY = 'Open for projects · Oct'
export const AVAILABILITY = 'Open for projects'

export const SOCIALS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/fluxstride' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/samueladekoya' },
  { id: 'x', label: 'X / Twitter', short: 'X', href: 'https://x.com/fluxstride_boss/' },
] as const

export const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
] as const

export const HERO = {
  // eyebrow: '(Portfolio: 2026 edition)',
  eyebrow: '(Portfolio)',
  /** Sans lines, then the serif phrase that ends with the flux dot. */
  lines: ['I design & engineer', 'digital products people'],
  accent: 'keep coming back to',
  intro:
    "Hello, I'm Samuel. I help startups and enterprises take an idea from a sketch to something live in the market, and I do the design and the engineering myself.",
  focus: 'Product design, branding, web, mobile, backend & cloud',
}

export type Project = {
  slug: string
  name: string
  url: string
  /** Shown in the browser frame's address bar. */
  host: string
  tags: string
  image: ImageName
}

/** In display order. The first five get browser-framed screenshots; the rest are the index list. */
export const PROJECTS: Project[] = [
  {
    slug: 'fluxstride',
    name: 'Fluxstride',
    url: 'https://www.fluxstride.com',
    host: 'fluxstride.com',
    tags: 'My studio · Brand, website & platform',
    image: 'fluxstride-hero',
  },
  {
    slug: 'dexus-synergy',
    name: 'Dexus Synergy',
    url: 'https://www.dexussynergy.com',
    host: 'dexussynergy.com',
    tags: 'Automotive · Marketplace & finance',
    image: 'dexus-synergy',
  },
  {
    slug: 'adunyato',
    name: 'Adunyato',
    url: 'https://adunyato.fluxstride.com',
    host: 'adunyato.fluxstride.com',
    tags: 'Catering & events · Website',
    image: 'adunyato',
  },
  // {
  //   slug: 'foodsub',
  //   name: 'FoodSub',
  //   url: 'https://foodsub.vercel.app/',
  //   host: 'foodsub.vercel.app',
  //   tags: 'Food-tech · Landing page',
  //   image: 'foodsub',
  // },
  // {
  //   slug: 'ibiza-ng',
  //   name: 'Ibiza NG',
  //   url: 'https://ibiza-ng.vercel.app/',
  //   host: 'ibiza-ng.vercel.app',
  //   tags: 'Events & nightlife · Website',
  //   image: 'ibiza-ng-hero',
  // },
  // {
  //   slug: 'utta-holding',
  //   name: 'Utta Holding',
  //   url: 'https://hold-utta.vercel.app/',
  //   host: 'hold-utta.vercel.app',
  //   tags: 'Finance · Website',
  //   image: 'utta-holding',
  // },
  // {
  //   slug: 'slapa-group',
  //   name: 'Slapa Group',
  //   url: 'https://slapa-lp.vercel.app/',
  //   host: 'slapa-lp.vercel.app',
  //   tags: 'Web3 · Landing page',
  //   image: 'slapa-group',
  // },
  // {
  //   slug: 'synthetic-slapa',
  //   name: 'Synthetic Slapa',
  //   url: 'https://synth-slapa.vercel.app/',
  //   host: 'synth-slapa.vercel.app',
  //   tags: 'Web3 · Token launch',
  //   image: 'synthetic-slapa',
  // },
  // {
  //   slug: 'slapax',
  //   name: 'Slapax',
  //   url: 'https://slapa-x.vercel.app/',
  //   host: 'slapa-x.vercel.app',
  //   tags: 'Web3 · Swap platform',
  //   image: 'slapax',
  // },
  // {
  //   slug: 'utta-token',
  //   name: 'Utta Token',
  //   url: 'https://utta.vercel.app/',
  //   host: 'utta.vercel.app',
  //   tags: 'Web3 · Token launch',
  //   image: 'utta-token',
  // },
]

export const WORK_INTRO =
  // 'Three live products: from my own studio to car dealers, caterers and fintech founders. Every one of them is still running.'
  'Three live products: from my own studio to car dealers and caterers. Every one of them is still running.'

export const ABOUT = {
  quote: "There's a lot more to me than a fancy title.",
  bio: [
    "I'm a designer and software engineer. For the last few years I've been the person founders call when they need an idea turned into something real: a website that sells, an app people open daily, a store that actually converts.",
    'I work end to end: the interface, the code behind it, the launch and the boring-but-vital upkeep after. In 2025 I started Fluxstride, a design & engineering studio, so bigger projects get a whole team. Smaller, personal ones still come straight to me.',
  ],
  facts: [
    { label: 'Now', value: 'Building Fluxstride, a design & engineering studio', href: STUDIO.url },
    { label: 'Based in', value: 'Lagos, Nigeria, working worldwide' },
    { label: 'Works with', value: 'Founders, startups and enterprise teams' },
    {
      label: 'Toolkit',
      value: 'TypeScript · React · Node.js · Python · AWS: full stack below',
      href: '#stack',
    },
  ],
  stats: [
    { value: PROJECTS.length.toString(), label: 'products live and still running' },
    { value: '06', label: 'disciplines, design to cloud' },
    { value: '01', label: 'studio founded: Fluxstride' },
    { value: '24h', label: 'typical reply to a new brief' },
  ],
}

/**
 * The studio's six services (sites/fluxstride/src/content/services.ts), in the first person.
 * `slug` matches the studio's service pages, which each row links to.
 */
export const SERVICES = [
  {
    slug: 'product-design',
    name: 'Product design (UI/UX)',
    summary:
      'Research-led journeys, prototypes and polished interfaces, backed by design systems that scale.',
    tags: 'Research · Prototypes · Systems',
  },
  {
    slug: 'graphic-design-branding',
    name: 'Graphic design & branding',
    summary: 'Logos, identities and brand systems that make you unmistakable, from pitch deck to signage.',
    tags: 'Identity · Guidelines · Collateral',
  },
  {
    slug: 'web-design-frontend',
    name: 'Website design & frontend',
    summary:
      'Fast, striking websites, online stores and web app frontends built to turn visitors into customers.',
    tags: 'Next.js · React · Shopify',
  },
  {
    slug: 'mobile-development',
    name: 'Mobile development',
    summary: 'Native and cross-platform apps people return to, from MVP to the App Store.',
    tags: 'iOS · Android · React Native · Flutter',
  },
  {
    slug: 'backend-development',
    name: 'Backend development',
    summary:
      'APIs, platforms and integrations engineered to scale: clean architecture, tested and documented.',
    tags: 'Node.js · Python · PostgreSQL',
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    summary: 'Infrastructure, release pipelines and support that keep your product fast, secure and online.',
    tags: 'AWS · GCP · Docker · CI/CD',
  },
]

export const SERVICES_INTRO =
  'Hire me for one piece or the whole thing. Every project gets the same person from first call to launch day.'

export const STACK: { group: string; items: string[]; highlight?: boolean }[] = [
  { group: 'Design', items: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'After Effects', 'Framer'] },
  {
    group: 'Frontend',
    items: [
      'TypeScript',
      'React',
      'Next.js',
      'React Native',
      'Flutter',
      'Tailwind CSS',
      'Chakra UI',
      'GSAP',
      'Framer Motion',
      'D3.js',
    ],
  },
  {
    group: 'Backend',
    items: [
      'Node.js',
      'NestJS',
      'Express',
      'Python',
      'Flask',
      'Django',
      'FastAPI',
      'REST & webhooks',
      'GraphQL',
    ],
  },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'] },
  {
    group: 'Artificial Intelligence (AI)',
    items: [
      'OpenAI, Anthropic (Claude) & Google (Gemini)',
      // 'Amazon Bedrock & AgentCore',
      'AI agents & workflow automation',
      'Document scanning & vetting pipelines',
    ],
    highlight: true,
  },
  { group: 'Cloud & DevOps', items: ['AWS', 'GCP', 'Docker', 'CI/CD', 'Cloudflare', 'Vercel'] },
]

export const STACK_ALSO = [
  'System design',
  'Microservices',
  'Scalable architecture',
  'Performance tuning',
  'Git: GitHub, GitLab, Bitbucket',
]

export const STACK_INTRO =
  'The tools I reach for daily, from the first sketch to the infrastructure, and the AI layer that ties it together.'

/** Contact form "I need help with" options. Mirrors SERVICES. */
export const NEEDS = ['Website', 'Mobile app', 'Product design', 'Branding', 'Backend', 'Cloud & DevOps']
