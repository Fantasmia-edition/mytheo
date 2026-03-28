/**
 * lib/supabase.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * Client Supabase pour L'Odyssée des Scribes.
 *
 * Variables d'environnement requises (.env.local) :
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...   (côté serveur uniquement)
 *
 * TODO : npm install @supabase/supabase-js
 * ──────────────────────────────────────────────────────────────────────────────
 */

// import { createClient } from '@supabase/supabase-js'

// ── Types ────────────────────────────────────────────────────────────────────

export interface ScribeProfile {
  id: string
  parent_id: string
  child_name: string
  child_age: number
  power: string
  companion: string
  destiny: string
  plan: 'patient' | 'intrepide'
  start_date: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  created_at: string
}

export interface Chapter {
  id: string
  scribe_id: string
  chapter_number: number
  title: string
  status: 'pending' | 'in_progress' | 'delivered'
  delivery_date: string | null
  pdf_url: string | null
  created_at: string
}

export interface MissionUpload {
  id: string
  scribe_id: string
  chapter_number: number
  file_urls: string[]
  note: string | null
  status: 'received' | 'processing' | 'done'
  created_at: string
}

export interface Message {
  id: string
  scribe_id: string
  from: 'atelier' | 'parent'
  text: string
  read: boolean
  created_at: string
}

// ── Client (décommenté quand les credentials sont disponibles) ────────────────

/*
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Service role client (routes API serveur uniquement)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)
*/

// ── Helpers (à implémenter) ───────────────────────────────────────────────────

export async function getScribeProfile(_userId: string): Promise<ScribeProfile | null> {
  // TODO: return supabase.from('scribe_profiles').select('*').eq('parent_id', userId).single()
  console.warn('[Supabase] getScribeProfile — pas encore connecté')
  return null
}

export async function getChapters(_scribeId: string): Promise<Chapter[]> {
  // TODO: return supabase.from('chapters').select('*').eq('scribe_id', scribeId).order('chapter_number')
  console.warn('[Supabase] getChapters — pas encore connecté')
  return []
}

export async function createMissionUpload(_data: Omit<MissionUpload, 'id' | 'created_at'>): Promise<MissionUpload | null> {
  // TODO: return supabase.from('mission_uploads').insert(data).select().single()
  console.warn('[Supabase] createMissionUpload — pas encore connecté')
  return null
}

export async function uploadFileToStorage(_bucket: string, _path: string, _file: File): Promise<string | null> {
  // TODO: const { data, error } = await supabase.storage.from(bucket).upload(path, file)
  // TODO: return supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl
  console.warn('[Supabase] uploadFileToStorage — pas encore connecté')
  return null
}
