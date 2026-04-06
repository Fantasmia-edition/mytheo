'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Suspense } from 'react'

function AuthCallbackInner() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      // Échange le code PKCE contre une session
      supabase.auth.exchangeCodeForSession(code)
        .then(({ error }) => {
          if (error) {
            console.error('[Auth Callback] exchangeCodeForSession:', error.message)
            router.replace('/connexion?error=lien_invalide')
          } else {
            router.replace('/espace-auteur')
          }
        })
    } else {
      // Pas de code → vérifier si une session existe déjà (hash-based flow)
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          router.replace('/espace-auteur')
        } else {
          router.replace('/connexion?error=lien_expiré')
        }
      })
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #070d18 0%, #0D1B2A 100%)' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 mx-auto mb-5"
        >
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="16" stroke="rgba(194,155,64,0.2)" strokeWidth="3" />
            <path d="M20 4 A16 16 0 0 1 36 20" stroke="#C29B40" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </motion.div>
        <p className="font-cinzel text-or text-sm tracking-widest">Connexion en cours…</p>
      </motion.div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <AuthCallbackInner />
    </Suspense>
  )
}
