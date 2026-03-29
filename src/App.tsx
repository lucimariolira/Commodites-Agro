import { useState } from 'react'
import { CommodityId } from './types'
import { dashboardData } from './data/mockData'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { CommodityNav } from './components/navigation/CommodityNav'
import { CommoditySection } from './components/dashboard/CommoditySection'

export default function App() {
  const { commodities, generatedAt } = dashboardData
  const [active, setActive] = useState<CommodityId>(commodities[0].id)

  const navItems = commodities.map(c => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    accentColor: c.accentColor,
  }))

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header generatedAt={generatedAt} />

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
