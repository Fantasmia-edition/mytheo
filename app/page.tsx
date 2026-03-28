import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import NostalgiaSection from '@/components/NostalgiaSection'
import RituelSection from '@/components/RituelSection'
import CoAuteurSection from '@/components/CoAuteurSection'
import JourneySection from '@/components/JourneySection'
import FlexibiliteSection from '@/components/FlexibiliteSection'
import GrandFinalSection from '@/components/GrandFinalSection'
import ParentsSection from '@/components/ParentsSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      {/* 1. Le rêve — accrocher émotionnellement */}
      <HeroSection />

      {/* 2. Le pourquoi — nostalgie du courrier papier */}
      <NostalgiaSection />

      {/* 3. L'entrée dans la magie — Rituel d'Apparition */}
      <RituelSection />

      {/* 4. Le mécanisme — comment l'enfant co-crée */}
      <CoAuteurSection />

      {/* 5. La quête — 12 mois, une progression */}
      <JourneySection />

      {/* 6. Les offres — choisir son rythme */}
      <FlexibiliteSection />

      {/* 7. L'apothéose — le livre de Noël */}
      <GrandFinalSection />

      {/* 8. Pour les parents — confiance, réassurance */}
      <ParentsSection />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. Footer + CTA final */}
      <Footer />
    </main>
  )
}
