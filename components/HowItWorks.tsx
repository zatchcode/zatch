'use client'

import { motion } from 'framer-motion'
import { rise } from '@/lib/motion'

export function HowItWorks() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why We&apos;re Building Zatch</h2>
          <motion.p
            className="text-xl text-neutral-100 leading-relaxed mb-4"
            variants={rise}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            We are building something exciting at the intersection of content, commerce, and culture.
          </motion.p>
          <motion.p
            className="text-xl text-neutral-200 leading-relaxed"
            variants={rise}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            A platform where buying feels effortless and selling feels powerful.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}