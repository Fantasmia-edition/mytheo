/**
 * lib/stripe.ts — Mytheo
 * Abonnements mensuels : Scribe Patient (19€) · Explorateur Intrépide (32€)
 */
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
})

// ── Price IDs (renseignés dans .env.local) ────────────────────────────────────
export const STRIPE_PRICE_IDS = {
  patient:    process.env.STRIPE_PRICE_SCRIBE_PATIENT ?? '',   // 19€/mois
  intrepide:  process.env.STRIPE_PRICE_EXPLORATEUR   ?? '',    // 32€/mois
} as const

export type PlanId = keyof typeof STRIPE_PRICE_IDS

// ── Créer une session Checkout ────────────────────────────────────────────────
export async function createCheckoutSession(params: {
  plan: PlanId
  parentEmail: string
  childName: string
  successUrl: string
  cancelUrl: string
}): Promise<string | null> {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: params.parentEmail,
      line_items: [{ price: STRIPE_PRICE_IDS[params.plan], quantity: 1 }],
      metadata: { childName: params.childName, plan: params.plan },
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      locale: 'fr',
    })
    return session.url
  } catch (err) {
    console.error('[Stripe] createCheckoutSession:', err)
    return null
  }
}

// ── Portail de gestion abonnement ─────────────────────────────────────────────
export async function createBillingPortalSession(customerId: string, returnUrl: string): Promise<string | null> {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })
    return session.url
  } catch (err) {
    console.error('[Stripe] createBillingPortalSession:', err)
    return null
  }
}

// ── Vérifier un événement webhook ─────────────────────────────────────────────
export function constructWebhookEvent(body: string, signature: string) {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
}
