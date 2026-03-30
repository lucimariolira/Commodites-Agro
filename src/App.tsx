import { useState, useEffect } from 'react'
import { CommodityId, CommodityGroup, PricePoint } from './types'
import { dashboardData } from './data/mockData'
import { fetchMarketData, MarketQuotes } from './services/marketApi'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { CommodityNav } from './components/navigation/CommodityNav'
import { CommoditySection } from './components/dashboard/CommoditySection'

function mergeRealData(commodities: CommodityGroup[], quotes: MarketQuotes): CommodityGroup[] {
  const quotesMap = quotes as Record<string, PricePoint[]>
  return commodities.map(group => ({
    ...group,
    series: group.series.map(s => {
      const realHistory = quotesMap[s.id]
      if (Array.isArray(realHistory) && realHistory.length >= 10) {
        return { ...s, history: realHistory }
      }
      return s
    }),
  }))
}

export default function App() {
  const [commodities, setCommodities] = useState(dashboardData.commodities)
  const [loading, setLoading] = useState(true)
  const [usingRealData, setUsingRealData] = useState(false)
  const [active, setActive] = useState<CommodityId>(dashboardData.commodities[0].id)

  useEffect(() => {
    fetchMarketData().then(quotes => {
      if (quotes) {
        setCommodities(prev => mergeRealData(prev, quotes))
        setUsingRealData(true)
      }
      setLoading(false)
    })
  }, [])

  const navItems = commodities.map(c => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    accentColor: c.accentColor,
  }))

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header
        generatedAt={dashboardData.generatedAt}
        loading={loading}
        usingRealData={usingRealData}
      />

      <CommodityNav
        commodities={navItems}
        active={active}
        onSelect={setActive}
      />

      <main className="flex-1">
        {commodities.map(group => (
          <CommoditySection key={group.id} group={group} />
        ))}
      </main>

      <Footer />
    </div>
  )
}
