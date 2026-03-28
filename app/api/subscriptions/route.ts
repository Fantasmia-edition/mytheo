/**
 * POST /api/subscriptions
 * ──────────────────────────────────────────────────────────────────────────────
 * Deux actions :
 *  - action: "create"  → Crée une session Stripe Checkout + profil Supabase
 *  - action: "portal"  → Retourne l'URL du Stripe Billing Portal
 *
 * Webhook Stripe → géré dans /api/subscriptions/webhook/route.ts (à créer)
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, createBillingPortalSession, type PlanId } from '@/lib/stripe'
import { notifyAdminNewSubscription } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      action: 'create' | 'portal'
      // Pour "create"
      plan?: PlanId
      parentEmail?: string
      parentName?: string
      childName?: string
      childAge?: number
      power?: string
      companion?: string
      destiny?: string
      // Pour "portal"
      customerId?: string
    }

    // ═══════════════════════════════════════
    // ACTION : Créer un abonnement
    // ═══════════════════════════════════════
    if (body.action === 'create') {
      const { plan, parentEmail, childName } = body

      if (!plan || !parentEmail || !childName) {
        return NextResponse.json({ error: 'Paramètres manquants.' }, { status: 400 })
      }

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

      // ── TODO: Créer le profil Supabase d'abord ──
      // const { data: profile } = await supabaseAdmin.from('scribe_profiles').insert({
      //   child_name: childName,
      //   child_age: body.childAge,
      //   power: body.power,
      //   companion: body.companion,
      //   destiny: body.destiny,
      //   plan,
      //   parent_email: parentEmail,
      //   parent_name: body.parentName,
      //   status: 'pending_payment',
      // }).select().single()

      // ── Créer la session Stripe Checkout ──
      const checkoutUrl = await createCheckoutSession({
        plan,
        parentEmail,
        childName,
        successUrl: `${baseUrl}/espace-auteur?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/rejoindre?canceled=true`,
      })

      // ── Notifier l'admin ──
      await notifyAdminNewSubscription({ childName, parentEmail, plan })

      if (!checkoutUrl) {
        // Mode développement sans Stripe : rediriger directement
        return NextResponse.json({
          success: true,
          redirectUrl: `${baseUrl}/espace-auteur`,
          message: 'Stripe non configuré — redirection directe (dev mode)',
        })
      }

      return NextResponse.json({ success: true, redirectUrl: checkoutUrl })
    }

    // ═══════════════════════════════════════
    // ACTION : Portail de gestion
    // ═══════════════════════════════════════
    if (body.action === 'portal') {
      const { customerId } = body

      if (!customerId) {
        return NextResponse.json({ error: 'customerId manquant.' }, { status: 400 })
      }

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
      const portalUrl = await createBillingPortalSession(
        customerId,
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
