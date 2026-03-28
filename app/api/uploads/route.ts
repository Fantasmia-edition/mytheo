/**
 * POST /api/uploads
 * Reçoit les missions mensuelles depuis /espace-auteur/upload.
 * 1. Upload fichiers vers Supabase Storage
 * 2. Crée un enregistrement mission_uploads
 * 3. Met à jour le statut du chapitre
 * 4. Notifications admin + parent
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, uploadFileToStorage } from '@/lib/supabase'
import { notifyAdminNewUpload, sendUploadConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const formData     = await req.formData()
    const scribeId     = formData.get('scribeId')      as string
    const chapterNumber= Number(formData.get('chapterNumber'))
    const note         = formData.get('note')          as string | null
    const parentEmail  = formData.get('parentEmail')   as string
    const childName    = formData.get('childName')     as string
    const files        = formData.getAll('files')      as File[]

    if (!scribeId || !chapterNumber || files.length === 0) {
      return NextResponse.json({ error: 'Données manquantes.' }, { status: 400 })
    }

    // ── 1. Upload fichiers ──
    const fileUrls: string[] = []
    for (const file of files) {
      const path = `missions/${scribeId}/ch${chapterNumber}/${Date.now()}_${file.name.replace(/\s/g, '_')}`
      const url  = await uploadFileToStorage('mission-uploads', path, file)
      if (url) fileUrls.push(url)
    }

    // ── 2. Créer l'enregistrement mission ──
    await supabaseAdmin.from('mission_uploads').insert({
      scribe_id:      scribeId,
      chapter_number: chapterNumber,
      file_urls:      fileUrls,
      note:           note || null,
      status:         'received',
    })

    // ── 3. Mettre à jour le statut du chapitre ──
    await supabaseAdmin
      .from('chapters')
      .update({ status: 'in_progress' })
      .eq('scribe_id', scribeId)
      .eq('chapter_number', chapterNumber)

    // ── 4. Notifications ──
    if (parentEmail && childName) {
      await Promise.all([
        sendUploadConfirmation({ parentEmail, childName, chapterNumber }),
        notifyAdminNewUpload({ childName, parentEmail, chapterNumber, fileCount: files.length }),
      ])
    }

    return NextResponse.json(
      { success: true, message: `Mission ch.${chapterNumber} reçue.` },
      { status: 200 }
    )

  } catch (err) {
    console.error('[POST /api/uploads]', err)
    return NextResponse.json({ error: 'Erreur interne. Veuillez réessayer.' }, { status: 500 })
  }
}
