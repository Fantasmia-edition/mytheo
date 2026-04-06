/**
 * POST /api/subscriptions
 * - action "create"  → Auth Supabase + profil + session Stripe Checkout
 * - action "portal"  → URL Stripe Billing Portal
 */

import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, createBillingPortalSession, type PlanId } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { notifyAdminNewSubscription } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      action: 'create' | 'portal'
      plan?: PlanId
      parentEmail?: string
      parentName?: string
      childName?: string
      childAge?: number
      /** Pseudo d'aventurier (avatar_name en base) */
      pseudo?: string
      power?: string
      companion?: string
      destiny?: string
      addressLine1?: string
      addressCity?: string
      addressZip?: string
      addressCountry?: string
      customerId?: string
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    // ══════════════════════════════════════
    // Créer un abonnement
    // ══════════════════════════════════════
    if (body.action === 'create') {
      const { plan, parentEmail, parentName, childName, childAge } = body

      if (!plan || !parentEmail || !childName) {
        return NextResponse.json({ error: 'Paramètres manquants.' }, { status: 400 })
      }

      // 1. Créer (ou récupérer) le compte Supabase Auth
      let parentId: string | null = null
      try {
        // Tenter de créer l'utilisateur
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email: parentEmail,
          user_metadata: { parent_name: parentName ?? '' },
          email_confirm: true, // Confirmé auto — le magic link sera envoyé après paiement
        })

        if (createError) {
          // L'utilisateur existe déjà → récupérer son ID
          const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
          const existing = existingUsers?.users?.find(u => u.email === parentEmail)
          parentId = existing?.id ?? null
        } else {
          parentId = newUser?.user?.id ?? null
        }
      } catch (err) {
        console.error('[Auth] createUser:', err)
      }

      // 2. Créer le profil Supabase (statut pending_payment)
      const { data: profile, error: dbError } = await supabaseAdmin
        .from('scribe_profiles')
        .upsert({
          parent_id:       parentId,
          parent_email:    parentEmail,
          parent_name:     parentName ?? '',
          child_name:      childName,
          child_age:       childAge ?? 0,
          avatar_name:     body.pseudo?.trim() || childName,
          power:           body.power ?? '',
          companion:       body.companion ?? '',
          destiny:         body.destiny ?? '',
          plan,
          status:          'pending_payment',
          address_line1:   body.addressLine1 ?? '',
          address_city:    body.addressCity ?? '',
          address_zip:     body.addressZip ?? '',
          address_country: body.addressCountry ?? 'France',
        }, { onConflict: 'parent_email' })
        .select()
        .single()

      if (dbError) {
        console.error('[Supabase] upsert scribe_profiles:', dbError.message)
      }

      // 3. Créer la session Stripe Checkout
      const checkoutUrl = await createCheckoutSession({
        plan,
        parentEmail,
        childName,
        successUrl: `${baseUrl}/espace-auteur?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl:  `${baseUrl}/rejoindre?canceled=true`,
      })

      // 4. Notifier l'admin (inscription démarrée, paiement en attente)
      await notifyAdminNewSubscription({
        parentName:  parentName ?? '',
        parentEmail,
        childName,
        childAge:    childAge ?? 0,
        plan,
        address:     `${body.addressLine1}, ${body.addressZip} ${body.addressCity}`,
      })

      if (!checkoutUrl) {
        // Pas de Stripe configuré (dev sans clés) → rediriger directement
        return NextResponse.json({
          success: true,
          redirectUrl: `${baseUrl}/espace-auteur`,
        })
      }

      return NextResponse.json({ success: true, redirectUrl: checkoutUrl, profileId: profile?.id })
    }

    // ══════════════════════════════════════
    // Portail de gestion abonnement
    // ══════════════════════════════════════
    if (body.action === 'portal') {
      if (!body.customerId) {
        return NextResponse.json({ error: 'customerId manquant.' }, { status: 400 })
      }

      const portalUrl = await createBillingPortalSession(
        body.customerId,
        `${baseUrl}/espace-auteur/abonnement`
      )

      if (!portalUrl) {
        return NextResponse.json({ error: 'Impossible d\'accéder au portail Stripe.' }, { status: 500 })
      }

      return NextResponse.json({ success: true, redirectUrl: portalUrl })
    }

    return NextResponse.json({ error: 'Action inconnue.' }, { status: 400 })

  } catch (err) {
    console.error('[POST /api/subscriptions]', err)
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 })
  }
}
