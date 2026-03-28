/**
 * lib/email.ts — Mytheo
 * Emails transactionnels via Resend
 */
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM ?? "L'Atelier Mytheo <onboarding@resend.dev>"
const ADMIN = process.env.ADMIN_EMAIL ?? ''
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

// ── Email de bienvenue parent ─────────────────────────────────────────────────
export async function sendWelcomeEmail(params: {
  parentEmail: string
  parentName: string
  childName: string
  plan: string
}) {
  return resend.emails.send({
    from: FROM,
    to: params.parentEmail,
    subject: `✦ Bienvenue dans l'aventure Mytheo, ${params.parentName} !`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0D1B2A;color:#FEFAE0;padding:40px;border-radius:12px;">
        <h1 style="color:#C29B40;font-size:24px;">✦ Mytheo</h1>
        <h2 style="color:#FEFAE0;">L'aventure de ${params.childName} commence.</h2>
        <p>Bonjour ${params.parentName},</p>
        <p>L'Atelier Mytheo a bien reçu l'inscription de <strong>${params.childName}</strong> au plan <strong>${params.plan}</strong>.</p>
        <p>Son Kit de Bienvenue est en préparation — il partira dans les <strong>5 prochains jours ouvrés</strong>.</p>
        <a href="${APP_URL}/espace-auteur" style="display:inline-block;background:#C29B40;color:#0D1B2A;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:20px;">
          Accéder à l'Espace Auteur →
        </a>
        <hr style="border-color:rgba(255,255,255,0.1);margin:30px 0;" />
        <p style="color:rgba(254,250,224,0.3);font-size:12px;">Mytheo · Imprimé en France</p>
      </div>
    `,
  })
}

// ── Notification admin — nouvelle inscription ─────────────────────────────────
export async function notifyAdminNewSubscription(params: {
  parentName: string
  parentEmail: string
  childName: string
  childAge: number
  plan: string
  address: string
}) {
  if (!ADMIN) return
  return resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `🆕 Nouvelle inscription — ${params.childName} (${params.plan})`,
    html: `
      <p><strong>Nouveau Scribe inscrit !</strong></p>
      <ul>
        <li>Enfant : ${params.childName}, ${params.childAge} ans</li>
        <li>Parent : ${params.parentName} (${params.parentEmail})</li>
        <li>Plan : ${params.plan}</li>
        <li>Adresse : ${params.address}</li>
      </ul>
    `,
  })
}

// ── Notification admin — nouvel upload de mission ─────────────────────────────
export async function notifyAdminNewUpload(params: {
  childName: string
  parentEmail: string
  chapterNumber: number
  fileCount: number
}) {
  if (!ADMIN) return
  return resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `📤 Mission reçue — ${params.childName} · Chapitre ${params.chapterNumber}`,
    html: `
      <p>${params.childName} a envoyé sa mission pour le chapitre ${params.chapterNumber}.</p>
      <p>${params.fileCount} fichier(s) · Parent : ${params.parentEmail}</p>
    `,
  })
}

// ── Confirmation upload au parent ─────────────────────────────────────────────
export async function sendUploadConfirmation(params: {
  parentEmail: string
  childName: string
  chapterNumber: number
}) {
  return resend.emails.send({
    from: FROM,
    to: params.parentEmail,
    subject: `✦ Mission de ${params.childName} bien reçue !`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0D1B2A;color:#FEFAE0;padding:40px;border-radius:12px;">
        <h2 style="color:#C29B40;">Chapitre ${params.chapterNumber} en cours de création.</h2>
        <p>L'Atelier Mytheo a bien reçu les créations de <strong>${params.childName}</strong>.</p>
        <p>Le chapitre illustré sera prêt dans <strong>7 jours</strong>.</p>
      </div>
    `,
  })
}

// ── Notification admin — formulaire upload page ───────────────────────────────
export async function notifyAdminNewForm(params: {
  childName: string
  childAge: number
  parentName: string
  parentEmail: string
  fileCount: number
}) {
  if (!ADMIN) return
  return resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `📬 Formulaire reçu — ${params.childName}, ${params.childAge} ans`,
    html: `
      <p><strong>Nouveau formulaire de mission uploadé</strong></p>
      <ul>
        <li>Enfant : ${params.childName}, ${params.childAge} ans</li>
        <li>Parent : ${params.parentName} (${params.parentEmail})</li>
        <li>Fichiers : ${params.fileCount}</li>
      </ul>
    `,
  })
}
