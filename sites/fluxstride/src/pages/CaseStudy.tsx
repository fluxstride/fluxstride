import { CaseStudyView } from '@/components/case-study/CaseStudyView'
import { nextCaseStudy, type CaseStudy } from '@/content/case-studies'

/*
 * Design: "Case Study: <service>" (desktop 1440, mobile 390). One route per case study
 * file in src/content/case-studies/studies, registered in App.tsx.
 */
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const draft =
    import.meta.env.DEV && study.status === 'draft'
      ? { title: 'Draft · not published', file: `src/content/case-studies/studies/${study.slug}.ts` }
      : undefined

  return <CaseStudyView study={study} next={nextCaseStudy(study)} draft={draft} />
}
