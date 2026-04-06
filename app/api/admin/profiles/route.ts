/**
 * GET /api/admin/profiles
 * Retourne tous les profils + nombre de chapitres livrés.
 * Protégé : seul l'utilisateur dont l'email = ADMIN_EMAIL peut appeler cette route.
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  // Protection simple : vérifier le header d'autorisation
  const adminEmail = process.env.ADMIN_EMAIL ?? ''
  const callerEmail = req.headers.get('x-admin-email') ?? ''

  if (!adminEmail || callerEmail !== adminEmail) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 403 })
  }

  try {
    // Récupérer tous les profils
    const { data: profiles, error: profileError } = await supabaseAdmin
      .from('scribe_profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (profileError) throw profileError

    // Récupérer le nombre de chapitres livrés par profil
    const { data: chapterCounts, error: chapError } = await supabaseAdmin
      .from('chapters')
      .select('scribe_id, status')

    if (chapError) {
      console.error('[Admin] chapters count:', chapError.message)
    }

    // Associer les comptes de chapitres à chaque profil
    const enriched = (profiles ?? []).map(p => {
      const chapters = (chapterCounts ?? []).filter(c => c.scribe_id === p.id)
      return {
        ...p,
        chapters_total:    chapters.length,
        chapters_delivered: chapters.filter(c => c.status === 'delivered').length,
      }
    })

    return NextResponse.json({ profiles: enriched })
  } catch (err) {
    console.error('[GET /api/admin/profiles]', err)
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 })
  }
}
