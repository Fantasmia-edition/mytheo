'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const MONTHS = [
  { num: 1,  label: 'Janvier',   icon: '📜', title: 'Le Rituel d\'Apparition', desc: 'Son avatar prend vie. La quête peut commencer.', color: '#C29B40', special: 'Kit de Bienvenue' },
  { num: 2,  label: 'Février',   icon: '🌲', title: 'La Forêt des Murmures', desc: 'Son compagnon parle pour la première fois.', color: '#34d399' },
  { num: 3,  label: 'Mars',      icon: '🐉', title: 'Le Dragon de son choix', desc: 'Il décrit sa créature — elle devient réelle.', color: '#60a5fa' },
  { num: 4,  label: 'Avril',     icon: '🗺️', title: 'La Carte Secrète', desc: 'Un objet mystérieux change tout le récit.', color: '#f59e0b' },
  { num: 5,  label: 'Mai',       icon: '⚔️', title: 'L\'Épreuve du Scribe', desc: 'Sa ruse ou sa force — il choisit son chemin.', color: '#f87171' },
  { num: 6,  label: 'Juin',      icon: '🌊', title: 'La Mer des Anciens', desc: 'Un allié inattendu surgit de ses mots.', color: '#38bdf8' },
  { num: 7,  label: 'Juillet',   icon: '🔮', title: 'L\'Objet de Pouvoir', desc: 'Il dessine l\'artefact qui lui sauvera la vie.', color: '#a78bfa' },
  { num: 8,  label: 'Août',      icon: '🏰', title: 'La Citadelle Cachée', desc: 'Son architecture naît de ses dessins.', color: '#C29B40' },
  { num: 9,  label: 'Septembre', icon: '🌙', title: 'La Nuit du Grand Choix', desc: 'Le tournant de son histoire — il décide seul.', color: '#e879f9' },
  { num: 10, label: 'Octobre',   icon: '💀', title: 'L\'Ennemi Nommé', desc: 'Il donne un visage au mal — et l\'affronte.', color: '#fb7185' },
  { num: 11, label: 'Novembre',  icon: '📖', title: 'L\'Épilogue du Scribe', desc: 'Le dernier chapitre qu\'il aura jamais écrit.', color: '#fbbf24', special: 'Impression du Livre' },
  { num: 12, label: 'Décembre',  icon: '🎄', title: 'La Légende est Complète', desc: 'Son roman relié arrive sous le sapin.', color: '#34d399', special: '🎁 Livre de Noël' },
]

export default function JourneySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeMonth, setActiveMonth] = useState<number | null>(null)

  return (
    <section ref={ref} id="quete" className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 60% 40% at 50% 50%, rgba(194,155,64,0.05) 0%, transparent 60%),
          linear-gradient(180deg, #0D1B2A 0%, #0a1520 50%, #0D1B2A 100%)
        `,
      }}>

      {/* Horizontal golden path (desktop) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <div className="absolute top-1/2 left-0 right-0 h-px opacity-10"
          style={{ background: 'linear-gradient(90deg, transparent 5%, #C29B40 20%, #C29B40 80%, transparent 95%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ La Quête</span>
          <h2 className="font-cinzel text-5xl md:text-6xl font-bold text-creme mt-3 mb-5 leading-tight">
            12 mois de légende.<br />
            <span className="gold-shimmer">1 roman à son nom.</span>
          </h2>
          <p className="font-montserrat text-creme/60 text-lg max-w-xl mx-auto">
            Chaque courrier fait avancer sa quête. Chaque choix façonne le chapitre suivant.
            En décembre, tout s'unit en un livre unique au monde.
          </p>
        </motion.div>

        {/* Month grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {MONTHS.map((month, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onMouseEnter={() => setActiveMonth(i)}
              onMouseLeave={() => setActiveMonth(null)}
              className="relative rounded-xl p-4 cursor-default transition-all duration-300 group"
              style={{
                background: activeMonth === i
                  ? `radial-gradient(ellipse at 50% 0%, ${month.color}20 0%, rgba(10,15,30,0.9) 80%)`
                  : month.num === 1 || month.num === 12
                    ? `rgba(194,155,64,0.06)`
                    : 'rgba(255,255,255,0.02)',
                border: activeMonth === i
                  ? `1.5px solid ${month.color}60`
                  : month.num === 1 || month.num === 12
                    ? '1px solid rgba(194,155,64,0.2)'
                    : '1px solid rgba(255,255,255,0.06)',
                boxShadow: activeMonth === i ? `0 8px 30px ${month.color}20` : 'none',
                transform: activeMonth === i ? 'translateY(-4px)' : 'none',
              }}>

              {/* Special badge */}
              {month.special && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-cinzel font-bold whitespace-nowrap"
                  style={{ background: month.color, color: '#0D1B2A' }}>
                  {month.num === 1 ? '⭐ Offert' : month.special}
                </div>
              )}

              {/* Month number + icon */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-cinzel text-xs font-bold" style={{ color: month.color, opacity: 0.5 }}>
                  {String(month.num).padStart(2, '0')}
                </span>
                <motion.span className="text-lg" animate={activeMonth === i ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.6 }}>
                  {month.icon}
                </motion.span>
              </div>

              {/* Month label */}
              <p className="font-cinzel text-creme/40 text-[10px] tracking-wider uppercase mb-1.5">{month.label}</p>

              {/* Chapter title */}
              <p className="font-cinzel text-creme/80 text-xs font-semibold leading-snug mb-2">{month.title}</p>

              {/* Description — on hover */}
              <AnimatePresence>
                {activeMonth === i && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="font-montserrat text-creme/55 text-[11px] leading-relaxed overflow-hidden">
                    {month.desc}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Progress dot */}
              <div className="mt-3 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ background: activeMonth === i ? month.color : `${month.color}30` }} />
                {month.num < 12 && (
                  <div className="flex-1 h-px" style={{ background: `${month.color}20` }} />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-8 rounded-2xl text-center relative overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at 50% -20%, rgba(194,155,64,0.12) 0%, rgba(10,15,30,0.95) 70%)',
            border: '1px solid rgba(194,155,64,0.2)',
          }}>
          {/* Sparkles */}
          {[{x:'8%',y:'30%'},{x:'92%',y:'25%'},{x:'50%',y:'10%'}].map((p,i) => (
            <motion.div key={i} className="absolute pointer-events-none" style={{ left: p.x, top: p.y }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="#C29B40">
                <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" />
              </svg>
            </motion.div>
          ))}
          <p className="font-cinzel text-or text-sm tracking-widest uppercase mb-2">✦ Chaque mois est unique</p>
          <p className="font-cinzel text-creme text-2xl md:text-3xl font-bold mb-3">
            Aucun enfant ne vivra la même histoire.
          </p>
          <p className="font-montserrat text-creme/55 text-base max-w-lg mx-auto">
            Les choix, les descriptions, les dessins de votre enfant construisent un univers qui ne ressemble à aucun autre.
            Son livre de décembre sera le seul exemplaire au monde.
          </p>
        </motion.div>
      </div>

      <div className="divider-or absolute bottom-0 left-8 right-8 opacity-20" />
    </section>
  )
}
