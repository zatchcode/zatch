'use client'

import { motion } from 'framer-motion'

export function Logo() {
  return (
    <motion.div 
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="w-8 h-8 rounded-full border-2 border-zatch-neon flex items-center justify-center">
        <span className="text-zatch-neon font-bold text-sm">Z</span>
      </div>
      <span className="text-xl font-bold text-white">ZATCH</span>
    </motion.div>
  )
}