import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, interest } = body

    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 600))

    // Mock success response
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