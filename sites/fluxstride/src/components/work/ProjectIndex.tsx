import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import type { ProjectEntry } from '@/content/work'
import { cn } from '@/lib/cn'

/*
 * Design: Work / Project Index ("More projects").
 *
 * Desktop: a table between ink rules. Mono 11 column heads, then 26px-padded rows on
 * hairlines: year 90px | client (fills, 24/500) | services 380px | industry 200px | arrow 40px.
 * Mobile: no column heads or arrow; each row stacks year, client, services and
 * industry 6px apart with 20px padding.
 */
const columns = 'lg:grid lg:grid-cols-[5.625rem_minmax(0,1fr)_23.75rem_12.5rem_2.5rem] lg:items-center'

export function ProjectIndex({ projects }: { projects: ProjectEntry[] }) {
  return (
    <section aria-labelledby="more-projects-title" className="flex flex-col gap-6">
      <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
        <h2 id="more-projects-title" className="text-heading-sm leading-[1.2] text-ink">
          More projects
        </h2>
        <p className="font-mono text-label text-stone uppercase">{projects.length} more</p>
      </Reveal>

      <div className="border-b border-ink">
        <div
          aria-hidden="true"
          className={cn(
            columns,
            'border-t border-ink pt-3.25 pb-3.5 font-mono text-label-sm/[1.2] text-stone uppercase max-lg:hidden',
          )}
        >
          <span>Year</span>
          <span>Client</span>
          <span>Services</span>
          <span>Industry</span>
        </div>

        {projects.length ? (
          <Reveal as="ul" stagger={0.06}>
            {projects.map((project) => (
              <li
                key={project.client}
                className={cn(
                  columns,
                  'flex flex-col gap-1.5 border-t border-line py-5 lg:gap-0 lg:pt-6.25 lg:pb-6.5',
                )}
              >
                <span className="font-mono text-label text-stone">{project.year}</span>
                <h3 className="text-[clamp(1.25rem,1.1571rem+0.381vw,1.5rem)] leading-[1.2] font-medium text-ink">
                  {project.client}
                </h3>
                <span className="font-mono text-label text-ink uppercase">
                  {project.services.join(' · ')}
                </span>
                <span className="font-mono text-label text-ink uppercase">{project.industry}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={18}
                  strokeWidth={2}
                  className="justify-self-end text-ink max-lg:hidden"
                />
              </li>
            ))}
          </Reveal>
        ) : (
          <p className="border-t border-line py-6.5 text-body text-stone">
            No other projects with this service yet.
          </p>
        )}
      </div>
    </section>
  )
}
