import { createClient } from '@supabase/supabase-js'

let supabase = null

export function getSupabase() {
  if (supabase) return supabase

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('Supabase env vars missing, chat persistence disabled')
    return null
  }

  supabase = createClient(url, key)
  return supabase
}
