'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ConnexionPage() {
  const [email, setEmail]       = useState('')
  const [sent, setSent]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [focused, setFocused]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (otpError) {
      setError("Impossible d'envoyer le lien. Vérifiez l'adresse email.")
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 50%, #0a1520 100%)' }}>

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(94,50,180,0.8) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, rgba(194,155,64,0.5) 0%, transparent 70%)' }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="font-cinzel text-or font-bold text-2xl tracking-wider">✦ Mytheo</Link>
          <p className="font-montserrat text-creme/35 text-xs mt-2 tracking-wider uppercase">Espace Auteur</p>
        </div>

        {!sent ? (
          <div className="rounded-2xl p-8"
            style={{ background: 'rgba(10,15,30,0.85)', border: '1px solid rgba(194,155,64,0.15)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>

            <h1 className="font-cinzel text-creme text-xl font-bold mb-2">Accéder à mon espace</h1>
            <p className="font-montserrat text-creme/45 text-sm leading-relaxed mb-7">
              Entrez votre adresse email — vous recevrez un lien de connexion instantané, sans mot de passe.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-cinzel text-creme/50 text-[11px] tracking-wider uppercase block mb-1.5">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="votre@email.fr"
                  required
                  className="w-full px-4 py-3 rounded-xl font-montserrat text-creme text-sm placeholder-creme/20 outline-none transition-all duration-300"
                  style={{
                    background: focused ? 'rgba(194,155,64,0.06)' : 'rgba(255,255,255,0.03)',
                    border: focused ? '1.5px solid rgba(194,155,64,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
                    boxShadow: focused ? '0 0 0 3px rgba(194,155,64,0.06)' : 'none',
                  }}
                />
              </div>

              {error && (
                <p className="font-montserrat text-red-400/80 text-xs">{error}</p>
              )}

              <button type="submit" disabled={loading || !email.trim()}
                className="w-full py-3.5 font-cinzel font-bold text-sm tracking-wider rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #C29B40, #E8D080)',
                  color: '#0D1B2A',
                  boxShadow: '0 4px 20px rgba(194,155,64,0.3)',
                }}>
                {loading ? 'Envoi en cours…' : 'Recevoir mon lien ✦'}
              </button>
            </form>

            <p className="font-montserrat text-creme/25 text-[11px] text-center mt-5 leading-relaxed">
              Pas encore inscrit ?{' '}
              <Link href="/rejoindre" className="text-or/60 hover:text-or transition-colors underline underline-offset-2">
                Commencer l'aventure
              </Link>
            </p>
          </div>

        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-8 text-center"
            style={{ background: 'rgba(10,15,30,0.85)', border: '1px solid rgba(194,155,64,0.25)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>

            <div className="text-4xl mb-4">✉️</div>
            <h2 className="font-cinzel text-or text-xl font-bold mb-3">Lien envoyé !</h2>
            <p className="font-montserrat text-creme/60 text-sm leading-relaxed mb-6">
              Un lien de connexion a été envoyé à{' '}
              <strong className="text-creme/80">{email}</strong>.
              <br />
              Vérifiez votre boîte mail (et les spams).
            </p>
            <p className="font-montserrat text-creme/30 text-[11px]">
              Le lien est valable 24h · Cliquez-y pour accéder directement à votre espace.
            </p>

            <button onClick={() => { setSent(false); setEmail('') }}
              className="mt-6 font-montserrat text-creme/40 text-xs hover:text-creme/70 transition-colors">
              ← Essayer une autre adresse
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
