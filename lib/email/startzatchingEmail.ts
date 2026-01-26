import { Resend } from 'resend'

const resendKey = process.env.RESEND_API_KEY

const resend = resendKey ? new Resend(resendKey) : null

const fromAddress = process.env.STARTZATCHING_FROM_EMAIL ?? 'no-reply@zatch.shop'

type EmailPayload = {
  to: string
  subject: string
  html: string
}

async function dispatchEmail(payload: EmailPayload) {
  if (!resend) {
    console.info('[startzatching] Skipping email send because RESEND_API_KEY is not configured.', payload)
    return
  }

  await resend.emails.send({
    ...payload,
    from: fromAddress,
  })
}

export async function sendStartZatchingWelcomeEmail(options: {
  email: string
  discount: number
  orders: number
  couponCode: string
  referralLink: string
}) {
  const { email, discount, orders, couponCode, referralLink } = options

  const html = `
    <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 16px; color: #111">
      <p>Thanks for joining the <strong>Start Zatching Challenge</strong>! 🎉</p>
      <p>Here are your current rewards:</p>
      <ul>
        <li><strong>Discount:</strong> ${discount}% off</li>
        <li><strong>Orders:</strong> ${orders} discounted order${orders > 1 ? 's' : ''}</li>
        <li><strong>Coupon Code:</strong> ${couponCode}</li>
      </ul>
      <p>Share your unique link to boost your discount and unlock more orders:</p>
      <p><a href="${referralLink}">${referralLink}</a></p>
      <p>Each verified referral or social share can increase your discount (up to 100%) and add more orders.</p>
      <p>See you on launch day!</p>
      <p><strong>Team Zatch</strong></p>
    </div>
  `

  await dispatchEmail({
    to: email,
    subject: 'Your Start Zatching Challenge rewards',
    html,
  })
}

export async function sendStartZatchingUpdateEmail(options: {
  email: string
  discount: number
  orders: number
  reason: 'referral' | 'share'
  referralLink: string
}) {
  const { email, discount, orders, reason, referralLink } = options

  const reasonCopy =
    reason === 'referral'
      ? 'A new referral just boosted your rewards.'
      : 'Your social share just boosted your rewards.'

  const html = `
    <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 16px; color: #111">
      <p>${reasonCopy}</p>
      <p>Your latest rewards:</p>
      <ul>
        <li><strong>Discount:</strong> ${discount}% off</li>
        <li><strong>Orders:</strong> ${orders} discounted order${orders > 1 ? 's' : ''}</li>
      </ul>
      <p>Keep sharing your link to climb even higher:</p>
      <p><a href="${referralLink}">${referralLink}</a></p>
      <p>See you on launch day!</p>
      <p><strong>Team Zatch</strong></p>
    </div>
  `

  await dispatchEmail({
    to: email,
    subject: 'Your Start Zatching rewards just increased! 🚀',
    html,
  })
}
