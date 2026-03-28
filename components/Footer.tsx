'use client'

import { motion } from 'framer-motion'

const socials = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.03a8.16 8.16 0 0 0 4.77 1.52V7.1a4.85 4.85 0 0 1-1.01-.41z" />
      </svg>
    ),
  },
]

const legalLinks = [
  { label: 'Mentions légales', href: '#' },
  { label: 'CGV', href: '#' },
  { label: 'Politique de confidentialité', href: '#' },
  { label: 'Cookies', href: '#' },
]

export default function Footer() {
  return (
    <footer
      className="relative pt-16 pb-8"
      style={{
        background: 'linear-gradient(180deg, #0D1B2A 0%, #060e18 100%)',
        borderTop: '1px solid rgba(194,155,64,0.12)',
      }}
    >
      {/* Final CTA banner */}
      <div
        className="max-w-5xl mx-auto mx-6 mb-16 rounded-2xl px-8 py-10 text-center mx-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(194,155,64,0.12) 0%, rgba(194,155,64,0.06) 100%)',
          border: '1px solid rgba(194,155,64,0.2)',
          margin: '0 24px 64px',
        }}
      >
        {/* Subtle sparkles */}
        {[{x:'10%',y:'20%'},{x:'90%',y:'30%'},{x:'50%',y:'10%'}].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: pos.x, top: pos.y }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#C29B40">
              <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" />
            </svg>
          </motion.div>
        ))}

        <p className="font-cinzel text-or text-sm tracking-widest uppercase mb-3">
          ✦ L&apos;aventure commence ici
        </p>
        <h3 className="font-cinzel text-creme text-2xl md:text-3xl font-bold mb-4">
          Offrez-lui son premier courrier magique
        </h3>
        <p className="font-montserrat text-creme/60 text-base mb-7 max-w-lg mx-auto">
          Kit de bienvenue gratuit · Sans engagement · Livraison incluse en France
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <a
            href="/rejoindre"
            className="inline-flex items-center gap-3 font-cinzel text-sm px-8 py-4 bg-or text-nuit font-bold tracking-wider hover:bg-or-light transition-all duration-300"
            style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
          >
            Recevoir mon Kit de Bienvenue (Offert) ✦
          </a>
          <a href="/upload"
            className="font-montserrat text-creme/40 text-sm hover:text-or transition-colors underline underline-offset-4 decoration-or/30">
            Vous avez reçu une lettre ? → Uploader ici
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Main footer grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L20 10H28L22 16L24 24L16 20L8 24L10 16L4 10H12L16 2Z"
                  fill="none" stroke="#C29B40" strokeWidth="1.5" />
                <circle cx="16" cy="16" r="4" fill="#C29B40" opacity="0.4" />
              </svg>
              <span className="font-cinzel text-or text-base font-semibold tracking-wider">
                L&apos;Odyssée des Scribes
              </span>
            </div>
            <p className="font-montserrat text-creme/40 text-sm leading-relaxed max-w-xs">
              Le premier courrier interactif où votre enfant co-écrit son aventure.
              Une expérience unique, entre magie du papier et créativité.
            </p>
            {/* Print local badge */}
            <div
              className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ border: '1px solid rgba(194,155,64,0.2)', background: 'rgba(194,155,64,0.04)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1 C3.68 1 1 3.68 1 7 C1 10.32 3.68 13 7 13 C10.32 13 13 10.32 13 7 C13 3.68 10.32 1 7 1Z" stroke="#C29B40" strokeWidth="1" />
                <path d="M4 7 C4 5, 5.5 3, 7 3 C8.5 3, 10 5, 10 7" stroke="#C29B40" strokeWidth="1" fill="none" />
              </svg>
              <span className="font-montserrat text-or/60 text-xs tracking-wider">
                Imprimé localement en France
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-cinzel text-creme/70 text-xs tracking-widest uppercase mb-4">Navigation</h4>
            <ul className="space-y-3">
              {['Le Concept', 'Comment ça marche', 'Nos offres', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-montserrat text-creme/40 hover:text-or text-sm transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-cinzel text-creme/70 text-xs tracking-widest uppercase mb-4">Nous suivre</h4>
            <div className="flex flex-col gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center gap-3 text-creme/40 hover:text-or transition-colors duration-300 group"
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:border-or/40 transition-colors duration-300"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                    {social.icon}
                  </span>
                  <span className="font-montserrat text-sm">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="font-montserrat text-creme/25 text-xs text-center sm:text-left">
            © 2025 L&apos;Odyssée des Scribes · Tous droits réservés
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-montserrat text-creme/25 hover:text-or/60 text-xs transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
