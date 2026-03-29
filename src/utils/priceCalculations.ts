import { PriceSeries, PriceStats } from '../types'

export function computeStats(series: PriceSeries): PriceStats {
  const h = series.history
  if (h.length < 31) {
    const v = h[h.length - 1]?.value ?? 0
    return {
      seriesId: series.id,
      currentPrice: v,
      change7d: 0,
      changePct7d: 0,
      change30d: 0,
      changePct30d: 0,
      high52w: v,
      low52w: v,
    }
  }

  const latest = h[h.length - 1].value
  const p7d    = h[h.length - 8].value
  const p30d   = h[h.length - 31].value
  const values = h.map(p => p.value)

  return {
    seriesId: series.id,
    currentPrice: latest,
    change7d: latest - p7d,
    changePct7d: ((latest - p7d) / p7d) * 100,
    change30d: latest - p30d,
    changePct30d: ((latest - p30d) / p30d) * 100,
    high52w: Math.max(...values),
    low52w: Math.min(...values),
  }
}

export function range52wPosition(stats: PriceStats): number {
  const span = stats.high52w - stats.low52w
  if (span === 0) return 50
  return ((stats.currentPrice - stats.low52w) / span) * 100
}
