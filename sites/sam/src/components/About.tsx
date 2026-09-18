import { Download, FileText } from 'lucide-react'
import { CountUp } from '@fluxstride/design-system/motion/CountUp'
import { DrawRule } from '@fluxstride/design-system/motion/DrawRule'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { RevealText } from '@fluxstride/design-system/motion/RevealText'
import { ScrubText } from '@fluxstride/design-system/motion/ScrubText'
import { ArrowIcon } from '@fluxstride/design-system/ui/ArrowIcon'
import { ABOUT, PERSON } from '@/content/site'
import { cn } from '@/lib/cn'
import { external } from '@/lib/external'
import { Eyebrow } from './ui'

/*
 * Motion: the quote rises word by word; the bio lights up word by word as it scrolls
 * past, at the reader's pace; the fact rows and the stat rules draw themselves in, one
 * after another, while the numbers count up. The résumé card fills with ink from the
 * bottom on hover and its download arrow drops through.
 */

function ResumeLink({ className }: { className?: string }) {
  return (
    <a
      href={PERSON.resume}
      {...external}
      className={cn(
        'group relative isolate flex items-center gap-4 overflow-hidden rounded-md border border-ink px-4.5 py-4 transition-colors duration-500 ease-out-expo hover:text-paper lg:w-90 lg:px-5.5 lg:py-5',
        'before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-ink before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-y-100',
        className,
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded bg-flux-soft text-flux transition-colors duration-500 group-hover:bg-flux group-hover:text-paper lg:size-11">
        <FileText size={20} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="text-base/[1.2] font-semibold lg:text-[1.0625rem]">Download my résumé</span>
        <span className="font-mono text-[0.625rem] text-stone uppercase transition-colors duration-500 group-hover:text-stone-light lg:text-label-sm">
          PDF · Opens in Google Drive
        </span>
      </span>
      <ArrowIcon direction="down" icon={Download} size={20} strokeWidth={1.75} />
    </a>
  )
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="container-page scroll-mt-16 py-18 lg:scroll-mt-24 lg:pt-35 lg:pb-30"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[37.5rem_1fr] xl:gap-24">
        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-8">
            <Reveal>
              <Eyebrow>(02) About</Eyebrow>
            </Reveal>
            <RevealText as="h2" id="about-title" className="font-serif text-sam-quote font-normal italic">
              {ABOUT.quote}
            </RevealText>
          </div>
          <Reveal className="max-lg:hidden">
            <ResumeLink />
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10 lg:pt-11">
          <div className="flex flex-col gap-6 lg:gap-10">
            {ABOUT.bio.map((paragraph) => (
              <ScrubText key={paragraph.slice(0, 20)} className="text-[1.0625rem]/[1.5] lg:text-xl/[1.55]">
                {paragraph}
              </ScrubText>
            ))}
          </div>

          <div>
            <DrawRule className="h-px bg-line" />
            <dl>
              {ABOUT.facts.map((fact, index) => {
                const value = fact.href ? (
                  <a
                    href={fact.href}
                    {...(fact.href.startsWith('http') ? external : {})}
                    className="group flex items-center justify-between gap-4 transition-colors duration-300 hover:text-flux"
                  >
                    {fact.value}
                    <ArrowIcon direction="up-right" size={18} className="text-flux" />
                  </a>
                ) : (
                  fact.value
                )
                return (
                  <Reveal
                    key={fact.label}
                    y={12}
                    delay={index * 0.08}
                    className="relative flex flex-col gap-1.5 py-3.5 lg:flex-row lg:items-center lg:gap-6 lg:py-4.5"
                  >
                    <dt className="font-mono text-[0.625rem] text-stone uppercase lg:w-30 lg:shrink-0 lg:text-label-sm">
                      {fact.label}
                    </dt>
                    <dd className="flex-1 text-[0.9375rem]/[1.4] font-medium lg:text-base">{value}</dd>
                    <DrawRule
                      delay={index * 0.08 + 0.1}
                      className="absolute inset-x-0 bottom-0 h-px bg-line"
                    />
                  </Reveal>
                )
              })}
            </dl>
          </div>
        </div>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 lg:mt-24 lg:grid-cols-4 lg:gap-6">
        {ABOUT.stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            y={16}
            delay={index * 0.12}
            className="relative flex flex-col-reverse gap-2 pt-4 lg:gap-3.5 lg:pt-7"
          >
            <dt className="text-sm text-stone lg:text-base">{stat.label}</dt>
            <dd className="text-sam-stat">
              <CountUp value={stat.value} />
            </dd>
            <DrawRule delay={index * 0.12 + 0.1} className="absolute inset-x-0 top-0 h-px bg-ink" />
          </Reveal>
        ))}
      </dl>

      <Reveal className="mt-8 lg:hidden">
        <ResumeLink />
      </Reveal>
    </section>
  )
}
