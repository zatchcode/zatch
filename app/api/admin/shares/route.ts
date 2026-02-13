import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET() {
  const supabase = supabaseAdmin
  const { data, error } = await supabase
    .from('startzatching_social_shares')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const { participant_id, platform, discount_boost, orders_increment } = body ?? {}

  if (!participant_id || !platform || discount_boost === undefined) {
    return NextResponse.json({ message: 'participant_id, platform, and discount_boost are required.' }, { status: 400 })
  }

  const payload = {
    participant_id,
    platform,
    discount_boost: Number(discount_boost),
    orders_increment: Boolean(orders_increment),
  }

  if (Number.isNaN(payload.discount_boost)) {
    return NextResponse.json({ message: 'discount_boost must be a number.' }, { status: 400 })
  }

  const supabase = supabaseAdmin
  const { data, error } = await supabase
    .from('startzatching_social_shares')
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    const status = error.code === '23505' ? 409 : 500
    return NextResponse.json({ message: error.message }, { status })
  }

  return NextResponse.json({ data })
}