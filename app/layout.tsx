import type { Metadata } from 'next'
import { Cinzel, Montserrat } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: "L'Odyssée des Scribes — L'aventure dont votre enfant tient la plume",
  description:
    "Le premier courrier interactif où votre enfant co-écrit son aventure mois après mois. Recevez votre Kit de Bienvenue gratuitement.",
  keywords: "livre enfant, abonnement livre, cadeau enfant, histoire personnalisée, livre personnalisé",
  openGraph: {
    title: "L'Odyssée des Scribes",
    description: "Offrez-lui l'aventure dont vous avez toujours rêvé.",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${montserrat.variable}`}>
      <body className="font-montserrat antialiased">{children}</body>
    </html>
  )
}
