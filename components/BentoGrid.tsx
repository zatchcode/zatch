'use client'

import { motion } from 'framer-motion'
import { rise } from '@/lib/motion'

const sections = [
  {
    heading: '1. Live Shopping',
    tagline: 'Watch. Ask. Decide.',
    details: [
      'See products demonstrated in real time. Interact with sellers instantly. Ask questions before you buy.',
      'No guessing from images. No waiting for replies. No blind purchases.',
      'You see it live. You decide with confidence.'
    ],
    buyerValue: 'Clarity and trust before payment.',
    sellerValue: 'Higher conversions through real interaction.'
  },
  {
    heading: '2. Buy Bits',
    tagline: 'Short Video Shopping',
    details: [
      'Discover. Scroll. Instantly checkout.',
      'Products become content. Fast, engaging reels designed to convert.',
      'Watch quick demos. Understand in seconds. Buy without leaving the video.'
    ],
    buyerValue: 'Faster decisions and relevant discovery.',
    sellerValue: 'More visibility without running ads.'
  },
  {
    heading: '3. Zatching',
    tagline: 'Strategic Bargaining',
    details: [
      'Your price. Your deal.',
      'Send a quote. Receive approval or counter. Close the deal instantly.',
      'This is not discount coupons. This is real negotiation.'
    ],
    buyerValue: 'Personalized pricing.',
    sellerValue: 'Flexible pricing control and better margins.'
  }
]

export function BentoGrid() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Three Ways to Shop. One Powerful Platform.
        </motion.h2>

        <motion.p
          className="text-neutral-200 text-center max-w-4xl mx-auto mb-12 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Zatch™ is not just another marketplace. It is a live-powered, video-driven, negotiation-enabled commerce
          experience built for modern India.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.heading}
              variants={rise}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-white/5 via-white/15 to-transparent border border-white/10 shadow-lg shadow-black/10 hover:border-zatch-neon/40 transition-all"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">{section.heading}</h3>
              {section.tagline && (
                <p className="text-lg text-zatch-neon font-medium mb-6">{section.tagline}</p>
              )}
              <div className="space-y-4 mb-6">
                {section.details.map((detail) => (
                  <p key={detail} className="text-neutral-200 leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
              <p className="text-sm text-neutral-300 mb-2">
                <span className="text-white font-semibold">Value to Buyers:</span> {section.buyerValue}
              </p>
              <p className="text-sm text-neutral-300">
                <span className="text-white font-semibold">Value to Sellers:</span> {section.sellerValue}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-zatch-neon text-lg md:text-xl font-semibold mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Live. Video. Zatch. This is how commerce evolves.
        </motion.p>
      </div>
    </section>
  )
}
