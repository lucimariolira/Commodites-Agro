import { TooltipProps } from 'recharts'
import { formatTooltipDate } from '../../utils/formatters'

interface ChartTooltipProps extends TooltipProps<number, string> {
  unitMap: Record<string, string>
}

export function ChartTooltip({ active, payload, label, unitMap }: ChartTooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg shadow-2xl p-3 min-w-[160px]">
      <p className="text-xs text-slate-400 mb-2 font-medium">{formatTooltipDate(label ?? '')}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 py-0.5">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <div className="flex-1 min-w-0">
            <span className="text-xs text-slate-400 truncate block">{entry.name}</span>
            <span className="text-sm font-semibold text-slate-100 font-mono">
              {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
              {' '}
              <span className="text-xs font-normal text-slate-400">
                {unitMap[String(entry.dataKey)] ?? ''}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
