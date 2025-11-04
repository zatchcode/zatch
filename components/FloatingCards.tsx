'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/motion'

export function FloatingCards() {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  const cards = [
    { text: '🛍️ Shop Live', x: '10%', y: '20%', delay: 0 },
    { text: '⚡ Fast Delivery', x: '85%', y: '30%', delay: 1 },
    { text: '💯 Authentic', x: '15%', y: '70%', delay: 2 },
    { text: '🎁 Best Deals', x: '80%', y: '65%', delay: 1.5 }
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="absolute px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.95, 1.05, 0.95],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: card.delay,
            ease: "easeInOut"
          }}
        >
          {card.text}
        </motion.div>
      ))}
    </div>
  )
}