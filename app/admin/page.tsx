'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
interface AdminProfile {
  id: string
  parent_email: string
  parent_name: string
  child_name: string
  avatar_name: string
  plan: 'patient' | 'intrepide'
  status: string
  address_city: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  chapters_total: number
  chapters_delivered: number
  created_at: string
}

const STATUS_COLOR: Record<string, { bg: string; text: string; label: string }> = {
  active:          { bg: 'rgba(52,211,153,0.12)',  text: '#34d399',  label: 'Actif' },
  pending_payment: { bg: 'rgba(251,191,36,0.12)',   text: '#fbbf24',  label: 'Paiement en attente' },
  paused:          { bg: 'rgba(248,113,113,0.12)',  text: '#f87171',  label: 'Suspendu' },
  cancelled:       { bg: 'rgba(156,163,175,0.12)',  text: '#9ca3af',  label: 'Résilié' },
}

const PLAN_COLOR: Record<string, string> = {
  patient:   '#a78bfa',
  intrepide: '#C29B40',
}

/* ══════════════════════════════════════════════════════════════
   PAGE ADMIN
══════════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const router = useRouter()

  const [profiles,   setProfiles]   = useState<AdminProfile[]>([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [search,     setSearch]     = useState('')
  const [filter,     setFilter]     = useState<'all' | 'active' | 'pending_payment' | 'cancelled'>('all')

  useEffect(() => {
    async function loadAdmin() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/connexion'); return }

      const email = session.user.email ?? ''
      setAdminEmail(email)

      const res = await fetch('/api/admin/profiles', {
        headers: { 'x-admin-email': email },
      })

      if (res.status === 403) {
        setError('Accès refusé. Vous n\'avez pas les droits administrateur.')
        setLoading(false)
        return
      }

      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }

      setProfiles(data.profiles ?? [])
      setLoading(false)
    }
    loadAdmin()
  }, [router])

  /* ── Filtres ── */
  const filtered = profiles.filter(p => {
    const matchSearch = !search ||
      p.parent_email.toLowerCase().includes(search.toLowerCase()) ||
      p.child_name.toLowerCase().includes(search.toLowerCase()) ||
      p.avatar_name.toLowerCase().includes(search.toLowerCase()) ||
      p.parent_name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  /* ── Compteurs ── */
  const counts = {
    total:    profiles.length,
    active:   profiles.filter(p => p.status === 'active').length,
    pending:  profiles.filter(p => p.status === 'pending_payment').length,
    intrepide: profiles.filter(p => p.plan === 'intrepide').length,
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 100%)' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-10 h-10">
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="16" stroke="rgba(194,155,64,0.2)" strokeWidth="3" />
            <path d="M20 4 A16 16 0 0 1 36 20" stroke="#C29B40" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6"
        style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 100%)' }}>
        <div className="text-center max-w-sm">
          <p className="font-cinzel text-red-400/80 text-lg mb-4">{error}</p>
          <Link href="/" className="font-montserrat text-or/60 text-sm hover:text-or transition-colors">← Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16" style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 100%)' }}>

      {/* Nav */}
      <nav className="border-b px-6 py-4 sticky top-0 z-20"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(7,13,24,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-cinzel text-or font-bold text-base tracking-wide">✦ Mytheo</Link>
            <span className="font-montserrat text-creme/25 text-xs hidden sm:block">/</span>
            <span className="font-cinzel text-creme/50 text-sm hidden sm:block">Dashboard Admin</span>
          </div>
          <span className="font-montserrat text-creme/30 text-xs">{adminEmail}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Administration</span>
          <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-creme mt-2">Tableau de bord</h1>
        </motion.div>

        {/* KPI cards */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Inscrits total',        value: counts.total,     color: '#FEFAE0',  icon: '👥' },
            { label: 'Abonnements actifs',    value: counts.active,    color: '#34d399',  icon: '✅' },
            { label: 'Paiements en attente',  value: counts.pending,   color: '#fbbf24',  icon: '⏳' },
            { label: 'Plan Intrépide',        value: counts.intrepide, color: '#C29B40',  icon: '⭐' },
          ].map((kpi, i) => (
            <div key={i} className="p-4 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{kpi.icon}</span>
                <span className="font-cinzel font-bold text-2xl" style={{ color: kpi.color }}>{kpi.value}</span>
              </div>
              <p className="font-montserrat text-creme/40 text-xs">{kpi.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Filtres + Recherche */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Rechercher par nom, email, pseudo…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl font-montserrat text-creme text-sm placeholder-creme/20 outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
          <div className="flex gap-2">
            {(['all', 'active', 'pending_payment', 'cancelled'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-2 rounded-xl font-montserrat text-xs transition-all"
                style={{
                  background: filter === f ? 'rgba(194,155,64,0.15)' : 'rgba(255,255,255,0.03)',
                  border:     filter === f ? '1px solid rgba(194,155,64,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  color:      filter === f ? '#C29B40' : 'rgba(254,250,224,0.4)',
                }}>
                {f === 'all' ? 'Tous' : f === 'active' ? 'Actifs' : f === 'pending_payment' ? 'En attente' : 'Résiliés'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Header */}
          <div className="hidden md:grid grid-cols-[1fr,1fr,120px,100px,80px,120px] gap-4 px-5 py-3 border-b border-white/5">
            {['Aventurier / Enfant', 'Parent', 'Formule', 'Statut', 'Chapitres', 'Inscription'].map(h => (
              <p key={h} className="font-cinzel text-[10px] tracking-wider text-creme/30 uppercase">{h}</p>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="font-montserrat text-creme/30 text-xs text-center py-10">
              {search ? 'Aucun résultat pour cette recherche.' : 'Aucun utilisateur inscrit.'}
            </p>
          ) : filtered.map((p, i) => {
            const sc = STATUS_COLOR[p.status] ?? STATUS_COLOR.cancelled
            const planColor = PLAN_COLOR[p.plan] ?? '#FEFAE0'
            const planLabel = p.plan === 'intrepide' ? 'Intrépide' : 'Patient'
            const total = p.plan === 'intrepide' ? 24 : 12
            const date  = new Date(p.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: '2-digit' })

            return (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.025 }}
                className="flex flex-col md:grid md:grid-cols-[1fr,1fr,120px,100px,80px,120px] gap-2 md:gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.015] transition-colors">

                {/* Aventurier */}
                <div>
                  <p className="font-cinzel text-sm font-semibold text-creme/90">{p.avatar_name}</p>
                  <p className="font-montserrat text-creme/40 text-xs mt-0.5">{p.child_name}{p.address_city ? ` · ${p.address_city}` : ''}</p>
                </div>

                {/* Parent */}
                <div>
                  <p className="font-montserrat text-creme/70 text-sm truncate">{p.parent_name || '—'}</p>
                  <p className="font-montserrat text-creme/35 text-xs truncate">{p.parent_email}</p>
                </div>

                {/* Plan */}
                <div className="flex items-center md:block">
                  <span className="font-cinzel text-xs font-bold" style={{ color: planColor }}>{planLabel}</span>
                </div>

                {/* Statut */}
                <div className="flex items-center md:block">
                  <span className="font-montserrat text-[11px] px-2 py-0.5 rounded-full"
                    style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.text}30` }}>
                    {sc.label}
                  </span>
                </div>

                {/* Chapitres */}
                <div className="flex items-center gap-2 md:block">
                  <p className="font-cinzel text-sm font-bold text-creme/80">{p.chapters_delivered}</p>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden md:mt-1 md:w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${(p.chapters_delivered / total) * 100}%`, background: '#34d399' }} />
                  </div>
                  <p className="font-montserrat text-creme/25 text-[10px] md:mt-0.5">/{total}</p>
                </div>

                {/* Date */}
                <div className="flex items-center md:block">
                  <p className="font-montserrat text-creme/40 text-xs">{date}</p>
                  {p.stripe_customer_id && (
                    <a
                      href={`https://dashboard.stripe.com/customers/${p.stripe_customer_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-montserrat text-or/40 hover:text-or text-[10px] md:block transition-colors underline underline-offset-2 ml-2 md:ml-0 md:mt-0.5"
                    >
                      Stripe ↗
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <p className="font-montserrat text-creme/20 text-xs text-center mt-6">
          {filtered.length} utilisateur{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''} · Données en temps réel depuis Supabase
        </p>
      </div>
    </div>
  )
}
