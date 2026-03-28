/**
 * lib/stripe.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * Stripe pour L'Odyssée des Scribes — abonnements mensuels.
 *
 * Variables d'environnement requises (.env.local) :
 *   STRIPE_SECRET_KEY=sk_live_...       (ou sk_test_... en dev)
 *   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
 *   STRIPE_WEBHOOK_SECRET=whsec_...
 *
 * Plans Stripe à créer dans le dashboard :
 *   - "scribe_patient"   → 24€ / mois
 *   - "intrepide"        → 42€ / mois
 *
 * TODO : npm install stripe @stripe/stripe-js
 * ──────────────────────────────────────────────────────────────────────────────
 */

// import Stripe from 'stripe'

// ── Prix IDs (à renseigner depuis le dashboard Stripe) ───────────────────────

export const STRIPE_PRICE_IDS = {
  patient: process.env.STRIPE_PRICE_PATIENT ?? 'price_XXXXXXX_patient',
  intrepide: process.env.STRIPE_PRICE_INTREPIDE ?? 'price_XXXXXXX_intrepide',
} as const

export type PlanId = keyof typeof STRIPE_PRICE_IDS

// ── Client Stripe (décommenté quand les credentials sont disponibles) ─────────

/*
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})
*/

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Crée une session Stripe Checkout pour un abonnement.
 * Redirige vers /espace-auteur après succès.
 */
export async function createCheckoutSession(_params: {
  plan: PlanId
  parentEmail: string
  childName: string
  successUrl: string
  cancelUrl: string
}): Promise<string | null> {
  /*
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: params.parentEmail,
    line_items: [{ price: STRIPE_PRICE_IDS[params.plan], quantity: 1 }],
    metadata: { childName: params.childName, plan: params.plan },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  })
  return session.url
  */
  console.warn('[Stripe] createCheckoutSession — pas encore connecté')
  return null
}

/**
 * Crée un portail de gestion Stripe pour modifier / annuler l'abonnement.
 */
export async function createBillingPortalSession(_customerId: string, _returnUrl: string): Promise<string | null> {
  /*
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
  return session.url
  */
  console.warn('[Stripe] createBillingPortalSession — pas encore connecté')
  return null
}

/**
 * Vérifie et parse un événement webhook Stripe.
 */
export function constructWebhookEvent(_body: string, _signature: string) {
  /*
  return stripe.webhooks.constructEvent(
    body, signature, process.env.STRIPE_WEBHOOK_SECRET!
  )
  */
  console.warn('[Stripe] constructWebhookEvent — pas encore connecté')
  return null
}
