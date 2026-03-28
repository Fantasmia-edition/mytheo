'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

function UploadIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
      <path d="M24 32V16M24 16L17 23M24 16L31 23" stroke="#C29B40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 36C8 36 8 40 12 40H36C40 40 40 36 40 36" stroke="#C29B40" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

const CURRENT_CHAPTER = { n: 6, title: 'La Nuit des Cent Étoiles', deadline: '28 mars 2026' }

export default function EspaceUploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [noteFocused, setNoteFocused] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((fl: FileList | null) => {
    if (!fl) return
    const accepted = Array.from(fl).filter(f => f.type.startsWith('image/') || f.type === 'application/pdf')
    setFiles(prev => [...prev, ...accepted].slice(0, 8))
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files)
  }

  if (submitted) return (
    <PageShell>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center py-16">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(52,211,153,0.1)', border: '2px solid rgba(52,211,153,0.4)' }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M6 18L14 26L30 10" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Mission transmise</span>
        <h2 className="font-cinzel text-creme text-2xl font-bold mt-3 mb-4">
          Chapitre {CURRENT_CHAPTER.n} en route !
        </h2>
        <p className="font-montserrat text-creme/55 text-sm leading-relaxed mb-8">
          L'Atelier des Scribes a reçu {files.length} fichier{files.length > 1 ? 's' : ''}.
          Le chapitre "<em>{CURRENT_CHAPTER.title}</em>" sera créé dans les prochains jours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/espace-auteur"
            className="px-8 py-3.5 font-cinzel font-bold text-sm rounded-xl"
            style={{ background: 'linear-gradient(135deg, #C29B40, #E8D080)', color: '#0D1B2A', boxShadow: '0 4px 20px rgba(194,155,64,0.3)' }}>
            ← Retour à l'Espace Auteur
          </Link>
        </div>
      </motion.div>
    </PageShell>
  )

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/espace-auteur" className="font-montserrat text-creme/40 text-xs hover:text-creme/70 transition-colors flex items-center gap-1.5 mb-4">
            ← Espace Auteur
          </Link>
          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Mission mensuelle</span>
          <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-creme mt-2 mb-2">Envoyer ma mission</h1>
          <p className="font-montserrat text-creme/50 text-sm">
            Vos dessins et réponses pour le chapitre <strong className="text-creme/80">#{CURRENT_CHAPTER.n} — {CURRENT_CHAPTER.title}</strong>
          </p>
        </motion.div>

        {/* Deadline banner */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="flex items-center gap-3 p-4 rounded-xl mb-6"
          style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)' }}>
          <span className="text-lg">⏰</span>
          <div>
            <p className="font-cinzel text-sm font-semibold" style={{ color: 'rgba(248,113,113,0.9)' }}>
              Deadline : {CURRENT_CHAPTER.deadline}
            </p>
            <p className="font-montserrat text-creme/40 text-xs mt-0.5">
              Envoyez votre mission avant cette date pour que le chapitre soit prêt dans les temps.
            </p>
          </div>
        </motion.div>

        {/* What to send */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="p-5 rounded-xl mb-6"
          style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="font-cinzel text-creme/70 text-sm font-semibold mb-3 flex items-center gap-2">
            📋 Ce qu'il faut inclure dans cette mission
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { icon: '🗺️', text: 'Le formulaire de mission du chapitre 6 rempli' },
              { icon: '🎨', text: 'Les dessins du personnage ou de la scène clé' },
              { icon: '✍️', text: 'Les choix narratifs cochés ou écrits' },
              { icon: '📸', text: 'Photos nettes ou scan PDF acceptés' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs font-montserrat"
                style={{ color: 'rgba(254,250,224,0.55)' }}>
                <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Drop zone */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-2xl flex flex-col items-center justify-center py-14 px-6 text-center transition-all duration-300 mb-4"
            style={{
              border: dragging ? '2px dashed rgba(194,155,64,0.7)' : '2px dashed rgba(194,155,64,0.2)',
              background: dragging ? 'rgba(194,155,64,0.05)' : 'rgba(255,255,255,0.015)',
            }}>
            <input ref={fileInputRef} type="file" accept="image/*,application/pdf" multiple className="hidden"
              onChange={e => handleFiles(e.target.files)} />
            <motion.div animate={dragging ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}>
              <UploadIcon />
            </motion.div>
            <p className="font-cinzel text-creme/70 text-sm font-semibold mt-3 mb-1">
              Glissez vos fichiers ici
            </p>
            <p className="font-montserrat text-creme/35 text-xs">ou cliquez pour parcourir</p>
            <p className="font-montserrat text-creme/25 text-[11px] mt-2">JPG · PNG · PDF — max 8 fichiers · 20 Mo chacun</p>
          </div>

          {/* File list */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4 space-y-2">
                {files.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
                    <span className="text-base">{f.type === 'application/pdf' ? '📄' : '🖼️'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-montserrat text-creme/70 text-xs truncate">{f.name}</p>
                      <p className="font-montserrat text-creme/30 text-[11px]">{(f.size / 1024 / 1024).toFixed(1)} Mo</p>
                    </div>
                    <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-creme/30 hover:text-red-400 hover:bg-red-900/20 transition-colors flex-shrink-0">
                      ✕
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Note optionnelle */}
          <div className="mb-6">
            <label className="font-cinzel text-creme/40 text-[11px] tracking-wider uppercase block mb-1.5">
              Message pour l'Atelier <span className="text-creme/25 normal-case font-montserrat">(optionnel)</span>
            </label>
            <textarea
              placeholder="Ex : Léa a particulièrement aimé imaginer l'animal du chapitre 5. Elle a dessiné deux versions !"
              value={note} rows={3}
              onChange={e => setNote(e.target.value)}
              onFocus={() => setNoteFocused(true)} onBlur={() => setNoteFocused(false)}
              className="w-full px-4 py-3 rounded-xl font-montserrat text-creme text-sm placeholder-creme/20 outline-none transition-all duration-300 resize-none"
              style={{
                background: noteFocused ? 'rgba(194,155,64,0.05)' : 'rgba(255,255,255,0.03)',
                border: noteFocused ? '1.5px solid rgba(194,155,64,0.4)' : '1.5px solid rgba(255,255,255,0.08)',
                boxShadow: noteFocused ? '0 0 0 3px rgba(194,155,64,0.06)' : 'none',
              }}
            />
          </div>

          {/* Submit */}
          <button onClick={() => files.length > 0 && setSubmitted(true)} disabled={files.length === 0}
            className="w-full py-4 font-cinzel font-bold text-sm tracking-wider rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: files.length > 0 ? 'linear-gradient(135deg, #C29B40, #E8D080)' : 'rgba(194,155,64,0.15)',
              color: files.length > 0 ? '#0D1B2A' : 'rgba(194,155,64,0.4)',
              boxShadow: files.length > 0 ? '0 6px 24px rgba(194,155,64,0.3)' : 'none',
            }}>
            {files.length > 0
              ? `Envoyer ${files.length} fichier${files.length > 1 ? 's' : ''} à l'Atelier ✦`
              : 'Ajoutez au moins un fichier pour continuer'}
          </button>
          <p className="font-montserrat text-creme/25 text-[11px] text-center mt-3">
            Vos fichiers sont transmis de manière sécurisée et visibles uniquement par l'Atelier des Scribes.
          </p>
        </motion.div>
      </div>
    </PageShell>
  )
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 40%, #0a1520 100%)' }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(194,155,64,0.6) 0%, transparent 70%)' }} />
      </div>
      <nav className="relative z-20 border-b px-6 py-4"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(7,13,24,0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-cinzel text-or font-bold text-base tracking-wide">✦ L'Odyssée des Scribes</Link>
          <Link href="/espace-auteur" className="font-montserrat text-creme/40 text-sm hover:text-creme/70 transition-colors">Espace Auteur</Link>
        </div>
      </nav>
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">{children}</div>
    </div>
  )
}
