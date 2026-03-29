import { useRef, ComponentType } from 'react'
import * as Icons from 'lucide-react'
import { LucideProps } from 'lucide-react'
import clsx from 'clsx'
import { CommodityId, CommodityGroup } from '../../types'

type IconName = keyof typeof Icons

interface CommodityNavProps {
  commodities: Pick<CommodityGroup, 'id' | 'name' | 'icon' | 'accentColor'>[]
  active: CommodityId
  onSelect: (id: CommodityId) => void
}

export function CommodityNav({ commodities, active, onSelect }: CommodityNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function handleClick(id: CommodityId) {
    onSelect(id)
    const el = document.getElementById(`section-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none px-2 sm:px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {commodities.map((c) => {
            const IconComponent = (Icons[c.icon as IconName] ?? Icons.Circle) as ComponentType<LucideProps>
            const isActive = active === c.id

            return (
              <button
                key={c.id}
                onClick={() => handleClick(c.id)}
                className={clsx(
                  'flex items-center gap-2 px-3 sm:px-5 py-3.5 whitespace-nowrap',
                  'text-sm font-medium transition-all duration-200',
                  'border-b-2 min-w-[80px] sm:flex-1 justify-center',
                  isActive
                    ? 'border-current text-current'
                    : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-600',
                )}
                style={isActive ? { color: c.accentColor, borderColor: c.accentColor } : undefined}
              >
                <IconComponent size={15} strokeWidth={2} />
                <span className="hidden sm:inline">{c.name}</span>
                <span className="sm:hidden text-xs">{c.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
