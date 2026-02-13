import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

const LIMIT = 100

export async function GET() {
  const supabase = getSupabaseAdmin()

  const waitlistPromise = supabase
    .from('waitlist_signups')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(LIMIT)

  const participantsPromise = supabase
    .from('startzatching_participants')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(LIMIT)

  const referralsPromise = supabase
    .from('startzatching_referrals')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(LIMIT)

  const sharesPromise = supabase
    .from('startzatching_social_shares')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(LIMIT)

  const [
    { data: waitlistRows, count: waitlistCount, error: waitlistError },
    { data: participantRows, count: participantCount, error: participantError },
    { data: referralRows, count: referralCount, error: referralError },
    { data: shareRows, count: shareCount, error: shareError },
  ] = await Promise.all([waitlistPromise, participantsPromise, referralsPromise, sharesPromise])

  return NextResponse.json({
    waitlist: { rows: waitlistRows ?? [], count: waitlistCount ?? 0, error: waitlistError?.message ?? null },
    participants: { rows: participantRows ?? [], count: participantCount ?? 0, error: participantError?.message ?? null },
    referrals: { rows: referralRows ?? [], count: referralCount ?? 0, error: referralError?.message ?? null },
    shares: { rows: shareRows ?? [], count: shareCount ?? 0, error: shareError?.message ?? null },
  })
}