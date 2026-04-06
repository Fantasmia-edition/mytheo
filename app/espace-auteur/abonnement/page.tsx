'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase, type ScribeProfile } from '@/lib/supabase'

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
interface Invoice {
  id: string
  date: string
  amount: string
  status: string | null
  pdfUrl: string | null
}

const PLANS = {
  patient:   { label: 'Le Scribe Patient',      price: '24€', color: '#a78bfa', features: ['1 chapitre illustré / mois', 'Kit de bienvenue inclus', 'Pseudo d\'aventurier', 'Accès à l\'Espace Auteur', 'Livre relié final'] },
  intrepide: { label: "L'Explorateur Intrépide", price: '42€', color: '#C29B40', features: ['2 chapitres illustrés / mois', 'Kit de bienvenue premium', 'Pseudo d\'aventurier', 'Accès prioritaire à l\'Atelier', 'Livre relié final — édition collector', 'Cartes de collection exclusives'] },
}

const STATUS_LABELS: Record<string, string> = {
  active:          'Actif',
  pending_payment: 'En attente de paiement',
  paused:          'Suspendu',
  cancelled:       'Résilié',
}

/* ══════════════════════════════════════════════════════════════
   COMPOSANT MODAL
══════════════════════════════════════════════════════════════ */
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md rounded-2xl p-6"
        style={{ background: '#0f1a2e', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-cinzel text-creme font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-creme/40 hover:text-creme/80 hover:bg-white/5 transition-all">✕</button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAGE PRINCIPALE
══════════════════════════════════════════════════════════════ */
export default function AbonnementPage() {
  const router = useRouter()

  const [profile,  setProfile]  = useState<ScribeProfile | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading,  setLoading]  = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showPlanModal,   setShowPlanModal]   = useState(false)

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/connexion'); return }

      // Charger le profil
      const { data: p } = await supabase
        .from('scribe_profiles')
        .select('*')
        .eq('parent_id', session.user.id)
        .single()

      if (!p) { router.replace('/espace-auteur'); return }
      setProfile(p)

      // Charger les factures Stripe si un customer_id existe
      if (p.stripe_customer_id) {
        try {
          const res  = await fetch(`/api/subscriptions/invoices?customerId=${p.stripe_customer_id}`)
          const data = await res.json()
          if (data.invoices) setInvoices(data.invoices)
        } catch {
          console.error('Erreur chargement factures')
        }
      }

      setLoading(false)
    }
    loadData()
  }, [router])

  const handlePortal = async () => {
    if (!profile?.stripe_customer_id) return
    setPortalLoading(true)
    const res  = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'portal', customerId: profile.stripe_customer_id }),
    })
    const data = await res.json()
    if (data.redirectUrl) window.location.href = data.redirectUrl
    else setPortalLoading(false)
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

  if (!profile) return null

  const plan      = PLANS[profile.plan]
  const statusOk  = profile.status === 'active'
  const startDate = new Date(profile.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 40%, #0a1520 100%)' }}>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[400px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, rgba(194,155,64,0.5) 0%, transparent 70%)' }} />
      </div>

      {/* Nav */}
      <nav className="relative z-20 border-b px-6 py-4"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(7,13,24,0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-cinzel text-or font-bold text-base tracking-wide">✦ Mytheo</Link>
          <Link href="/espace-auteur" className="font-montserrat text-creme/40 text-sm hover:text-creme/70 transition-colors">Espace Auteur</Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-8 pb-24">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/espace-auteur" className="font-montserrat text-creme/40 text-xs hover:text-creme/70 transition-colors flex items-center gap-1.5 mb-4">
            ← Espace Auteur
          </Link>
          <span className="font-cinzel text-or text-xs tracking-[0.3em] uppercase">✦ Mon abonnement</span>
          <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-creme mt-2 mb-1">Gestion du compte</h1>
        </motion.div>

        {/* Current plan card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-5"
          style={{ border: `1.5px solid ${plan.color}25`, background: 'rgba(10,15,30,0.8)' }}>

          <div className="h-1" style={{ background: `linear-gradient(90deg, ${plan.color}, ${plan.color}40)` }} />

          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-montserrat text-[11px] px-2 py-0.5 rounded-full"
                    style={{
                      background: statusOk ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)',
                      border:     statusOk ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(248,113,113,0.3)',
                      color:      statusOk ? '#34d399' : '#f87171',
                    }}>
                    ● {STATUS_LABELS[profile.status] ?? profile.status}
                  </span>
                </div>
                <h2 className="font-cinzel text-xl font-bold" style={{ color: plan.color }}>{plan.label}</h2>
                <p className="font-montserrat text-creme/40 text-xs mt-1">Depuis le {startDate}</p>
                <p className="font-montserrat text-creme/40 text-xs mt-0.5">
                  Aventurier : <span className="text-creme/60">{profile.avatar_name}</span>
                  {profile.child_name !== profile.avatar_name && (
                    <span className="text-creme/30"> ({profile.child_name})</span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="font-cinzel text-3xl font-bold" style={{ color: plan.color }}>{plan.price}</p>
                <p className="font-montserrat text-creme/40 text-xs">par mois</p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 font-montserrat text-xs" style={{ color: 'rgba(254,250,224,0.6)' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 4" stroke={plan.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowPlanModal(true)}
                className="flex-1 py-3 font-cinzel text-sm font-bold rounded-xl transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)', color: 'rgba(254,250,224,0.7)' }}>
                Changer de formule
              </button>
              {profile.stripe_customer_id ? (
                <button onClick={handlePortal} disabled={portalLoading}
                  className="flex-1 py-3 font-cinzel text-sm font-bold rounded-xl transition-all duration-200 disabled:opacity-50"
                  style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}99)`, color: '#0D1B2A', boxShadow: `0 4px 16px ${plan.color}30` }}>
                  {portalLoading ? 'Redirection…' : 'Gérer le paiement →'}
                </button>
              ) : (
                <p className="flex-1 py-3 font-montserrat text-xs text-creme/30 text-center">
                  Paiement non encore configuré.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Invoice history */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden mb-5"
          style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="px-5 py-4 border-b border-white/5">
            <h2 className="font-cinzel text-creme/80 text-sm font-semibold">Historique des paiements</h2>
          </div>
          <div className="divide-y divide-white/5">
            {invoices.length === 0 ? (
              <p className="font-montserrat text-creme/30 text-xs text-center py-6">
                {profile.stripe_customer_id ? 'Aucune facture pour le moment.' : 'Paiement non encore effectué.'}
              </p>
            ) : invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="font-montserrat text-creme/60 text-xs">{inv.date}</span>
                  <span className="font-montserrat text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: inv.status === 'paid' ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
                      border:     inv.status === 'paid' ? '1px solid rgba(52,211,153,0.2)' : '1px solid rgba(248,113,113,0.2)',
                      color:      inv.status === 'paid' ? '#34d399' : '#f87171',
                    }}>
                    {inv.status === 'paid' ? 'Payé' : inv.status ?? '—'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-cinzel font-bold text-sm text-creme/80">{inv.amount}</span>
                  {inv.pdfUrl && (
                    <a href={inv.pdfUrl} target="_blank" rel="noopener noreferrer"
                      className="font-montserrat text-[11px] text-or/50 hover:text-or transition-colors underline underline-offset-2">
                      Reçu PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="rounded-xl p-5" style={{ background: 'rgba(155,28,28,0.06)', border: '1px solid rgba(155,28,28,0.2)' }}>
          <h3 className="font-cinzel text-sm font-semibold mb-2" style={{ color: 'rgba(248,113,113,0.8)' }}>Zone sensible</h3>
          <p className="font-montserrat text-creme/40 text-xs leading-relaxed mb-4">
            La résiliation met fin aux livraisons dès la fin de la période en cours. Le livre final ne sera pas créé si l'aventure n'est pas complète.
          </p>
          <button onClick={() => setShowCancelModal(true)}
            className="font-montserrat text-xs px-4 py-2.5 rounded-lg transition-all"
            style={{ background: 'rgba(155,28,28,0.12)', border: '1px solid rgba(155,28,28,0.3)', color: 'rgba(248,113,113,0.7)' }}>
            Résilier l'abonnement
          </button>
        </motion.div>
      </div>

      {/* Change plan modal */}
      <AnimatePresence>
        {showPlanModal && (
          <Modal onClose={() => setShowPlanModal(false)} title="Changer de formule">
            <div className="space-y-3">
              {(Object.entries(PLANS) as [string, typeof plan][]).map(([id, p]) => (
                <button key={id} onClick={() => setShowPlanModal(false)}
                  className="w-full p-4 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: profile.plan === id ? `${p.color}10` : 'rgba(255,255,255,0.02)',
                    border:     profile.plan === id ? `1.5px solid ${p.color}40` : '1.5px solid rgba(255,255,255,0.08)',
                  }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-cinzel font-bold text-sm" style={{ color: p.color }}>{p.label}</p>
                    <span className="font-cinzel font-bold text-sm" style={{ color: p.color }}>{p.price}/mois</span>
                  </div>
                  {profile.plan === id && <span className="font-montserrat text-[10px]" style={{ color: 'rgba(254,250,224,0.35)' }}>Formule actuelle</span>}
                </button>
              ))}
              <p className="font-montserrat text-creme/30 text-[11px] pt-2">
                Pour changer de formule, utilisez le portail de gestion Stripe ci-dessus ou contactez-nous.
              </p>
              {profile.stripe_customer_id && (
                <button onClick={() => { setShowPlanModal(false); handlePortal() }}
                  className="w-full py-3 font-cinzel text-sm font-bold rounded-xl transition-all"
                  style={{ background: 'rgba(194,155,64,0.12)', color: '#C29B40', border: '1px solid rgba(194,155,64,0.3)' }}>
                  Gérer via Stripe →
                </button>
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Cancel modal */}
      <AnimatePresence>
        {showCancelModal && (
          <Modal onClose={() => setShowCancelModal(false)} title="Résilier l'abonnement">
            <p className="font-montserrat text-creme/60 text-sm leading-relaxed mb-5">
              Êtes-vous sûr ? En résiliant, <strong className="text-creme/80">{profile.child_name}</strong> ne recevra plus de nouveaux chapitres.
              Le livre final ne sera pas créé si l'aventure est incomplète.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 font-cinzel text-sm font-bold rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(254,250,224,0.7)' }}>
                Annuler
              </button>
              {profile.stripe_customer_id ? (
                <button onClick={() => { setShowCancelModal(false); handlePortal() }}
                  className="flex-1 py-3 font-cinzel text-sm font-bold rounded-xl"
                  style={{ background: 'rgba(155,28,28,0.2)', border: '1px solid rgba(155,28,28,0.4)', color: 'rgba(248,113,113,0.9)' }}>
                  Résilier via Stripe →
                </button>
              ) : (
                <button onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-3 font-cinzel text-sm font-bold rounded-xl"
                  style={{ background: 'rgba(155,28,28,0.2)', border: '1px solid rgba(155,28,28,0.4)', color: 'rgba(248,113,113,0.9)' }}>
                  Contactez-nous
                </button>
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}
