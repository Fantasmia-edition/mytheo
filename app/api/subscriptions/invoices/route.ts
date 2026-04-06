/**
 * GET /api/subscriptions/invoices?customerId=cus_xxx
 * Retourne la liste des factures Stripe d'un client.
 */

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get('customerId')

  if (!customerId) {
    return NextResponse.json({ error: 'customerId manquant.' }, { status: 400 })
  }

  try {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 24,
    })

    const formatted = invoices.data.map(inv => ({
      id:        inv.id,
      date:      new Date(inv.created * 1000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
      amount:    inv.amount_paid ? `${(inv.amount_paid / 100).toFixed(0)}€` : '—',
      status:    inv.status,
      pdfUrl:    inv.invoice_pdf ?? null,
    }))

    return NextResponse.json({ invoices: formatted })
  } catch (err) {
    console.error('[GET /api/subscriptions/invoices]', err)
    return NextResponse.json({ error: 'Erreur Stripe.' }, { status: 500 })
  }
}
