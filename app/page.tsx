'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { BentoGrid } from '@/components/BentoGrid'
import { StartZatching } from '@/components/StartZatching'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { BetaForm } from '@/components/BetaForm'
import { Newsletter } from '@/components/Newsletter'
import { DeleteAccountSection } from '@/components/DeleteAccountSection'
import { rise } from '@/lib/motion'

export default function Home() {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      variants={rise}
      className="relative min-h-screen text-white"
    >
      <Header />
      <Hero />
      <HowItWorks />
      <BentoGrid />
      <StartZatching />
      <Testimonials />
      <FAQ />
      <BetaForm />
      <Newsletter />
      <DeleteAccountSection />

      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-3 text-sm text-neutral-200">
          <p>Zatch © 2025 | All rights reserved</p>
          <p>Follow us on Instagram @zatch.shop</p>
        </div>
      </footer>
    </motion.main>
  )
}
