/**
 * POST /api/forms
 * Reçoit le formulaire /upload (lettre physique reçue).
 * 1. Valide les champs
 * 2. Upload les fichiers vers Supabase Storage
 * 3. Enregistre en base
 * 4. Email de confirmation au parent
 * 5. Notification admin
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, uploadFileToStorage } from '@/lib/supabase'
import { notifyAdminNewForm, sendWelcomeEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const childName  = formData.get('childName')  as string
    const childAge   = Number(formData.get('childAge'))
    const parentName = formData.get('parentName') as string
    const parentEmail= formData.get('parentEmail') as string
    const files      = formData.getAll('files')   as File[]

    if (!childName || !childAge || !parentName || !parentEmail) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 })
    }
    if (files.length === 0) {
      return NextResponse.json({ error: 'Au moins un fichier est requis.' }, { status: 400 })
    }

    // ── 1. Upload fichiers vers Supabase Storage ──
    const fileUrls: string[] = []
    for (const file of files) {
      const path = `forms/${Date.now()}_${file.name.replace(/\s/g, '_')}`
      const url  = await uploadFileToStorage('mission-uploads', path, file)
      if (url) fileUrls.push(url)
    }

    // ── 2. Enregistrer la soumission en base ──
    await supabaseAdmin.from('mission_uploads').insert({
      scribe_id:      null, // pas encore de profil — soumission physique initiale
      chapter_number: 0,
      file_urls:      fileUrls,
      note:           `Upload initial — ${childName}, ${childAge} ans — Parent: ${parentName} <${parentEmail}>`,
      status:         'received',
    })

    // ── 3. Emails ──
    await Promise.all([
      sendWelcomeEmail({ parentEmail, parentName, childName, plan: 'À définir' }),
      notifyAdminNewForm({ childName, childAge, parentEmail, parentName, fileCount: files.length }),
    ])

    return NextResponse.json(
      { success: true, message: `Mission de ${childName} reçue avec succès.` },
      { status: 200 }
    )

  } catch (err) {
    console.error('[POST /api/forms]', err)
    return NextResponse.json({ error: 'Erreur interne. Veuillez réessayer.' }, { status: 500 })
  }
}
