import { DisciplineMarquee } from '@/components/home/DisciplineMarquee'
import { Hero } from '@/components/home/Hero'
import { SelectedWork } from '@/components/home/SelectedWork'
import { ServicesSection } from '@/components/home/ServicesSection'

export function Home() {
  return (
    <>
      <Hero />
      <DisciplineMarquee />
      <ServicesSection />
      <SelectedWork />
    </>
  )
}
