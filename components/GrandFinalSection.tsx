'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const LIGHTS = [
  { x: 182, y: 22, c: '#ffd700', s: 10 },
  { x: 152, y: 68, c: '#ff4500', s: 9 },
  { x: 215, y: 60, c: '#ffd700', s: 8 },
  { x: 136, y: 120, c: '#ff6b35', s: 9 },
  { x: 196, y: 115, c: '#ffd700', s: 10 },
  { x: 238, y: 128, c: '#ff4500', s: 8 },
  { x: 118, y: 178, c: '#ffd700', s: 9 },
  { x: 164, y: 172, c: '#ff6b35', s: 10 },
  { x: 210, y: 176, c: '#ffd700', s: 8 },
  { x: 256, y: 185, c: '#ff4500', s: 9 },
  { x: 100, y: 230, c: '#ffd700', s: 8 },
  { x: 145, y: 220, c: '#ff6b35', s: 10 },
  { x: 192, y: 228, c: '#ffd700', s: 9 },
  { x: 238, y: 232, c: '#ff4500', s: 8 },
  { x: 278, y: 240, c: '#ffd700', s: 9 },
  { x: 80,  y: 280, c: '#ff6b35', s: 8 },
  { x: 130, y: 272, c: '#ffd700', s: 9 },
  { x: 185, y: 278, c: '#ff4500', s: 10 },
  { x: 240, y: 283, c: '#ffd700', s: 8 },
  { x: 295, y: 290, c: '#ff6b35', s: 9 },
]

function ChristmasScene() {
  return (
    <div className="relative w-full max-w-[380px]" style={{ height: 500 }}>
      {/* Scene frame */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, #0a0f1a 0%, #050810 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(194,155,64,0.15)',
        }}>

        {/* Night sky — deep blue gradient */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, #0e1e40 0%, #040810 60%)' }} />

        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5, height: Math.random() * 2 + 0.5,
              left: `${Math.random() * 100}%`, top: `${Math.random() * 55}%`,
              opacity: Math.random() * 0.6 + 0.1,
            }}
            animate={{ opacity: [Math.random() * 0.3, Math.random() * 0.7 + 0.3, Math.random() * 0.3] }}
            transition={{ duration: 2 + Math.random() * 4, delay: Math.random() * 5, repeat: Infinity }} />
        ))}

        {/* Moon — top right */}
        <div className="absolute top-6 right-10 w-14 h-14 rounded-full"
          style={{
            background: 'radial-gradient(circle at 38% 38%, #fffce0, #f0d870)',
            boxShadow: '0 0 30px rgba(240,216,112,0.5), 0 0 60px rgba(240,216,112,0.2)',
          }}>
          <div className="absolute top-2 right-2 w-8 h-9 rounded-full" style={{ background: 'rgba(4,8,16,0.35)' }} />
        </div>

        {/* Snow on ground */}
        <div className="absolute bottom-0 left-0 right-0 h-16 rounded-b-2xl"
          style={{ background: 'linear-gradient(to top, rgba(230,240,255,0.12), transparent)' }}>
          <svg viewBox="0 0 380 64" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 64 Q30 40 60 50 Q100 30 140 45 Q190 25 230 42 Q280 28 320 40 Q350 34 380 38 L380 64Z"
              fill="rgba(220,230,255,0.15)" />
          </svg>
        </div>

        {/* Christmas tree shadow/reflection */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-1/2 h-8 rounded-full"
          style={{ background: 'rgba(0,0,0,0.4)', filter: 'blur(10px)' }} />

        {/* ── CHRISTMAS TREE ── */}
        <svg className="absolute bottom-10 left-1/2 -translate-x-1/2" width="280" height="310" viewBox="0 0 280 310" fill="none">
          {/* Layer 1 — top */}
          <path d="M140 10 L175 80 L158 80 L190 150 L164 150 L196 220 L84 220 L116 150 L90 150 L122 80 L105 80 Z"
            fill="#0a2010" />
          {/* Layer shading */}
          <path d="M140 10 L165 80 L153 80 L183 148 L159 148 L189 218"
            stroke="rgba(20,60,20,0.8)" strokeWidth="1" fill="none" />
          <path d="M140 10 L115 80 L127 80 L97 148 L121 148 L91 218"
            stroke="rgba(10,40,10,0.6)" strokeWidth="0.8" fill="none" />
          {/* Snow on branches */}
          <path d="M140 10 L122 80 L131 80 L101 148 L119 148 L90 220"
            stroke="rgba(200,220,255,0.2)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M140 10 L158 80 L149 80 L179 148 L161 148 L190 220"
            stroke="rgba(200,220,255,0.15)" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Layer highlights */}
          <path d="M140 10 L108 80 L175 80Z" fill="rgba(20,70,20,0.5)" />
          <path d="M90 150 L190 150 L164 150 L116 150Z" fill="rgba(20,70,20,0.3)" />
          {/* Trunk */}
          <rect x="128" y="220" width="24" height="28" rx="3" fill="#2a1408" />
          <rect x="131" y="223" width="6" height="22" rx="2" fill="rgba(80,40,10,0.4)" />
          {/* Star on top */}
          <motion.path d="M140 4 L142 -3 L144 4 L151 4 L146 8 L148 15 L140 11 L132 15 L134 8 L129 4 L136 4 Z"
            fill="#FFD700"
            animate={{ opacity: [0.8, 1, 0.8], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: '140px 6px', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.8))' }} />
          {/* Ground snow */}
          <path d="M76 222 Q140 210 204 222" stroke="rgba(200,220,255,0.2)" strokeWidth="3" fill="none" />
        </svg>

        {/* ── ORNAMENT LIGHTS ── */}
        {LIGHTS.map((light, i) => (
          <motion.div key={i} className="absolute pointer-events-none rounded-full"
            style={{
              width: light.s, height: light.s,
              left: light.x - light.s / 2,
              top: light.y - light.s / 2,
              background: light.c,
              boxShadow: `0 0 ${light.s}px ${light.c}, 0 0 ${light.s * 2}px ${light.c}60`,
            }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.4, 0.8] }}
            transition={{
              duration: 1.2 + (i % 5) * 0.25,
              delay: i * 0.08,
              repeat: Infinity,
            }} />
        ))}

        {/* Bokeh background circles */}
        {[
          { x: '8%',  y: '55%', s: 28, c: '#ff4500' },
          { x: '88%', y: '40%', s: 22, c: '#ffd700' },
          { x: '15%', y: '75%', s: 18, c: '#ff6b35' },
          { x: '82%', y: '70%', s: 24, c: '#ffd700' },
          { x: '5%',  y: '35%', s: 14, c: '#ff4500' },
          { x: '92%', y: '20%', s: 16, c: '#ffd700' },
        ].map((b, i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{
              width: b.s, height: b.s,
              left: b.x, top: b.y,
              background: b.c,
              filter: `blur(${b.s / 2}px)`,
              opacity: 0,
            }}
            animate={{ opacity: [0.05, 0.2, 0.05] }}
            transition={{ duration: 3 + i, delay: i * 0.7, repeat: Infinity }} />
        ))}

        {/* ── THE BOOK ── */}
        <motion.div className="absolute" style={{ bottom: 18, left: '50%', transform: 'translateX(-55%)' }}
          animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>

          {/* Book 3D perspective wrapper */}
          <div style={{ transform: 'perspective(500px) rotateY(-18deg) rotateX(4deg)', transformStyle: 'preserve-3d' }}>

            {/* Spine */}
            <div className="absolute top-0 bottom-0 left-0 w-9 rounded-l"
              style={{ background: 'linear-gradient(180deg, #C29B40 0%, #8B6914 40%, #C29B40 70%, #6a4f0a 100%)', boxShadow: '-6px 6px 16px rgba(0,0,0,0.6)' }}>
              <div className="absolute inset-y-4 left-1.5 right-1.5 rounded"
                style={{ border: '0.5px solid rgba(255,215,100,0.3)' }} />
              <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-cinzel text-nuit text-[7px] font-bold tracking-widest"
                style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) translateX(-50%) rotate(180deg)' }}>
                LÉGENDE
              </p>
            </div>

            {/* Front cover */}
            <div className="ml-8 rounded-r relative overflow-hidden"
              style={{
                width: 150, height: 200,
                background: 'linear-gradient(135deg, #0a2050 0%, #061540 100%)',
                boxShadow: '8px 8px 24px rgba(0,0,0,0.7), inset 0 0 0 2px rgba(194,155,64,0.25)',
              }}>

              {/* Gold foil border */}
              <div className="absolute inset-3 rounded pointer-events-none"
                style={{ border: '1px solid rgba(194,155,64,0.4)' }} />
              <div className="absolute inset-5 rounded pointer-events-none"
                style={{ border: '0.5px solid rgba(194,155,64,0.15)' }} />

              {/* Sky on cover */}
              <div className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 60% 30%, #0e2060 0%, #040c25 100%)' }} />

              {/* Mini stars on cover */}
              {[...Array(15)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-white"
                  style={{
                    width: 1.5, height: 1.5,
                    left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%`,
                    opacity: Math.random() * 0.7 + 0.2,
                  }} />
              ))}

              {/* Dragon on cover (small) */}
              <svg className="absolute" style={{ top: '12%', left: '15%' }} width="90" height="65" viewBox="0 0 90 65" fill="none">
                <defs>
                  <linearGradient id="cvDragon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7ec8f8" />
                    <stop offset="100%" stopColor="#1a5090" />
                  </linearGradient>
                </defs>
                <ellipse cx="45" cy="42" rx="22" ry="14" fill="url(#cvDragon)" />
                <path d="M28 35 C14 24, 6 28, 8 38 C10 46, 26 43, 28 35Z" fill="#1a5090" opacity="0.8" />
                <path d="M62 35 C76 24, 84 28, 82 38 C80 46, 64 43, 62 35Z" fill="#1a5090" opacity="0.8" />
                <ellipse cx="45" cy="17" rx="12" ry="10" fill="url(#cvDragon)" />
                <ellipse cx="45" cy="19" rx="8" ry="6" fill="#3a8fd4" />
                <circle cx="40" cy="14" r="3.5" fill="#FFD700" /><circle cx="50" cy="14" r="3.5" fill="#FFD700" />
                <circle cx="40" cy="14" r="1.5" fill="#0a0a00" /><circle cx="50" cy="14" r="1.5" fill="#0a0a00" />
                {[{x:38,y:22},{x:43,y:20},{x:48,y:22}].map((s,i)=>(
                  <path key={i} d={`M${s.x} ${s.y-4}L${s.x+2} ${s.y}L${s.x+4} ${s.y-4}`} fill="#1a5090" opacity="0.7" />
                ))}
                <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  {[{x:38,y:7,r:2},{x:46,y:4,r:1.5},{x:54,y:7,r:1.8}].map((s,i)=>(
                    <path key={i} d={`M${s.x} ${s.y-s.r*2}L${s.x+.5} ${s.y-.5}L${s.x+s.r*2} ${s.y}L${s.x+.5} ${s.y+.5}L${s.x} ${s.y+s.r*2}L${s.x-.5} ${s.y+.5}L${s.x-s.r*2} ${s.y}L${s.x-.5} ${s.y-.5}Z`}
                      fill="#C29B40" opacity="0.9" />
                  ))}
                </motion.g>
              </svg>

              {/* Title embossed */}
              <div className="absolute bottom-8 left-0 right-0 text-center px-3">
                <p className="font-cinzel text-[9px] font-bold tracking-[0.2em] mb-0.5"
                  style={{ color: '#C29B40', textShadow: '0 0 8px rgba(194,155,64,0.6)' }}>LA LÉGENDE DE</p>
                <p className="font-cinzel text-[11px] font-bold tracking-[0.15em]"
                  style={{ color: '#E8D08A', textShadow: '0 0 10px rgba(232,208,138,0.7)' }}>THOMAS</p>
              </div>

              {/* Foil shimmer animation */}
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(194,155,64,0.2) 50%, transparent 65%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5 }} />
            </div>

            {/* Book pages (right edge) */}
            <div className="absolute right-0 top-1 bottom-1"
              style={{
                width: 7, marginLeft: 150 + 32,
                background: 'repeating-linear-gradient(to bottom, #F5EFC8, #F5EFC8 1px, #EBE0B0 1px, #EBE0B0 2px)',
                borderRadius: '0 2px 2px 0',
              }} />
          </div>
        </motion.div>

        {/* Snow falling */}
        {[...Array(16)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-white/60"
            style={{ left: `${Math.random() * 100}%`, top: -6 }}
            animate={{ y: ['0px', '510px'], x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30], opacity: [0, 0.8, 0] }}
            transition={{ duration: 4 + Math.random() * 3, delay: Math.random() * 6, repeat: Infinity, ease: 'linear' }} />
        ))}

        {/* Ground vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none rounded-b-2xl"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />

        {/* Warm candle glow from below */}
        <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,140,30,0.2), transparent)', filter: 'blur(15px)' }}
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
      </div>

      {/* External glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-16 pointer-events-none"
        style={{ background: 'rgba(255,100,20,0.1)', filter: 'blur(20px)' }} />
    </div>
  )
}

export default function GrandFinalSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(155,28,28,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 80% 50%, rgba(60,20,100,0.10) 0%, transparent 60%),
          linear-gradient(180deg, #0D1B2A 0%, #080c14 100%)
        `,
      }}>

      {/* Floating gold dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full"
            style={{ background: '#C29B40', left: `${Math.random() * 100}%`, top: `${100 + Math.random() * 10}%` }}
            animate={{ y: [0, -(400 + Math.random() * 200)], opacity: [0, 0.6, 0] }}
            transition={{ duration: 5 + Math.random() * 5, delay: Math.random() * 8, repeat: Infinity }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT : Text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ L&apos;Apothéose</span>
              <h2 className="font-cinzel text-5xl md:text-6xl font-bold text-creme mt-3 mb-6 leading-tight">
                Son histoire,<br />
                <span className="gold-shimmer">reliée pour toujours.</span>
              </h2>
              <p className="font-montserrat text-creme/70 text-lg leading-relaxed mb-8">
                À la fin de l&apos;aventure, nous réunissons chaque chapitre qu&apos;il a co-écrit
                au fil des mois. Nous les relions dans un{' '}
                <span className="text-or font-semibold">livre rigide de collection</span>,
                embossé or à son prénom. Un exemplaire unique au monde — son œuvre, sa légende.
              </p>
            </motion.div>

            <div className="space-y-4 mb-10">
              {[
                { icon: '📚', color: '#a78bfa', title: 'Reliure rigide de qualité', desc: 'Couverture cartonnée 3mm, dos cousu, impression haute résolution.' },
                { icon: '✨', color: '#C29B40', title: 'Embossage or au prénom', desc: 'Son nom inscrit à jamais sur la couverture, en lettres d\'or.' },
                { icon: '📦', color: '#34d399', title: 'Livraison en fin d\'aventure', desc: 'Expédié à la clôture de la saison, dans un coffret cadeau.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex gap-4 p-5 rounded-xl transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: `radial-gradient(ellipse at 0% 50%, ${item.color}12 0%, rgba(255,255,255,0.02) 60%)`,
                    border: `1px solid ${item.color}25`,
                  }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-cinzel text-creme text-sm font-semibold mb-1">{item.title}</h4>
                    <p className="font-montserrat text-creme/50 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }}
              href="/rejoindre"
              className="group inline-flex items-center gap-3 font-cinzel text-base px-8 py-4 text-nuit font-bold tracking-wider overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, #C29B40, #E8D08A, #C29B40)',
                clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                boxShadow: '0 4px 24px rgba(194,155,64,0.4)',
              }}>
              <span className="relative z-10">Commencer l&apos;aventure</span>
              <span className="relative z-10 text-xl">✦</span>
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </motion.a>
          </div>

          {/* RIGHT : Scene */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }} className="flex justify-center">
            <ChristmasScene />
          </motion.div>
        </div>
      </div>

      <div className="divider-or absolute bottom-0 left-8 right-8 opacity-20" />
    </section>
  )
}
