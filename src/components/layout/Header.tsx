import { BarChart2, RefreshCw } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface HeaderProps {
  generatedAt: string
  loading?: boolean
  usingRealData?: boolean
}

export function Header({ generatedAt, loading, usingRealData }: HeaderProps) {
  const dateLabel = format(new Date(generatedAt), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/20 p-2 rounded-lg">
            <BarChart2 size={20} className="text-amber-500" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-100 leading-tight">
              Dashboard de Commodities
            </h1>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Petróleo · Soja · Milho · Açúcar · Etanol
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {loading && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <RefreshCw size={12} className="animate-spin" />
              <span className="hidden sm:inline">Buscando dados reais...</span>
            </div>
          )}
          {!loading && usingRealData && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold tracking-wide">
              DADOS REAIS
            </span>
          )}
          {!loading && !usingRealData && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold tracking-wide">
              SIMULADO
            </span>
          )}
          <div className="text-right">
            <p className="text-[10px] sm:text-xs text-slate-500">Atualizado em</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">{dateLabel}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
