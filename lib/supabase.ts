/**
 * lib/supabase.ts — Mytheo
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ── Client public (navigateur + Server Components) ────────────────────────────
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Client admin (API routes serveur uniquement — jamais côté client) ─────────
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseAnonKey,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ScribeProfile {
  id: string
  parent_id: string
  child_name: string
  child_age: number
  avatar_name: string
  power: string
  companion: string
  destiny: string
  plan: 'patient' | 'intrepide'
  address_line1: string
  address_city: string
  address_zip: string
  address_country: string
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

// ── Helpers ───────────────────────────────────────────────────────────────────

export async function getScribeProfile(userId: string): Promise<ScribeProfile | null> {
  const { data, error } = await supabase
    .from('scribe_profiles')
    .select('*')
    .eq('parent_id', userId)
    .single()
  if (error) { console.error('[Supabase] getScribeProfile:', error.message); return null }
  return data
}

export async function getChapters(scribeId: string): Promise<Chapter[]> {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('scribe_id', scribeId)
    .order('chapter_number')
  if (error) { console.error('[Supabase] getChapters:', error.message); return [] }
  return data ?? []
}

export async function createMissionUpload(uploadData: Omit<MissionUpload, 'id' | 'created_at'>): Promise<MissionUpload | null> {
  const { data, error } = await supabaseAdmin
    .from('mission_uploads')
    .insert(uploadData)
    .select()
    .single()
  if (error) { console.error('[Supabase] createMissionUpload:', error.message); return null }
  return data
}

export async function uploadFileToStorage(bucket: string, path: string, file: File): Promise<string | null> {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
  if (error) { console.error('[Supabase] uploadFileToStorage:', error.message); return null }
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
  return urlData.publicUrl
}
