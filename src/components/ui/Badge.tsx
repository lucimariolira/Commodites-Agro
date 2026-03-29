import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import clsx from 'clsx'
import { formatPct } from '../../utils/formatters'

interface BadgeProps {
  value: number
  label: string
  size?: 'sm' | 'md'
}

export function Badge({ value, label, size = 'md' }: BadgeProps) {
  const isUp      = value > 0.005
  const isDown    = value < -0.005
  const isNeutral = !isUp && !isDown

  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus

  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={clsx(
        'text-slate-400',
        size === 'sm' ? 'text-[10px]' : 'text-xs',
      )}>
        {label}
      </span>
      <span className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold',
        size === 'sm' ? 'text-xs' : 'text-sm',
        isUp      && 'bg-green-500/15 text-green-400',
        isDown    && 'bg-red-500/15 text-red-400',
        isNeutral && 'bg-slate-700 text-slate-400',
      )}>
        <Icon size={size === 'sm' ? 10 : 12} strokeWidth={2.5} />
        {formatPct(value)}
      </span>
    </div>
  )
}
