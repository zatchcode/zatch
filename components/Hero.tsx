'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ScrollIndicator } from './ScrollIndicator'
import { textReveal, makeStagger, scaleOnHover } from '@/lib/motion'

export function Hero() {
  const scrollToFinal = () => {
    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToSellers = () => {
    document.getElementById('sellers')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="marketplace" className="relative min-h-[90vh] flex items-center justify-center overflow-visible pt-32 pb-20">
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
          <span className="text-sm font-medium text-neutral-200">India’s First Live Bargain Marketplace</span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-normal leading-[1.15] max-w-[95%] w-full mx-auto bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent pb-2"
          variants={textReveal}
        >
          Watch it live. Shop through short videos. Zatch your price in real time.
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-neutral-100 mb-6 max-w-3xl mx-auto leading-relaxed"
          variants={textReveal}
        >
          Zatch™ blends live shopping, video discovery, and strategic bargaining, built for the way India actually shops.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-neutral-200 mb-8 max-w-3xl mx-auto"
          variants={textReveal}
        >
          No ads. No algorithm fights. Just real sellers and real deals.
        </motion.p>

        <motion.div
          variants={textReveal}
          className="mb-12 max-w-sm mx-auto rounded-2xl border border-white/15 bg-white/5 p-6 text-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-300 mb-3">App Download</p>
          <div className="h-28 rounded-xl border border-dashed border-zatch-neon/60 bg-black/40 flex items-center justify-center text-sm text-neutral-200">
            QR Code to app download
          </div>
        </motion.div>
        
        <motion.div variants={textReveal} className="flex flex-col items-center justify-center gap-4">
          <span className="text-sm uppercase tracking-[0.3em] text-neutral-300">Live. Video-first. Negotiable.</span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.div
              variants={scaleOnHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={scrollToFinal}
                size="lg"
                className="bg-zatch-neon text-black hover:bg-zatch-neon/90 focus-ring font-semibold text-lg px-10 py-6 h-auto rounded-full shadow-2xl shadow-zatch-neon/20"
              >
                Download Zatch
              </Button>
            </motion.div>
            <motion.div
              variants={scaleOnHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={scrollToSellers}
                size="lg"
                variant="outline"
                className="border-white/25 bg-transparent text-white hover:bg-white/10 font-semibold text-lg px-10 py-6 h-auto rounded-full"
              >
                Start Selling Today
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
