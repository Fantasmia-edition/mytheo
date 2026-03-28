'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-nuit/95 backdrop-blur-md border-b border-or/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L20 10H28L22 16L24 24L16 20L8 24L10 16L4 10H12L16 2Z"
              fill="none"
              stroke="#C29B40"
              strokeWidth="1.5"
            />
            <circle cx="16" cy="16" r="4" fill="#C29B40" opacity="0.4" />
          </svg>
          <span className="font-cinzel text-or text-lg font-semibold tracking-wider">
            Mytheo
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Le Concept', 'Comment ça marche', 'Offres', 'FAQ'].map((item) => (
            <a
              key={item}
              href="#"
              className="font-montserrat text-creme/70 hover:text-or text-sm tracking-wide transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/upload"
            className="font-montserrat text-creme/40 hover:text-or text-xs tracking-wide transition-colors duration-300 border-b border-transparent hover:border-or/40 pb-0.5">
            ✉ Lettre reçue ?
          </a>
          <a
            href="/rejoindre"
            className="font-cinzel text-sm px-5 py-2.5 rounded-sm bg-or text-nuit font-semibold hover:bg-or-light transition-all duration-300 tracking-wider"
          >
            Commencer ✦
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-or transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-or transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-or transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-nuit/98 backdrop-blur-md border-t border-or/20 px-6 py-4 flex flex-col gap-4"
        >
          {['Le Concept', 'Comment ça marche', 'Offres', 'FAQ'].map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="font-montserrat text-creme/80 hover:text-or text-sm tracking-wide"
            >
              {item}
            </a>
          ))}
          <a href="/upload" onClick={() => setMenuOpen(false)}
            className="font-montserrat text-creme/50 text-sm text-center py-2 border border-white/10 rounded tracking-wide">
            ✉ J'ai reçu une lettre
          </a>
          <a
            href="/rejoindre"
            onClick={() => setMenuOpen(false)}
            className="font-cinzel text-sm px-5 py-3 text-center bg-or text-nuit font-semibold tracking-wider"
          >
            Commencer l'aventure ✦
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}
