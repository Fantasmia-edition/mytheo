'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

/* ── Animated questionnaire field ── */
function FormField({ label, placeholder, icon, color, delay }: {
  label: string; placeholder: string; icon: string; color: string; delay: number
}) {
  const [focused, setFocused] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      <label className="font-cinzel text-xs tracking-widest uppercase mb-1.5 flex items-center gap-1.5"
        style={{ color }}>
        <span>{icon}</span> {label}
      </label>
      <div className="relative rounded-lg overflow-hidden transition-all duration-300"
        style={{
          border: `1px solid ${focused ? color : 'rgba(255,255,255,0.08)'}`,
          background: focused ? `${color}08` : 'rgba(255,255,255,0.03)',
          boxShadow: focused ? `0 0 16px ${color}20` : 'none',
        }}>
        <input
          type="text"
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 bg-transparent font-montserrat text-sm text-creme/80 placeholder-creme/25 outline-none"
          style={{ caretColor: color }}
        />
      </div>
    </motion.div>
  )
}

/* ── Avatar card (result preview) ── */
function AvatarCard() {
  return (
    <div className="relative" style={{ width: 340, height: 480 }}>
      {/* Card glow aura */}
      <motion.div className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(120,60,200,0.25) 0%, transparent 70%)', filter: 'blur(20px)' }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* The physical card */}
      <motion.div
        animate={{ y: [0, -8, 0], rotateY: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0e1a3a 0%, #060d20 100%)',
          border: '1.5px solid rgba(194,155,64,0.4)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(194,155,64,0.2)',
          transformStyle: 'preserve-3d',
          perspective: 800,
        }}
      >
        {/* Star field on card */}
        {[...Array(25)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5, height: Math.random() * 2 + 0.5,
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }} />
        ))}

        {/* Gold top border decoration */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, #C29B40, #E8D08A, #C29B40, transparent)' }} />

        {/* Card label */}
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <span className="font-cinzel text-or/60 text-xs tracking-[0.25em] uppercase">Carte de Scribe</span>
          <div className="flex gap-1">
            {['#C29B40','#a78bfa','#C29B40'].map((c,i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* Avatar illustration */}
        <div className="flex justify-center py-2">
          <div className="relative">
            {/* Avatar circle with glow */}
            <motion.div className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(120,60,200,0.6), rgba(40,15,80,0.9))',
                border: '2px solid rgba(194,155,64,0.5)',
                boxShadow: '0 0 24px rgba(120,60,200,0.4), inset 0 0 20px rgba(0,0,0,0.3)',
              }}
              animate={{ boxShadow: ['0 0 20px rgba(120,60,200,0.3)', '0 0 40px rgba(120,60,200,0.6)', '0 0 20px rgba(120,60,200,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* Robe + silhouette child wizard */}
              <svg width="70" height="75" viewBox="0 0 70 75" fill="none">
                <defs>
                  <radialGradient id="robeGrad" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#6d28d9" />
                    <stop offset="100%" stopColor="#3b0764" />
                  </radialGradient>
                </defs>
                {/* Robe */}
                <path d="M35 28 C20 30 14 45 12 68 L58 68 C56 45 50 30 35 28Z" fill="url(#robeGrad)" />
                {/* Star on robe */}
                <path d="M35 44 L36.2 48 L40 48 L37 50.5 L38.2 54 L35 51.5 L31.8 54 L33 50.5 L30 48 L33.8 48 Z"
                  fill="#C29B40" opacity="0.8" />
                {/* Head */}
                <circle cx="35" cy="18" r="12" fill="#E8C49A" />
                {/* Hair */}
                <path d="M23 16 C23 8 30 4 35 4 C40 4 47 8 47 16 C47 12 44 9 40 10 C38 7 32 7 30 10 C26 9 23 12 23 16Z"
                  fill="#3d2a0a" />
                {/* Eyes */}
                <circle cx="30.5" cy="17" r="2.5" fill="#1a0a00" />
                <circle cx="39.5" cy="17" r="2.5" fill="#1a0a00" />
                <circle cx="31.2" cy="16.2" r="1" fill="white" />
                <circle cx="40.2" cy="16.2" r="1" fill="white" />
                {/* Smile */}
                <path d="M31 22 Q35 25 39 22" stroke="rgba(100,60,20,0.5)" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* Wizard hat */}
                <path d="M35 4 L28 -6 L42 -6 Z" fill="#1a0a30" />
                <rect x="25" y="-6" width="20" height="3" rx="1" fill="#2a1050" />
                {/* Hat star */}
                <path d="M35 -2 L35.8 0.5 L38.5 0.5 L36.4 2 L37.2 4.5 L35 3 L32.8 4.5 L33.6 2 L31.5 0.5 L34.2 0.5 Z"
                  fill="#C29B40" opacity="0.8" />
                {/* Wand */}
                <line x1="50" y1="35" x2="62" y2="22" stroke="#6b4226" strokeWidth="3" strokeLinecap="round" />
                <circle cx="62" cy="22" r="3" fill="#C29B40" />
                <motion.g animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ transformOrigin: '62px 22px' }}>
                  {[{x:62,y:15,r:2.5},{x:68,y:18,r:1.8},{x:56,y:14,r:2}].map((s,i)=>(
                    <path key={i} d={`M${s.x} ${s.y-s.r*2}L${s.x+.5} ${s.y-.5}L${s.x+s.r*2} ${s.y}L${s.x+.5} ${s.y+.5}L${s.x} ${s.y+s.r*2}L${s.x-.5} ${s.y+.5}L${s.x-s.r*2} ${s.y}L${s.x-.5} ${s.y-.5}Z`}
                      fill="#C29B40" opacity="0.9" />
                  ))}
                </motion.g>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Avatar details */}
        <div className="px-6 pt-2 space-y-3">
          {[
            { label: 'Nom de Scribe', value: 'Théo l\'Intrépide', color: '#C29B40' },
            { label: 'Pouvoir Secret', value: 'Lire les langues oubliées', color: '#a78bfa' },
            { label: 'Compagnon', value: 'Brume, le Renard Argenté', color: '#34d399' },
          ].map((item, i) => (
            <div key={i} className="rounded-lg px-3 py-2"
              style={{ background: `${item.color}0d`, border: `1px solid ${item.color}25` }}>
              <p className="font-cinzel text-[9px] tracking-widest uppercase mb-0.5" style={{ color: item.color, opacity: 0.7 }}>{item.label}</p>
              <p className="font-montserrat text-creme/85 text-sm">{item.value}</p>
            </div>
          ))}

          {/* Phrase de destin */}
          <div className="rounded-lg px-3 py-2 mt-1"
            style={{ background: 'rgba(194,155,64,0.06)', border: '1px solid rgba(194,155,64,0.2)' }}>
            <p className="font-cinzel text-[9px] tracking-widest uppercase mb-1 text-or/60">Phrase de Destin</p>
            <p className="font-cinzel text-or/80 text-xs italic leading-snug">
              "Celui qui lit le monde le réécrit."
            </p>
          </div>
        </div>

        {/* Bottom gold band */}
        <div className="mt-3 mx-4 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C29B40, transparent)' }} />
        <div className="px-6 pb-4 pt-2 flex items-center justify-between">
          <span className="font-cinzel text-or/30 text-[9px] tracking-widest">SAISON I · 2025</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#C29B40" opacity="0.4">
            <path d="M8 1L9.5 6H15L10.5 9L12.5 15L8 11.5L3.5 15L5.5 9L1 6H6.5Z" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

export default function RituelSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} id="rituel" className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 60% 50%, rgba(80,20,160,0.18) 0%, transparent 65%),
          radial-gradient(ellipse 50% 50% at 10% 30%, rgba(20,60,120,0.12) 0%, transparent 55%),
          linear-gradient(180deg, #0D1B2A 0%, #0c0e20 50%, #0D1B2A 100%)
        `,
      }}>

      {/* Floating magical dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? '#C29B40' : i % 3 === 1 ? '#a78bfa' : '#f9a8d4',
              left: `${Math.random() * 100}%`, top: `${100 + Math.random() * 10}%`,
            }}
            animate={{ y: [0, -(300 + Math.random() * 200)], opacity: [0, 0.8, 0], x: [(Math.random()-0.5)*40, (Math.random()-0.5)*40] }}
            transition={{ duration: 4 + Math.random() * 4, delay: Math.random() * 6, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Le Kit de Bienvenue</span>
          <h2 className="font-cinzel text-5xl md:text-6xl font-bold text-creme mt-3 mb-5 leading-tight">
            Son aventure commence<br />
            <span className="gold-shimmer">par un rituel.</span>
          </h2>
          <p className="font-montserrat text-creme/60 text-lg max-w-2xl mx-auto">
            Avant la première lettre, votre enfant reçoit sa <em className="text-or not-italic font-semibold">Convocation Mytheo</em> — et complète
            son Rituel d'Apparition pour forger son identité de héros.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT : Avatar card */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}
            className="flex justify-center">
            <AvatarCard />
          </motion.div>

          {/* RIGHT : The questionnaire preview */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
              className="mb-8 p-5 rounded-xl"
              style={{ background: 'rgba(194,155,64,0.05)', border: '1px solid rgba(194,155,64,0.15)' }}>
              <p className="font-cinzel text-or text-sm mb-1">✦ Le Rituel d'Apparition</p>
              <p className="font-montserrat text-creme/55 text-sm leading-relaxed">
                Dans son Kit de Bienvenue, l'enfant reçoit un parchemin de fondation. Il y inscrit à la plume 4 éléments qui deviendront
                les 4 piliers de <span className="text-creme/80">son</span> identité de héros — gravés pour toute l&apos;aventure.
              </p>
            </motion.div>

            <div className="space-y-4">
              <FormField label="Nom de Héros" placeholder="Le nom que les légendes retiendront…" icon="📜" color="#C29B40" delay={0.1} />
              <FormField label="Pouvoir Secret" placeholder="Ce que seul lui sait faire…" icon="⚡" color="#a78bfa" delay={0.2} />
              <FormField label="Animal Compagnon" placeholder="La créature qui l'accompagne…" icon="🦊" color="#34d399" delay={0.3} />
              <FormField label="Phrase de Destin" placeholder="Les mots qui guident son chemin…" icon="✨" color="#f9a8d4" delay={0.4} />
            </div>

            {/* What happens next */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 p-5 rounded-xl"
              style={{ background: 'rgba(120,60,200,0.08)', border: '1px solid rgba(120,60,200,0.2)' }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(120,60,200,0.2)', border: '1px solid rgba(120,60,200,0.35)' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="#a78bfa">
                    <path d="M7 1L8.5 5.5H13L9.5 8L11 12.5L7 9.5L3 12.5L4.5 8L1 5.5H5.5Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-cinzel text-creme/80 text-sm font-semibold mb-1">Ces éléments deviennent permanents</p>
                  <p className="font-montserrat text-creme/50 text-sm leading-relaxed">
                    Son Nom de Scribe figurera sur chaque enveloppe. Son Compagnon apparaîtra dans ses chapitres.
                    Sa Phrase de Destin sera gravée sur son livre final.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="divider-or absolute bottom-0 left-8 right-8 opacity-20" />
    </section>
  )
}
