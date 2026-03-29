import { useMemo, useState } from 'react'
import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { PriceSeries } from '../../types'
import { formatAxisDate, formatAxisValue } from '../../utils/formatters'
import { ChartTooltip } from './ChartTooltip'
import { useWindowSize } from '../../hooks/useWindowSize'

interface PriceLineChartProps {
  series: PriceSeries[]
}

export function PriceLineChart({ series }: PriceLineChartProps) {
  const { isMobile } = useWindowSize()
  const chartHeight = isMobile ? 240 : 320

  // Visibility state — all series visible by default
  const [hidden, setHidden] = useState<Record<string, boolean>>({})

  function toggleSeries(id: string) {
    setHidden(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Detect dual-axis (two different currency types)
  const hasDualAxis = series.length === 2 && series[0].currency !== series[1].currency

  // Build chart data: merge all series by date
  const chartData = useMemo(() => {
    if (!series.length) return []
    const base = series[0].history
    return base.map((point, i) => {
      const row: Record<string, string | number> = { date: point.date }
      for (const s of series) {
        row[s.id] = s.history[i]?.value ?? 0
      }
      return row
    })
  }, [series])

  // Reduce to ~monthly ticks (every 30 points)
  const xTickInterval = Math.floor(chartData.length / 12) - 1

  // Unit map for tooltip
  const unitMap: Record<string, string> = {}
  for (const s of series) unitMap[s.id] = s.unit

  return (
    <div>
      {/* Legend with toggles */}
      <div className="flex flex-wrap gap-3 mb-4">
        {series.map(s => (
          <button
            key={s.id}
            onClick={() => toggleSeries(s.id)}
            className="flex items-center gap-1.5 text-xs transition-opacity"
            style={{ opacity: hidden[s.id] ? 0.35 : 1 }}
          >
            <span
              className="w-6 h-0.5 rounded-full inline-block"
              style={{ backgroundColor: s.color, height: 3 }}
            />
            <span className="text-slate-300">{s.label}</span>
            <span className="text-slate-500">({s.unit})</span>
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart data={chartData} margin={{ top: 4, right: hasDualAxis && !isMobile ? 50 : 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />

          <XAxis
            dataKey="date"
            tickFormatter={formatAxisDate}
            interval={xTickInterval}
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
            tickLine={false}
          />

          {/* Left Y-axis — first series */}
          <YAxis
            yAxisId="left"
            orientation="left"
            tickFormatter={(v) => formatAxisValue(v, series[0]?.currency ?? 'USD')}
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={55}
          />

          {/* Right Y-axis — second series (only if dual axis and not mobile) */}
          {hasDualAxis && !isMobile && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(v) => formatAxisValue(v, series[1]?.currency ?? 'BRL')}
              tick={{ fill: '#64748B', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
          )}

          <Tooltip
            content={<ChartTooltip unitMap={unitMap} />}
            cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 2' }}
          />

          <Legend content={() => null} />

          {series.map((s, idx) => (
            <Line
              key={s.id}
              yAxisId={hasDualAxis ? (idx === 0 ? 'left' : isMobile ? 'left' : 'right') : 'left'}
              type="monotone"
              dataKey={s.id}
              name={s.label}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: s.color, strokeWidth: 0 }}
              hide={hidden[s.id] ?? false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
