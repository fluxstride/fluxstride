import { useRef } from 'react'
import { MarkRings } from '@/components/ui/MarkRings'
import { cn } from '@fluxstride/design-system/lib/cn'
import { gsap, MOTION_OK } from '@fluxstride/design-system/lib/gsap'
import { useIsomorphicLayoutEffect } from '@fluxstride/design-system/lib/useIsomorphicLayoutEffect'

/*
 * "FIG. 01: MOMENTUM": concentric Stride-mark rings on a navy glow.
 *
 * Design (Hero Visual): 820×380 on desktop, 350×240 on mobile. Everything in it is
 * a fixed proportion of the box on both canvases, so it is built from ratios:
 *   - rings and core are centred at 66% / 52% (the glow's centre too)
 *   - their sizes are multiples of the box height (MarkRings, unit 100cqh)
 *   - grid lines sit at quarter widths, the horizon at 52% height
 * Only the captions and padding change size between canvases (fluid 390→1440).
 */

export function HeroVisual({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const q = gsap.utils.selector(root)

    const media = gsap.matchMedia()
    media.add(MOTION_OK, () => {
      const art = q('[data-art]')[0]
      // Inner rings first, so the motion radiates outward from the mark.
      const rings = q('[data-ring]').reverse()
      const core = q('[data-core]')

      gsap.set(art, { opacity: 1 })
      art.dataset.revealReady = ''

      gsap
        .timeline({ delay: 0.35, defaults: { ease: 'expo.out' } })
        .from(q('[data-grid="x"]'), { scaleY: 0, transformOrigin: 'top', duration: 1.6, stagger: 0.08 })
        .from(q('[data-grid="y"]'), { scaleX: 0, transformOrigin: 'left', duration: 1.6 }, 0.1)
        .from(core, { scale: 0, duration: 1.4, ease: 'back.out(1.6)' }, 0.15)
        .from(rings, { scale: 0.7, opacity: 0, duration: 1.8, stagger: 0.12 }, 0.25)
        .from(q('[data-caption]'), { opacity: 0, y: 8, duration: 0.9, stagger: 0.1 }, 0.7)
        .add(() => {
          // At rest the rings breathe in a slow ripple outward from the core.
          rings.forEach((ring, index) => {
            gsap.to(ring, {
              scale: 1.03,
              duration: 3.2,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              delay: index * 0.4,
            })
          })
        })

      // Pointer parallax on devices with a mouse: nearer (inner) layers drift further.
      if (!window.matchMedia('(pointer: fine)').matches) return
      const layers = [...rings, ...core].map((element, index, all) => {
        const depth = (index + 1) / all.length
        return {
          depth,
          x: gsap.quickTo(element, 'x', { duration: 1.2, ease: 'power3.out' }),
          y: gsap.quickTo(element, 'y', { duration: 1.2, ease: 'power3.out' }),
        }
      })
      const onMove = (event: PointerEvent) => {
        const box = root.getBoundingClientRect()
        const dx = (event.clientX - box.left) / box.width - 0.66
        const dy = (event.clientY - box.top) / box.height - 0.52
        layers.forEach((layer) => {
          layer.x(dx * layer.depth * 28)
          layer.y(dy * layer.depth * 20)
        })
      }
      const onLeave = () => layers.forEach((layer) => (layer.x(0), layer.y(0)))
      root.addEventListener('pointermove', onMove)
      root.addEventListener('pointerleave', onLeave)
      return () => {
        root.removeEventListener('pointermove', onMove)
        root.removeEventListener('pointerleave', onLeave)
      }
    })

    return () => media.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn('[container-type:size] relative overflow-hidden bg-glow', className)}
    >
      <div data-art="" data-reveal="self" className="absolute inset-0">
        {[25, 50, 75].map((left) => (
          <span
            key={left}
            data-grid="x"
            className="absolute inset-y-0 w-px bg-white/4"
            style={{ left: `${left}%` }}
          />
        ))}
        <span data-grid="y" className="absolute inset-x-0 top-[52%] h-px bg-white/4" />

        <MarkRings className="top-[52%] left-[66%] [--rings-unit:100cqh]" />

        {/* Padding and caption sizes: 18px / 9px / 18px on mobile → 22px / 11px / 22px on desktop */}
        <div className="absolute inset-0 flex flex-col justify-between p-[clamp(1.125rem,1.0321rem+0.381vw,1.375rem)]">
          <div className="flex justify-between font-mono text-[clamp(0.5625rem,0.5161rem+0.1905vw,0.6875rem)] leading-[1.3] text-stone-light uppercase">
            <p data-caption="">Fig. 01: Momentum</p>
            <p data-caption="" className="max-lg:hidden">
              Design / Build / Run
            </p>
          </div>
          <p
            data-caption=""
            className="font-serif text-[clamp(1.125rem,1.0321rem+0.381vw,1.375rem)] leading-[1.2] text-paper italic"
          >
            Considered, engineered, in motion.
          </p>
        </div>
      </div>
    </div>
  )
}
