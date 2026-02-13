import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

const TABLE_NAME = 'waitlist_signups'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, interest } = body

    if (!email || !phone || !interest) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields.' },
        { status: 400 }
      )
    }

    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 600))

    const supabase = supabaseAdmin
    const { error } = await supabase
      .from(TABLE_NAME)
      .insert({ email, phone, interest })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, message: 'Looks like you’re already on the waitlist.' },
          { status: 409 }
        )
      }

      console.error('Supabase waitlist insert error', error)
      return NextResponse.json(
        { success: false, message: 'Unable to save your spot right now. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list! We'll be in touch."
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Try again." },
      { status: 500 }
    )
  }
}