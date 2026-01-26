import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { STARTZATCHING_REFERRAL_THRESHOLD } from '@/lib/startzatching/logic'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params
    const supabase = supabaseAdmin

    const { data, error } = await supabase
      .from('startzatching_participants')
      .select(
        `
        id,
        email,
        current_discount,
        current_orders,
        initial_discount,
        initial_orders,
        coupon_code,
        referral_code,
        total_referrals,
        social_share_count,
        boost_history,
        startzatching_social_shares ( platform )
      `
      )
      .eq('id', id)
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      console.error('[startzatching] Failed to fetch participant', error)
      return NextResponse.json({ message: 'Unable to locate the participant.' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ message: 'Participant not found.' }, { status: 404 })
    }

    const origin =
      process.env.STARTZATCHING_BASE_URL?.replace(/\/$/, '') ??
      new URL(request.url).origin

    const shareList = Array.isArray(data.startzatching_social_shares)
      ? data.startzatching_social_shares.map((share) => share.platform)
      : []

    return NextResponse.json({
      participantId: data.id,
      discount: data.current_discount,
      initialDiscount: data.initial_discount,
      ordersAllowed: data.current_orders,
      initialOrders: data.initial_orders,
      couponCode: data.coupon_code,
      referralLink: `${origin}/?ref=${data.referral_code}`,
      referralCount: data.total_referrals,
      referralTarget: STARTZATCHING_REFERRAL_THRESHOLD,
      sharesUsed: shareList,
      socialShareCount: data.social_share_count,
      boostHistory: data.boost_history ?? [],
    })
  } catch (error) {
    console.error('[startzatching] Unexpected error on fetch', error)
    return NextResponse.json({ message: 'Unexpected error.' }, { status: 500 })
  }
}