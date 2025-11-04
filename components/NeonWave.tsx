'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/motion'

export function NeonWave() {
  const { scrollY } = useScroll()
  const reducedMotion = useReducedMotion()

  const opacity = useTransform(scrollY, [0, 500], [0.6, 0.3])

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity }}>
      <svg
        className="absolute bottom-[-6%] left-1/2 -translate-x-1/2 w-[160%] h-[130%]"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#9DFF00" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C6FF00" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M0,430 Q320,260 640,430 T1200,430 L1200,900 L0,900 Z"
          initial={{ d: 'M0,430 Q320,260 640,430 T1200,430 L1200,900 L0,900 Z' }}
          fill="url(#neonGradient)"
          filter="url(#glow)"
          animate={
            reducedMotion
              ? {}
              : {
                  d: [
                    'M0,430 Q320,260 640,430 T1200,430 L1200,900 L0,900 Z',
                    'M0,410 Q320,280 640,410 T1200,410 L1200,900 L0,900 Z',
                    'M0,430 Q320,260 640,430 T1200,430 L1200,900 L0,900 Z',
                  ],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          d="M0,500 Q360,310 720,500 T1200,500 L1200,900 L0,900 Z"
          initial={{ d: 'M0,500 Q360,310 720,500 T1200,500 L1200,900 L0,900 Z' }}
          fill="url(#neonGradient)"
          filter="url(#glow)"
          opacity={0.65}
          animate={
            reducedMotion
              ? {}
              : {
                  d: [
                    'M0,500 Q360,310 720,500 T1200,500 L1200,900 L0,900 Z',
                    'M0,480 Q360,330 720,480 T1200,480 L1200,900 L0,900 Z',
                    'M0,500 Q360,310 720,500 T1200,500 L1200,900 L0,900 Z',
                  ],
                }
          }
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4,
          }}
        />
      </svg>
    </motion.div>
  )
}
