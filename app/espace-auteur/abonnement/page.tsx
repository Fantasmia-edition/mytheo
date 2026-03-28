'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const MOCK_SUB = {
  plan: 'intrepide' as const,
  status: 'active' as const,
  nextBilling: '1 avril 2026',
  amount: '42€',
  startDate: '1 octobre 2025',
  invoices: [
    { date: '1 mar 2026', amount: '42€', status: 'paid' },
    { date: '1 fév 2026', amount: '42€', status: 'paid' },
    { date: '1 jan 2026', amount: '42€', status: 'paid' },
    { date: '1 déc 2025', amount: '42€', status: 'paid' },
    { date: '1 nov 2025', amount: '42€', status: 'paid' },
    { date: '1 oct 2025', amount: '42€', status: 'paid' },
  ],
}

const PLANS = {
  patient: { label: 'Le Scribe Patient', price: '24€/mois', color: '#a78bfa', features: ['1 chapitre illustré / mois', 'Kit de bienvenue inclus', 'Carte d\'identité de Scribe', 'Accès à l\'Espace Auteur', 'Livre relié final'] },
  intrepide: { label: "L'Explorateur Intrépide", price: '42€/mois', color: '#C29B40', features: ['2 chapitres illustrés / mois', 'Kit de bienvenue premium', 'Carte d\'identité de Scribe', 'Accès prioritaire à l\'Atelier', 'Livre relié final — édition collector', 'Cartes de collection exclusives'] },
}

export default function AbonnementPage() {
  const sub = MOCK_SUB
  const plan = PLANS[sub.plan]
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showPlanModal, setShowPlanModal] = useState(false)

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
          <Link href="/" className="font-cinzel text-or font-bold text-base tracking-wide">✦ L'Odyssée des Scribes</Link>
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

          {/* Top accent */}
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${plan.color}, ${plan.color}40)` }} />

          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-montserrat text-[11px] px-2 py-0.5 rounded-full"
                    style={{ background: sub.status === 'active' ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)',
                      border: sub.status === 'active' ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(248,113,113,0.3)',
                      color: sub.status === 'active' ? '#34d399' : '#f87171' }}>
                    ● {sub.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <h2 className="font-cinzel text-xl font-bold" style={{ color: plan.color }}>{plan.label}</h2>
                <p className="font-montserrat text-creme/40 text-xs mt-1">Depuis le {sub.startDate}</p>
              </div>
              <div className="text-right">
                <p className="font-cinzel text-3xl font-bold" style={{ color: plan.color }}>{sub.amount}</p>
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

            {/* Billing info */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl mb-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2">
                <span className="text-base">📅</span>
                <p className="font-montserrat text-creme/55 text-xs">Prochain prélèvement</p>
              </div>
              <p className="font-cinzel text-creme/80 text-sm font-semibold">{sub.nextBilling}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowPlanModal(true)}
                className="flex-1 py-3 font-cinzel text-sm font-bold rounded-xl transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)', color: 'rgba(254,250,224,0.7)' }}
                onMouseOver={e => (e.currentTarget.style.borderColor = `${plan.color}40`)}
                onMouseOut={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                Changer de formule
              </button>
              <button
                className="flex-1 py-3 font-cinzel text-sm font-bold rounded-xl transition-all duration-200"
                style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}99)`, color: '#0D1B2A', boxShadow: `0 4px 16px ${plan.color}30` }}>
                Gérer le paiement →
              </button>
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
            {MOCK_SUB.invoices.map((inv, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="font-montserrat text-creme/60 text-xs">{inv.date}</span>
                  <span className="font-montserrat text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
                    Payé
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-cinzel font-bold text-sm text-creme/80">{inv.amount}</span>
                  <button className="font-montserrat text-[11px] text-or/50 hover:text-or transition-colors underline underline-offset-2">
                    Reçu PDF
                  </button>
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

      {/* ── Change plan modal ── */}
      <AnimatePresence>
        {showPlanModal && (
          <Modal onClose={() => setShowPlanModal(false)} title="Changer de formule">
            <div className="space-y-3">
              {(Object.entries(PLANS) as [string, typeof plan][]).map(([id, p]) => (
                <button key={id} onClick={() => setShowPlanModal(false)}
                  className="w-full p-4 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: sub.plan === id ? `${p.color}10` : 'rgba(255,255,255,0.02)',
                    border: sub.plan === id ? `1.5px solid ${p.color}40` : '1.5px solid rgba(255,255,255,0.08)',
                  }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-cinzel font-bold text-sm" style={{ color: p.color }}>{p.label}</p>
                    <span className="font-cinzel font-bold text-sm" style={{ color: p.color }}>{p.price}</span>
                  </div>
                  {sub.plan === id && <span className="font-montserrat text-[10px]" style={{ color: 'rgba(254,250,224,0.35)' }}>Formule actuelle</span>}
                </button>
              ))}
              <p className="font-montserrat text-creme/30 text-[11px] pt-2">
                Le changement prend effet au prochain cycle de facturation. Contactez-nous pour une aide personnalisée.
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* ── Cancel modal ── */}
      <AnimatePresence>
        {showCancelModal && (
          <Modal onClose={() => setShowCancelModal(false)} title="Résilier l'abonnement">
            <p className="font-montserrat text-creme/60 text-sm leading-relaxed mb-5">
              Êtes-vous sûr ? En résiliant, <strong className="text-creme/80">Léa</strong> ne recevra plus de nouveaux chapitres.
              Le livre final ne sera pas créé si l'aventure est incomplète.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 font-cinzel text-sm font-bold rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(254,250,224,0.7)' }}>
                Annuler
              </button>
              <button onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 font-cinzel text-sm font-bold rounded-xl"
                style={{ background: 'rgba(155,28,28,0.2)', border: '1px solid rgba(155,28,28,0.4)', color: 'rgba(248,113,113,0.9)' }}>
                Oui, résilier
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

    </div>
  )
}

/* ── Generic Modal ── */
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
