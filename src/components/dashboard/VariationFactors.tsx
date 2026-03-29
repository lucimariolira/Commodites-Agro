import { Globe2, MapPin } from 'lucide-react'
import { VariationFactor } from '../../types'

interface FactorBlockProps {
  factors: VariationFactor[]
  period: 'week' | 'month'
  title: string
}

function FactorBlock({ factors, period, title }: FactorBlockProps) {
  const global = factors.find(f => f.scope === 'global' && f.period === period)
  const brazil = factors.find(f => f.scope === 'brazil' && f.period === period)

  return (
    <div className="card-glass p-4">
      <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
        <span className="w-1.5 h-4 rounded-sm bg-slate-500 inline-block" />
        {title}
      </h4>

      <div className="space-y-4">
        {global && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
              <Globe2 size={13} />
              <span>Mercado Mundial</span>
            </div>
            <ul className="space-y-1.5">
              {global.factors.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {brazil && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
              <MapPin size={13} />
              <span>Brasil</span>
            </div>
            <ul className="space-y-1.5">
              {brazil.factors.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

interface VariationFactorsProps {
  factors: VariationFactor[]
  commodityName: string
}

export function VariationFactors({ factors, commodityName }: VariationFactorsProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Fatores de Variação — {commodityName}
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FactorBlock factors={factors} period="week" title="Última Semana" />
        <FactorBlock factors={factors} period="month" title="Último Mês" />
      </div>
    </div>
  )
}
