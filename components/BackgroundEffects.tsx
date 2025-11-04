'use client'

import { NeonWave } from '@/components/NeonWave'
import { Particles } from '@/components/Particles'

export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1400] via-transparent to-black opacity-20" />
      <NeonWave />
      <Particles />
    </div>
  )
}
