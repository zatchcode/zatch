'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString()
      }
    })
  }, [springValue])

  return <span ref={ref}>0</span>
}

export function StatsCounter() {
  return (
    <section className="py-16 px-6">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-zatch-neon mb-2">
              <AnimatedNumber value={1247} />+
            </div>
            <p className="text-sm text-neutral-200">Early Adopters</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-zatch-neon mb-2">
              <AnimatedNumber value={500} />+
            </div>
            <p className="text-sm text-neutral-200">Sellers Ready</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-zatch-neon mb-2">
              <AnimatedNumber value={50} />+
            </div>
            <p className="text-sm text-neutral-200">Cities</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
