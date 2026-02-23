'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'


export function Logo() {
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link href="/" className="text-2xl font-bold text-zatch-neon">
        Zatch™
      </Link>
    </motion.div>
  )
}
