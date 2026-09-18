import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Picture } from '@/components/ui/Picture'
import { testimonials, type Testimonial } from '@/content/proof'
import { cn } from '@fluxstride/design-system/lib/cn'
import { initials, pad } from '@/lib/format'
import { EASE_OUT } from '@fluxstride/design-system/lib/motion'
import { useMediaQuery, usePageVisible } from '@fluxstride/design-system/lib/useMediaQuery'

/** How long each testimonial stays up, in ms. Long enough to read a ~30-word quote. */
const SLIDE_DURATION = 9000

/*
 * Design: Home / Proof / Testimonial. 300px author column | serif quote, then the
 * "01 / 06" counter 36px below the quote.
 *
 * Every slide sits in the same grid cell, so the block keeps the height of the
 * longest quote and nothing below it jumps. The active slide's progress segment is a
 * CSS animation: when it ends, the next slide shows; pausing freezes it in place.
 *
 * Auto-advance pauses while the pointer or keyboard focus is inside, while the block
 * is off-screen or the tab is hidden, and when the visitor presses pause. It starts
 * paused for visitors who prefer reduced motion (they can still press play).
 */
export function TestimonialCarousel() {
  const rootRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  /** null until the visitor presses play/pause; until then the motion preference decides. */
  const [playing, setPlaying] = useState<boolean | null>(null)
  const [holding, setHolding] = useState(false)
  const [inView, setInView] = useState(false)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const pageVisible = usePageVisible()

  const autoplay = playing ?? !reducedMotion
  const running = autoplay && !holding && inView && pageVisible
  const count = testimonials.length

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  const go = (next: number) => setIndex((next + count) % count)

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="What clients say"
      onPointerEnter={() => setHolding(true)}
      onPointerLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHolding(false)
      }}
      className="flex flex-col gap-9"
    >
      <div className="grid" aria-live={autoplay ? 'off' : 'polite'}>
        {testimonials.map((testimonial, i) => (
          <Slide
            key={testimonial.name}
            testimonial={testimonial}
            active={i === index}
            position={i + 1}
            count={count}
          />
        ))}
      </div>

      {/* Aligned under the quote on desktop: 300px author column + 80px gap. */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:ml-95">
        <span className="font-mono text-label text-stone tabular-nums">
          {pad(index + 1)} / {pad(count)}
        </span>

        <ol className="flex items-center gap-1.5">
          {testimonials.map((testimonial, i) => (
            <li key={testimonial.name}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1} of ${count}`}
                aria-current={i === index ? 'true' : undefined}
                className="group block py-3"
              >
                <span className="relative block h-0.5 w-6 overflow-hidden bg-line transition-colors group-hover:bg-stone-light lg:w-8">
                  {i < index ? <span className="absolute inset-0 bg-ink" /> : null}
                  {i === index ? (
                    <span
                      key={index}
                      onAnimationEnd={() => go(index + 1)}
                      className="absolute inset-0 origin-left bg-ink"
                      style={{
                        animation: `progress-fill ${SLIDE_DURATION}ms linear forwards`,
                        animationPlayState: running ? 'running' : 'paused',
                      }}
                    />
                  ) : null}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="flex items-center gap-2 lg:ml-auto">
          <ControlButton label="Previous testimonial" onClick={() => go(index - 1)}>
            <ArrowLeft size={14} strokeWidth={2} />
          </ControlButton>
          <ControlButton
            label={autoplay ? 'Pause testimonials' : 'Play testimonials'}
            onClick={() => setPlaying(!autoplay)}
          >
            {autoplay ? <Pause size={14} strokeWidth={2} /> : <Play size={14} strokeWidth={2} />}
          </ControlButton>
          <ControlButton label="Next testimonial" onClick={() => go(index + 1)}>
            <ArrowRight size={14} strokeWidth={2} />
          </ControlButton>
        </div>
      </div>
    </section>
  )
}

function Slide({
  testimonial,
  active,
  position,
  count,
}: {
  testimonial: Testimonial
  active: boolean
  position: number
  count: number
}) {
  return (
    <motion.figure
      role="group"
      aria-roledescription="slide"
      aria-label={`${position} of ${count}`}
      aria-hidden={!active}
      inert={!active}
      initial={false}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
      // The outgoing quote clears before the next one rises in.
      transition={{ duration: active ? 0.7 : 0.35, delay: active ? 0.3 : 0, ease: EASE_OUT }}
      className="col-start-1 row-start-1 flex flex-col gap-6 lg:flex-row lg:gap-20"
    >
      <figcaption className="flex flex-col gap-4 lg:w-75 lg:shrink-0">
        <Avatar testimonial={testimonial} />
        <span className="flex flex-col gap-1">
          <span className="text-[clamp(1rem,0.9768rem+0.0952vw,1.0625rem)] leading-[1.2] font-semibold">
            {testimonial.name}
          </span>
          <span className="text-[15px] leading-[1.2] text-stone">{testimonial.role}</span>
        </span>
      </figcaption>
      <blockquote className="flex-1 font-serif text-quote">
        <p>{testimonial.quote}</p>
      </blockquote>
    </motion.figure>
  )
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.avatar) {
    return <Picture name={testimonial.avatar} alt="" sizes="72px" className="size-18 rounded-full" />
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-18 items-center justify-center rounded-full bg-flux-soft text-xl font-semibold text-flux"
    >
      {initials(testimonial.name)}
    </span>
  )
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex size-9 items-center justify-center rounded-full border border-line text-ink',
        'transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper',
      )}
    >
      {children}
    </button>
  )
}
