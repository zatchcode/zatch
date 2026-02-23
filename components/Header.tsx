'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Logo } from './Logo'
import { Button } from './ui/button'

export function Header() {
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1])



  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5"
      style={{ backgroundColor: `rgba(0, 0, 0, ${headerOpacity})` }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#marketplace" className="text-neutral-200 hover:text-white transition-colors">Marketplace</a>
            <a href="#buyers" className="text-neutral-200 hover:text-white transition-colors">For Buyers</a>
            <a href="#sellers" className="text-neutral-200 hover:text-white transition-colors">For Sellers</a>
            <a href="#trust" className="text-neutral-200 hover:text-white transition-colors">Trust</a>
            <a href="#details" className="text-neutral-200 hover:text-white transition-colors">Policies</a>
            <a href="#faq" className="text-neutral-200 hover:text-white transition-colors">FAQs</a>
          </nav>
          <Button
            asChild
            size="sm"
            className="bg-zatch-neon text-black hover:bg-zatch-neon/90 focus-ring font-semibold"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download App
            </a>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
