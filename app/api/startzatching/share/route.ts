import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import {
  clampDiscount,
  clampOrders,
  randomInt,
  STARTZATCHING_MAX_ORDERS,
  STARTZATCHING_REFERRAL_THRESHOLD,
} from '@/lib/startzatching/logic'
import { parseBoostHistory } from '@/lib/startzatching/history'
import { sendStartZatchingUpdateEmail } from '@/lib/email/startzatchingEmail'

const SUPPORTED_PLATFORMS = ['x', 'instagram', 'facebook', 'linkedin', 'whatsapp'] as const
type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number]

type ParticipantRecord = {
  id: string
  email: string
  current_discount: number
  current_orders: number
  coupon_code: string
  referral_code: string
  total_referrals: number
  social_share_count: number
  boost_history: unknown
}

export async function POST(request: Request) {
  try {
    const { participantId, platform } = await request.json()

    if (!participantId || !platform) {
      return NextResponse.json({ message: 'Participant and platform are required.' }, { status: 400 })
    }

    const normalisedPlatform = String(platform).toLowerCase() as SupportedPlatform

    if (!SUPPORTED_PLATFORMS.includes(normalisedPlatform)) {
      return NextResponse.json({ message: 'Unsupported sharing platform.' }, { status: 400 })
    }

    const supabase = supabaseAdmin

    const { data: participant, error: participantError } = await supabase
      .from('startzatching_participants')
      .select('*')
      .eq('id', participantId)
      .maybeSingle()

    if (participantError && participantError.code !== 'PGRST116') {
      console.error('[startzatching] Failed to fetch participant', participantError)
      return NextResponse.json({ message: 'Unable to fetch participant.' }, { status: 500 })
    }

    if (!participant) {
      return NextResponse.json({ message: 'Participant not found.' }, { status: 404 })
    }

    const typedParticipant = participant as ParticipantRecord

    const { data: existingShare } = await supabase
      .from('startzatching_social_shares')
      .select('id')
      .eq('participant_id', participantId)
      .eq('platform', normalisedPlatform)
      .maybeSingle()

    if (existingShare) {
      return NextResponse.json({ message: 'You have already claimed this platform boost.' }, { status: 409 })
    }

    const discountBoost = randomInt(1, 5)
    const newDiscount = clampDiscount(typedParticipant.current_discount + discountBoost)
    const ordersIncrementChance = Math.random() <= 0.3
    const canIncreaseOrders = typedParticipant.current_orders < STARTZATCHING_MAX_ORDERS
    const ordersIncrement = ordersIncrementChance && canIncreaseOrders ? 1 : 0
    const newOrders = clampOrders(typedParticipant.current_orders + ordersIncrement)
    const newShareCount = typedParticipant.social_share_count + 1
    const history = parseBoostHistory(typedParticipant.boost_history)

    history.push({
      type: 'share',
      value: discountBoost,
      orders_increment: ordersIncrement,
      created_at: new Date().toISOString(),
      platform: normalisedPlatform,
    })

    const { error: shareInsertError } = await supabase
      .from('startzatching_social_shares')
      .insert({
        participant_id: participantId,
        platform: normalisedPlatform,
        discount_boost: discountBoost,
        orders_increment: Boolean(ordersIncrement),
      })

    if (shareInsertError) {
      console.error('[startzatching] Failed to insert share record', shareInsertError)
      return NextResponse.json({ message: 'Unable to record social share.' }, { status: 500 })
    }

    const { data: updatedParticipant, error: updateError } = await supabase
      .from('startzatching_participants')
      .update({
        current_discount: newDiscount,
        current_orders: newOrders,
        social_share_count: newShareCount,
        boost_history: history,
        last_updated: new Date().toISOString(),
      })
      .eq('id', participantId)
      .select('*')
      .single()

    if (updateError) {
      console.error('[startzatching] Failed to update participant after share', updateError)
      await supabase
        .from('startzatching_social_shares')
        .delete()
        .eq('participant_id', participantId)
        .eq('platform', normalisedPlatform)
      return NextResponse.json({ message: 'Unable to apply boost right now.' }, { status: 500 })
    }

    if (
      updatedParticipant.current_discount !== typedParticipant.current_discount ||
      updatedParticipant.current_orders !== typedParticipant.current_orders
    ) {
      try {
        const origin =
          process.env.STARTZATCHING_BASE_URL?.replace(/\/$/, '') ??
          new URL(request.url).origin

        await sendStartZatchingUpdateEmail({
          email: updatedParticipant.email,
          discount: updatedParticipant.current_discount,
          orders: updatedParticipant.current_orders,
          reason: 'share',
          referralLink: `${origin}/?ref=${updatedParticipant.referral_code}`,
        })
      } catch (error) {
        console.error('[startzatching] Failed to send share update email', error)
      }
    }

    const { data: sharesList, error: sharesError } = await supabase
      .from('startzatching_social_shares')
      .select('platform')
      .eq('participant_id', participantId)

    if (sharesError) {
      console.error('[startzatching] Failed to fetch shares list', sharesError)
    }

    const sharesUsed = Array.isArray(sharesList) ? sharesList.map((share) => share.platform) : []

    return NextResponse.json({
      participantId,
      discount: updatedParticipant.current_discount,
      ordersAllowed: updatedParticipant.current_orders,
      referralCount: updatedParticipant.total_referrals,
      referralTarget: STARTZATCHING_REFERRAL_THRESHOLD,
      sharesUsed,
    })
  } catch (error) {
    console.error('[startzatching] Unexpected share error', error)
    return NextResponse.json({ message: 'Unexpected error. Please try again.' }, { status: 500 })
  }
}
