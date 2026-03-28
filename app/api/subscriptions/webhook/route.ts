/**
 * POST /api/subscriptions/webhook
 * Reçoit les événements Stripe et met à jour Supabase en conséquence.
 */

import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature') ?? ''

  let event: ReturnType<typeof constructWebhookEvent>
  try {
    event = constructWebhookEvent(body, signature)
  } catch (err) {
    console.error('[Webhook] Signature invalide:', err)
    return NextResponse.json({ error: 'Signature invalide.' }, { status: 400 })
  }

  if (!event) return NextResponse.json({ error: 'Événement vide.' }, { status: 400 })

  try {
    switch (event.type) {

      // ── Paiement réussi → activer le profil ──
      case 'checkout.session.completed': {
        const session = event.data.object as {
          customer?: string
          subscription?: string
          customer_email?: string
          metadata?: { childName?: string; plan?: string }
        }
        if (session.customer_email) {
          await supabaseAdmin
            .from('scribe_profiles')
            .update({
              stripe_customer_id:     session.customer ?? null,
              stripe_subscription_id: session.subscription ?? null,
              status: 'active',
            })
            .eq('parent_email', session.customer_email)
        }
        break
      }

      // ── Abonnement mis à jour (plan changé, renouvellement) ──
      case 'customer.subscription.updated': {
        const sub = event.data.object as {
          id: string
          status: string
        }
        await supabaseAdmin
          .from('scribe_profiles')
          .update({ status: sub.status === 'active' ? 'active' : 'paused' })
          .eq('stripe_subscription_id', sub.id)
        break
      }

      // ── Abonnement annulé ──
      case 'customer.subscription.deleted': {
        const sub = event.data.object as { id: string }
        await supabaseAdmin
          .from('scribe_profiles')
          .update({ status: 'cancelled' })
          .eq('stripe_subscription_id', sub.id)
        break
      }

      // ── Échec de paiement ──
      case 'invoice.payment_failed': {
        const invoice = event.data.object as { subscription?: string }
        if (invoice.subscription) {
          await supabaseAdmin
            .from('scribe_profiles')
            .update({ status: 'paused' })
            .eq('stripe_subscription_id', invoice.subscription)
        }
        break
      }

      default:
        console.log(`[Webhook] Événement ignoré : ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (err) {
    console.error('[Webhook] Erreur traitement:', err)
    return NextResponse.json({ error: 'Erreur traitement.' }, { status: 500 })
  }
}
