// ─── Price series ─────────────────────────────────────────────────────────────

export interface PricePoint {
  date: string   // ISO date "YYYY-MM-DD"
  value: number
}

export type QuoteSource = 'CBOT' | 'ICE' | 'NYMEX' | 'CEPEA' | 'B3'

export interface PriceSeries {
  id: string
  label: string
  source: QuoteSource
  unit: string
  currency: 'USD' | 'BRL' | 'USc'
  color: string
  history: PricePoint[]
}

// ─── Computed stats ───────────────────────────────────────────────────────────

export interface PriceStats {
  seriesId: string
  currentPrice: number
  change7d: number
  changePct7d: number
  change30d: number
  changePct30d: number
  high52w: number
  low52w: number
}

// ─── Variation factors ────────────────────────────────────────────────────────

export type MarketScope = 'global' | 'brazil'
export type TimePeriod = 'week' | 'month'

export interface VariationFactor {
  scope: MarketScope
  period: TimePeriod
  factors: string[]
}

// ─── Commodity group ──────────────────────────────────────────────────────────

export type CommodityId = 'petroleo' | 'soja' | 'milho' | 'acucar' | 'etanol'

export interface CommodityGroup {
  id: CommodityId
  name: string
  icon: string
  accentColor: string
  description: string
  series: PriceSeries[]
  variationFactors: VariationFactor[]
}

export interface DashboardData {
  generatedAt: string
  commodities: CommodityGroup[]
}

// ─── UI state ─────────────────────────────────────────────────────────────────

export type ChartVisibilityState = Record<string, boolean>
