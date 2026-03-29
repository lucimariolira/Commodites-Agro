import { useMemo } from 'react'
import { CommodityGroup, PriceStats } from '../types'
import { computeStats } from '../utils/priceCalculations'

interface CommodityData {
  group: CommodityGroup
  statsMap: Record<string, PriceStats>
}

export function useCommodityData(group: CommodityGroup): CommodityData {
  const statsMap = useMemo(() => {
    const map: Record<string, PriceStats> = {}
    for (const series of group.series) {
      map[series.id] = computeStats(series)
    }
    return map
  }, [group])

  return { group, statsMap }
}
