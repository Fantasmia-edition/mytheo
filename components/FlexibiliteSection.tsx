'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'

function HourglassIcon({ animated }: { animated: boolean }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="hgGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8D08A" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
      {/* Frame */}
      <path d="M16 8 H48 L48 13 C48 26 38 32 32 32 C26 32 16 26 16 13 Z" fill="rgba(194,155,64,0.12)" stroke="url(#hgGold)" strokeWidth="1.8" />
      <path d="M16 56 H48 L48 51 C48 38 38 32 32 32 C26 32 16 38 16 51 Z" fill="rgba(194,155,64,0.25)" stroke="url(#hgGold)" strokeWidth="1.8" />
      {/* Top and bottom caps */}
      <line x1="13" y1="8" x2="51" y2="8" stroke="url(#hgGold)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="13" y1="56" x2="51" y2="56" stroke="url(#hgGold)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Sand flow */}
      {animated && (
        <>
          <motion.path d="M32 32 L28 46 L36 46 Z" fill="rgba(194,155,64,0.7)"
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }} />
          <motion.ellipse cx="32" cy="51" rx="9" ry="4" fill="rgba(194,155,64,0.4)"
            animate={{ rx: [5, 11, 5] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </>
      )}
      {!animated && (
        <>
          <path d="M32 32 L28 46 L36 46 Z" fill="rgba(194,155,64,0.35)" />
          <ellipse cx="32" cy="51" rx="8" ry="3.5" fill="rgba(194,155,64,0.25)" />
        </>
      )}
      {/* Sand top */}
      <ellipse cx="32" cy="14" rx="9" ry="3" fill="rgba(194,155,64,0.3)" />
    </svg>
  )
}

function CompassIcon({ animated }: { animated: boolean }) {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180
    const r1 = 20, r2 = 24
    return { x1: 32 + r1 * Math.sin(angle), y1: 32 - r1 * Math.cos(angle), x2: 32 + r2 * Math.sin(angle), y2: 32 - r2 * Math.cos(angle), major: i % 3 === 0 }
  })
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <defs>
        <radialGradient id="compassBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(194,155,64,0.12)" />
          <stop offset="100%" stopColor="rgba(194,155,64,0.03)" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="26" stroke="rgba(194,155,64,0.4)" strokeWidth="1.5" fill="url(#compassBg)" />
      <circle cx="32" cy="32" r="22" stroke="rgba(194,155,64,0.15)" strokeWidth="0.8" fill="none" />
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke="#C29B40" strokeWidth={t.major ? 1.8 : 0.8} opacity={t.major ? 0.9 : 0.35} />
      ))}
      {['N','S','E','O'].map((l, i) => {
        const angles = [0, 180, 90, 270]
        const a = (angles[i] * Math.PI) / 180
        return <text key={l} x={32 + 14.5 * Math.sin(a) - 3} y={32 - 14.5 * Math.cos(a) + 4}
          fontFamily="Cinzel" fontSize="6" fill="#C29B40" opacity={l === 'N' ? 0.9 : 0.4}>{l}</text>
      })}
      {animated ? (
        <motion.g style={{ transformOrigin: '32px 32px' }}
          animate={{ rotate: [0, 30, -12, 25, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M32 14 L34 32 L32 30 L30 32 Z" fill="#C29B40" />
          <path d="M32 50 L30 32 L32 34 L34 32 Z" fill="rgba(194,155,64,0.4)" />
        </motion.g>
      ) : (
        <g>
          <path d="M32 14 L34 32 L32 30 L30 32 Z" fill="#C29B40" opacity="0.6" />
          <path d="M32 50 L30 32 L32 34 L34 32 Z" fill="rgba(194,155,64,0.3)" />
        </g>
      )}
      <circle cx="32" cy="32" r="3" fill="#C29B40" />
      <circle cx="32" cy="32" r="1.5" fill="#0D1B2A" />
    </svg>
  )
}

const plans = [
  {
    id: 'patient',
    icon: (a: boolean) => <HourglassIcon animated={a} />,
    badge: null,
    name: 'L\'Apprenti Héros',
    tagline: 'Pour les enfants qui savourent chaque mission',
    frequency: '1 courrier / mois',
    price: '19',
    accent: '#a78bfa',
    features: [
      { icon: '✉️', text: '1 lettre de mission scellée' },
      { icon: '📖', text: '1 chapitre illustré (8-12 pages)' },
      { icon: '📲', text: 'Envoi depuis votre téléphone' },
      { icon: '🔓', text: 'Sans engagement' },
    ],
  },
  {
    id: 'explorateur',
    icon: (a: boolean) => <CompassIcon animated={a} />,
    badge: '⭐ Bestseller',
    name: 'L\'Explorateur Intrépide',
    tagline: 'Pour ceux qui veulent forger leur légende vite',
    frequency: '2 courriers / mois',
    price: '32',
    accent: '#C29B40',
    highlight: true,
    features: [
      { icon: '✉️', text: '2 lettres de mission scellées' },
      { icon: '📖', text: '2 chapitres illustrés' },
      { icon: '🗺️', text: 'Carte du monde de l\'aventure' },
      { icon: '⚡', text: 'Envoi prioritaire' },
      { icon: '🔓', text: 'Sans engagement' },
    ],
  },
]

export default function FlexibiliteSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="offres" ref={ref} className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 90% 50%, rgba(120,60,220,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 60% 60% at 10% 40%, rgba(30,80,160,0.08) 0%, transparent 55%),
          linear-gradient(180deg, #0D1B2A 0%, #0a1020 100%)
        `,
      }}>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Votre Rythme</span>
          <h2 className="font-cinzel text-5xl md:text-6xl font-bold text-creme mt-3 mb-4">
            Choisissez votre cadence
          </h2>
          <p className="font-montserrat text-creme/60 text-lg max-w-xl mx-auto">
            Ajustable en un clic. Sans engagement. Vous restez libres.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-14">
          {plans.map((plan, i) => (
            <motion.div key={plan.id}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onMouseEnter={() => setHovered(plan.id)} onMouseLeave={() => setHovered(null)}
              className="relative rounded-2xl overflow-hidden cursor-default transition-transform duration-300 hover:scale-[1.02]"
              style={{
                background: plan.highlight
                  ? `radial-gradient(ellipse at 50% -20%, ${plan.accent}20 0%, rgba(10,15,30,0.95) 70%)`
                  : 'rgba(255,255,255,0.02)',
                border: plan.highlight
                  ? `1.5px solid ${plan.accent}60`
                  : '1px solid rgba(255,255,255,0.07)',
                boxShadow: plan.highlight
                  ? `0 0 60px ${plan.accent}15, 0 20px 50px rgba(0,0,0,0.4)`
                  : '0 10px 30px rgba(0,0,0,0.3)',
              }}>

              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${plan.accent}, transparent)` }} />

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full font-cinzel text-xs tracking-wider text-nuit font-bold"
                  style={{ background: `linear-gradient(135deg, ${plan.accent}, #E8D08A)` }}>
                  {plan.badge}
                </div>
              )}

              <div className="p-8 pt-6">
                {/* Icon */}
                <div className="mb-5">{plan.icon(hovered === plan.id)}</div>

                {/* Name & tagline */}
                <h3 className="font-cinzel text-creme text-xl font-bold mb-1">{plan.name}</h3>
                <p className="font-montserrat mb-5" style={{ color: plan.accent, fontSize: 13, opacity: 0.8 }}>{plan.tagline}</p>

                {/* Frequency chip */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6"
                  style={{ background: `${plan.accent}15`, border: `1px solid ${plan.accent}35` }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill={plan.accent}>
                    <circle cx="5" cy="5" r="4" />
                  </svg>
                  <span className="font-montserrat text-xs" style={{ color: plan.accent }}>{plan.frequency}</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-7">
                  <span className="font-cinzel text-5xl font-bold text-creme">{plan.price}€</span>
                  <span className="font-montserrat text-creme/35 text-sm">/mois</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <span className="text-base">{f.icon}</span>
                      <span className="font-montserrat text-creme/70 text-sm">{f.text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={`/rejoindre?plan=${plan.id}`}
                  className="block w-full py-4 font-cinzel text-sm font-bold tracking-wider rounded-sm transition-all duration-300 text-center"
                  style={plan.highlight ? {
                    background: `linear-gradient(135deg, ${plan.accent}, #E8D08A, ${plan.accent})`,
                    backgroundSize: '200%',
                    color: '#0D1B2A',
                    boxShadow: `0 4px 20px ${plan.accent}50`,
                  } : {
                    background: 'transparent',
                    border: `1.5px solid ${plan.accent}50`,
                    color: plan.accent,
                  }}>
                  {plan.highlight ? 'Commencer l\'aventure ✦' : 'Choisir ce plan'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reassurance strip */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { icon: '🔓', text: 'Sans engagement' },
            { icon: '⚡', text: 'Ajustable à tout moment' },
            { icon: '🚚', text: 'Livraison offerte en France' },
            { icon: '🎁', text: 'Kit de bienvenue gratuit' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full"
              style={{ border: '1px solid rgba(194,155,64,0.15)', background: 'rgba(194,155,64,0.04)' }}>
              <span className="text-lg">{item.icon}</span>
              <span className="font-montserrat text-creme/60 text-sm">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="divider-or absolute bottom-0 left-8 right-8 opacity-20" />
    </section>
  )
}
