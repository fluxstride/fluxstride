import { ValueGrid } from '@/components/sections/ValueGrid'
import { Accent } from '@/components/ui/Typography'
import { values } from '@/content/studio'

/* Design: Studio / Values (ink). See ValueGrid. */
export function ValuesSection() {
  return (
    <ValueGrid
      titleId="values-title"
      title={
        <>
          What we <Accent className="max-lg:text-[0.925em]">stand for.</Accent>
        </>
      }
      items={values}
    />
  )
}
