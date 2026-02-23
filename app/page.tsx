'use client'

import { Suspense } from 'react'
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
import { CompanyDetails } from '@/components/CompanyDetails'
import { BuyerSellerFocus } from '@/components/BuyerSellerFocus'
import { FutureAndAbout } from '@/components/FutureAndAbout'
import { SiteFooter } from '@/components/SiteFooter'

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
      <BuyerSellerFocus />
      <Testimonials />
      <FutureAndAbout />
      <Suspense fallback={null}>
        <StartZatching />
      </Suspense>
      <FAQ />
      <CompanyDetails />
      <BetaForm />
      <Newsletter />
      <SiteFooter />
    </motion.main>
  )
}
