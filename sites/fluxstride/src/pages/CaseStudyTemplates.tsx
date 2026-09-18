import { Link } from 'react-router'
import { CaseStudyView } from '@/components/case-study/CaseStudyView'
import { PageHeader } from '@/components/sections/PageHeader'
import { ArrowIcon } from '@fluxstride/design-system/ui/ArrowIcon'
import { Accent, Eyebrow } from '@fluxstride/design-system/ui/Typography'
import {
  findPlaceholders,
  serviceNames,
  templates,
  templateTitle,
  type CaseStudy,
} from '@/content/case-studies'

/*
 * Development only (see App.tsx): browse the starter templates the way they render.
 * The matching designs are the "Case Study Template — <name>" frames in the Pencil file.
 */

/** /work/templates: one row per template. */
export function CaseStudyTemplates() {
  return (
    <>
      <PageHeader
        eyebrow="(Dev only) Starter templates · not published"
        title={
          <>
            Case study <Accent>templates.</Accent>
          </>
        }
        intro={
          <>
            Copy one with <code className="font-mono text-[0.9em]">pnpm new:case-study</code>. The full guide
            is in docs/case-studies.md.
          </>
        }
      />
      <ul className="container-page pb-section">
        {Object.entries(templates).map(([id, template]) => (
          <li key={id} className="border-t border-line">
            <Link
              to={`/work/templates/${id}`}
              className="group flex items-center justify-between gap-6 py-6 lg:py-8"
            >
              <span className="flex flex-col gap-2">
                <span className="text-title-sm">{templateTitle(template)}</span>
                <Eyebrow>
                  {serviceNames(template).join(' + ')} · {template.sections.length} sections ·{' '}
                  {findPlaceholders(template).length} placeholders to fill
                </Eyebrow>
              </span>
              <ArrowIcon size={24} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

/** /work/templates/<id> */
export function CaseStudyTemplatePreview({ id, template }: { id: string; template: CaseStudy }) {
  return (
    <CaseStudyView
      study={template}
      draft={{
        title: `Starter template · ${templateTitle(template)}`,
        file: `src/content/case-studies/templates/${id}.ts`,
      }}
    />
  )
}
