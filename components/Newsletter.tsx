'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'

export function Newsletter() {
  const scrollToBeta = () => {
    document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-zatch-neon/5 to-transparent border border-white/10 rounded-3xl p-12 text-center space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Ready when you are</h2>
          <p className="text-neutral-100 text-lg max-w-xl mx-auto">
            We&apos;ll take it from here—look out for our email once you join the waitlist.
          </p>
          <div>
            <Button
              onClick={scrollToBeta}
              size="lg"
              className="bg-zatch-neon text-black hover:bg-zatch-neon/90 focus-ring font-semibold h-14 px-8 rounded-full"
            >
              Join the Waitlist
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}