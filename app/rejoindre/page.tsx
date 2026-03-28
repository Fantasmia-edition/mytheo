'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

/* ══════════════════════════════════════════════════════════════
   AVATAR CARD — live update
══════════════════════════════════════════════════════════════ */
function AvatarCard({ name, power, companion, destiny, large = false }:
  { name: string; power: string; companion: string; destiny: string; large?: boolean }) {
  const w = large ? 300 : 240
  const h = large ? 420 : 336

  return (
    <motion.div className="relative rounded-2xl overflow-hidden select-none flex-shrink-0"
      style={{
        width: w, height: h,
        background: 'radial-gradient(ellipse at 30% 0%, rgba(94,50,180,0.5) 0%, rgba(13,27,42,0.97) 65%)',
        border: '1.5px solid rgba(194,155,64,0.35)',
        boxShadow: large ? '0 0 80px rgba(94,50,180,0.25), 0 20px 60px rgba(0,0,0,0.5)' : '0 0 40px rgba(94,50,180,0.2)',
      }}>
      {/* Stars */}
      {Array.from({ length: 22 }, (_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: i % 4 === 0 ? 2 : 1, height: i % 4 === 0 ? 2 : 1,
          left: `${(i * 41 + 13) % 92 + 4}%`, top: `${(i * 59 + 11) % 80 + 5}%`,
          background: 'rgba(254,250,224,0.7)', opacity: 0.15 + (i % 5) * 0.12,
        }} />
      ))}
      {/* Wizard SVG */}
      <div className="flex justify-center" style={{ paddingTop: large ? 28 : 20 }}>
        <svg width={large ? 130 : 105} height={large ? 175 : 140} viewBox="0 0 140 190" fill="none">
          <path d="M70 8 L95 75 L115 68 L98 125 L78 120 L78 185 H62 L62 120 L42 125 L25 68 L45 75 Z" fill="rgba(94,50,180,0.55)" />
          <path d="M45 75 L15 138 L25 68Z" fill="rgba(94,50,180,0.3)" />
          <path d="M95 75 L125 138 L115 68Z" fill="rgba(94,50,180,0.3)" />
          <path d="M70 8 L52 48 L88 48Z" fill="rgba(194,155,64,0.65)" />
          <circle cx="70" cy="62" r="16" fill="rgba(254,220,160,0.9)" />
          <path d="M55 92 L56 88 L57 92 L61 92 L58 95 L59 99 L56 96 L53 99 L54 95 L51 92Z" fill="rgba(194,155,64,0.7)" />
          <path d="M80 110 L81 106 L82 110 L86 110 L83 113 L84 117 L81 114 L78 117 L79 113 L76 110Z" fill="rgba(194,155,64,0.5)" />
          <circle cx="80" cy="70" r="2" fill="rgba(100,60,20,0.6)" />
          <circle cx="60" cy="70" r="2" fill="rgba(100,60,20,0.6)" />
          <path d="M63 77 Q70 81 77 77" stroke="rgba(100,60,20,0.4)" strokeWidth="1.2" fill="none" />
        </svg>
      </div>
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 pt-0">
        <div className="flex items-center justify-between">
          <span className="font-cinzel text-or text-[10px] tracking-[0.2em] uppercase opacity-60">✦ Scribe</span>
        </div>
        <div className="space-y-2">
          <div className="text-center -mt-2">
            <div className="font-cinzel font-bold leading-tight mb-1"
              style={{ fontSize: large ? 22 : 17, color: name ? '#FEFAE0' : 'rgba(254,250,224,0.2)' }}>
              {name || 'Ton prénom'}
            </div>
            {power && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className="font-montserrat px-2 py-0.5 rounded-full inline-block"
                style={{ fontSize: 10, background: 'rgba(167,139,250,0.2)', border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa' }}>
                {power}
              </motion.div>
            )}
          </div>
          <div className="h-px" style={{ background: 'rgba(194,155,64,0.15)' }} />
          {companion && (
            <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2">
              <span style={{ fontSize: large ? 14 : 11 }}>🐉</span>
              <span className="font-montserrat text-creme/55" style={{ fontSize: 11 }}>{companion}</span>
            </motion.div>
          )}
          {destiny && (
            <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              className="px-2 py-1.5 rounded-lg"
              style={{ background: 'rgba(194,155,64,0.07)', border: '1px solid rgba(194,155,64,0.15)' }}>
              <p className="font-montserrat italic leading-snug" style={{ fontSize: 10, color: 'rgba(194,155,64,0.8)' }}>
                "{destiny}"
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SOUS-COMPOSANTS
══════════════════════════════════════════════════════════════ */
function OptionBtn({ label, selected, onClick, icon }: { label: string; selected: boolean; onClick: () => void; icon?: string }) {
  return (
    <button type="button" onClick={onClick}
      className="px-4 py-3 rounded-xl font-montserrat text-sm text-left transition-all duration-200 flex items-center gap-2.5"
      style={{
        background: selected ? 'rgba(194,155,64,0.12)' : 'rgba(255,255,255,0.03)',
        border: selected ? '1.5px solid rgba(194,155,64,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
        color: selected ? '#C29B40' : 'rgba(254,250,224,0.5)',
        boxShadow: selected ? '0 0 0 3px rgba(194,155,64,0.06)' : 'none',
      }}>
      {icon && <span className="text-base flex-shrink-0">{icon}</span>}
      <span className="leading-snug">{label}</span>
    </button>
  )
}

function Field({ label, placeholder, value, onChange, hint, multiline = false, type = 'text' }:
  { label: string; placeholder: string; value: string; onChange: (v: string) => void; hint?: string; multiline?: boolean; type?: string }) {
  const [focused, setFocused] = useState(false)
  const style = {
    background: focused ? 'rgba(194,155,64,0.06)' : 'rgba(255,255,255,0.03)',
    border: focused ? '1.5px solid rgba(194,155,64,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
    boxShadow: focused ? '0 0 0 3px rgba(194,155,64,0.06)' : 'none',
  }
  return (
    <div>
      <label className="font-cinzel text-creme/50 text-[11px] tracking-wider uppercase block mb-1.5">{label}</label>
      {multiline
        ? <textarea placeholder={placeholder} value={value} rows={2}
            onChange={e => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className="w-full px-4 py-3 rounded-xl font-montserrat text-creme text-sm placeholder-creme/20 outline-none transition-all duration-300 resize-none" style={style} />
        : <input type={type} placeholder={placeholder} value={value}
            onChange={e => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className="w-full px-4 py-3 rounded-xl font-montserrat text-creme text-sm placeholder-creme/20 outline-none transition-all duration-300" style={style} />
      }
      {hint && <p className="font-montserrat text-creme/30 text-[11px] mt-1 ml-1">{hint}</p>}
    </div>
  )
}

function StepCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(194,155,64,0.12)', background: 'rgba(10,15,30,0.8)' }}>
      <div className="px-6 pt-5 pb-4 border-b border-white/5 flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <h2 className="font-cinzel text-creme text-lg font-semibold">{title}</h2>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const POWERS = [
  { label: 'Maître du feu', icon: '🔥' }, { label: 'Voix des bêtes', icon: '🐺' },
  { label: 'Tisseur de temps', icon: '⏳' }, { label: 'Gardien des étoiles', icon: '⭐' },
  { label: 'Cartographe des rêves', icon: '🗺️' }, { label: 'Enchanteur de mots', icon: '✨' },
]
const COMPANIONS = [
  { label: 'Dragon émeraude', icon: '🐉' }, { label: 'Loup des brumes', icon: '🐺' },
  { label: 'Chouette de cristal', icon: '🦉' }, { label: 'Renard doré', icon: '🦊' },
  { label: 'Phénix de cendres', icon: '🕊️' }, { label: 'Licorne des glaces', icon: '🦄' },
]
const CHAPTERS_PREVIEW = [
  { n: 1, title: "L'Éveil du Scribe", icon: '✨', color: '#C29B40' },
  { n: 2, title: "Le Serment des Flammes", icon: '🔥', color: '#f87171' },
  { n: 3, title: "La Carte des Âmes Perdues", icon: '🗺️', color: '#34d399' },
  { n: 4, title: "Le Pont des Brumes", icon: '🌫️', color: '#a78bfa' },
  { n: '…', title: "8 autres chapitres à découvrir", icon: '📖', color: 'rgba(255,255,255,0.2)' },
  { n: 12, title: "L'Apothéose — Livre relié final", icon: '📚', color: '#C29B40' },
]

/* ══════════════════════════════════════════════════════════════
   PAGE PRINCIPALE
══════════════════════════════════════════════════════════════ */
function RejoindreInner() {
  const searchParams = useSearchParams()
  const planFromUrl = searchParams.get('plan') as 'patient' | 'intrepide' | null

  const [step, setStep] = useState(1)
  const totalSteps = 6

  // Avatar state
  const [childName, setChildName] = useState('')
  const [childAge, setChildAge] = useState('')
  const [power, setPower] = useState('')
  const [customPower, setCustomPower] = useState('')
  const [companion, setCompanion] = useState('')
  const [customCompanion, setCustomCompanion] = useState('')
  const [destiny, setDestiny] = useState('')

  // Subscription + address state
  const [plan, setPlan] = useState<'patient' | 'intrepide' | ''>(planFromUrl ?? '')
  const [parentName, setParentName] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [address, setAddress] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const [submitted, setSubmitted] = useState(false)

  const effectivePower = POWERS.find(p => p.label === power) ? power : customPower
  const effectiveCompanion = COMPANIONS.find(c => c.label === companion) ? companion : customCompanion

  const canNext: Record<number, boolean> = {
    1: !!(childName.trim() && childAge),
    2: !!(effectivePower.trim()),
    3: !!(effectiveCompanion.trim()),
    4: destiny.trim().length >= 10,
    5: true, // Récap — always OK
    6: !!(plan && parentName.trim() && parentEmail.trim() && address.trim() && city.trim() && postalCode.trim()),
  }

  const steps = [
    { n: 1, label: 'Identité' },
    { n: 2, label: 'Pouvoir' },
    { n: 3, label: 'Compagnon' },
    { n: 4, label: 'Destin' },
    { n: 5, label: 'Récap' },
    { n: 6, label: 'Aventure' },
  ]

  const handleNext = () => {
    if (step < totalSteps) setStep(s => s + 1)
    else { setSubmitted(true) }
  }

  // Scroll top on step change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [step])

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 30%, #0b1228 100%)' }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(94,50,180,0.8) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(194,155,64,0.6) 0%, transparent 70%)' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="font-cinzel text-or font-bold text-lg tracking-wide hover:text-or/80 transition-colors">
          ✦ Mytheo
        </Link>
        <Link href="/" className="font-montserrat text-creme/40 text-sm hover:text-creme/70 transition-colors hidden sm:block">
          ← Retour à l'accueil
        </Link>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24">

        {/* ── Header (masqué après confirmation) ── */}
        {!submitted && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-4 pb-8">
            <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Rituel d'Apparition</span>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-creme mt-3 mb-3 leading-tight">
              Crée l'identité de ton <span className="gold-shimmer">Scribe</span>
            </h1>
            <p className="font-montserrat text-creme/45 text-sm max-w-md mx-auto">
              Ces choix façonneront chaque chapitre. Le Kit de Bienvenue sera envoyé à votre adresse dès l'inscription.
            </p>
          </motion.div>
        )}

        {/* ── Step indicators ── */}
        {!submitted && (
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center gap-1.5 sm:gap-2">
                <button onClick={() => step > s.n && setStep(s.n)} disabled={step <= s.n}
                  className="flex flex-col items-center gap-1 group">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-cinzel font-bold transition-all duration-300"
                    style={{
                      background: step > s.n ? 'rgba(52,211,153,0.15)' : step === s.n ? 'rgba(194,155,64,0.15)' : 'rgba(255,255,255,0.04)',
                      border: step > s.n ? '1.5px solid rgba(52,211,153,0.5)' : step === s.n ? '1.5px solid rgba(194,155,64,0.6)' : '1.5px solid rgba(255,255,255,0.08)',
                      color: step > s.n ? '#34d399' : step === s.n ? '#C29B40' : 'rgba(254,250,224,0.2)',
                    }}>
                    {step > s.n ? '✓' : s.n}
                  </div>
                  <span className="font-montserrat text-[9px] hidden sm:block"
                    style={{ color: step === s.n ? 'rgba(194,155,64,0.8)' : 'rgba(254,250,224,0.2)' }}>
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="w-5 sm:w-8 h-px mb-3 transition-all duration-500"
                    style={{ background: step > s.n ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.06)' }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ══════ FORM + CARD ══════ */}
        {!submitted && (
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

            {/* Form panel */}
            <div className="w-full lg:max-w-lg">
              <AnimatePresence mode="wait">

                {/* ── Étape 1 : Identité ── */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <StepCard title="Qui est le Scribe ?" icon="✨">
                      <Field label="Prénom de l'enfant" placeholder="Comment s'appelle ton héros ?"
                        value={childName} onChange={setChildName} hint="Ce prénom apparaîtra dans chaque chapitre de l'aventure." />
                      <div>
                        <label className="font-cinzel text-creme/50 text-[11px] tracking-wider uppercase block mb-2">Âge</label>
                        <div className="flex flex-wrap gap-2">
                          {['6','7','8','9','10','11','12','13','14'].map(a => (
                            <button key={a} type="button" onClick={() => setChildAge(a)}
                              className="w-12 h-12 rounded-xl font-cinzel font-bold text-sm transition-all duration-200"
                              style={{
                                background: childAge === a ? 'rgba(194,155,64,0.15)' : 'rgba(255,255,255,0.03)',
                                border: childAge === a ? '1.5px solid rgba(194,155,64,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
                                color: childAge === a ? '#C29B40' : 'rgba(254,250,224,0.4)',
                              }}>{a}</button>
                          ))}
                        </div>
                      </div>
                    </StepCard>
                  </motion.div>
                )}

                {/* ── Étape 2 : Pouvoir ── */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <StepCard title="Quel est ton pouvoir ?" icon="⚡">
                      <p className="font-montserrat text-creme/40 text-xs">Ce don unique définit comment tu affrontes chaque épreuve de l'aventure.</p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {POWERS.map(p => (
                          <OptionBtn key={p.label} label={p.label} icon={p.icon}
                            selected={power === p.label} onClick={() => { setPower(p.label); setCustomPower('') }} />
                        ))}
                      </div>
                      <Field label="Ou invente le tien" placeholder="Ex : Marcheur de nuages…"
                        value={customPower} onChange={v => { setCustomPower(v); if (v) setPower('') }} />
                    </StepCard>
                  </motion.div>
                )}

                {/* ── Étape 3 : Compagnon ── */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <StepCard title="Ton animal compagnon" icon="🐉">
                      <p className="font-montserrat text-creme/40 text-xs">Il t'accompagne dans toute l'aventure. Certains réservent des surprises…</p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {COMPANIONS.map(c => (
                          <OptionBtn key={c.label} label={c.label} icon={c.icon}
                            selected={companion === c.label} onClick={() => { setCompanion(c.label); setCustomCompanion('') }} />
                        ))}
                      </div>
                      <Field label="Ou crée le tien" placeholder="Ex : Tortue de lave…"
                        value={customCompanion} onChange={v => { setCustomCompanion(v); if (v) setCompanion('') }} />
                    </StepCard>
                  </motion.div>
                )}

                {/* ── Étape 4 : Phrase de destin ── */}
                {step === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <StepCard title="Ta phrase de destin" icon="📜">
                      <p className="font-montserrat text-creme/40 text-xs">Une devise gravée sur la carte d'identité. Elle restera dans le livre final.</p>
                      <Field label="Ta phrase de destin" placeholder="Ex : Je n'abandonne jamais, même quand les étoiles s'éteignent."
                        value={destiny} onChange={setDestiny} multiline hint={`${destiny.length}/80 caractères`} />
                      <div className="space-y-2">
                        <p className="font-cinzel text-creme/30 text-[11px] tracking-wider uppercase">Inspirations</p>
                        {[
                          "L'obscurité ne me fait pas peur, j'en suis l'étoile.",
                          'Chaque pas tracé sur la carte est un pas vers la légende.',
                          'Mon crayon est mon épée, mon histoire est mon armure.',
                        ].map((ins, i) => (
                          <button key={i} type="button" onClick={() => setDestiny(ins)}
                            className="w-full text-left px-3 py-2.5 rounded-lg font-montserrat text-xs italic transition-all duration-200 hover:border-or/30"
                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(254,250,224,0.45)' }}>
                            "{ins}"
                          </button>
                        ))}
                      </div>
                    </StepCard>
                  </motion.div>
                )}

                {/* ── Étape 5 : RÉCAPITULATIF ── */}
                {step === 5 && (
                  <motion.div key="s5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(194,155,64,0.2)', background: 'rgba(10,15,30,0.8)' }}>

                      {/* Header émotionnel */}
                      <div className="relative overflow-hidden px-6 pt-8 pb-6 text-center"
                        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(94,50,180,0.3) 0%, transparent 70%)' }}>
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
                          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ L'identité est scellée</span>
                          <h2 className="font-cinzel text-creme text-2xl font-bold mt-2 mb-1">
                            {childName} est prêt{childAge && parseInt(childAge) > 10 ? 'e' : ''} pour la légende.
                          </h2>
                          <p className="font-montserrat text-creme/50 text-sm">Voici ce qui attend ton Scribe dans les 12 prochains mois.</p>
                        </motion.div>
                      </div>

                      {/* Avatar + identité */}
                      <div className="flex flex-col sm:flex-row items-center gap-6 px-6 pb-6">
                        <div className="flex-shrink-0">
                          <AvatarCard name={childName} power={effectivePower} companion={effectiveCompanion} destiny={destiny} />
                        </div>
                        <div className="space-y-3 flex-1">
                          {[
                            { label: 'Pouvoir', value: effectivePower, icon: '⚡', color: '#a78bfa' },
                            { label: 'Compagnon', value: effectiveCompanion, icon: '🐉', color: '#34d399' },
                            { label: 'Phrase de destin', value: `"${destiny}"`, icon: '📜', color: '#C29B40' },
                          ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }}
                              className="p-3 rounded-xl"
                              style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${item.color}20` }}>
                              <p className="font-cinzel text-[10px] tracking-wider uppercase mb-0.5" style={{ color: item.color + 'aa' }}>
                                {item.icon} {item.label}
                              </p>
                              <p className="font-montserrat text-creme/75 text-xs leading-relaxed italic">{item.value}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Les 12 chapitres */}
                      <div className="px-6 pb-6">
                        <div className="h-px bg-white/5 mb-5" />
                        <p className="font-cinzel text-creme/60 text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                          📖 Les 12 chapitres qui l'attendent
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {CHAPTERS_PREVIEW.map((ch, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }}
                              className="p-3 rounded-xl flex items-start gap-2"
                              style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${ch.color}20` }}>
                              <span className="text-base flex-shrink-0 mt-0.5">{ch.icon}</span>
                              <div>
                                <span className="font-cinzel text-[10px] font-bold" style={{ color: ch.color }}>
                                  {typeof ch.n === 'number' ? `Ch. ${ch.n}` : ch.n}
                                </span>
                                <p className="font-montserrat text-creme/50 text-[11px] leading-tight mt-0.5">{ch.title}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Ce qui arrive chez vous */}
                      <div className="mx-6 mb-6 p-4 rounded-2xl"
                        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(194,155,64,0.1) 0%, rgba(10,15,30,0.5) 80%)', border: '1px solid rgba(194,155,64,0.2)' }}>
                        <p className="font-cinzel text-or text-xs tracking-wider uppercase text-center mb-4">📦 Ce qui arrive dans votre boîte aux lettres</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { icon: '📬', title: 'Dès la semaine prochaine', desc: 'Le Kit de Bienvenue avec la carte d\'identité de Scribe, le livret de règles, et la 1ère lettre de mission.' },
                            { icon: '✉️', title: 'Chaque mois', desc: 'Une lettre scellée à la cire avec la mission du mois. Formulaire + dessins à renvoyer.' },
                            { icon: '📚', title: 'À la fin', desc: 'Le livre relié à son nom, avec chaque chapitre qu\'il a co-écrit.' },
                          ].map((item, i) => (
                            <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                              <span className="text-2xl block mb-2">{item.icon}</span>
                              <p className="font-cinzel text-or/80 text-xs font-semibold mb-1">{item.title}</p>
                              <p className="font-montserrat text-creme/45 text-[11px] leading-relaxed">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* ── Étape 6 : Adresse + Abonnement ── */}
                {step === 6 && (
                  <motion.div key="s6" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                    <div className="space-y-4">

                      {/* Plans */}
                      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(194,155,64,0.12)', background: 'rgba(10,15,30,0.8)' }}>
                        <div className="px-6 pt-5 pb-4 border-b border-white/5 flex items-center gap-3">
                          <span className="text-xl">🗝️</span>
                          <h2 className="font-cinzel text-creme text-lg font-semibold">Choisir la formule</h2>
                        </div>
                        <div className="p-6 space-y-3">
                          {([
                            { id: 'patient', label: 'Le Scribe Patient', price: '24€', freq: '/mois', desc: '1 chapitre par mois · Rythme idéal pour débuter', color: '#a78bfa', badge: '' },
                            { id: 'intrepide', label: "L'Explorateur Intrépide", price: '42€', freq: '/mois', desc: '2 chapitres par mois · Aventure accélérée', color: '#C29B40', badge: 'Le plus populaire' },
                          ] as const).map(p => (
                            <button key={p.id} type="button" onClick={() => setPlan(p.id)}
                              className="w-full p-4 rounded-xl text-left transition-all duration-200 relative"
                              style={{
                                background: plan === p.id ? `rgba(${p.id === 'patient' ? '167,139,250' : '194,155,64'},0.08)` : 'rgba(255,255,255,0.02)',
                                border: plan === p.id ? `1.5px solid ${p.color}50` : '1.5px solid rgba(255,255,255,0.08)',
                              }}>
                              {p.badge && (
                                <span className="absolute top-3 right-3 font-cinzel text-[10px] tracking-wider px-2 py-0.5 rounded-full"
                                  style={{ background: 'rgba(194,155,64,0.15)', color: '#C29B40', border: '1px solid rgba(194,155,64,0.3)' }}>
                                  {p.badge}
                                </span>
                              )}
                              <div className="flex items-center gap-3 pr-20">
                                <div className="w-4 h-4 rounded-full flex-shrink-0 transition-all"
                                  style={{ border: `2px solid ${plan === p.id ? p.color : 'rgba(255,255,255,0.15)'}`, background: plan === p.id ? p.color : 'transparent' }} />
                                <div>
                                  <p className="font-cinzel font-bold text-sm" style={{ color: plan === p.id ? p.color : 'rgba(254,250,224,0.7)' }}>{p.label}</p>
                                  <p className="font-montserrat text-creme/40 text-xs mt-0.5">{p.desc}</p>
                                </div>
                                <div className="ml-auto text-right flex-shrink-0">
                                  <span className="font-cinzel font-bold text-lg" style={{ color: p.color }}>{p.price}</span>
                                  <span className="font-montserrat text-creme/40 text-xs">{p.freq}</span>
                                </div>
                              </div>
                            </button>
                          ))}
                          <p className="font-montserrat text-creme/25 text-[11px] text-center">Sans engagement · Résiliable à tout moment · Kit de bienvenue offert</p>
                        </div>
                      </div>

                      {/* Adresse */}
                      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(194,155,64,0.12)', background: 'rgba(10,15,30,0.8)' }}>
                        <div className="px-6 pt-5 pb-4 border-b border-white/5 flex items-center gap-3">
                          <span className="text-xl">📬</span>
                          <div>
                            <h2 className="font-cinzel text-creme text-lg font-semibold">Adresse de livraison</h2>
                            <p className="font-montserrat text-creme/35 text-xs mt-0.5">Où envoyer le Kit de Bienvenue et les lettres mensuelles ?</p>
                          </div>
                        </div>
                        <div className="p-6 space-y-3">
                          <Field label="Rue et numéro" placeholder="12 rue des Étoiles" value={address} onChange={setAddress} />
                          <Field label="Complément (optionnel)" placeholder="Appartement, bâtiment…" value={addressLine2} onChange={setAddressLine2} />
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Code postal" placeholder="75001" value={postalCode} onChange={setPostalCode} />
                            <Field label="Ville" placeholder="Paris" value={city} onChange={setCity} />
                          </div>
                        </div>
                      </div>

                      {/* Coordonnées parent */}
                      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(194,155,64,0.12)', background: 'rgba(10,15,30,0.8)' }}>
                        <div className="px-6 pt-5 pb-4 border-b border-white/5 flex items-center gap-3">
                          <span className="text-xl">👤</span>
                          <h2 className="font-cinzel text-creme text-lg font-semibold">Vos coordonnées</h2>
                        </div>
                        <div className="p-6 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Votre prénom" placeholder="Sophie" value={parentName} onChange={setParentName} />
                            <Field label="Votre email" placeholder="votre@email.fr" value={parentEmail} onChange={setParentEmail} type="email" />
                          </div>
                          <p className="font-montserrat text-creme/25 text-[11px] leading-relaxed">
                            Sans engagement · Paiement sécurisé Stripe · Aucune donnée partagée
                          </p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-5">
                {step > 1
                  ? <button onClick={() => setStep(s => s - 1)} className="font-montserrat text-creme/40 text-sm hover:text-creme/70 transition-colors">← Retour</button>
                  : <div />}
                <button onClick={handleNext} disabled={!canNext[step]}
                  className="px-8 py-3.5 font-cinzel font-bold text-sm tracking-wider rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: canNext[step] ? 'linear-gradient(135deg, #C29B40, #E8D080)' : 'rgba(194,155,64,0.15)',
                    color: canNext[step] ? '#0D1B2A' : 'rgba(194,155,64,0.4)',
                    boxShadow: canNext[step] ? '0 4px 20px rgba(194,155,64,0.3)' : 'none',
                  }}>
                  {step === 5 ? "L'aventure m'attend → " : step === totalSteps ? 'Sceller l\'aventure ✦' : 'Continuer →'}
                </button>
              </div>
            </div>

            {/* ── Avatar card sticky (desktop) ── */}
            {step < 5 && (
              <div className="hidden lg:flex flex-col items-center gap-4 sticky top-8">
                <AvatarCard name={childName} power={effectivePower} companion={effectiveCompanion} destiny={destiny} />
                <p className="font-montserrat text-creme/25 text-xs text-center max-w-[220px] leading-relaxed">
                  Ta carte d'identité se révèle au fil de tes choix. Elle sera imprimée dans le livre final.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ══════ CONFIRMATION ══════ */}
        {submitted && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center pt-8">
            <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
              style={{
                background: 'radial-gradient(ellipse at 50% -10%, rgba(94,50,180,0.25) 0%, rgba(10,15,30,0.97) 65%)',
                border: '1px solid rgba(194,155,64,0.25)',
              }}>
              {/* Sparkles */}
              {[{x:'10%',y:'15%'},{x:'88%',y:'12%'},{x:'50%',y:'5%'},{x:'15%',y:'78%'},{x:'85%',y:'72%'}].map((p,i) => (
                <motion.div key={i} className="absolute pointer-events-none" style={{ left: p.x, top: p.y }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
                  transition={{ duration: 2.5 + i * 0.4, delay: i * 0.3, repeat: Infinity }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="#C29B40">
                    <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z"/>
                  </svg>
                </motion.div>
              ))}

              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex justify-center mb-6">
                <AvatarCard name={childName} power={effectivePower} companion={effectiveCompanion} destiny={destiny} large />
              </motion.div>

              <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Rituel accompli</span>
              <h2 className="font-cinzel text-creme text-3xl md:text-4xl font-bold mt-3 mb-4">
                <span className="gold-shimmer">{childName}</span> entre dans la légende.
              </h2>

              {/* Kit arrival */}
              <div className="flex items-center justify-center gap-3 px-5 py-4 rounded-xl mb-6 mx-auto max-w-sm"
                style={{ background: 'rgba(194,155,64,0.08)', border: '1px solid rgba(194,155,64,0.2)' }}>
                <span className="text-2xl">📦</span>
                <div className="text-left">
                  <p className="font-cinzel text-or/90 text-sm font-semibold">Kit de Bienvenue en route !</p>
                  <p className="font-montserrat text-creme/50 text-xs mt-0.5">
                    Livraison à <strong className="text-creme/70">{city || 'votre adresse'}</strong> sous 5 à 7 jours ouvrés.
                  </p>
                </div>
              </div>

              <p className="font-montserrat text-creme/55 text-sm leading-relaxed mb-8 max-w-md mx-auto">
                Un email de bienvenue a été envoyé à <strong className="text-creme/70">{parentEmail}</strong>.
                L'Atelier Mytheo prépare le premier chapitre de l'aventure.
              </p>

              <Link href="/espace-auteur"
                className="inline-block px-10 py-4 font-cinzel font-bold text-sm tracking-wider rounded-xl transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #C29B40, #E8D080)', color: '#0D1B2A', boxShadow: '0 4px 20px rgba(194,155,64,0.3)' }}>
                Accéder à l'Espace Auteur →
              </Link>
            </div>
          </motion.div>
        )}

      </main>
    </div>
  )
}

export default function RejoindrePagePage() {
  return (
    <Suspense>
      <RejoindreInner />
    </Suspense>
  )
}
