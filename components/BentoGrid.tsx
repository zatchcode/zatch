'use client'

import { motion } from 'framer-motion'
import { rise } from '@/lib/motion'

const sections = [
  {
    heading: 'Why Shop on Zatch',
    tagline: null,
    points: [
      {
        title: 'Shopping that feels alive.',
        body: 'Watch, interact, and buy in real time.'
      },
      {
        title: 'Fun and personal.',
        body: 'Discover products through real people, not static photos.'
      },
      {
        title: 'Instant and effortless.',
        body: 'One tap to quote, one tap to buy.'
      }
    ]
  },
  {
    heading: 'Why Sell on Zatch',
    tagline: 'Your pitch is your power.',
    points: [
      {
        title: 'Build your audience.',
        body: 'Connect directly with buyers and turn followers into loyal customers.'
      },
      {
        title: 'Fair and simple.',
        body: 'Low commissions, clear visibility, and full control of your store.'
      },
      {
        title: 'Sell the way you speak.',
        body: 'Be yourself, sell in your own language, and let your story drive sales.'
      }
    ]
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
          Built for Everyone on the Marketplace
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {sections.map((section, index) => (
            <motion.div
              key={section.heading}
              variants={rise}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-3xl bg-gradient-to-br from-white/5 via-white/15 to-transparent border border-white/10 shadow-lg shadow-black/10 hover:border-zatch-neon/40 transition-all"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">{section.heading}</h3>
              {section.tagline && (
                <p className="text-lg text-zatch-neon font-medium mb-6">{section.tagline}</p>
              )}
              <div className="space-y-6">
                {section.points.map((point) => (
                  <div key={point.title}>
                    <h4 className="text-lg font-semibold text-white mb-2">{point.title}</h4>
                    <p className="text-neutral-200 leading-relaxed">{point.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
