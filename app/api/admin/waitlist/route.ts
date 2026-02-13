import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function GET() {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from('waitlist_signups').select('*').order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const { email, phone, interest } = body ?? {}

  if (!email || !phone || !interest) {
    return NextResponse.json({ message: 'Email, phone, and interest are required.' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('waitlist_signups')
    .insert({ email, phone, interest })
    .select('*')
    .single()

  if (error) {
    const status = error.code === '23505' ? 409 : 500
    const message = error.code === '23505' ? 'Email or phone already exists.' : error.message
    return NextResponse.json({ message }, { status })
  }

  return NextResponse.json({ data })
}