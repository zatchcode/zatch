'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Logo } from './Logo'
import { Button } from './ui/button'

export function Header() {
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1])

  const scrollToBeta = () => {
    document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5"
      style={{ backgroundColor: `rgba(0, 0, 0, ${headerOpacity})` }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="text-neutral-200 hover:text-white transition-colors">About</a>
            <a href="#features" className="text-neutral-200 hover:text-white transition-colors">For You</a>
            <a href="#beta" className="text-neutral-200 hover:text-white transition-colors">Waitlist</a>
          </nav>
          <Button 
            onClick={scrollToBeta}
            size="sm"
            className="bg-zatch-neon text-black hover:bg-zatch-neon/90 focus-ring font-semibold"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
