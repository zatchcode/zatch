// Start Zatching Challenge Configuration and Logic

// Target launch date: February 14, 2026
export const STARTZATCHING_TARGET_DATE = new Date('2026-03-31T00:00:00+05:30')

// Number of referrals needed to unlock order bonuses
export const STARTZATCHING_REFERRAL_THRESHOLD = 10

// Base discount percentage (can be increased through referrals and social shares)
export const BASE_DISCOUNT = 10

// Maximum discount percentage
export const STARTZATCHING_MAX_DISCOUNT = 100

// Maximum orders allowed per participant
export const STARTZATCHING_MAX_ORDERS = 5

// Social share bonus range
export const SHARE_BONUS_MIN = 1
export const SHARE_BONUS_MAX = 5

// Chance of getting +1 order from social share (30%)
export const SHARE_ORDER_BONUS_CHANCE = 0.3

/**
 * Clamp discount to valid range (10-100%)
 */
export function clampDiscount(value: number): number {
  return Math.max(BASE_DISCOUNT, Math.min(STARTZATCHING_MAX_DISCOUNT, value))
}

/**
 * Clamp orders to valid range (1-5)
 */
export function clampOrders(value: number): number {
  return Math.max(1, Math.min(STARTZATCHING_MAX_ORDERS, value))
}

/**
 * Generate random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generate a unique coupon code based on date
 */
export function generateCouponCode(date: Date = new Date()): string {
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ZATCH${year}${month}${day}${random}`
}

/**
 * Generate a unique referral code
 */
export function generateReferralCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${timestamp}${random}`.slice(0, 10)
}

/**
 * Get weighted discount (higher discounts for earlier participants)
 * Returns a discount between 10-25%
 */
export function getWeightedDiscount(): number {
  const weights = [
    { discount: 25, weight: 5 },   // 5% chance of 25%
    { discount: 20, weight: 15 },  // 15% chance of 20%
    { discount: 18, weight: 20 },  // 20% chance of 18%
    { discount: 15, weight: 30 },  // 30% chance of 15%
    { discount: 12, weight: 20 },  // 20% chance of 12%
    { discount: 10, weight: 10 },  // 10% chance of 10%
  ]

  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0)
  let random = Math.random() * totalWeight

  for (const { discount, weight } of weights) {
    random -= weight
    if (random <= 0) {
      return discount
    }
  }

  return BASE_DISCOUNT
}

/**
 * Get random number of initial orders (1-2)
 * 70% chance of 1 order, 30% chance of 2 orders
 */
export function getRandomOrders(): number {
  return Math.random() < 0.7 ? 1 : 2
}