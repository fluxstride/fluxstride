import { Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { pageFor } from '@/lib/seo'
import { Home } from '@/pages/Home'
import { Process } from '@/pages/Process'
import { Services } from '@/pages/Services'
import { Studio } from '@/pages/Studio'
import { Work } from '@/pages/Work'

// Temporary: each route renders its SEO title until the real page lands.
function Stub({ path }: { path: string }) {
  return (
    <section className="container-page py-section">
      <h1 className="text-heading-xl">{pageFor(path).title}</h1>
    </section>
  )
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="services" element={<Services />} />
        <Route path="process" element={<Process />} />
        <Route path="studio" element={<Studio />} />
        <Route path="insights" element={<Stub path="/insights" />} />
        <Route path="contact" element={<Stub path="/contact" />} />
        <Route path="*" element={<Stub path="/404" />} />
      </Route>
    </Routes>
  )
}
