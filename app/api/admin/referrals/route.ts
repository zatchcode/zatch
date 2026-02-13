import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET() {
  const supabase = supabaseAdmin
  const { data, error } = await supabase
    .from('startzatching_referrals')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const { referrer_id, referred_id } = body ?? {}

  if (!referrer_id || !referred_id) {
    return NextResponse.json({ message: 'referrer_id and referred_id are required.' }, { status: 400 })
  }

  const supabase = supabaseAdmin
  const { data, error } = await supabase
    .from('startzatching_referrals')
    .insert({ referrer_id, referred_id })
    .select('*')
    .single()

  if (error) {
    const status = error.code === '23505' ? 409 : 500
    return NextResponse.json({ message: error.message }, { status })
  }

  return NextResponse.json({ data })
}