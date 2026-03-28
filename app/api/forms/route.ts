/**
 * POST /api/forms
 * ──────────────────────────────────────────────────────────────────────────────
 * Reçoit le formulaire de la page /upload (lettre physique reçue).
 * 1. Valide les champs
 * 2. Uploade les fichiers vers Supabase Storage
 * 3. Crée le profil dans la DB
 * 4. Envoie un email de bienvenue au parent
 * 5. Notifie l'admin
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server'
import { notifyAdminNewForm, sendWelcomeEmail } from '@/lib/email'
// import { supabaseAdmin, uploadFileToStorage } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    // ── 1. Extraire et valider les champs ──
    const childName = formData.get('childName') as string
    const childAge = Number(formData.get('childAge'))
    const parentName = formData.get('parentName') as string
    const parentEmail = formData.get('parentEmail') as string
    const files = formData.getAll('files') as File[]

    if (!childName || !childAge || !parentName || !parentEmail) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants.' },
        { status: 400 }
      )
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'Au moins un fichier est requis.' },
        { status: 400 }
      )
    }

    // ── 2. TODO: Upload fichiers vers Supabase Storage ──
    // const fileUrls: string[] = []
    // for (const file of files) {
    //   const path = `forms/${Date.now()}_${file.name}`
    //   const url = await uploadFileToStorage('missions', path, file)
    //   if (url) fileUrls.push(url)
    // }

    // ── 3. TODO: Créer le profil en base ──
    // await supabaseAdmin.from('form_submissions').insert({
    //   child_name: childName,
    //   child_age: childAge,
    //   parent_name: parentName,
    //   parent_email: parentEmail,
    //   file_urls: fileUrls,
    //   status: 'received',
    // })

    // ── 4. Email de confirmation au parent ──
    await sendWelcomeEmail({
      parentEmail,
      parentName,
      childName,
      power: 'À définir',
      companion: 'À définir',
    })

    // ── 5. Notification admin ──
    await notifyAdminNewForm({
      childName,
      childAge,
      parentEmail,
      parentName,
      fileCount: files.length,
    })

    return NextResponse.json(
      { success: true, message: `Mission de ${childName} reçue avec succès.` },
      { status: 200 }
    )

  } catch (err) {
    console.error('[POST /api/forms]', err)
    return NextResponse.json(
      { error: 'Erreur interne. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
