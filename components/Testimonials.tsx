'use client'

import { motion } from 'framer-motion'
import { rise } from '@/lib/motion'

const trustPoints = [
  {
    title: 'Secure Payments',
    body: 'UPI powered. Token protected. Every transaction verified.'
  },
  {
    title: 'Verified Sellers',
    body: 'Real people. Real businesses. Transparent profiles and live identities.'
  },
  {
    title: 'Controlled Negotiation',
    body: 'Structured quote system. No spam. No chaos.'
  },
  {
    title: 'Order Transparency',
    body: 'Live tracking. Clear timelines. Dispute support when needed.'
  }
]

export function Testimonials() {
  return (
    <section id="trust" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built on Trust.
        </motion.h2>
        
        <motion.p
          className="text-2xl md:text-3xl text-center text-neutral-100 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Commerce Should Feel Safe.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              variants={rise}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <h3 className="text-xl font-semibold text-zatch-neon mb-2">{point.title}</h3>
              <p className="text-neutral-200">{point.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-lg md:text-xl font-semibold text-zatch-neon mt-10"
          variants={rise}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          Interactive does not mean risky. It means transparent.
        </motion.p>
      </div>
    </section>
  )
}
