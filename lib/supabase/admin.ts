import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseServiceKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
}

// Create Supabase admin client with service role key
// This bypasses Row Level Security (RLS) policies
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database table names (matching actual schema)
export const TABLES = {
  STARTZATCHING_PARTICIPANTS: 'startzatching_participants',
  STARTZATCHING_REFERRALS: 'startzatching_referrals',
  STARTZATCHING_SOCIAL_SHARES: 'startzatching_social_shares',
  WAITLIST_SIGNUPS: 'waitlist_signups',
} as const

// Storage bucket name
export const STORAGE_BUCKETS = {
  SCREENSHOTS: 'startzatching-screenshots',
} as const

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any, context: string) {
  console.error(`[Supabase Error - ${context}]`, error)
  return {
    error: true,
    message: error.message || 'Database operation failed',
    details: error.details || null,
  }
}
