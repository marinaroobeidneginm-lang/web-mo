import { createClient } from '@supabase/supabase-js'

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'propiedades'

export function isStorageConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Configurá SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en server/.env',
    )
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
