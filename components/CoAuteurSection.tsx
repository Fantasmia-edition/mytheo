'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/* ── Child drawing panel ── */
function ChildPanel() {
  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1f10 0%, #0f1a0a 100%)',
        border: '1px solid rgba(194,155,64,0.2)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      }}>

      {/* Header bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-or/10"
        style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="font-cinzel text-or/70 text-xs tracking-widest ml-2 uppercase">Mission du Mois — Formule</span>
      </div>

      {/* Parchment drawing area */}
      <div className="m-4 rounded-xl overflow-hidden relative" style={{ minHeight: 300 }}>
        <div className="absolute inset-0 rounded-xl"
          style={{ background: 'radial-gradient(ellipse at 30% 20%, #FEFAE0 0%, #EFE5BF 60%, #E2D49A 100%)' }} />

        {/* Ruled lines */}
        {[80, 108, 136, 164, 192, 220, 248].map(y => (
          <div key={y} className="absolute left-5 right-5 h-px" style={{ top: y, background: 'rgba(100,130,200,0.2)' }} />
        ))}

        {/* Top margin line */}
        <div className="absolute left-5 right-5 h-px" style={{ top: 60, background: 'rgba(255,100,100,0.25)' }} />

        {/* Header prompt */}
        <div className="relative z-10 px-6 pt-4 pb-2">
          <p className="font-cinzel text-nuit/50 text-xs tracking-widest uppercase mb-1">Mission Scribe n°3</p>
          <p className="text-nuit/60 text-sm leading-snug" style={{ fontFamily: 'cursive' }}>
            Décris ton compagnon de voyage...
          </p>
        </div>

        {/* Dragon drawing by child */}
        <div className="relative z-10 flex justify-center py-3">
          <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
            {/* Child's crayon-style dragon */}
            {/* Body — rough oval */}
            <motion.path d="M100 100 C72 90, 48 68, 52 46 C56 24, 78 18, 100 30 C122 18, 144 24, 148 46 C152 68, 128 90, 100 100Z"
              fill="rgba(74,127,193,0.25)" stroke="#4a7fc1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
            {/* Head */}
            <motion.ellipse cx="100" cy="28" rx="18" ry="16" fill="rgba(74,127,193,0.2)" stroke="#4a7fc1" strokeWidth="2.5"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 1.5 }} />
            {/* Left wing */}
            <motion.path d="M58 58 C32 38, 14 44, 18 62 C22 76, 50 72, 58 58Z"
              fill="rgba(74,127,193,0.15)" stroke="#4a7fc1" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 2 }} />
            {/* Right wing */}
            <motion.path d="M142 58 C168 38, 186 44, 182 62 C178 76, 150 72, 142 58Z"
              fill="rgba(74,127,193,0.15)" stroke="#4a7fc1" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 2.2 }} />
            {/* Eyes */}
            <circle cx="92" cy="24" r="4" fill="#4a7fc1" />
            <circle cx="108" cy="24" r="4" fill="#4a7fc1" />
            <circle cx="92" cy="24" r="2" fill="#0a1a40" />
            <circle cx="108" cy="24" r="2" fill="#0a1a40" />
            {/* Spikes */}
            {[72, 84, 96, 108, 120].map((x, i) => (
              <motion.path key={i} d={`M${x} 34 L${x + 4} 24 L${x + 8} 34`}
                fill="rgba(74,127,193,0.5)" stroke="#4a7fc1" strokeWidth="1.5"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.8 + i * 0.1 }} />
            ))}
            {/* Star breath */}
            <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
              {[{x:88,y:10,r:3},{x:100,y:5,r:2},{x:112,y:8,r:2.5}].map((s,i)=>(
                <path key={i} d={`M${s.x} ${s.y-s.r*2}L${s.x+s.r*.5} ${s.y-.5}L${s.x+s.r*2} ${s.y}L${s.x+s.r*.5} ${s.y+.5}L${s.x} ${s.y+s.r*2}L${s.x-s.r*.5} ${s.y+.5}L${s.x-s.r*2} ${s.y}L${s.x-s.r*.5} ${s.y-.5}Z`} fill="#f59e0b" />
              ))}
            </motion.g>
            {/* Annotation */}
            <text x="10" y="148" fontFamily="cursive" fontSize="11" fill="rgba(50,50,150,0.6)">Dragon Bleu ✦ il vole !</text>
            {/* A smudge */}
            <ellipse cx="160" cy="135" rx="12" ry="6" fill="rgba(74,127,193,0.1)" />
          </svg>
        </div>

        {/* Handwritten note */}
        <p className="relative z-10 text-right pr-6 pb-4 text-nuit/40 text-xs" style={{ fontFamily: 'cursive', transform: 'rotate(-3deg)' }}>
          il crache des étoiles 🌟
        </p>
      </div>

      <div className="px-5 pb-4 text-center">
        <p className="font-montserrat text-creme/40 text-xs tracking-wide">✏️ L'enfant dessine & décrit sa vision</p>
      </div>
    </div>
  )
}

/* ── Illustrated book panel ── */
function IllustratedPanel() {
  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #060d1e 0%, #0a1530 100%)',
        border: '1.5px solid rgba(194,155,64,0.35)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(194,155,64,0.1)',
      }}>

      {/* Header bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-or/15"
        style={{ background: 'rgba(194,155,64,0.06)' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="#C29B40"><path d="M8 1L9.5 6H15L10.5 9L12.5 15L8 11.5L3.5 15L5.5 9L1 6H6.5Z" /></svg>
        <span className="font-cinzel text-or/80 text-xs tracking-widest uppercase">Chapitre Illustré — Sur Mesure</span>
      </div>

      {/* Illustration area */}
      <div className="m-4 rounded-xl overflow-hidden relative" style={{ minHeight: 300 }}>
        {/* Night sky */}
        <div className="absolute inset-0 rounded-xl"
          style={{ background: 'radial-gradient(ellipse at 60% 30%, #0e2060 0%, #060a1e 100%)' }} />

        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5, height: Math.random() * 2 + 0.5,
              left: Math.random() * 100 + '%', top: Math.random() * 55 + '%',
              opacity: Math.random() * 0.7 + 0.2,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
            }} />
        ))}

        {/* Moon */}
        <div className="absolute top-5 right-8 w-10 h-10 rounded-full"
          style={{ background: 'radial-gradient(circle at 35% 35%, #FFF8D0, #E8C860)', boxShadow: '0 0 20px rgba(232,200,96,0.4)' }}>
          <div className="absolute top-1 right-1 w-7 h-7 rounded-full bg-blue-900/60" />
        </div>

        {/* Mountain range silhouette */}
        <svg className="absolute bottom-16 left-0 right-0 w-full" viewBox="0 0 320 80" preserveAspectRatio="none" style={{ height: 80 }}>
          <path d="M0 80 L40 40 L70 58 L110 20 L150 55 L190 30 L230 50 L270 15 L310 45 L320 80Z" fill="#040810" />
          <path d="M0 80 L40 40 L70 58 L110 20 L150 55 L190 30 L230 50 L270 15 L310 45 L320 80Z" fill="rgba(10,30,80,0.4)" />
          {/* Snow caps */}
          <path d="M108 22 L110 20 L112 22 L114 28 L108 28Z" fill="rgba(255,255,255,0.5)" />
          <path d="M268 17 L270 15 L272 17 L275 24 L265 24Z" fill="rgba(255,255,255,0.4)" />
        </svg>

        {/* Castle */}
        <svg className="absolute bottom-14 left-1/2 -translate-x-1/2" width="140" height="70" viewBox="0 0 140 70" fill="none">
          <rect x="30" y="20" width="80" height="50" fill="#060a18" />
          <rect x="25" y="8" width="28" height="62" fill="#060a18" />
          <rect x="87" y="8" width="28" height="62" fill="#060a18" />
          {/* Battlements left */}
          {[25,33,41].map(x => <rect key={x} x={x} y={2} width={6} height={8} fill="#060a18" />)}
          {/* Battlements right */}
          {[87,95,103].map(x => <rect key={x} x={x} y={2} width={6} height={8} fill="#060a18" />)}
          {/* Gate arch */}
          <path d="M58 70 L58 42 Q70 32 82 42 L82 70Z" fill="#020408" />
          {/* Windows glowing */}
          <rect x="36" y="28" width="12" height="14" rx="1" fill="rgba(255,190,50,0.6)" />
          <rect x="58" y="28" width="12" height="14" rx="1" fill="rgba(255,190,50,0.4)" />
          <rect x="80" y="28" width="12" height="14" rx="1" fill="rgba(255,190,50,0.5)" />
          <rect x="93" y="28" width="12" height="14" rx="1" fill="rgba(255,190,50,0.35)" />
          {/* Flag */}
          <line x1="39" y1="2" x2="39" y2="-8" stroke="#C29B40" strokeWidth="1.2" />
          <path d="M39 -8 L52 -5 L39 -2Z" fill="#C29B40" />
        </svg>

        {/* ── PROFESSIONAL DRAGON ── */}
        <motion.div className="absolute" style={{ top: '8%', left: '18%' }}
          animate={{ y: [0, -18, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="180" height="130" viewBox="0 0 180 130" fill="none">
            <defs>
              <radialGradient id="dragonBodyPro" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#7ec8f8" />
                <stop offset="50%" stopColor="#3a8fd4" />
                <stop offset="100%" stopColor="#1050a0" />
              </radialGradient>
              <radialGradient id="wingLPro" cx="80%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#2a6aac" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0a2a60" stopOpacity="0.6" />
              </radialGradient>
              <radialGradient id="wingRPro" cx="20%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#2a6aac" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0a2a60" stopOpacity="0.6" />
              </radialGradient>
              <filter id="dragonGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Wing left with membrane veins */}
            <path d="M52 65 C24 42, 8 50, 12 68 C16 82, 46 78, 52 65Z" fill="url(#wingLPro)" />
            <path d="M52 65 C40 56, 28 54, 18 62" stroke="rgba(120,180,255,0.3)" strokeWidth="0.8" fill="none" />
            <path d="M52 65 C38 60, 24 58, 14 68" stroke="rgba(120,180,255,0.2)" strokeWidth="0.6" fill="none" />

            {/* Wing right */}
            <path d="M128 65 C156 42, 172 50, 168 68 C164 82, 134 78, 128 65Z" fill="url(#wingRPro)" />
            <path d="M128 65 C140 56, 152 54, 162 62" stroke="rgba(120,180,255,0.3)" strokeWidth="0.8" fill="none" />

            {/* Body */}
            <ellipse cx="90" cy="78" rx="42" ry="28" fill="url(#dragonBodyPro)" />
            {/* Belly scales */}
            <ellipse cx="90" cy="85" rx="28" ry="16" fill="rgba(200,230,255,0.15)" />

            {/* Neck */}
            <path d="M72 60 C70 40, 75 22, 88 18 C98 15, 106 22, 108 38 L106 60Z" fill="url(#dragonBodyPro)" />

            {/* Head */}
            <ellipse cx="90" cy="18" rx="20" ry="16" fill="url(#dragonBodyPro)" />
            {/* Snout */}
            <ellipse cx="90" cy="22" rx="12" ry="9" fill="#3a8fd4" />
            {/* Nostrils */}
            <circle cx="85" cy="24" r="2" fill="rgba(0,0,0,0.4)" />
            <circle cx="95" cy="24" r="2" fill="rgba(0,0,0,0.4)" />

            {/* Eyes — glowing yellow */}
            <ellipse cx="82" cy="14" rx="5" ry="6" fill="#FFD700" />
            <ellipse cx="98" cy="14" rx="5" ry="6" fill="#FFD700" />
            <ellipse cx="82" cy="14" rx="2.5" ry="4" fill="#1a0a00" />
            <ellipse cx="98" cy="14" rx="2.5" ry="4" fill="#1a0a00" />
            <circle cx="80.5" cy="12" r="1.5" fill="rgba(255,255,255,0.9)" />
            <circle cx="96.5" cy="12" r="1.5" fill="rgba(255,255,255,0.9)" />

            {/* Horns */}
            <path d="M78 8 L74 -2 L82 5Z" fill="#1a5090" />
            <path d="M102 8 L106 -2 L98 5Z" fill="#1a5090" />

            {/* Ridge spikes */}
            {[72,82,92,102,112].map((x,i)=>(
              <path key={i} d={`M${x} 55 L${x+5} 44 L${x+10} 55`} fill="#1a5090" opacity="0.8" />
            ))}

            {/* Tail */}
            <path d="M128 80 C148 72, 164 80, 160 92 C157 100, 142 95, 128 80Z" fill="url(#dragonBodyPro)" />
            <path d="M158 90 L166 98 L156 98Z" fill="#1a5090" />

            {/* Claws */}
            <path d="M62 98 L56 106 M66 100 L62 110 M72 100 L70 112" stroke="#1a5090" strokeWidth="2" strokeLinecap="round" />
            <path d="M118 98 L124 106 M114 100 L118 110 M108 100 L110 112" stroke="#1a5090" strokeWidth="2" strokeLinecap="round" />

            {/* Star breath (golden stars from mouth) */}
            <motion.g animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{ transformOrigin: '90px 10px' }}>
              {[{x:78,y:4,r:3},{x:90,y:-2,r:2.5},{x:100,y:2,r:2},{x:70,y:0,r:1.8}].map((s,i)=>(
                <path key={i} fill="#C29B40" opacity="0.95"
                  d={`M${s.x} ${s.y-s.r*2}L${s.x+s.r*.5} ${s.y-.5}L${s.x+s.r*2} ${s.y}L${s.x+s.r*.5} ${s.y+.5}L${s.x} ${s.y+s.r*2}L${s.x-s.r*.5} ${s.y+.5}L${s.x-s.r*2} ${s.y}L${s.x-s.r*.5} ${s.y-.5}Z`}
                />
              ))}
            </motion.g>

            {/* Scale details */}
            {[{x:80,y:72},{x:90,y:68},{x:100,y:72},{x:85,y:80},{x:95,y:80}].map((s,i)=>(
              <path key={i} d={`M${s.x-4} ${s.y} Q${s.x} ${s.y-5} ${s.x+4} ${s.y}`}
                stroke="rgba(120,200,255,0.25)" strokeWidth="0.8" fill="none" />
            ))}
          </svg>
        </motion.div>

        {/* Gold sparkles around dragon */}
        {[{x:'12%',y:'20%'},{x:'75%',y:'15%'},{x:'85%',y:'55%'},{x:'5%',y:'60%'}].map((p,i)=>(
          <motion.div key={i} className="absolute pointer-events-none"
            style={{ left: p.x, top: p.y }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
            transition={{ duration: 2, delay: i * 0.6, repeat: Infinity, repeatDelay: 2 }}>
            <svg width="10" height="10" viewBox="0 0 20 20" fill="#C29B40">
              <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="px-5 pb-4 text-center">
        <p className="font-montserrat text-or/55 text-xs tracking-wide">✦ L'Atelier des Scribes crée son chapitre illustré</p>
      </div>
    </div>
  )
}

const steps = [
  { num: '01', title: 'La lettre de mission arrive', desc: 'Une enveloppe scellée à la cire atterrit dans sa boîte aux lettres.', color: '#C29B40' },
  { num: '02', title: 'L\'enfant écrit et dessine', desc: 'Il choisit son chemin, décrit ses alliés, invente ses monstres.', color: '#a78bfa' },
  { num: '03', title: 'Le parent scanne', desc: 'Un simple scan depuis notre app suffit. 30 secondes.', color: '#34d399' },
  { num: '04', title: 'Le chapitre prend vie', desc: 'L\'Atelier des Scribes transforme ses idées en illustrations pro.', color: '#f87171' },
]

export default function CoAuteurSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="comment" ref={ref} className="relative py-24 lg:py-32 overflow-hidden nebula-bg">

      {/* Floating runes background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        {['✦','✧','⬡','◈','⊕','✺','⊛','✤'].map((r,i)=>(
          <motion.div key={i} className="absolute font-cinzel text-or select-none"
            style={{ fontSize: 40 + Math.random()*40, left: `${10+i*11}%`, top: `${10+i*10}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.8 }}>
            {r}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-14">
          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Comment ça marche</span>
          <h2 className="font-cinzel text-5xl md:text-6xl font-bold text-creme mt-3 mb-5 leading-tight">
            Une aventure qui grandit<br />
            <span className="gold-shimmer">mois après mois.</span>
          </h2>
          <p className="font-montserrat text-creme/60 text-lg max-w-2xl mx-auto">
            Ce qu&apos;il dessine en janvier apparaît dans le chapitre de février.
            Ses choix d&apos;aujourd&apos;hui construisent son histoire de demain —
            jusqu&apos;au livre relié à son nom, à la fin de l&apos;aventure.
          </p>
        </motion.div>

        {/* Split screen */}
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center mb-16 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <ChildPanel />
          </motion.div>

          {/* Arrow connector */}
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col items-center gap-2 px-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #C29B40, #E8D08A)', boxShadow: '0 0 20px rgba(194,155,64,0.4)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M13 6L19 12L13 18" stroke="#0D1B2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-cinzel text-or/50 text-[10px] tracking-widest uppercase text-center">Magie</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            <IllustratedPanel />
          </motion.div>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="relative p-6 rounded-2xl text-center group hover:scale-[1.03] transition-transform duration-300"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${step.color}18 0%, rgba(255,255,255,0.02) 70%)`,
                border: `1px solid ${step.color}30`,
              }}>
              {/* Step number with color glow */}
              <div className="font-cinzel text-4xl font-bold mb-3" style={{ color: step.color, opacity: 0.5, textShadow: `0 0 20px ${step.color}` }}>
                {step.num}
              </div>
              <h3 className="font-cinzel text-creme text-sm font-semibold mb-2 leading-tight">{step.title}</h3>
              <p className="font-montserrat text-creme/50 text-sm leading-relaxed">{step.desc}</p>
              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 w-8 h-px hidden lg:block z-10"
                  style={{ background: `linear-gradient(90deg, ${step.color}60, ${steps[i+1].color}60)` }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
