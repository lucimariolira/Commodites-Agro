import { PriceSeries, PriceStats } from '../../types'
import { PriceCard } from './PriceCard'

interface PriceCardGridProps {
  series: PriceSeries[]
  statsMap: Record<string, PriceStats>
}

export function PriceCardGrid({ series, statsMap }: PriceCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {series.map(s => (
        <PriceCard key={s.id} series={s} stats={statsMap[s.id]} />
      ))}
    </div>
  )
}
