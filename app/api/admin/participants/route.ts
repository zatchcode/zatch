import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

const numericFields = [
  'initial_discount',
  'current_discount',
  'initial_orders',
  'current_orders',
  'total_referrals',
  'social_share_count',
]

function normalizeNumbers(payload: Record<string, any>) {
  numericFields.forEach((field) => {
    if (payload[field] === null || payload[field] === undefined || payload[field] === '') {
      payload[field] = field === 'total_referrals' || field === 'social_share_count' ? 0 : null
      return
    }
    const value = Number(payload[field])
    if (Number.isNaN(value)) {
      throw new Error(`Invalid numeric value for ${field}`)
    }
    payload[field] = value
  })
}

export async function GET() {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('startzatching_participants')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ message: 'Invalid payload.' }, { status: 400 })
  }

  const requiredFields = [
    'email',
    'phone',
    'initial_discount',
    'current_discount',
    'initial_orders',
    'current_orders',
    'coupon_code',
    'referral_code',
  ]

  for (const field of requiredFields) {
    if (!body[field] && body[field] !== 0) {
      return NextResponse.json({ message: `${field} is required.` }, { status: 400 })
    }
  }

  const payload = {
    email: body.email,
    phone: body.phone,
    screenshot_url: body.screenshot_url ?? null,
    initial_discount: body.initial_discount,
    current_discount: body.current_discount,
    initial_orders: body.initial_orders,
    current_orders: body.current_orders,
    coupon_code: body.coupon_code,
    referral_code: body.referral_code,
    referrer_id: body.referrer_id || null,
    total_referrals: body.total_referrals ?? 0,
    social_share_count: body.social_share_count ?? 0,
    boost_history: body.boost_history ?? [],
    last_updated: new Date().toISOString(),
  }

  try {
    normalizeNumbers(payload)
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('startzatching_participants')
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    const status = error.code === '23505' ? 409 : 500
    return NextResponse.json({ message: error.message }, { status })
  }

  return NextResponse.json({ data })
}