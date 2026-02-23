'use client'

import { motion } from 'framer-motion'
import { rise } from '@/lib/motion'

export function HowItWorks() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Shopping Was Meant To Be Social.</h2>
          <motion.p
            className="text-xl text-neutral-100 leading-relaxed mb-4"
            variants={rise}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            In real markets, you talk. You ask questions. You negotiate. You build trust.
          </motion.p>
          <motion.p
            className="text-xl text-neutral-200 leading-relaxed mb-10"
            variants={rise}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            But online shopping removed all of that.
          </motion.p>

          <motion.div
            variants={rise}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 text-left space-y-4"
          >
            <h3 className="text-2xl font-semibold text-zatch-neon">Zatch brings back the shopping thrill.</h3>
            <p className="text-neutral-100 text-lg">Live streams. Short product videos. Strategic bargaining. All in one place.</p>
            <p className="text-neutral-200">
              No middlemen. No algorithm games. No pay to win ads. Just real sellers and real buyers connecting instantly.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
