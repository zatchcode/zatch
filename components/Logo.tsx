'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'


export function Logo() {
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className="text-2xl font-bold text-zatch-neon">ZATCH</span>
    </motion.div>
  )
}