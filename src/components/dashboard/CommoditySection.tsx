import { CommodityGroup } from '../../types'
import { useCommodityData } from '../../hooks/useCommodityData'
import { SectionHeader } from '../ui/SectionHeader'
import { PriceLineChart } from '../charts/PriceLineChart'
import { PriceCardGrid } from './PriceCardGrid'
import { VariationFactors } from './VariationFactors'

interface CommoditySectionProps {
  group: CommodityGroup
}

export function CommoditySection({ group }: CommoditySectionProps) {
  const { statsMap } = useCommodityData(group)

  return (
    <section
      id={`section-${group.id}`}
      className="section-anchor py-8 border-b border-slate-800 last:border-b-0"
    >
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          name={group.name}
          icon={group.icon}
          description={group.description}
          accentColor={group.accentColor}
        />

        <div className="space-y-6">
          {/* Cartões de preço no topo */}
          <PriceCardGrid series={group.series} statsMap={statsMap} />

          {/* Gráfico histórico */}
          <div className="card-glass p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">
              Histórico 12 Meses
            </p>
            <PriceLineChart series={group.series} />
          </div>

          {/* Fatores de variação */}
          <VariationFactors
            factors={group.variationFactors}
            commodityName={group.name}
          />
        </div>
      </div>
    </section>
  )
}
