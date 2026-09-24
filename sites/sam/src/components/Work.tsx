import { Lock } from 'lucide-react'
import { ClipReveal } from '@fluxstride/design-system/motion/ClipReveal'
// Only the parked IndexRow below draws a rule.
// import { DrawRule } from '@fluxstride/design-system/motion/DrawRule'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { ArrowIcon } from '@fluxstride/design-system/ui/ArrowIcon'
import { PROJECTS, WORK_INTRO, type Project } from '@/content/site'
import { cn } from '@/lib/cn'
import { external } from '@/lib/external'
import { Eyebrow, Img, SectionTitle } from './ui'

const number = (index: number) => String(index + 1).padStart(2, '0')

/*
 * Motion: each browser window wipes open from the bottom as it arrives, its screenshot
 * settling from a slight zoom. On hover the screenshot eases in and the arrow slides
 * through. The "More work" rows draw their rules in one after another, and on hover a
 * soft band sweeps up behind the row while the name nudges right.
 */

/** A live screenshot in a minimal browser window. */
function BrowserFrame({ project, sizes, delay }: { project: Project; sizes: string; delay?: number }) {
  return (
    <ClipReveal
      delay={delay}
      className="overflow-hidden rounded-lg border border-line-dark bg-ink-2 lg:rounded-[0.625rem]"
    >
      <div className="flex items-center gap-2.5 px-2.5 py-2 lg:gap-4 lg:px-4 lg:py-3">
        <span aria-hidden="true" className="flex gap-1 lg:gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="size-1.5 rounded-full bg-line-dark transition-colors duration-500 group-hover:bg-flux-light lg:size-2.25"
              style={{ transitionDelay: `${dot * 60}ms` }}
            />
          ))}
        </span>
        <span className="flex items-center gap-1.5 rounded-full lg:bg-ink lg:px-3 lg:py-1.25">
          <Lock size={10} className="text-stone max-lg:hidden" aria-hidden="true" />
          <span className="font-mono text-[0.5625rem] text-stone lg:text-label-sm">{project.host}</span>
        </span>
      </div>
      <div className="overflow-hidden">
        <div data-clip-zoom="">
          <Img
            name={project.image}
            alt={`${project.name} home page`}
            sizes={sizes}
            className="w-full transition-transform duration-1000 ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </ClipReveal>
  )
}

function ProjectCard({
  project,
  index,
  sizes,
  delay,
  className,
}: {
  project: Project
  index: number
  sizes: string
  delay?: number
  className?: string
}) {
  return (
    <a href={project.url} {...external} className={cn('group flex flex-col gap-3.5 lg:gap-5', className)}>
      <BrowserFrame project={project} sizes={sizes} delay={delay} />
      <Reveal y={12} delay={(delay ?? 0) + 0.4} className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2.5 lg:gap-3.5">
          <span className="font-mono text-label text-flux-light">{number(index)}</span>
          <span className="text-sam-project text-paper">{project.name}</span>
        </span>
        <span className="flex items-center gap-2.5 text-stone-light lg:gap-4.5">
          <span className="text-right font-mono text-[0.625rem] uppercase lg:text-label">
            <span className="lg:hidden">{project.tags.split(' · ')[0]}</span>
            <span className="max-lg:hidden">{project.tags}</span>
          </span>
          <ArrowIcon direction="up-right" size={18} strokeWidth={1.75} className="text-paper" />
        </span>
      </Reveal>
      <span className="sr-only">(opens {project.host} in a new tab)</span>
    </a>
  )
}

// Row for the dormant "More work" index below; restore both together.
/*
function IndexRow({ project, index, delay }: { project: Project; index: number; delay: number }) {
  return (
    <li className="relative">
      <a
        href={project.url}
        {...external}
        className={cn(
          'group relative isolate flex items-center gap-4 py-5 lg:gap-8 lg:py-7',
          // A soft band sweeps up behind the row on hover.
          'before:absolute before:-inset-x-3 before:inset-y-0 before:-z-10 before:origin-bottom before:scale-y-0 before:rounded-md before:bg-white/4 before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-y-100 lg:before:-inset-x-5',
        )}
      >
        <span className="font-mono text-label text-flux-light max-lg:hidden">{number(index)}</span>
        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="font-mono text-[0.625rem] text-stone-light uppercase lg:hidden">
            {number(index)}: {project.tags}
          </span>
          <span className="text-sam-index text-paper transition-transform duration-500 ease-out-expo lg:group-hover:translate-x-3">
            {project.name}
          </span>
        </span>
        <span className="font-mono text-label text-stone-light uppercase max-xl:hidden">{project.tags}</span>
        <span className="w-24 shrink-0 overflow-hidden rounded border border-line-dark sm:w-32 lg:w-44 lg:rounded-md">
          <Img
            name={project.image}
            alt=""
            sizes="(min-width: 1024px) 176px, 128px"
            className="w-full transition-transform duration-700 ease-out-expo group-hover:scale-110"
          />
        </span>
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-line-dark text-paper transition-colors duration-500 ease-out-expo group-hover:border-flux group-hover:bg-flux max-lg:hidden">
          <ArrowIcon direction="up-right" size={22} strokeWidth={1.75} />
        </span>
        <span className="sr-only">(opens {project.host} in a new tab)</span>
      </a>
      <DrawRule delay={delay} className="h-px bg-line-dark" />
    </li>
  )
}
*/

export function Work() {
  // Restore the trailing bindings when the shelved projects return to PROJECTS.
  // const [feature, first, second, third, fourth, ...rest] = PROJECTS
  // const offset = 5
  const [feature, first, second] = PROJECTS

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-16 bg-ink py-18 text-paper lg:scroll-mt-24 lg:py-30"
    >
      <div className="container-page flex flex-col gap-12 lg:gap-24">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4 lg:gap-6">
            <Reveal>
              <Eyebrow className="text-stone-light">
                (01) Selected work: {PROJECTS.length} live products
              </Eyebrow>
            </Reveal>
            <SectionTitle id="work-title" plain="Things I've" accent="shipped." />
          </div>
          <Reveal
            as="p"
            delay={0.2}
            className="text-body-lg text-stone-light lg:max-w-90 lg:text-[1.0625rem]/[1.5]"
          >
            {WORK_INTRO}
          </Reveal>
        </header>

        <ProjectCard project={feature} index={0} sizes="(min-width: 1440px) 1312px, 92vw" />

        {/* Two staggered rows: the wide card swaps sides, and the narrow one sits lower.
            Side by side from lg; each card wipes in a beat after its neighbour. */}
        <div className="grid gap-12 lg:grid-cols-[784fr_504fr] lg:items-end lg:gap-6">
          <ProjectCard project={first} index={1} sizes="(min-width: 1024px) 55vw, 92vw" />
          <ProjectCard project={second} index={2} delay={0.15} sizes="(min-width: 1024px) 35vw, 92vw" />
        </div>
        {/* The second row is dormant until the shelved projects return:
            <div className="grid gap-12 lg:grid-cols-[504fr_784fr] lg:items-end lg:gap-6">
              <ProjectCard project={third} index={3} sizes="(min-width: 1024px) 35vw, 92vw" />
              <ProjectCard project={fourth} index={4} delay={0.15} sizes="(min-width: 1024px) 55vw, 92vw" />
            </div> */}

        {/* <div>
          <Reveal>
            <Eyebrow className="text-stone-light">More work</Eyebrow>
          </Reveal>
          <Reveal as="ol" stagger={0.08} y={20} className="mt-2">
            {rest.map((project, i) => (
              <IndexRow key={project.slug} project={project} index={offset + i} delay={i * 0.08} />
            ))}
          </Reveal>
        </div> */}
      </div>
    </section>
  )
}
