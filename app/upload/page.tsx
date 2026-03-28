'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ── Wax Seal mini SVG ── */
function WaxSeal({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="36" fill="#9B1C1C" />
      <circle cx="40" cy="40" r="30" fill="#7B1515" />
      {/* Fleur de lys */}
      <path d="M40 18 C40 18 38 24 33 26 C28 28 25 26 25 26 C25 26 28 31 33 31 C31 34 28 37 28 37 L40 35 L52 37 C52 37 49 34 47 31 C52 31 55 26 55 26 C55 26 52 28 47 26 C42 24 40 18 40 18Z" fill="#C29B40" opacity="0.9" />
      <circle cx="40" cy="40" r="3" fill="#C29B40" opacity="0.7" />
      <circle cx="40" cy="40" r="33" fill="none" stroke="#C29B40" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
    </svg>
  )
}

/* ── Upload Icon ── */
function UploadIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 32V16M24 16L17 23M24 16L31 23" stroke="#C29B40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 36C8 36 8 40 12 40H36C40 40 40 36 40 36" stroke="#C29B40" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Check Icon ── */
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 9L7 13L15 5" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ── Step indicator ── */
function StepDot({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-bold text-sm transition-all duration-500 ${
        done ? 'bg-emerald-500/20 border-2 border-emerald-500/60' :
        active ? 'border-2 border-or bg-or/10' :
        'border border-white/10 bg-white/3'
      }`}
        style={{ color: done ? '#34d399' : active ? '#C29B40' : 'rgba(254,250,224,0.3)' }}>
        {done ? '✓' : n}
      </div>
    </div>
  )
}

/* ── File preview card ── */
function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const url = URL.createObjectURL(file)
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      className="relative rounded-xl overflow-hidden border border-or/30 bg-white/5"
      style={{ aspectRatio: '3/4', maxWidth: 180 }}>
      {file.type.startsWith('image/') ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="Formulaire scanné" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 4H26L32 10V36H8V4Z" fill="rgba(194,155,64,0.15)" stroke="#C29B40" strokeWidth="1.5"/>
            <path d="M26 4V10H32" stroke="#C29B40" strokeWidth="1.5"/>
            <path d="M14 18H26M14 23H26M14 28H20" stroke="#C29B40" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="font-montserrat text-creme/60 text-xs text-center leading-snug">{file.name}</p>
        </div>
      )}
      <button onClick={onRemove}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-red-900/60 transition-colors text-xs">
        ✕
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
        <p className="font-montserrat text-creme/80 text-[10px] truncate">{file.name}</p>
      </div>
    </motion.div>
  )
}

export default function UploadPage() {
  const [step, setStep] = useState(1) // 1: upload, 2: infos, 3: confirmation
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const [childName, setChildName] = useState('')
  const [childAge, setChildAge] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [parentName, setParentName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return
    const accepted = Array.from(newFiles).filter(f =>
      f.type.startsWith('image/') || f.type === 'application/pdf'
    )
    setFiles(prev => [...prev, ...accepted].slice(0, 5))
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1 && files.length > 0) { setStep(2); return }
    if (step === 2) { setStep(3); setSubmitted(true); return }
  }

  const canProceedStep1 = files.length > 0
  const canProceedStep2 = childName.trim() && childAge && parentEmail.trim() && parentName.trim()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 30%, #0a1520 100%)' }}>

      {/* ── Ambient lights ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(155,28,28,0.6) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(194,155,64,0.5) 0%, transparent 70%)' }} />
      </div>

      {/* ── Minimal Navbar ── */}
      <nav className="relative z-20 px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-cinzel text-or font-bold text-lg tracking-wide hover:text-or/80 transition-colors">
          ✦ L'Odyssée des Scribes
        </Link>
        <a href="mailto:contact@odyssee-scribes.fr"
          className="font-montserrat text-creme/50 text-sm hover:text-or transition-colors hidden sm:block">
          Une question ? Contactez-nous
        </a>
      </nav>

      {/* ── Main ── */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 pb-24">

        {/* ── Hero header ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center pt-8 pb-12">
          <div className="flex justify-center mb-5">
            <WaxSeal size={64} />
          </div>
          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Lettre reçue</span>
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-creme mt-3 mb-4 leading-tight">
            La lettre est arrivée.<br />
            <span className="gold-shimmer">L'aventure commence ici.</span>
          </h1>
          <p className="font-montserrat text-creme/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-6">
            Votre enfant a reçu sa mission. Scannez ou photographiez le formulaire rempli — l'Atelier des Scribes s'occupe du reste.
          </p>

          {/* Ce qui se passe ensuite */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
            {[
              { n: '01', icon: '📤', text: 'Vous uploadez le formulaire rempli', color: '#C29B40' },
              { n: '02', icon: '🎨', text: "L'Atelier illustre en 7 jours", color: '#a78bfa' },
              { n: '03', icon: '📬', text: 'Le chapitre illustré arrive chez vous', color: '#34d399' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="font-cinzel font-bold text-xs flex-shrink-0" style={{ color: s.color }}>{s.n}</span>
                <span className="text-base flex-shrink-0">{s.icon}</span>
                <p className="font-montserrat text-creme/55 text-xs text-left leading-snug">{s.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Step progress ── */}
        {!submitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-0 mb-10">
            <StepDot n={1} active={step === 1} done={step > 1} />
            <div className="h-px w-16 sm:w-24 mx-1" style={{ background: step > 1 ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.08)' }} />
            <StepDot n={2} active={step === 2} done={step > 2} />
            <div className="h-px w-16 sm:w-24 mx-1" style={{ background: step > 2 ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.08)' }} />
            <StepDot n={3} active={step === 3} done={false} />

            {/* Labels */}
            <div className="sr-only">Étape {step} sur 3</div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">

          {/* ════ STEP 1 : UPLOAD ════ */}
          {step === 1 && !submitted && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>

              <div className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(194,155,64,0.15)', background: 'rgba(10,15,30,0.7)' }}>

                {/* Step label */}
                <div className="px-6 pt-6 pb-4 border-b border-white/5">
                  <p className="font-cinzel text-or/70 text-xs tracking-[0.2em] uppercase">Étape 1 — Formulaire de mission</p>
                  <h2 className="font-cinzel text-creme text-xl font-semibold mt-1">Photographiez le formulaire rempli</h2>
                </div>

                <div className="p-6 space-y-5">

                  {/* Instructions */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { icon: '📄', text: 'Le formulaire de mission complété' },
                      { icon: '🎨', text: 'Les dessins et créations de votre enfant' },
                      { icon: '📸', text: 'Photo nette ou scan (JPG, PNG, PDF)' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
                        style={{ background: 'rgba(194,155,64,0.06)', border: '1px solid rgba(194,155,64,0.1)' }}>
                        <span className="text-base">{item.icon}</span>
                        <p className="font-montserrat text-creme/65 text-xs leading-snug">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Drop zone */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="relative cursor-pointer rounded-xl transition-all duration-300 flex flex-col items-center justify-center text-center py-12 px-6"
                    style={{
                      border: dragging ? '2px dashed rgba(194,155,64,0.7)' : '2px dashed rgba(194,155,64,0.2)',
                      background: dragging ? 'rgba(194,155,64,0.06)' : 'rgba(255,255,255,0.02)',
                      minHeight: 180,
                    }}>
                    <input ref={fileInputRef} type="file" accept="image/*,application/pdf" multiple className="hidden"
                      onChange={(e) => handleFiles(e.target.files)} />
                    <motion.div animate={dragging ? { scale: 1.1 } : { scale: 1 }} transition={{ duration: 0.2 }}>
                      <UploadIcon />
                    </motion.div>
                    <p className="font-cinzel text-creme/70 text-sm font-semibold mt-3 mb-1">
                      Glissez vos fichiers ici
                    </p>
                    <p className="font-montserrat text-creme/40 text-xs">ou cliquez pour parcourir</p>
                    <p className="font-montserrat text-creme/30 text-[11px] mt-2">JPG · PNG · PDF — max 5 fichiers · 10 Mo chacun</p>
                  </div>

                  {/* File previews */}
                  <AnimatePresence>
                    {files.length > 0 && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <p className="font-montserrat text-creme/50 text-xs mb-3 flex items-center gap-1.5">
                          <CheckIcon /> {files.length} fichier{files.length > 1 ? 's' : ''} prêt{files.length > 1 ? 's' : ''}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {files.map((f, i) => (
                            <FilePreview key={i} file={f} onRemove={() => setFiles(prev => prev.filter((_, j) => j !== i))} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA */}
                  <div className="flex justify-end pt-2">
                    <button onClick={() => canProceedStep1 && setStep(2)} disabled={!canProceedStep1}
                      className="px-8 py-3.5 font-cinzel font-bold text-sm tracking-wider rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{
                        background: canProceedStep1 ? 'linear-gradient(135deg, #C29B40, #E8D080)' : 'rgba(194,155,64,0.2)',
                        color: canProceedStep1 ? '#0D1B2A' : 'rgba(194,155,64,0.5)',
                        boxShadow: canProceedStep1 ? '0 4px 20px rgba(194,155,64,0.3)' : 'none',
                      }}>
                      Continuer →
                    </button>
                  </div>
                </div>
              </div>

              {/* Reassurance */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: '🔒', title: 'Données sécurisées', desc: 'Hébergé en France, chiffré bout-en-bout' },
                  { icon: '⏱️', title: 'Traitement sous 48h', desc: 'L\'Atelier prend le relais immédiatement' },
                  { icon: '📬', title: 'Confirmation par email', desc: 'Vous recevez un accusé de réception' },
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="text-xl mt-0.5">{r.icon}</span>
                    <div>
                      <p className="font-cinzel text-creme/70 text-xs font-semibold mb-0.5">{r.title}</p>
                      <p className="font-montserrat text-creme/40 text-[11px] leading-snug">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ════ STEP 2 : INFOS ENFANT ════ */}
          {step === 2 && !submitted && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>

              <div className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(194,155,64,0.15)', background: 'rgba(10,15,30,0.7)' }}>

                <div className="px-6 pt-6 pb-4 border-b border-white/5">
                  <p className="font-cinzel text-or/70 text-xs tracking-[0.2em] uppercase">Étape 2 — Informations du Scribe</p>
                  <h2 className="font-cinzel text-creme text-xl font-semibold mt-1">Qui est le héros de cette aventure ?</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Prénom de l'enfant" placeholder="Ex : Léa, Arthur…" value={childName}
                      onChange={setChildName} required icon="✨" />
                    <FormField label="Âge" placeholder="Ex : 9" value={childAge}
                      onChange={setChildAge} required icon="🎂" type="number" min="5" max="14" />
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Votre prénom" placeholder="Ex : Sophie" value={parentName}
                      onChange={setParentName} required icon="👤" />
                    <FormField label="Votre email" placeholder="votre@email.fr" value={parentEmail}
                      onChange={setParentEmail} required icon="📧" type="email" />
                  </div>

                  {/* Files recap */}
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
                    <CheckIcon />
                    <p className="font-montserrat text-emerald-400/80 text-xs">
                      {files.length} fichier{files.length > 1 ? 's' : ''} prêt{files.length > 1 ? 's' : ''} à envoyer
                    </p>
                    <button type="button" onClick={() => setStep(1)} className="ml-auto font-montserrat text-creme/40 text-xs hover:text-or transition-colors underline underline-offset-2">
                      Modifier
                    </button>
                  </div>

                  {/* Privacy notice */}
                  <p className="font-montserrat text-creme/30 text-[11px] leading-relaxed">
                    En envoyant ce formulaire, vous acceptez que vos données soient traitées pour la gestion de l&apos;abonnement de votre enfant.
                    Aucune donnée n&apos;est partagée avec des tiers.{' '}
                    <a href="/mentions-legales" className="text-or/50 hover:text-or transition-colors">Mentions légales</a>
                  </p>

                  <div className="flex justify-between items-center pt-2">
                    <button type="button" onClick={() => setStep(1)}
                      className="font-montserrat text-creme/40 text-sm hover:text-creme/70 transition-colors">
                      ← Retour
                    </button>
                    <button type="submit" disabled={!canProceedStep2}
                      className="px-8 py-3.5 font-cinzel font-bold text-sm tracking-wider rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{
                        background: canProceedStep2 ? 'linear-gradient(135deg, #C29B40, #E8D080)' : 'rgba(194,155,64,0.2)',
                        color: canProceedStep2 ? '#0D1B2A' : 'rgba(194,155,64,0.5)',
                        boxShadow: canProceedStep2 ? '0 4px 20px rgba(194,155,64,0.3)' : 'none',
                      }}>
                      Envoyer la mission ✦
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* ════ STEP 3 : CONFIRMATION ════ */}
          {step === 3 && submitted && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <div className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
                style={{
                  background: 'radial-gradient(ellipse at 50% -10%, rgba(194,155,64,0.12) 0%, rgba(10,15,30,0.95) 70%)',
                  border: '1px solid rgba(194,155,64,0.25)',
                }}>

                {/* Sparkles */}
                {[{ x: '10%', y: '20%' }, { x: '88%', y: '15%' }, { x: '50%', y: '5%' }, { x: '15%', y: '75%' }, { x: '85%', y: '70%' }].map((p, i) => (
                  <motion.div key={i} className="absolute pointer-events-none" style={{ left: p.x, top: p.y }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
                    transition={{ duration: 2.5 + i * 0.4, delay: i * 0.3, repeat: Infinity }}>
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="#C29B40">
                      <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" />
                    </svg>
                  </motion.div>
                ))}

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'rgba(52,211,153,0.12)', border: '2px solid rgba(52,211,153,0.4)' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M6 18L14 26L30 10" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>

                <p className="font-cinzel text-or text-xs tracking-[0.3em] uppercase mb-3">✦ Mission transmise</p>
                <h2 className="font-cinzel text-creme text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  L'Atelier des Scribes<br />a reçu la mission de{' '}
                  <span className="gold-shimmer">{childName || 'votre enfant'}</span>.
                </h2>
                <p className="font-montserrat text-creme/60 text-base max-w-md mx-auto leading-relaxed mb-8">
                  Un email de confirmation a été envoyé à <strong className="text-creme/80">{parentEmail}</strong>.
                  L'Atelier traite les missions sous 48h — le prochain chapitre prend forme.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
                  {[
                    { step: '01', title: 'Réception', desc: 'L\'Atelier examine le formulaire et les dessins.', color: '#C29B40' },
                    { step: '02', title: 'Création', desc: 'Votre illustrateur tisse les choix dans le chapitre.', color: '#a78bfa' },
                    { step: '03', title: 'Envoi', desc: 'Le chapitre illustré arrive dans votre boîte dans 7 jours.', color: '#34d399' },
                  ].map((s, i) => (
                    <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="font-cinzel font-bold text-xs" style={{ color: s.color }}>{s.step}</span>
                      <p className="font-cinzel text-creme/80 text-sm font-semibold mt-1 mb-1">{s.title}</p>
                      <p className="font-montserrat text-creme/45 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/espace-auteur"
                    className="px-8 py-3.5 font-cinzel font-bold text-sm tracking-wider rounded-xl transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #C29B40, #E8D080)', color: '#0D1B2A', boxShadow: '0 4px 20px rgba(194,155,64,0.3)' }}>
                    Accéder à l'Espace Auteur →
                  </Link>
                  <Link href="/"
                    className="px-8 py-3.5 font-cinzel text-creme/60 text-sm tracking-wider rounded-xl border border-white/10 hover:border-white/20 hover:text-creme/80 transition-all">
                    Retour à l'accueil
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>
    </div>
  )
}

/* ── Reusable form field ── */
function FormField({
  label, placeholder, value, onChange, required, icon, type = 'text', min, max,
}: {
  label: string; placeholder: string; value: string
  onChange: (v: string) => void; required?: boolean; icon?: string
  type?: string; min?: string; max?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="font-cinzel text-creme/50 text-[11px] tracking-wider uppercase flex items-center gap-1.5 mb-1.5">
        {icon && <span>{icon}</span>} {label} {required && <span className="text-or/60">*</span>}
      </label>
      <input
        type={type} placeholder={placeholder} value={value} required={required}
        min={min} max={max}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 rounded-xl font-montserrat text-creme text-sm placeholder-creme/25 outline-none transition-all duration-300"
        style={{
          background: focused ? 'rgba(194,155,64,0.06)' : 'rgba(255,255,255,0.03)',
          border: focused ? '1.5px solid rgba(194,155,64,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
          boxShadow: focused ? '0 0 0 3px rgba(194,155,64,0.08)' : 'none',
        }}
      />
    </div>
  )
}
