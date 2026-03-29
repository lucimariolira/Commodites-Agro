import { PriceSeries, PriceStats } from '../../types'
import { formatPrice } from '../../utils/formatters'
import { range52wPosition } from '../../utils/priceCalculations'
import { Badge } from '../ui/Badge'

const SOURCE_COLORS: Record<string, string> = {
  CBOT:  'bg-emerald-500/20 text-emerald-400',
  ICE:   'bg-amber-500/20 text-amber-400',
  NYMEX: 'bg-amber-500/20 text-amber-400',
  CEPEA: 'bg-blue-500/20 text-blue-400',
  B3:    'bg-purple-500/20 text-purple-400',
}

interface PriceCardProps {
  series: PriceSeries
  stats: PriceStats
}

export function PriceCard({ series, stats }: PriceCardProps) {
  const pos = range52wPosition(stats)

  return (
    <div className="card-glass p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-200 truncate">{series.label}</p>
          <p className="text-xs text-slate-500 mt-0.5">{series.unit}</p>
        </div>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${SOURCE_COLORS[series.source] ?? 'bg-slate-700 text-slate-400'}`}>
          {series.source}
        </span>
      </div>

      {/* Current price */}
      <div>
        <p className="text-2xl sm:text-3xl font-bold text-price text-slate-100 leading-none">
          {formatPrice(stats.currentPrice, series)}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-4">
        <Badge value={stats.changePct7d} label="7 dias" />
        <Badge value={stats.changePct30d} label="30 dias" />
      </div>

      {/* 52-week range bar */}
      <div>
        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
          <span>Mín. 52s</span>
          <span>Máx. 52s</span>
        </div>
        <div className="relative h-1.5 bg-slate-700 rounded-full overflow-visible">
          <div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              width: `${pos}%`,
              background: `linear-gradient(to right, #EF4444, #22C55E)`,
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border-2 border-slate-800 shadow-sm"
            style={{ left: `calc(${pos}% - 5px)` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
          <span>{stats.low52w.toFixed(2)}</span>
          <span>{stats.high52w.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
