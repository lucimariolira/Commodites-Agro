import { ComponentType } from 'react'
import * as Icons from 'lucide-react'
import { LucideProps } from 'lucide-react'

type IconName = keyof typeof Icons

interface SectionHeaderProps {
  name: string
  icon: string
  description: string
  accentColor: string
}

export function SectionHeader({ name, icon, description, accentColor }: SectionHeaderProps) {
  const IconComponent = (Icons[icon as IconName] ?? Icons.Circle) as ComponentType<LucideProps>

  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
        style={{ backgroundColor: `${accentColor}20` }}
      >
        <IconComponent size={20} color={accentColor} strokeWidth={2} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-100 leading-tight">{name}</h2>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
    </div>
  )
}
