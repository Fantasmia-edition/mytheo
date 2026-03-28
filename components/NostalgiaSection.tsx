'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function LetterScene() {
  return (
    <div className="relative" style={{ width: 400, height: 480 }}>

      {/* Warm room atmosphere */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1a0c02 0%, #2d1608 40%, #1a0c00 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
        }}>

        {/* Window — warm sunlight */}
        <div className="absolute top-0 right-0 w-44 h-full"
          style={{ background: 'linear-gradient(to left, rgba(255,185,60,0.18), transparent)' }} />
        <div className="absolute top-4 right-4 w-32 h-44 rounded-sm border border-yellow-300/20"
          style={{ background: 'rgba(255,200,80,0.06)' }}>
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border border-yellow-300/15 m-0.5 rounded-sm" />
            ))}
          </div>
        </div>

        {/* Floating light dust */}
        {[...Array(14)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-yellow-200"
            style={{
              width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
              left: 50 + Math.random() * 300, top: 20 + Math.random() * 300, opacity: 0,
            }}
            animate={{ opacity: [0, 0.5, 0], y: [-5, 10, -5], x: [0, Math.random() * 8 - 4, 0] }}
            transition={{ duration: 3 + Math.random() * 3, delay: Math.random() * 4, repeat: Infinity }}
          />
        ))}

        {/* ── TABLE SURFACE ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[55%] rounded-b-2xl"
          style={{
            background: 'linear-gradient(to top, #3a1e08 0%, #2a1406 100%)',
            boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.3)',
          }}>
          {/* Wood grain */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute left-0 right-0 opacity-10"
              style={{
                top: i * 14 + '%',
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(200,140,60,0.5), transparent)',
              }} />
          ))}
        </div>

        {/* ── INK BOTTLE ── */}
        <motion.div animate={{ rotate: [-1, 1, -1] }} transition={{ duration: 5, repeat: Infinity }}
          className="absolute" style={{ bottom: 90, left: 30 }}>
          <svg width="36" height="56" viewBox="0 0 36 56" fill="none">
            <rect x="12" y="0" width="12" height="8" rx="2" fill="#2a1a0a" />
            <rect x="10" y="7" width="16" height="5" rx="1" fill="#C29B40" opacity="0.6" />
            <path d="M6 12 Q2 20 2 30 L2 50 Q2 54 6 54 L30 54 Q34 54 34 50 L34 30 Q34 20 30 12 Z" fill="rgba(10,20,40,0.85)" stroke="#C29B40" strokeWidth="0.8" opacity="0.9" />
            <path d="M6 12 Q2 20 2 30 L2 40 Q12 36 18 38 Q24 40 34 36 L34 30 Q34 20 30 12 Z" fill="rgba(10,50,120,0.3)" />
            <text x="11" y="44" fontFamily="Cinzel" fontSize="8" fill="rgba(194,155,64,0.5)">𝑠</text>
          </svg>
        </motion.div>

        {/* ── FOUNTAIN PEN ── */}
        <motion.div animate={{ rotate: [15, 18, 15] }} transition={{ duration: 4, repeat: Infinity }}
          className="absolute" style={{ bottom: 105, left: 75 }}>
          <svg width="18" height="130" viewBox="0 0 18 130" fill="none">
            <rect x="4" y="0" width="10" height="75" rx="5" fill="#2a1a0a" />
            <rect x="5" y="4" width="8" height="65" rx="4" fill="linear-gradient(180deg,#4a3520,#2a1a0a)" />
            <rect x="6" y="28" width="6" height="2" rx="1" fill="#C29B40" opacity="0.7" />
            <rect x="6" y="22" width="6" height="1.5" rx="1" fill="#C29B40" opacity="0.5" />
            <path d="M4 72 L9 90 L14 72 Z" fill="#C29B40" />
            <path d="M9 90 L9 108" stroke="#1a1a60" strokeWidth="1.5" />
            <path d="M9 90 L9 105" stroke="rgba(100,100,255,0.3)" strokeWidth="0.8" />
          </svg>
        </motion.div>

        {/* ── THE LETTER ── */}
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute" style={{ bottom: 100, left: '50%', transform: 'translateX(-30%) rotate(-4deg)' }}>

          <div className="relative rounded-sm shadow-2xl"
            style={{
              width: 200, height: 250,
              background: 'radial-gradient(ellipse at 30% 20%, #FEFAE0 0%, #EFE5BF 60%, #E2D49A 100%)',
              boxShadow: '4px 8px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(194,155,64,0.35)',
            }}>

            {/* Parchment lines */}
            {[40, 60, 80, 100, 120, 140, 160, 180, 200].map((y, i) => (
              <div key={i} className="absolute rounded-full"
                style={{ left: 16, top: y, width: i % 4 === 3 ? 100 : 168, height: 1.5, background: 'rgba(100,70,30,0.18)' }} />
            ))}

            {/* Big decorative S */}
            <div className="absolute top-3 left-3">
              <svg width="38" height="42" viewBox="0 0 38 42">
                <text x="0" y="34" fontFamily="Cinzel, serif" fontSize="34" fill="#C29B40" opacity="0.45" fontStyle="italic">𝒮</text>
              </svg>
            </div>

            {/* A few handwritten "words" */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 250" fill="none">
              <path d="M18 55 Q40 52 65 56 Q85 59 100 54" stroke="rgba(50,30,10,0.2)" strokeWidth="0.8" fill="none" />
              <path d="M18 75 Q50 72 90 76 Q120 79 160 73" stroke="rgba(50,30,10,0.18)" strokeWidth="0.8" fill="none" />
              <path d="M18 115 Q60 112 110 116" stroke="rgba(50,30,10,0.15)" strokeWidth="0.8" fill="none" />
            </svg>

            {/* Wax seal at bottom center */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <div className="relative w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'radial-gradient(circle at 35% 35%, #e05050, #8b1a1a)', boxShadow: '0 4px 14px rgba(0,0,0,0.4)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L13.5 8H19L14.5 11.5L16.5 17L12 13.5L7.5 17L9.5 11.5L5 8H10.5Z"
                    fill="none" stroke="rgba(255,200,180,0.8)" strokeWidth="1.2" />
                </svg>
              </div>
              {/* Wax drip */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{ background: '#8b1a1a' }} />
            </div>
          </div>
        </motion.div>

        {/* ── CHILD HANDS ── */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none">
          <svg width="280" height="120" viewBox="0 0 280 120" fill="none">
            {/* Left hand */}
            <path d="M70 120 C65 96, 58 70, 62 52 C64 43, 74 39, 80 46 C82 36, 90 31, 97 37 C99 27, 108 24, 114 31 C116 22, 126 20, 130 28 L134 65 C140 58, 147 56, 151 61 C155 66, 151 77, 147 83 L130 100 L100 110 Z"
              fill="#C68642" opacity="0.9" />
            {/* Right hand */}
            <path d="M210 120 C215 96, 222 70, 218 52 C216 43, 206 39, 200 46 C198 36, 190 31, 183 37 C181 27, 172 24, 166 31 C164 22, 154 20, 150 28 L146 65 C140 58, 133 56, 129 61 C125 66, 129 77, 133 83 L150 100 L180 110 Z"
              fill="#C68642" opacity="0.9" />
            {/* Knuckle details */}
            <path d="M80 58 Q86 54 92 58" stroke="rgba(100,60,20,0.3)" strokeWidth="1" fill="none" />
            <path d="M98 44 Q104 40 110 44" stroke="rgba(100,60,20,0.3)" strokeWidth="1" fill="none" />
            <path d="M200 58 Q194 54 188 58" stroke="rgba(100,60,20,0.3)" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Warm glow from table */}
        <div className="absolute bottom-0 left-1/4 right-1/4 h-16 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(200,120,30,0.15), transparent)', filter: 'blur(10px)' }} />
      </div>

      {/* External warm glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-12 pointer-events-none"
        style={{ background: 'rgba(200,120,30,0.18)', filter: 'blur(18px)' }} />
    </div>
  )
}

const details = [
  { icon: '🕯️', color: 'rgba(155,28,28,0.12)',  border: 'rgba(200,50,50,0.25)', text: 'Scellée à la cire, à son nom — personne d\'autre ne peut l\'ouvrir' },
  { icon: '📜', color: 'rgba(146,64,14,0.12)',   border: 'rgba(194,100,30,0.25)', text: 'Un parchemin de mission qu\'il devra compléter à la plume' },
  { icon: '🃏', color: 'rgba(100,80,200,0.10)',  border: 'rgba(120,100,220,0.25)', text: 'Des cartes d\'objets magiques physiques à collectionner' },
  { icon: '✍️', color: 'rgba(194,155,64,0.08)',  border: 'rgba(194,155,64,0.20)', text: 'Ses dessins et ses mots façonnent le chapitre suivant' },
]

export default function NostalgiaSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="concept" ref={ref} className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 20% 50%, rgba(146,64,14,0.16) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 85% 30%, rgba(194,155,64,0.08) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 50% 100%, rgba(60,20,10,0.3) 0%, transparent 50%),
          linear-gradient(180deg, #0D1B2A 0%, #0e1a0c 50%, #0D1B2A 100%)
        `,
      }}>

      {/* Decorative vertical line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(194,155,64,0.1) 30%, rgba(194,155,64,0.1) 70%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT : Illustration */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }} className="flex justify-center">
            <LetterScene />
          </motion.div>

          {/* RIGHT : Text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ La Lettre</span>
              <h2 className="font-cinzel text-5xl md:text-6xl font-bold text-creme mt-3 mb-6 leading-tight">
                Sa lettre de mission<br />
                <span className="gold-shimmer">dans votre boîte.</span>
              </h2>
              <p className="font-montserrat text-creme/70 text-lg leading-relaxed mb-8">
                Chaque mois, une enveloppe épaisse atterrit dans votre boîte aux lettres.
                Elle est scellée à la cire rouge. Elle porte son nom.
                <br /><br />
                À l'intérieur : <span className="text-or font-semibold">sa mission du mois</span> — un parchemin
                qu'il devra compléter à la plume, avec ses propres mots et ses propres dessins.
                Ce qu'il écrit aujourd'hui devient le chapitre qu'il reçoit le mois suivant.
              </p>
            </motion.div>

            {/* Detail cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {details.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: m.color, border: `1px solid ${m.border}` }}>
                  <span className="text-2xl mt-0.5 flex-shrink-0">{m.icon}</span>
                  <p className="font-montserrat text-creme/75 text-sm leading-relaxed">{m.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Pullquote */}
            <motion.blockquote initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.7 }}
              className="relative pl-6 py-2"
              style={{ borderLeft: '3px solid #C29B40' }}>
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: '#C29B40' }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="#0D1B2A">
                  <path d="M0 8 C0 4 2 0 5 0 C3.5 2 3 4 4 5 L2 5 L0 8ZM5 8 C5 4 7 0 10 0 C8.5 2 8 4 9 5 L7 5 L5 8Z" />
                </svg>
              </div>
              <p className="font-cinzel text-or/85 text-base italic leading-relaxed">
                "La lettre que chaque enfant attendait — sans qu&apos;il le sache encore."
              </p>
            </motion.blockquote>
          </div>
        </div>
      </div>

      <div className="divider-or absolute bottom-0 left-8 right-8 opacity-25" />
    </section>
  )
}
