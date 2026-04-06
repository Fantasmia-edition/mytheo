'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase, type ScribeProfile, type Chapter, type Message } from '@/lib/supabase'

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */

/** Nombre total de chapitres selon le plan */
function totalChapters(plan: ScribeProfile['plan']) {
  return plan === 'intrepide' ? 24 : 12
}

/** Génère la liste complète des chapitres (DB + placeholders) */
function buildChapterList(dbChapters: Chapter[], plan: ScribeProfile['plan']) {
  const total = totalChapters(plan)
  return Array.from({ length: total }, (_, i) => {
    const n = i + 1
    const db = dbChapters.find(c => c.chapter_number === n)
    if (db) return db
    // Placeholder pour les chapitres non encore créés
    return {
      id:             `placeholder-${n}`,
      scribe_id:      '',
      chapter_number: n,
      title:          n === total ? 'Le Livre Final' : '???',
      status:         (n === 1 && dbChapters.length === 0 ? 'in_progress' : 'pending') as Chapter['status'],
      delivery_date:  null,
      pdf_url:        null,
      created_at:     '',
    }
  })
}

/* ══════════════════════════════════════════════════════════════
   SOUS-COMPOSANTS
══════════════════════════════════════════════════════════════ */

function AvatarCard({ name, power, companion, destiny }: { name: string; power: string; companion: string; destiny: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 30% -10%, rgba(94,50,180,0.5) 0%, rgba(13,27,42,0.97) 65%)',
        border: '1.5px solid rgba(194,155,64,0.25)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.3)',
      }}>
      {Array.from({ length: 25 }, (_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: i % 4 === 0 ? 2 : 1, height: i % 4 === 0 ? 2 : 1,
          left: `${(i * 41 + 13) % 92 + 4}%`, top: `${(i * 59 + 11) % 85 + 5}%`,
          background: 'rgba(254,250,224,0.7)', opacity: 0.15 + (i % 5) * 0.12,
        }} />
      ))}
      <div className="flex justify-center pt-6 relative">
        <svg width="120" height="160" viewBox="0 0 140 190" fill="none">
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
      <div className="px-5 pb-5 space-y-3 -mt-4">
        <div className="text-center">
          <h3 className="font-cinzel font-bold text-xl text-creme">{name}</h3>
          {power && (
            <span className="font-montserrat text-[11px] px-3 py-0.5 rounded-full inline-block mt-1"
              style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa' }}>
              {power}
            </span>
          )}
        </div>
        <div className="h-px" style={{ background: 'rgba(194,155,64,0.15)' }} />
        {companion && (
          <div className="flex items-center gap-2">
            <span className="text-sm">🐉</span>
            <span className="font-montserrat text-creme/60 text-xs">{companion}</span>
          </div>
        )}
        {destiny && (
          <div className="px-3 py-2 rounded-lg" style={{ background: 'rgba(194,155,64,0.06)', border: '1px solid rgba(194,155,64,0.12)' }}>
            <p className="font-montserrat text-[11px] italic leading-relaxed" style={{ color: 'rgba(194,155,64,0.8)' }}>
              "{destiny}"
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function ChapterItem({ ch, index }: { ch: ReturnType<typeof buildChapterList>[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const isPlaceholder = ch.id.startsWith('placeholder-')

  const statusMap = {
    delivered:   { dot: '#34d399', bar: 'rgba(52,211,153,0.25)',  text: '#34d399',              label: 'Livré' },
    in_progress: { dot: '#C29B40', bar: 'rgba(194,155,64,0.25)',  text: '#C29B40',              label: 'En création' },
    pending:     { dot: 'rgba(255,255,255,0.1)', bar: 'rgba(255,255,255,0.04)', text: 'rgba(254,250,224,0.2)', label: 'À venir' },
  }
  const c = statusMap[ch.status] ?? statusMap.pending
  const isLocked = ch.status === 'pending' && isPlaceholder

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
      <button
        onClick={() => !isLocked && setExpanded(e => !e)}
        className="w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 text-left"
        style={{ background: expanded ? c.bar : 'transparent', cursor: isLocked ? 'default' : 'pointer' }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-cinzel text-xs font-bold"
          style={{ background: c.bar, border: `1.5px solid ${c.dot}`, color: c.dot }}>
          {ch.chapter_number}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-cinzel text-sm font-semibold truncate" style={{ color: c.text }}>
            {ch.status === 'in_progress' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-or mr-2 animate-pulse" />}
            {ch.title}
          </p>
          {ch.delivery_date && (
            <p className="font-montserrat text-[11px] mt-0.5" style={{ color: 'rgba(254,250,224,0.3)' }}>
              {new Date(ch.delivery_date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
        {ch.status === 'in_progress' && (
          <span className="font-montserrat text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: 'rgba(194,155,64,0.15)', color: '#C29B40', border: '1px solid rgba(194,155,64,0.3)' }}>
            En cours
          </span>
        )}
      </button>

      {expanded && !isLocked && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="mx-4 mb-2 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          {ch.status === 'delivered' ? (
            <div className="flex items-center justify-between gap-3">
              <p className="font-montserrat text-creme/50 text-xs">Chapitre livré et archivé dans votre livre.</p>
              {ch.pdf_url && (
                <a href={ch.pdf_url} target="_blank" rel="noopener noreferrer"
                  className="font-montserrat text-or text-xs hover:text-or/80 transition-colors underline underline-offset-2 flex-shrink-0">
                  Télécharger le PDF
                </a>
              )}
            </div>
          ) : ch.status === 'in_progress' ? (
            <div className="space-y-2">
              <p className="font-montserrat text-creme/50 text-xs">L'Atelier Mytheo travaille sur ce chapitre. Envoyez votre mission pour le faire avancer.</p>
              <Link href="/espace-auteur/upload"
                className="inline-block font-cinzel text-xs font-bold px-4 py-2 rounded-lg transition-all"
                style={{ background: 'rgba(194,155,64,0.12)', color: '#C29B40', border: '1px solid rgba(194,155,64,0.25)' }}>
                Envoyer ma mission →
              </Link>
            </div>
          ) : null}
        </motion.div>
      )}
    </motion.div>
  )
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg">{icon}</span>
        <span className="font-cinzel font-bold text-xl" style={{ color }}>{value}</span>
      </div>
      <p className="font-montserrat text-creme/40 text-xs">{label}</p>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAGE PRINCIPALE
══════════════════════════════════════════════════════════════ */
export default function EspaceAuteurPage() {
  const router = useRouter()

  const [profile,  setProfile]  = useState<ScribeProfile | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')

  useEffect(() => {
    async function loadData() {
      // 1. Vérifier la session
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/connexion')
        return
      }

      // 2. Charger le profil
      const { data: profileData, error: profileError } = await supabase
        .from('scribe_profiles')
        .select('*')
        .eq('parent_id', session.user.id)
        .single()

      if (profileError || !profileData) {
        setError('Profil introuvable. Contactez le support.')
        setLoading(false)
        return
      }
      setProfile(profileData)

      // 3. Charger les chapitres
      const { data: chapData } = await supabase
        .from('chapters')
        .select('*')
        .eq('scribe_id', profileData.id)
        .order('chapter_number')
      setChapters(chapData ?? [])

      // 4. Charger les messages
      const { data: msgData } = await supabase
        .from('messages')
        .select('*')
        .eq('scribe_id', profileData.id)
        .order('created_at', { ascending: false })
      setMessages(msgData ?? [])

      setLoading(false)
    }

    loadData()
  }, [router])

  // Déconnexion
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  /* ── États de chargement ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 100%)' }}>
        <div className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 mx-auto mb-4">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="16" stroke="rgba(194,155,64,0.2)" strokeWidth="3" />
              <path d="M20 4 A16 16 0 0 1 36 20" stroke="#C29B40" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>
          <p className="font-cinzel text-or/60 text-sm tracking-widest">Chargement…</p>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6"
        style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 100%)' }}>
        <div className="text-center max-w-sm">
          <p className="font-cinzel text-red-400/80 text-lg mb-4">{error || 'Profil introuvable.'}</p>
          <Link href="/" className="font-montserrat text-or/60 text-sm hover:text-or transition-colors">← Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  /* ── Calculs ── */
  const total     = totalChapters(profile.plan)
  const allChaps  = buildChapterList(chapters, profile.plan)
  const delivered = chapters.filter(c => c.status === 'delivered').length
  const missions  = chapters.filter(c => c.status !== 'pending').length
  const unread    = messages.filter(m => !m.read).length
  const planLabel = profile.plan === 'intrepide' ? "L'Explorateur Intrépide" : 'Le Scribe Patient'
  const startDate = new Date(profile.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 50%, #0a1520 100%)' }}>

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(94,50,180,0.8) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, rgba(194,155,64,0.5) 0%, transparent 70%)' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(7,13,24,0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-cinzel text-or font-bold text-base tracking-wide">✦ Mytheo</Link>
          <div className="flex items-center gap-4">
            {unread > 0 && <div className="w-2 h-2 rounded-full bg-or animate-pulse" title={`${unread} message(s) non lu(s)`} />}
            <span className="font-montserrat text-creme/40 text-sm hidden sm:block">
              Bonjour, <span className="text-creme/70">{profile.parent_name}</span>
            </span>
            <button onClick={handleSignOut} className="font-montserrat text-creme/30 text-xs hover:text-creme/60 transition-colors">
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        {/* Kit en route — nouveaux utilisateurs (0 chapitres livrés) */}
        {delivered === 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl mb-8"
            style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(194,155,64,0.12) 0%, rgba(10,15,30,0.8) 70%)', border: '1px solid rgba(194,155,64,0.25)' }}>
            <span className="text-3xl flex-shrink-0">📦</span>
            <div className="flex-1">
              <p className="font-cinzel text-or font-semibold text-sm mb-1">Votre Kit de Bienvenue est en route !</p>
              <p className="font-montserrat text-creme/55 text-xs leading-relaxed">
                L'Atelier Mytheo prépare le kit de <strong className="text-creme/75">{profile.child_name}</strong>.
                Livraison estimée sous <strong className="text-creme/75">5 à 7 jours ouvrés</strong>.
                Dès réception, revenez ici pour uploader la première mission.
              </p>
            </div>
          </motion.div>
        )}

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Espace Auteur</span>
          <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-creme mt-2">
            L'aventure de <span className="gold-shimmer">{profile.avatar_name}</span>
          </h1>
          <p className="font-montserrat text-creme/40 text-sm mt-1">
            {planLabel} · Depuis {startDate}
          </p>
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8">
          {[
            { href: '/espace-auteur/upload', label: 'Envoyer ma mission', icon: '📤', primary: true },
            { href: '/espace-auteur/abonnement', label: 'Mon abonnement', icon: '⚙️', primary: false },
            { href: '#messages', label: `Messages${unread ? ` (${unread})` : ''}`, icon: '✉️', primary: false },
          ].map(a => (
            <Link key={a.href} href={a.href}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-cinzel text-sm font-semibold transition-all duration-200"
              style={a.primary ? {
                background: 'linear-gradient(135deg, #C29B40, #E8D080)', color: '#0D1B2A',
                boxShadow: '0 4px 16px rgba(194,155,64,0.25)',
              } : {
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(254,250,224,0.6)',
              }}>
              <span>{a.icon}</span> {a.label}
            </Link>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left : Avatar + Stats */}
          <div className="space-y-5">
            <AvatarCard
              name={profile.avatar_name}
              power={profile.power}
              companion={profile.companion}
              destiny={profile.destiny}
            />

            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Chapitres livrés"   value={`${delivered}/${total}`} icon="📖" color="#34d399" />
              <StatCard label="Missions envoyées"  value={`${missions}`}           icon="✉️" color="#C29B40" />
              <StatCard label="Avancement"         value={`${Math.round(delivered / total * 100)}%`} icon="⚡" color="#a78bfa" />
            </div>
          </div>

          {/* Right : Timeline + Messages */}
          <div className="lg:col-span-2 space-y-5">

            {/* Progress bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-cinzel text-creme/80 text-sm font-semibold">Progression de l'aventure</h2>
                <span className="font-montserrat text-creme/40 text-xs">{delivered} / {total} chapitres</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(delivered / total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  style={{ background: 'linear-gradient(90deg, #34d399, #C29B40)' }} />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-montserrat text-[11px] text-creme/30">Début</span>
                <span className="font-montserrat text-[11px] text-or/50">Livre final ✦</span>
              </div>
            </motion.div>

            {/* Chapter list */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-cinzel text-creme/80 text-sm font-semibold">Les {total} chapitres</h2>
                <div className="flex items-center gap-3 font-montserrat text-[11px] text-creme/30">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400/70 inline-block"/> Livré</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-or/70 inline-block"/> En cours</span>
                </div>
              </div>
              <div className="p-2">
                {allChaps.map((ch, i) => (
                  <ChapterItem key={ch.id} ch={ch} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Messages */}
            <motion.div id="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-cinzel text-creme/80 text-sm font-semibold flex items-center gap-2">
                  ✉️ Messages de l'Atelier
                  {unread > 0 && (
                    <span className="font-montserrat text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(194,155,64,0.15)', color: '#C29B40', border: '1px solid rgba(194,155,64,0.3)' }}>
                      {unread} nouveau{unread > 1 ? 'x' : ''}
                    </span>
                  )}
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {messages.length === 0 ? (
                  <p className="font-montserrat text-creme/30 text-xs text-center py-4">
                    Aucun message pour l'instant. L'Atelier vous écrira dès que l'aventure avancera.
                  </p>
                ) : messages.map((msg, i) => (
                  <div key={msg.id} className="flex gap-3 p-3 rounded-xl transition-all"
                    style={{ background: msg.read ? 'rgba(255,255,255,0.02)' : 'rgba(194,155,64,0.06)', border: `1px solid ${msg.read ? 'rgba(255,255,255,0.05)' : 'rgba(194,155,64,0.12)'}` }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-cinzel text-xs font-bold"
                      style={{ background: 'rgba(94,50,180,0.3)', border: '1px solid rgba(94,50,180,0.4)', color: '#a78bfa' }}>
                      ✦
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-cinzel text-xs font-semibold" style={{ color: 'rgba(167,139,250,0.8)' }}>L'Atelier Mytheo</p>
                        <p className="font-montserrat text-creme/30 text-[11px] flex-shrink-0">
                          {new Date(msg.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <p className="font-montserrat text-creme/60 text-xs leading-relaxed">{msg.text}</p>
                    </div>
                    {!msg.read && <div className="w-2 h-2 rounded-full bg-or flex-shrink-0 mt-1" />}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}
