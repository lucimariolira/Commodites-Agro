import { PricePoint } from '../types'
import { subDays, format } from 'date-fns'

// ─── Seeded PRNG (mulberry32) ─────────────────────────────────────────────────

function mulberry32(seed: number): () => number {
  let s = seed
  return function () {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Box-Muller: uniform → standard normal
function toNormal(rand: () => number): number {
  const u = 1 - rand()
  const v = rand()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

// ─── GBM time-series generator ────────────────────────────────────────────────

export interface SeriesConfig {
  anchorPrice: number
  drift: number      // Annual drift rate
  volatility: number // Annual volatility
  floor: number
  ceiling: number
  seed: number
  days?: number
}

export function generatePriceSeries(config: SeriesConfig): PricePoint[] {
  const {
    anchorPrice,
    drift,
    volatility,
    floor,
    ceiling,
    seed,
    days = 365,
  } = config

  const rand = mulberry32(seed)
  const dt = 1 / 365
  const driftTerm = (drift - 0.5 * volatility * volatility) * dt
  const volTerm = volatility * Math.sqrt(dt)

  const today = new Date()
  const points: PricePoint[] = []

  let price = anchorPrice

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i)
    const z = toNormal(rand)
    price = price * Math.exp(driftTerm + volTerm * z)
    price = Math.max(floor, Math.min(ceiling, price))
    points.push({
      date: format(date, 'yyyy-MM-dd'),
      value: parseFloat(price.toFixed(2)),
    })
  }

  return points
}
