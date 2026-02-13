'use client'

import { motion } from 'framer-motion'
import { rise } from '@/lib/motion'

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What We Believe
        </motion.h2>
        
        <motion.div
          className="max-w-3xl mx-auto p-10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 text-center"
          variants={rise}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-3xl leading-relaxed text-neutral-100 mb-6">
            “Where shopping finally feels like it belongs to this generation.”
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-300">— The Zatch Team</p>
        </motion.div>
      </div>
    </section>
  )
}