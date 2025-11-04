import { Variants } from 'framer-motion'

// Base spring configuration
export const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8
}

// Fade and rise animation
export const rise: Variants = {
  initial: { y: 16, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: spring },
  exit: { y: -8, opacity: 0, transition: spring }
}

// Stagger children animation
export const makeStagger = (delay = 0.04) => ({
  animate: { 
    transition: { 
      staggerChildren: delay, 
      delayChildren: delay 
    } 
  }
})

// Reduced motion utility
export const useReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Scale animation for buttons
export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.03, transition: spring },
  tap: { scale: 0.98, transition: spring }
}

// Text reveal animation
export const textReveal: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { ...spring, delay: 0.1 } }
}