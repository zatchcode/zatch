'use client'

import { motion } from 'framer-motion'
import { Zap, Users, Shield, Sparkles } from 'lucide-react'
import { rise, makeStagger } from '@/lib/motion'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant product discovery and seamless checkout experience'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Real reviews from real people, no fake ratings'
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'Your data and transactions are protected end-to-end'
  },
  {
    icon: Sparkles,
    title: 'Interactive',
    description: 'Live shopping experiences with sellers and creators'
  }
]

export function Features() {
  return (
    <section className="py-24 px-6">
      <motion.div 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={makeStagger(0.1)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={rise}
            className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-zatch-neon/50 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="mb-4 w-12 h-12 rounded-xl bg-zatch-neon/10 flex items-center justify-center group-hover:bg-zatch-neon/20 transition-colors">
              <feature.icon className="w-6 h-6 text-zatch-neon" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-neutral-200 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
