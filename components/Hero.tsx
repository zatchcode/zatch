'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ScrollIndicator } from './ScrollIndicator'
import { textReveal, makeStagger, scaleOnHover } from '@/lib/motion'

export function Hero() {
  const scrollToBeta = () => {
    document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-visible pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zatch-neon/5 via-transparent to-transparent" />
      <ScrollIndicator />
      
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 w-full max-w-7xl mx-auto"
        variants={makeStagger(0.2)}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          variants={textReveal}
        >
          <div className="w-2 h-2 rounded-full bg-zatch-neon animate-pulse" />
          <span className="text-sm font-medium text-neutral-200">Coming soon to Zatch</span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-normal leading-[1.15] max-w-[90%] w-full mx-auto bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent pb-2"
          variants={textReveal}
        >
          Shopping. Reinvented.
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-neutral-100 mb-6 max-w-3xl mx-auto leading-relaxed"
          variants={textReveal}
        >
          A whole new way to discover, connect, and buy. Coming soon.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-neutral-200 mb-12 max-w-3xl mx-auto"
          variants={textReveal}
        >
          Because shopping should be interactive, fun, and real.
        </motion.p>
        
        <motion.div variants={textReveal} className="flex flex-col items-center justify-center gap-3">
          <span className="text-sm uppercase tracking-[0.3em] text-neutral-300">Be the first to experience it.</span>
          <motion.div
            variants={scaleOnHover}
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              onClick={scrollToBeta}
              size="lg"
              className="bg-zatch-neon text-black hover:bg-zatch-neon/90 focus-ring font-semibold text-lg px-12 py-7 h-auto rounded-full shadow-2xl shadow-zatch-neon/20"
            >
              Join the Waitlist
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}