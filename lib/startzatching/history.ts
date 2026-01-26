// Boost history parser for Start Zatching participants

type BoostHistoryEntry = {
  type: 'referral' | 'share'
  value: number
  orders_increment: number
  created_at: string
  referred_id?: string
  platform?: string
}

/**
 * Parse boost history from database JSONB field
 * Returns an array of boost entries
 */
export function parseBoostHistory(history: unknown): BoostHistoryEntry[] {
  if (!history) {
    return []
  }

  if (Array.isArray(history)) {
    return history as BoostHistoryEntry[]
  }

  try {
    const parsed = typeof history === 'string' ? JSON.parse(history) : history
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('[startzatching] Failed to parse boost history', error)
    return []
  }
}
