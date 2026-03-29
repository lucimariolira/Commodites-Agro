import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { PriceSeries } from '../types'

export function formatPrice(value: number, series: PriceSeries): string {
  const { currency, unit } = series

  if (currency === 'USD') {
    return `US$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  if (currency === 'USc') {
    // cents/bushel or cents/lb
    if (unit.includes('bushel')) {
      return `${value.toFixed(2)} cts/bu`
    }
    return `${value.toFixed(2)} cts/lb`
  }

  // BRL
  if (unit.includes('litro')) {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/L`
  }
  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatPct(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function formatAxisDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'MMM/yy', { locale: ptBR })
  } catch {
    return dateStr
  }
}

export function formatTooltipDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "dd 'de' MMM yyyy", { locale: ptBR })
  } catch {
    return dateStr
  }
}

export function formatAxisValue(value: number, currency: string): string {
  if (currency === 'USD') return `$${value.toFixed(0)}`
  if (currency === 'USc') return `${value.toFixed(0)}`
  return `R$${value.toFixed(0)}`
}
