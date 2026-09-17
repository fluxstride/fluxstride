import { Route, Routes } from 'react-router'
import { CookieConsent } from '@/components/consent/CookieConsent'
import { Layout } from '@/components/layout/Layout'
import { templates, visibleCaseStudies } from '@/content/case-studies'
import { legalDocuments } from '@/content/legal'
import { CaseStudyPage } from '@/pages/CaseStudy'
import { CaseStudyTemplatePreview, CaseStudyTemplates } from '@/pages/CaseStudyTemplates'
import { Contact } from '@/pages/Contact'
import { Home } from '@/pages/Home'
import { Insights } from '@/pages/Insights'
import { LegalPage } from '@/pages/Legal'
import { NotFound } from '@/pages/NotFound'
import { Process } from '@/pages/Process'
import { Services } from '@/pages/Services'
import { Studio } from '@/pages/Studio'
import { Work } from '@/pages/Work'

export function App() {
  return (
    <>
      {/* First in the DOM, so keyboard users reach the cookie banner before the page. */}
      <CookieConsent />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          {/* One route per case study file; unknown slugs fall through to the 404. */}
          {visibleCaseStudies.map((study) => (
            <Route key={study.slug} path={`work/${study.slug}`} element={<CaseStudyPage study={study} />} />
          ))}
          {import.meta.env.DEV ? (
            <>
              <Route path="work/templates" element={<CaseStudyTemplates />} />
              {Object.values(templates).map((template) => (
                <Route
                  key={template.service}
                  path={`work/templates/${template.service}`}
                  element={<CaseStudyTemplatePreview template={template} />}
                />
              ))}
            </>
          ) : null}
          <Route path="services" element={<Services />} />
          <Route path="process" element={<Process />} />
          <Route path="studio" element={<Studio />} />
          <Route path="insights" element={<Insights />} />
          <Route path="contact" element={<Contact />} />
          {legalDocuments.map((doc) => (
            <Route key={doc.slug} path={doc.slug} element={<LegalPage doc={doc} />} />
          ))}
        </Route>
        {/* A standalone screen in the design, without the site header and footer. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
