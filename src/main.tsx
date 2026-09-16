import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="container-page py-section">
      <p className="font-mono text-label text-stone uppercase">(01) Independent digital agency</p>
      <h1 className="text-display-2xl text-ink">
        We build software that keeps <em className="font-serif font-normal">moving.</em>
      </h1>
      <div className="mt-6 size-20 shape-mark bg-flux" />
    </main>
  </StrictMode>,
)
