'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* ── Floating sparkle particle ── */
function Sparkle({ x, y, size, delay, color = '#C29B40' }: {
  x: number; y: number; size: number; delay: number; color?: string
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: Math.random() * 4 + 1 }}
    >
      <svg width={size} height={size} viewBox="0 0 20 20">
        <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill={color} />
      </svg>
    </motion.div>
  )
}

/* ── The envelope hero illustration ── */
function EnvelopeHero() {
  return (
    <div className="relative flex justify-center items-center w-full overflow-hidden" style={{ height: 420 }}>

      {/* Outer magical glow rings */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 520, height: 520, background: 'radial-gradient(circle, rgba(120,60,200,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 380, height: 380, background: 'radial-gradient(circle, rgba(194,155,64,0.10) 0%, transparent 70%)' }}
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Orbiting rune particles */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div key={i} className="absolute pointer-events-none"
          style={{ width: 340, height: 340, borderRadius: '50%' }}
          animate={{ rotate: [deg, deg + 360] }}
          transition={{ duration: 18 + i * 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute" style={{
            top: 0, left: '50%', transform: 'translateX(-50%)',
            width: i % 2 === 0 ? 6 : 8, height: i % 2 === 0 ? 6 : 8,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#C29B40' : i % 3 === 1 ? '#a78bfa' : '#f87171',
            boxShadow: `0 0 8px ${i % 3 === 0 ? '#C29B40' : i % 3 === 1 ? '#a78bfa' : '#f87171'}`,
          }} />
        </motion.div>
      ))}

      {/* Main envelope — floating */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
        style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(194,155,64,0.2))' }}
      >
        <svg width="100%" height="auto" viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 380 }}>
          <defs>
            <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEFAE0" />
              <stop offset="60%" stopColor="#F5EDB8" />
              <stop offset="100%" stopColor="#E8D49A" />
            </linearGradient>
            <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F0E8C0" />
              <stop offset="100%" stopColor="#E2D49A" />
            </linearGradient>
            <linearGradient id="goldEdge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B6914" />
              <stop offset="30%" stopColor="#C29B40" />
              <stop offset="60%" stopColor="#E8D08A" />
              <stop offset="100%" stopColor="#C29B40" />
            </linearGradient>
            <linearGradient id="waxGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e05050" />
              <stop offset="50%" stopColor="#b01a1a" />
              <stop offset="100%" stopColor="#7a1010" />
            </linearGradient>
            <filter id="envShadow">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.4" />
            </filter>
            {/* Parchment texture */}
            <filter id="parchment">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
              <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
              <feComposite in="blend" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>

          {/* Envelope shadow */}
          <ellipse cx="190" cy="250" rx="160" ry="12" fill="rgba(0,0,0,0.35)" />

          {/* Envelope body */}
          <rect x="10" y="80" width="360" height="168" rx="4" fill="url(#envBody)" filter="url(#envShadow)" />

          {/* Gold foil border frame */}
          <rect x="10" y="80" width="360" height="168" rx="4" fill="none" stroke="url(#goldEdge)" strokeWidth="2.5" />
          <rect x="18" y="88" width="344" height="152" rx="2" fill="none" stroke="rgba(194,155,64,0.3)" strokeWidth="0.8" />

          {/* Inner liner — subtle blue */}
          <rect x="12" y="82" width="356" height="164" rx="3" fill="rgba(20,40,80,0.06)" />

          {/* Parchment ruled lines (faint) */}
          {[115, 135, 155, 175, 195, 215].map((y, i) => (
            <line key={i} x1="40" y1={y} x2="340" y2={y} stroke="rgba(100,70,20,0.12)" strokeWidth="0.8" />
          ))}

          {/* Italic "S" monogram top-left */}
          <text x="32" y="118" fontFamily="Cinzel, serif" fontSize="26" fill="#C29B40" opacity="0.5" fontStyle="italic">𝒮</text>

          {/* Small stars / decorations on parchment */}
          {[{x:300,y:105},{x:320,y:200},{x:50,y:215}].map((s,i)=>(
            <path key={i} d={`M${s.x} ${s.y-5}L${s.x+1.5} ${s.y-1.5}L${s.x+5} ${s.y}L${s.x+1.5} ${s.y+1.5}L${s.x} ${s.y+5}L${s.x-1.5} ${s.y+1.5}L${s.x-5} ${s.y}L${s.x-1.5} ${s.y-1.5}Z`}
              fill="#C29B40" opacity="0.25" />
          ))}

          {/* Top flap (open/folded look) */}
          <path d="M10 84 L190 175 L370 84" fill="url(#envFlap)" stroke="url(#goldEdge)" strokeWidth="1.5" />
          <path d="M10 84 L190 158 L370 84" fill="none" stroke="rgba(194,155,64,0.25)" strokeWidth="0.8" strokeDasharray="4 3" />

          {/* Left bottom fold */}
          <path d="M10 248 L175 160" stroke="rgba(194,155,64,0.3)" strokeWidth="1.2" />
          {/* Right bottom fold */}
          <path d="M370 248 L205 160" stroke="rgba(194,155,64,0.3)" strokeWidth="1.2" />

          {/* ── WAX SEAL ── */}
          {/* Outer glow */}
          <circle cx="190" cy="165" r="44" fill="rgba(180,30,30,0.2)" />
          {/* Wax body */}
          <circle cx="190" cy="165" r="36" fill="url(#waxGrad)" />
          {/* Wax highlight */}
          <ellipse cx="180" cy="155" rx="12" ry="8" fill="rgba(255,120,120,0.25)" />
          {/* Seal ring border */}
          <circle cx="190" cy="165" r="36" fill="none" stroke="rgba(255,100,100,0.4)" strokeWidth="1.5" />
          <circle cx="190" cy="165" r="32" fill="none" stroke="rgba(255,150,150,0.2)" strokeWidth="0.8" />

          {/* Seal emblem — 8-pointed star */}
          <path d="M190 140 L193 158 L211 155 L198 165 L208 180 L190 173 L172 180 L182 165 L169 155 L187 158 Z"
            fill="none" stroke="rgba(255,220,200,0.75)" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="190" cy="165" r="5" fill="rgba(255,200,180,0.5)" />

          {/* Gold ribbon bands */}
          <line x1="10" y1="248" x2="370" y2="248" stroke="url(#goldEdge)" strokeWidth="1.8" />

          {/* Address lines (decorative) */}
          <rect x="60" y="200" width="100" height="2" rx="1" fill="rgba(100,70,20,0.2)" />
          <rect x="60" y="210" width="75" height="2" rx="1" fill="rgba(100,70,20,0.15)" />
          <rect x="60" y="220" width="88" height="2" rx="1" fill="rgba(100,70,20,0.1)" />

          {/* Stamp (top-right) */}
          <rect x="306" y="90" width="50" height="62" rx="2" fill="rgba(20,50,100,0.12)" stroke="rgba(194,155,64,0.3)" strokeWidth="1" />
          <rect x="310" y="94" width="42" height="54" rx="1" fill="none" stroke="rgba(194,155,64,0.2)" strokeWidth="0.6" />
          {/* Mini quill in stamp */}
          <path d="M331 115 C326 110, 320 118, 326 124 C328 126, 334 124, 336 120 C338 116, 336 108, 330 106 C322 104, 316 112, 318 120"
            stroke="#C29B40" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Floating sparkles around the envelope */}
      {[
        { x: 8,  y: 20, s: 12, d: 0,   c: '#C29B40' },
        { x: 88, y: 15, s: 10, d: 0.7, c: '#a78bfa' },
        { x: 5,  y: 65, s: 14, d: 1.3, c: '#C29B40' },
        { x: 92, y: 60, s: 9,  d: 0.4, c: '#f9a8d4' },
        { x: 50, y: 2,  s: 8,  d: 2.0, c: '#C29B40' },
        { x: 18, y: 88, s: 7,  d: 1.6, c: '#a78bfa' },
        { x: 82, y: 85, s: 11, d: 0.9, c: '#C29B40' },
        { x: 72, y: 8,  s: 6,  d: 1.1, c: '#f9a8d4' },
      ].map((s, i) => (
        <motion.div key={i} className="absolute pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2.2, delay: s.d, repeat: Infinity, repeatDelay: Math.random() * 3 + 1 }}
        >
          <svg width={s.s} height={s.s} viewBox="0 0 20 20">
            <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill={s.c} />
          </svg>
        </motion.div>
      ))}

      {/* Wax droplets floating */}
      {[{x:'15%',y:'72%'},{x:'80%',y:'30%'},{x:'65%',y:'80%'}].map((p,i)=>(
        <motion.div key={i} className="absolute w-2.5 h-2.5 rounded-full pointer-events-none"
          style={{ left: p.x, top: p.y, background: '#9b1c1c', boxShadow: '0 0 8px rgba(180,30,30,0.7)' }}
          animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3 + i, delay: i * 0.8, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Random star positions computed once on mount
  const stars = useRef(
    mounted ? [] : Array.from({ length: 80 }, (_, i) => ({
      w: Math.random() * 2.5 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      o: Math.random() * 0.5 + 0.1,
      gold: Math.random() > 0.85,
    }))
  )

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden aurora-bg">

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.current.map((s, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: s.w, height: s.w,
              left: `${s.x}%`, top: `${s.y}%`,
              background: s.gold ? '#C29B40' : '#fff',
              opacity: s.o,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Aurora light bands */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute -top-32 -left-32 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #6d28d9 0%, transparent 70%)', filter: 'blur(60px)' }}
          animate={{ x: [0, 40, 0], y: [0, 20, 0], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="absolute -top-16 right-0 w-[500px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, #1d4ed8 0%, transparent 70%)', filter: 'blur(50px)' }}
          animate={{ x: [0, -30, 0], y: [0, 30, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div className="absolute bottom-0 left-1/3 w-[400px] h-[250px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(155,28,28,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh]">

          {/* ── LEFT : Copy ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit mb-6"
              style={{ border: '1px solid rgba(194,155,64,0.45)', background: 'rgba(194,155,64,0.08)' }}>
              <span className="text-or text-xs font-cinzel tracking-widest">✦ Aventure 2026 · Places limitées</span>
            </motion.div>

            {/* H1 */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
              className="font-cinzel text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-creme">Une mission secrète l'attend.</span><br />
              <span className="gold-shimmer">Un monde tremble.</span><br />
              <span className="text-creme/90 text-4xl md:text-5xl lg:text-6xl">Seul votre enfant peut le sauver.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="font-montserrat text-creme/70 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
              Chaque mois, une enveloppe scellée arrive avec une mission que lui seul peut accomplir.{' '}
              <span className="text-or font-semibold">Ses écrits et ses dessins façonnent la suite</span>.
              À la fin de l&apos;aventure, son histoire devient un vrai livre à son nom.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10">
              <a href="/rejoindre" id="kit"
                className="group relative inline-flex items-center gap-3 font-cinzel text-base px-8 py-4 text-nuit font-bold tracking-wider overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #C29B40 0%, #E8D08A 50%, #C29B40 100%)',
                  backgroundSize: '200% 100%',
                  clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                  boxShadow: '0 4px 20px rgba(194,155,64,0.4)',
                }}>
                <span className="relative z-10">Recevoir mon Kit de Bienvenue</span>
                <span className="relative z-10 text-xl">✦</span>
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </a>
              <a href="#concept"
                className="inline-flex items-center gap-2 font-montserrat text-sm text-creme/60 hover:text-or transition-colors duration-300 tracking-wide self-center">
                Découvrir le concept
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8L8 13L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </motion.div>

            {/* Reassurance parent */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-3 mb-8">
              {['📵 Sans écran', '✍️ Créativité & écriture', '🚚 Livraison incluse', '🔓 Sans engagement'].map((b) => (
                <span key={b} className="font-montserrat text-creme/50 text-xs px-3 py-1.5 rounded-full"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                  {b}
                </span>
              ))}
            </motion.div>

            {/* Social proof */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
              className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['#8B6914','#4a7fc1','#C29B40','#2d7a2d'].map((c, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-nuit flex items-center justify-center text-xs font-cinzel text-creme font-bold"
                    style={{ background: `radial-gradient(circle at 35% 35%, ${c}cc, ${c})` }}>
                    {['M','S','É','A'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="#C29B40">
                      <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9L3 12L4.5 7.5L1 5H5.5Z" />
                    </svg>
                  ))}
                </div>
                <p className="font-montserrat text-creme/50 text-xs">
                  <span className="text-or font-semibold">+240 familles</span> déjà embarquées
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT : Envelope illustration ── */}
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="flex justify-center items-center order-1 lg:order-2">
            <EnvelopeHero />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-cinzel text-or/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M5 11L10 16L15 11" stroke="rgba(194,155,64,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0D1B2A)' }} />
    </section>
  )
}
