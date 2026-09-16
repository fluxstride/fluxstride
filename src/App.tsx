import { Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { pageFor } from '@/lib/seo'

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
        <Route index element={<Stub path="/" />} />
        <Route path="work" element={<Stub path="/work" />} />
        <Route path="services" element={<Stub path="/services" />} />
        <Route path="process" element={<Stub path="/process" />} />
        <Route path="studio" element={<Stub path="/studio" />} />
        <Route path="insights" element={<Stub path="/insights" />} />
        <Route path="contact" element={<Stub path="/contact" />} />
        <Route path="*" element={<Stub path="/404" />} />
      </Route>
    </Routes>
  )
}
