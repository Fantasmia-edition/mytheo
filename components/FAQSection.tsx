'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const faqs = [
  {
    q: 'Comment fonctionne Mytheo concrètement ?',
    a: 'Chaque mois, votre enfant reçoit une lettre de mission scellée. Il dessine, décrit ses choix, invente ses personnages sur le formulaire papier. Vous photographiez le document depuis votre téléphone et l\'envoyez en 30 secondes via le site Mytheo. Notre équipe prend le relais : les dessins et textes de votre enfant sont transformés en illustrations professionnelles, fidèles à sa vision. Chaque chapitre est relu et finalisé à la main avant impression.',
  },
  {
    q: 'Est-ce pour tous les âges ?',
    a: "Mytheo est conçue pour les enfants de 7 à 12 ans — l'âge idéal pour entrer dans la magie de la lecture et de la créativité écrite. Les missions s'adaptent automatiquement au niveau de lecture indiqué lors de l'inscription.",
  },
  {
    q: 'Comment envoyer le formulaire de mission ?',
    a: "Depuis votre téléphone, photographiez le formulaire rempli par votre enfant et déposez-le sur le site Mytheo en moins de 30 secondes. Vous recevez un email de confirmation, puis une notification dès que le chapitre illustré est prêt.",
  },
  {
    q: 'Puis-je mettre en pause ou résilier mon abonnement ?',
    a: "Absolument. Votre abonnement est sans engagement. Vous pouvez le mettre en pause, changer de formule ou l'annuler à tout moment depuis votre espace membre, sans frais ni pénalité. Nous vous demandons simplement un préavis de 15 jours pour le mois en cours.",
  },
  {
    q: 'Quand reçoit-on le livre final ?',
    a: "Le livre est fabriqué à la clôture de l'aventure et expédié dans un coffret cadeau. Les abonnés actifs depuis au moins 3 mois le reçoivent automatiquement, inclus dans leur formule.",
  },
  {
    q: "La lettre de bienvenue est-elle vraiment gratuite ?",
    a: "Oui, totalement. Votre Kit de Bienvenue — comprenant la première lettre de mission scellée à la cire, un livret de présentation et un marque-page doré — vous est envoyé gratuitement, sans condition ni engagement d'abonnement. C'est notre façon de vous laisser vivre la magie avant de décider.",
  },
]

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="rounded-xl overflow-hidden"
      style={{
        border: open ? '1px solid rgba(194,155,64,0.35)' : '1px solid rgba(255,255,255,0.06)',
        background: open ? 'rgba(194,155,64,0.04)' : 'rgba(255,255,255,0.015)',
        transition: 'border-color 0.3s, background 0.3s',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group"
      >
        <span className="font-cinzel text-creme text-sm md:text-base font-semibold leading-snug group-hover:text-or transition-colors duration-300">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-or/30 flex items-center justify-center"
          style={{ background: open ? 'rgba(194,155,64,0.15)' : 'transparent' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2 V12 M2 7 H12" stroke="#C29B40" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-or/15 mb-4" />
              <p className="font-montserrat text-creme/60 text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="faq" ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="font-cinzel text-or text-sm tracking-widest uppercase">Questions</span>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-creme mt-3 mb-4">
            Vos questions, nos réponses
          </h2>
          <p className="font-montserrat text-creme/50 text-base">
            Tout ce qu&apos;il faut savoir avant de commencer l&apos;aventure.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center p-8 rounded-2xl"
          style={{
            background: 'rgba(194,155,64,0.04)',
            border: '1px solid rgba(194,155,64,0.15)',
          }}
        >
          <p className="font-cinzel text-creme text-lg mb-2">Une autre question ?</p>
          <p className="font-montserrat text-creme/50 text-sm mb-5">
            Notre équipe répond sous 24h, avec plaisir.
          </p>
          <a
            href="mailto:bonjour@odyssee-des-scribes.fr"
            className="inline-flex items-center gap-2 font-montserrat text-sm text-or hover:text-or-light transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="10" rx="2" stroke="#C29B40" strokeWidth="1.2" />
              <path d="M1 5.5 L8 9.5 L15 5.5" stroke="#C29B40" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            bonjour@odyssee-des-scribes.fr
          </a>
        </motion.div>
      </div>
    </section>
  )
}
