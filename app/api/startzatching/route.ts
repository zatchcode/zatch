import { NextResponse } from 'next/server'
import { Buffer } from 'node:buffer'
import { supabaseAdmin } from '@/lib/supabase/admin'
import {
  clampDiscount,
  clampOrders,
  generateCouponCode,
  generateReferralCode,
  getRandomOrders,
  getWeightedDiscount,
  randomInt,
  STARTZATCHING_MAX_ORDERS,
  STARTZATCHING_REFERRAL_THRESHOLD,
} from '@/lib/startzatching/logic'
import { sendStartZatchingUpdateEmail, sendStartZatchingWelcomeEmail } from '@/lib/email/startzatchingEmail'
import { parseBoostHistory } from '@/lib/startzatching/history'

type StartZatchingParticipant = {
  id: string
  email: string
  phone: string
  screenshot_url: string | null
  current_discount: number
  current_orders: number
  coupon_code: string
  referral_code: string
  total_referrals: number
  social_share_count: number
  boost_history: unknown
}

const BUCKET_NAME = 'startzatching-screenshots'

function normalisePhone(phone: string) {
  return phone.replace(/[^\d+]/g, '')
}

async function ensureBucketExists() {
  const supabase = supabaseAdmin
  const { data, error } = await supabase.storage.getBucket(BUCKET_NAME)

  if (error) {
    const statusCode = typeof error === 'object' && error !== null && 'statusCode' in error ? (error as any).statusCode : undefined

    if (statusCode === '404' || statusCode === 404) {
      await supabase.storage.createBucket(BUCKET_NAME, { public: false })
      return
    }

    throw error
  }

  if (!data) {
    await supabase.storage.createBucket(BUCKET_NAME, { public: false })
  }
}

async function uploadScreenshot(participantId: string, file: File) {
  await ensureBucketExists()

  const supabase = supabaseAdmin
  const extension = file.type?.split('/')[1] ?? 'png'
  const filePath = `${participantId}/${Date.now()}.${extension}`
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType: file.type || 'image/png',
      upsert: false,
    })

  if (error) {
    throw error
  }

  return filePath
}

function buildReferralLink(request: Request, referralCode: string) {
  const origin =
    process.env.STARTZATCHING_BASE_URL?.replace(/\/$/, '') ??
    new URL(request.url).origin

  return `${origin}/?ref=${referralCode}`
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const email = String(formData.get('email') ?? '').trim().toLowerCase()
    const phoneRaw = String(formData.get('phone') ?? '').trim()
    const phone = normalisePhone(phoneRaw)
    const referralInputRaw = String(formData.get('referralCode') ?? '').trim()
    const referralInput = referralInputRaw ? referralInputRaw.toUpperCase() : ''
    const screenshot = formData.get('screenshot') as File | null

    if (!email || !phone) {
      return NextResponse.json({ message: 'Email and mobile number are required.' }, { status: 400 })
    }

    if (!screenshot) {
      return NextResponse.json({ message: 'A countdown screenshot is required.' }, { status: 400 })
    }

    const supabase = supabaseAdmin

    const { data: duplicateCheck, error: duplicateError } = await supabase
      .from('startzatching_participants')
      .select('id,email,phone')
      .or(`email.eq.${email},phone.eq.${phone}`)
      .maybeSingle()

    if (duplicateError && duplicateError.code !== 'PGRST116') {
      console.error('[startzatching] Duplicate check failed', duplicateError)
      return NextResponse.json({ message: 'Unable to verify entry. Please try again.' }, { status: 500 })
    }

    if (duplicateCheck) {
      const field = duplicateCheck.email === email ? 'email' : 'mobile number'
      return NextResponse.json({ message: `This ${field} has already been used for the challenge.` }, { status: 409 })
    }

    let referrer: StartZatchingParticipant | null = null

    if (referralInput) {
      const { data, error } = await supabase
        .from('startzatching_participants')
        .select('*')
        .eq('referral_code', referralInput)
        .limit(1)
        .maybeSingle()

      if (error && error.code !== 'PGRST116') {
        console.error('[startzatching] Referral lookup failed', error)
        return NextResponse.json({ message: 'Unable to process referral code right now.' }, { status: 500 })
      }

      if (!data) {
        return NextResponse.json({ message: 'That referral link is no longer active.' }, { status: 400 })
      }

      referrer = data as StartZatchingParticipant
    }

    const participantId = crypto.randomUUID()
    const referralCode = generateReferralCode()
    const couponCode = generateCouponCode(new Date())
    const initialDiscount = getWeightedDiscount()
    const initialOrders = getRandomOrders()
    const screenshotPath = await uploadScreenshot(participantId, screenshot)

    const insertPayload = {
      id: participantId,
      email,
      phone,
      screenshot_url: screenshotPath,
      initial_discount: initialDiscount,
      current_discount: initialDiscount,
      initial_orders: initialOrders,
      current_orders: initialOrders,
      coupon_code: couponCode,
      referral_code: referralCode,
      referrer_id: referrer?.id ?? null,
      boost_history: [],
    }

    const { data: inserted, error: insertError } = await supabase
      .from('startzatching_participants')
      .insert(insertPayload)
      .select('*')
      .single()

    if (insertError) {
      console.error('[startzatching] Failed to create participant', insertError)
      return NextResponse.json({ message: 'Unable to save your entry. Please try again.' }, { status: 500 })
    }

    if (referrer) {
      const discountBoost = randomInt(1, 5)
      const newDiscount = clampDiscount(referrer.current_discount + discountBoost)
      const newTotalReferrals = referrer.total_referrals + 1
      const reachedThreshold =
        referrer.total_referrals <= STARTZATCHING_REFERRAL_THRESHOLD &&
        newTotalReferrals > STARTZATCHING_REFERRAL_THRESHOLD
      const ordersIncrement = reachedThreshold && referrer.current_orders < STARTZATCHING_MAX_ORDERS ? 1 : 0
      const newOrders = clampOrders(referrer.current_orders + ordersIncrement)
      const history = parseBoostHistory(referrer.boost_history)

      history.push({
        type: 'referral',
        value: discountBoost,
        orders_increment: ordersIncrement,
        created_at: new Date().toISOString(),
        referred_id: inserted.id,
      })

      const { error: referralInsertError } = await supabase
        .from('startzatching_referrals')
        .insert({ referrer_id: referrer.id, referred_id: inserted.id })

      if (referralInsertError) {
        console.error('[startzatching] Failed to record referral', referralInsertError)
      }

      const { error: updateError, data: updatedReferrer } = await supabase
        .from('startzatching_participants')
        .update({
          current_discount: newDiscount,
          current_orders: newOrders,
          total_referrals: newTotalReferrals,
          boost_history: history,
          last_updated: new Date().toISOString(),
        })
        .eq('id', referrer.id)
        .select('*')
        .single()

      if (updateError) {
        console.error('[startzatching] Failed to update referrer', updateError)
      } else if (
        updatedReferrer &&
        (updatedReferrer.current_discount !== referrer.current_discount ||
          updatedReferrer.current_orders !== referrer.current_orders)
      ) {
        try {
          await sendStartZatchingUpdateEmail({
            email: updatedReferrer.email,
            discount: updatedReferrer.current_discount,
            orders: updatedReferrer.current_orders,
            reason: 'referral',
            referralLink: buildReferralLink(request, updatedReferrer.referral_code),
          })
        } catch (error) {
          console.error('[startzatching] Failed to send referral update email', error)
        }
      }
    }

    try {
      await sendStartZatchingWelcomeEmail({
        email,
        discount: inserted.current_discount,
        orders: inserted.current_orders,
        couponCode,
        referralLink: buildReferralLink(request, referralCode),
      })
    } catch (error) {
      console.error('[startzatching] Failed to send welcome email', error)
    }

    return NextResponse.json({
      participantId: inserted.id,
      discount: inserted.current_discount,
      initialDiscount,
      ordersAllowed: inserted.current_orders,
      initialOrders,
      couponCode,
      referralLink: buildReferralLink(request, referralCode),
      referralCount: inserted.total_referrals,
      referralTarget: STARTZATCHING_REFERRAL_THRESHOLD,
      sharesUsed: [],
    })
  } catch (error) {
    console.error('[startzatching] Unexpected error', error)
    return NextResponse.json({ message: 'Unexpected error. Please try again.' }, { status: 500 })
  }
}