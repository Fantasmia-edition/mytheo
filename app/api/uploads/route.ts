/**
 * POST /api/uploads
 * ──────────────────────────────────────────────────────────────────────────────
 * Reçoit les missions mensuelles depuis /espace-auteur/upload.
 * 1. Authentifie le parent (Supabase Auth)
 * 2. Uploade les fichiers vers Supabase Storage
 * 3. Crée un enregistrement mission_uploads en DB
 * 4. Notifie l'admin
 * 5. Envoie confirmation au parent
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server'
import { notifyAdminMissionUploaded, sendMissionReceivedEmail } from '@/lib/email'
// import { supabaseAdmin, uploadFileToStorage } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const scribeId = formData.get('scribeId') as string
    const chapterNumber = Number(formData.get('chapterNumber'))
    const chapterTitle = formData.get('chapterTitle') as string
    const note = formData.get('note') as string | null
    const files = formData.getAll('files') as File[]
    // Ces infos viendraient du profil Supabase en prod
    const parentEmail = formData.get('parentEmail') as string
    const childName = formData.get('childName') as string

    if (!scribeId || !chapterNumber || files.length === 0) {
      return NextResponse.json(
        { error: 'Données manquantes.' },
        { status: 400 }
      )
    }

    // ── TODO: Vérifier l'auth Supabase ──
    // const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(
    //   req.headers.get('Authorization')?.replace('Bearer ', '') ?? ''
    // )
    // if (authError || !user) return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })

    // ── TODO: Upload fichiers ──
    // const fileUrls: string[] = []
    // for (const file of files) {
    //   const path = `missions/${scribeId}/ch${chapterNumber}/${Date.now()}_${file.name}`
    //   const url = await uploadFileToStorage('missions', path, file)
    //   if (url) fileUrls.push(url)
    // }

    // ── TODO: Créer l'enregistrement ──
    // await supabaseAdmin.from('mission_uploads').insert({
    //   scribe_id: scribeId,
    //   chapter_number: chapterNumber,
    //   file_urls: fileUrls,
    //   note: note || null,
    //   status: 'received',
    // })

    // ── TODO: Mettre à jour le statut du chapitre ──
    // await supabaseAdmin.from('chapters')
    //   .update({ status: 'in_progress' })
    //   .eq('scribe_id', scribeId)
    //   .eq('chapter_number', chapterNumber)

    // ── Notifications ──
    if (parentEmail && childName) {
      await Promise.all([
        sendMissionReceivedEmail({ parentEmail, childName, chapterNumber, chapterTitle }),
        notifyAdminMissionUploaded({
          childName,
          parentEmail,
          chapterNumber,
          fileCount: files.length,
          note: note ?? undefined,
        }),
      ])
    }

    return NextResponse.json(
      { success: true, message: `Mission ch.${chapterNumber} reçue.` },
      { status: 200 }
    )

  } catch (err) {
    console.error('[POST /api/uploads]', err)
    return NextResponse.json(
      { error: 'Erreur interne. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
