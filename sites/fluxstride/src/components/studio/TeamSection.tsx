import { ImageReveal } from '@fluxstride/design-system/motion/ImageReveal'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { Picture } from '@/components/ui/Picture'
import { SectionHeader } from '@/components/ui/Section'
import { team, type TeamMember } from '@/content/studio'

/*
 * Design: Studio / Team. 128px padding, header 56px above two rows of four portraits
 * (380px tall, 24px gutters, rows 56px apart). Name 19/600, role 14px stone.
 * Mobile: 72px padding, two per row with 12px gutters and 32px between rows,
 * 210px portraits, 16px names.
 */
export function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="container-page flex scroll-mt-24 flex-col gap-8 py-18 lg:gap-14 lg:py-32"
    >
      <SectionHeader
        eyebrow="The team"
        titleId="team-title"
        title="People you’ll work with."
        titleClassName="max-lg:text-[2.25rem]"
        titleGroupClassName="gap-5"
        intro="No account managers in the middle, just the specialists building your product."
        introClassName="lg:w-85"
      />
      <Reveal
        as="ul"
        stagger={0.06}
        className="grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14"
      >
        {team.map((member) => (
          <li key={member.name}>
            <Person member={member} />
          </li>
        ))}
      </Reveal>
    </section>
  )
}

function Person({ member }: { member: TeamMember }) {
  return (
    <figure className="group flex flex-col gap-4">
      <ImageReveal
        className="aspect-[169/210] lg:aspect-auto lg:h-95"
        image={
          <Picture
            name={member.photo}
            alt={`Portrait of ${member.name}`}
            sizes="(min-width: 64rem) 22vw, 45vw"
            className="size-full"
            imgClassName="grayscale transition-[filter,scale] duration-1000 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
          />
        }
      />
      <figcaption className="flex items-start justify-between gap-3">
        <span className="flex flex-col gap-1">
          <span className="text-base/[1.2] font-semibold text-ink lg:text-[19px]/[1.2]">{member.name}</span>
          <span className="text-sm/[1.2] text-stone">{member.role}</span>
        </span>
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="text-stone transition-colors hover:text-flux"
          >
            <LinkedInIcon />
          </a>
        ) : null}
      </figcaption>
    </figure>
  )
}

/** LinkedIn glyph (Lucide dropped brand icons), 16px to match the design. */
function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
