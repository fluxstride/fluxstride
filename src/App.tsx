import { Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { Contact } from '@/pages/Contact'
import { Home } from '@/pages/Home'
import { Insights } from '@/pages/Insights'
import { NotFound } from '@/pages/NotFound'
import { Process } from '@/pages/Process'
import { Services } from '@/pages/Services'
import { Studio } from '@/pages/Studio'
import { Work } from '@/pages/Work'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="services" element={<Services />} />
        <Route path="process" element={<Process />} />
        <Route path="studio" element={<Studio />} />
        <Route path="insights" element={<Insights />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      {/* A standalone screen in the design, without the site header and footer. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
