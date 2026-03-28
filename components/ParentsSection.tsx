'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const PILLARS = [
  {
    icon: '📵',
    color: '#34d399',
    title: '100% Sans Écran',
    desc: 'Papier, crayon, parchemin. L\'enfant écrit, dessine, touche. Zéro temps de tablette, zéro notification.',
    badge: 'Éducatif',
  },
  {
    icon: '✍️',
    color: '#C29B40',
    title: 'Développe la Créativité',
    desc: 'Écriture narrative, vocabulaire, expression artistique — intégrés dans l\'aventure, jamais comme une leçon.',
    badge: 'Cognitif',
  },
  {
    icon: '📮',
    color: '#60a5fa',
    title: 'Rituel Familial',
    desc: 'L\'attente du courrier crée un moment partagé. L\'ouvrir ensemble, commenter ses dessins — du lien réel.',
    badge: 'Famille',
  },
  {
    icon: '🖨️',
    color: '#f59e0b',
    title: 'Imprimé Localement',
    desc: 'Chaque chapitre est imprimé en France, sur papier certifié. Qualité premium, faible empreinte carbone.',
    badge: 'Responsable',
  },
]

const TESTIMONIALS = [
  {
    text: "Ma fille attend le facteur avec une fébrilité que je n'avais jamais vue. Elle a rempli son parchemin pendant une heure, totalement concentrée.",
    name: 'Amélie D.', role: 'Maman de Lou, 9 ans',
    stars: 5,
  },
  {
    text: "Quand le livre final est arrivé, il a reconnu chaque personnage qu'il avait inventé. Il a pleuré de joie. C'était son œuvre, vraiment.",
    name: 'Romain T.', role: 'Papa de Nathan, 11 ans',
    stars: 5,
  },
  {
    text: "Je cherchais un cadeau qui ne soit pas un écran de plus. Mytheo, c'est exactement ce que je voulais — du merveilleux, de l'écriture, et zéro tablette.",
    name: 'Clara M.', role: 'Maman de Zoé, 8 ans',
    stars: 5,
  },
]

export default function ParentsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} id="parents" className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 20% 50%, rgba(30,80,40,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 50%, rgba(20,50,100,0.10) 0%, transparent 55%),
          linear-gradient(180deg, #0D1B2A 0%, #0b1a10 50%, #0D1B2A 100%)
        `,
      }}>

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Pour les Parents</span>
          <h2 className="font-cinzel text-5xl md:text-6xl font-bold text-creme mt-3 mb-5 leading-tight">
            Du merveilleux.<br />
            <span className="gold-shimmer">Pas du numérique.</span>
          </h2>
          <p className="font-montserrat text-creme/60 text-lg max-w-2xl mx-auto">
            Ce que les parents adorent autant que leurs enfants — et pourquoi.
          </p>
        </motion.div>

        {/* 4 pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {PILLARS.map((pillar, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-300"
              style={{
                background: `radial-gradient(ellipse at 50% -10%, ${pillar.color}14 0%, rgba(10,15,25,0.95) 70%)`,
                border: `1px solid ${pillar.color}25`,
              }}>
              {/* Badge */}
              <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full font-montserrat text-[10px] font-semibold"
                style={{ background: `${pillar.color}18`, color: pillar.color, border: `1px solid ${pillar.color}30` }}>
                {pillar.badge}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                style={{ background: `${pillar.color}15`, border: `1px solid ${pillar.color}30` }}>
                {pillar.icon}
              </div>

              <h3 className="font-cinzel text-creme text-base font-bold mb-3">{pillar.title}</h3>
              <p className="font-montserrat text-creme/55 text-sm leading-relaxed">{pillar.desc}</p>

              {/* Bottom accent */}
              <div className="mt-5 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${pillar.color}60, transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12">
          <p className="font-cinzel text-center text-creme/40 text-xs tracking-[0.3em] uppercase mb-8">Ce que disent les familles</p>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="rounded-2xl p-6 relative"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(194,155,64,0.12)',
                }}>
                {/* Quote mark */}
                <div className="absolute -top-3 left-5 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: '#C29B40' }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="#0D1B2A">
                    <path d="M0 8C0 4 2 0 5 0 3.5 2 3 4 4 5L2 5 0 8ZM5 8C5 4 7 0 10 0 8.5 2 8 4 9 5L7 5 5 8Z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 14 14" fill="#C29B40">
                      <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9L3 12L4.5 7.5L1 5H5.5Z" />
                    </svg>
                  ))}
                </div>

                <p className="font-montserrat text-creme/70 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-cinzel font-bold text-sm"
                    style={{ background: 'rgba(194,155,64,0.15)', border: '1px solid rgba(194,155,64,0.2)', color: '#C29B40' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-cinzel text-creme/80 text-xs font-semibold">{t.name}</p>
                    <p className="font-montserrat text-creme/35 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Press / trust logos strip */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center items-center gap-8 py-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="font-cinzel text-creme/25 text-xs tracking-widest uppercase w-full text-center mb-2">Ils en parlent</p>
          {['Le Monde', 'Télérama', 'Madame Figaro', 'Parents Mag'].map((name) => (
            <span key={name} className="font-cinzel text-creme/20 text-sm tracking-widest hover:text-creme/40 transition-colors duration-300 cursor-default">
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="divider-or absolute bottom-0 left-8 right-8 opacity-20" />
    </section>
  )
}
