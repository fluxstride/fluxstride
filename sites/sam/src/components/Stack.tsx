import { DrawRule } from '@fluxstride/design-system/motion/DrawRule'
import { Reveal } from '@fluxstride/design-system/motion/Reveal'
import { STACK, STACK_ALSO, STACK_INTRO } from '@/content/site'
import { cn } from '@/lib/cn'
import { Eyebrow, SectionTitle } from './ui'

/*
 * Motion: each group's rule draws across in turn, left to right, and its tools rise in
 * one by one beneath it, so the toolkit reads like a table being laid out. The AI
 * group's rule is flux blue and its label carries a live pulse. Tools nudge right and
 * turn blue on hover; the "Also" pills fill with ink from the bottom.
 *
 * Layout: inline "·" lists on phones, then 2 → 3 → 6 columns as room allows.
 */
export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="container-page scroll-mt-16 py-18 lg:scroll-mt-24 lg:py-30"
    >
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-6">
          <Reveal>
            <Eyebrow>(04) Stack</Eyebrow>
          </Reveal>
          <SectionTitle id="stack-title" plain="The stack" accent="behind it." />
        </div>
        <Reveal
          as="p"
          delay={0.2}
          className="text-[0.9375rem]/[1.5] text-stone lg:max-w-90 lg:text-[1.0625rem]/[1.5]"
        >
          {STACK_INTRO}
        </Reveal>
      </header>

      <div className="mt-7 grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:mt-16 lg:grid-cols-3 xl:grid-cols-6 xl:gap-5">
        {STACK.map((group, index) => (
          <div key={group.group} className="relative flex flex-col gap-2 py-4 md:gap-5 md:pt-5">
            <DrawRule
              delay={index * 0.1}
              className={cn(
                'absolute inset-x-0 top-0',
                group.highlight ? 'h-0.5 bg-flux' : 'h-px bg-line md:bg-ink',
              )}
            />
            <Reveal
              y={8}
              delay={0.15 + index * 0.1}
              className="flex justify-between font-mono text-[0.625rem] uppercase md:text-label-sm"
            >
              <span className={cn('flex items-center gap-2', group.highlight ? 'text-flux' : 'text-stone')}>
                {group.highlight ? (
                  <span aria-hidden="true" className="relative flex size-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-flux opacity-60 motion-reduce:hidden" />
                    <span className="relative size-1.5 rounded-full bg-flux" />
                  </span>
                ) : null}
                {group.group}
              </span>
              <span className="text-stone-light max-md:hidden">
                {String(group.items.length).padStart(2, '0')}
              </span>
            </Reveal>
            {/* One line of "·"-separated items on phones, a column from md. */}
            <Reveal
              as="ul"
              stagger={0.05}
              y={14}
              className="text-[1.0625rem]/[1.45] font-medium md:flex md:flex-col md:gap-3 md:text-xl/[1.25]"
            >
              {group.items.map((item, itemIndex) => (
                <li key={item} className="max-md:inline">
                  <span className="transition-[color,translate] duration-500 ease-out-expo md:inline-block md:hover:translate-x-1 md:hover:text-flux">
                    {item}
                  </span>
                  {itemIndex < group.items.length - 1 && (
                    <span aria-hidden="true" className="md:hidden">
                      {' · '}
                    </span>
                  )}
                </li>
              ))}
            </Reveal>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col gap-3 pt-4 md:mt-12 md:flex-row md:flex-wrap md:items-center md:gap-6 md:pt-6">
        <DrawRule className="absolute inset-x-0 top-0 h-px bg-line" />
        <Reveal as="p" y={8} className="font-mono text-[0.625rem] text-stone uppercase md:text-label-sm">
          Also
        </Reveal>
        <Reveal
          as="ul"
          stagger={0.06}
          y={10}
          className="text-[1.0625rem]/[1.45] font-medium md:flex md:flex-wrap md:gap-3 md:text-sm"
        >
          {STACK_ALSO.map((item, index) => (
            <li
              key={item}
              className={cn(
                'max-md:inline',
                'md:relative md:isolate md:overflow-hidden md:rounded-full md:border md:border-line md:px-3.5 md:py-2 md:transition-[color,border-color] md:duration-500 md:ease-out-expo md:hover:border-ink md:hover:text-paper',
                'md:before:absolute md:before:inset-0 md:before:-z-10 md:before:origin-bottom md:before:scale-y-0 md:before:bg-ink md:before:transition-transform md:before:duration-500 md:before:ease-out-expo md:hover:before:scale-y-100',
              )}
            >
              {item}
              {index < STACK_ALSO.length - 1 && (
                <span aria-hidden="true" className="md:hidden">
                  {' · '}
                </span>
              )}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
