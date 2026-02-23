'use client'

import { motion } from 'framer-motion'
import { rise } from '@/lib/motion'

const buyerPoints = [
  {
    title: '1. See It Live',
    body: 'Watch real sellers. Ask instantly. Buy confidently.'
  },
  {
    title: '2. Discover Fast',
    body: 'Short videos. No endless scrolling. Instant checkout.'
  },
  {
    title: '3. Set Your Price',
    body: 'Send an offer. Get a response. Lock the deal.'
  }
]

const sellerSwitchReasons = [
  {
    title: 'Turn Content Into Revenue',
    body: 'Every live. Every reel. Monetized.'
  },
  {
    title: 'Built-In Negotiation',
    body: 'No more DM juggling.'
  },
  {
    title: 'Instant Payments',
    body: 'UPI and token flow handled.'
  },
  {
    title: 'Low Commission',
    body: 'You keep more of what you earn.'
  }
]

export function BuyerSellerFocus() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.article
          id="buyers"
          variants={rise}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 md:p-10"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-300 mb-4">For Buyers</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Shop Like You Mean It.</h2>
          <div className="space-y-6">
            {buyerPoints.map((point) => (
              <div key={point.title}>
                <h3 className="text-xl font-semibold text-white mb-2">{point.title}</h3>
                <p className="text-neutral-200">{point.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-zatch-neon font-semibold text-lg">Less guessing. More winning.</p>
        </motion.article>

        <motion.article
          id="sellers"
          variants={rise}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 md:p-10 space-y-7"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-300">For Sellers</p>
          <h2 className="text-3xl md:text-4xl font-bold">Your DMs Are Not a Sales System.</h2>

          <div>
            <h3 className="text-xl font-semibold text-zatch-neon mb-2">The Reality</h3>
            <p className="text-neutral-200">
              On social media, closing one sale can take 10 to 15 minutes. Reply. Explain. Negotiate. Collect
              details. Chase payment. And half the time, the buyer disappears.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-zatch-neon mb-2">The Upgrade</h3>
            <p className="text-neutral-200">
              Go live once. Sell to many. Negotiate instantly. Get paid inside the app. No chaos. No manual tracking.
              No endless back and forth.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Why Sellers Switch to Zatch™</h3>
            <div className="space-y-3">
              {sellerSwitchReasons.map((reason) => (
                <p key={reason.title} className="text-neutral-200">
                  <span className="text-white font-semibold">{reason.title}:</span> {reason.body}
                </p>
              ))}
            </div>
          </div>

          <p className="text-zatch-neon font-semibold text-lg">Stop managing conversations. Start closing deals.</p>
        </motion.article>
      </div>
    </section>
  )
}
