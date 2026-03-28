/**
 * lib/email.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * Emails transactionnels via Resend pour L'Odyssée des Scribes.
 *
 * Variables d'environnement requises (.env.local) :
 *   RESEND_API_KEY=re_...
 *   ADMIN_EMAIL=atelier@odyssee-scribes.fr  (notifications internes)
 *   FROM_EMAIL=scribes@odyssee-scribes.fr   (expéditeur)
 *
 * TODO : npm install resend
 * ──────────────────────────────────────────────────────────────────────────────
 */

// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'atelier@odyssee-scribes.fr'
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'scribes@odyssee-scribes.fr'

// ── Types ────────────────────────────────────────────────────────────────────

interface EmailResult {
  success: boolean
  id?: string
  error?: string
}

// ── Emails parent ─────────────────────────────────────────────────────────────

/** Email de bienvenue après création du profil Scribe */
export async function sendWelcomeEmail(params: {
  parentEmail: string
  parentName: string
  childName: string
  power: string
  companion: string
}): Promise<EmailResult> {
  const { parentEmail, parentName, childName, power, companion } = params

  const html = `
    <div style="font-family: Georgia, serif; background: #0D1B2A; color: #FEFAE0; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 12px;">
      <h1 style="color: #C29B40; font-size: 24px;">✦ L'Odyssée des Scribes</h1>
      <h2 style="color: #FEFAE0;">Bienvenue, ${parentName} !</h2>
      <p style="color: rgba(254,250,224,0.7); line-height: 1.7;">
        <strong style="color: #FEFAE0;">${childName}</strong> vient d'entrer dans la légende.
        Son pouvoir — <em>${power}</em> — et son compagnon — <em>${companion}</em> — façonneront chaque chapitre de son aventure.
      </p>
      <p style="color: rgba(254,250,224,0.7);">
        Le premier chapitre est en cours de création. Vous recevrez une notification dès qu'il sera prêt.
      </p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/espace-auteur"
        style="display: inline-block; background: #C29B40; color: #0D1B2A; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">
        Accéder à l'Espace Auteur →
      </a>
      <hr style="border-color: rgba(255,255,255,0.1); margin: 30px 0;" />
      <p style="color: rgba(254,250,224,0.3); font-size: 12px;">
        L'Odyssée des Scribes · Imprimé en France ·
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/mentions-legales" style="color: rgba(194,155,64,0.5);">Mentions légales</a>
      </p>
    </div>
  `

  /* TODO: Décommenter quand Resend est configuré
  const { data, error } = await resend.emails.send({
    from: `L'Atelier des Scribes <${FROM_EMAIL}>`,
    to: parentEmail,
    subject: `✦ ${childName} entre dans la légende — L'Odyssée des Scribes`,
    html,
  })
  if (error) return { success: false, error: error.message }
  return { success: true, id: data?.id }
  */

  console.log('[Email] sendWelcomeEmail →', parentEmail, '— Resend pas encore configuré')
  console.log('[Email] HTML preview:\n', html.substring(0, 200) + '...')
  return { success: true, id: 'mock_' + Date.now() }
}

/** Confirmation d'upload de mission */
export async function sendMissionReceivedEmail(params: {
  parentEmail: string
  childName: string
  chapterNumber: number
  chapterTitle: string
}): Promise<EmailResult> {
  const { parentEmail, childName, chapterNumber, chapterTitle } = params

  /* TODO: implémenter avec Resend */
  console.log('[Email] sendMissionReceivedEmail →', parentEmail, `ch.${chapterNumber}: ${chapterTitle}`)
  return { success: true, id: 'mock_' + Date.now() }
}

// ── Emails admin (notifications internes) ─────────────────────────────────────

/** Notification admin : nouveau formulaire reçu */
export async function notifyAdminNewForm(params: {
  childName: string
  childAge: number
  parentEmail: string
  parentName: string
  fileCount: number
}): Promise<EmailResult> {
  const subject = `[Odyssée] Nouveau formulaire — ${params.childName}, ${params.childAge} ans`
  const text = `
Nouveau formulaire reçu :
- Enfant : ${params.childName}, ${params.childAge} ans
- Parent : ${params.parentName} <${params.parentEmail}>
- Fichiers : ${params.fileCount}

Accéder à l'admin : ${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/admin
  `.trim()

  /* TODO:
  await resend.emails.send({
    from: `Scribes Bot <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject,
    text,
  })
  */

  console.log('[Email] notifyAdminNewForm → ', ADMIN_EMAIL, '\n', subject)
  return { success: true, id: 'mock_' + Date.now() }
}

/** Notification admin : nouvel abonnement */
export async function notifyAdminNewSubscription(params: {
  childName: string
  parentEmail: string
  plan: string
}): Promise<EmailResult> {
  const subject = `[Odyssée] Nouvel abonnement — ${params.childName} (${params.plan})`

  /* TODO: implémenter */
  console.log('[Email] notifyAdminNewSubscription → ', ADMIN_EMAIL, '\n', subject)
  return { success: true, id: 'mock_' + Date.now() }
}

/** Notification admin : nouvelle mission uploadée */
export async function notifyAdminMissionUploaded(params: {
  childName: string
  parentEmail: string
  chapterNumber: number
  fileCount: number
  note?: string
}): Promise<EmailResult> {
  const subject = `[Odyssée] Mission reçue — ${params.childName} ch.${params.chapterNumber}`

  /* TODO: implémenter */
  console.log('[Email] notifyAdminMissionUploaded → ', ADMIN_EMAIL, '\n', subject)
  return { success: true, id: 'mock_' + Date.now() }
}

// Export FROM_EMAIL pour usage externe
export { FROM_EMAIL, ADMIN_EMAIL }
