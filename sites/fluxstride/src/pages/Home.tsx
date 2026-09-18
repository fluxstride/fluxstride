import { DisciplineMarquee } from '@/components/home/DisciplineMarquee'
import { Hero } from '@/components/home/Hero'
import { ProcessSection } from '@/components/home/ProcessSection'
import { ProofSection } from '@/components/home/ProofSection'
import { SelectedWork } from '@/components/home/SelectedWork'
import { ServicesSection } from '@/components/home/ServicesSection'
import { StartProject } from '@/components/home/StartProject'

export function Home() {
  return (
    <>
      <Hero />
      <DisciplineMarquee />
      <ServicesSection />
      <SelectedWork />
      <ProcessSection />
      <ProofSection />
      <StartProject />
    </>
  )
}
