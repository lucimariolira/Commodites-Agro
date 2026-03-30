import { DashboardData } from '../types'
import { generatePriceSeries } from './generators'
import * as factors from './variationFactors'

// All series are generated once at module load (deterministic, seed-based)

const brentHistory    = generatePriceSeries({ anchorPrice: 82.0,  drift: -0.05, volatility: 0.25, floor: 68,   ceiling: 95,   seed: 1001 })
const sojaCbotHistory = generatePriceSeries({ anchorPrice: 1060,  drift: -0.08, volatility: 0.18, floor: 940,  ceiling: 1200, seed: 1002 })
const sojaHistory     = generatePriceSeries({ anchorPrice: 113,   drift: -0.06, volatility: 0.15, floor: 92,   ceiling: 128,  seed: 1003 })
const milhoCbotHistory= generatePriceSeries({ anchorPrice: 452,   drift: -0.04, volatility: 0.20, floor: 395,  ceiling: 490,  seed: 1004 })
const milhoB3History  = generatePriceSeries({ anchorPrice: 68,    drift: -0.03, volatility: 0.18, floor: 53,   ceiling: 78,   seed: 1005 })
const acucarNyHistory = generatePriceSeries({ anchorPrice: 20.5,  drift:  0.02, volatility: 0.22, floor: 17.5, ceiling: 23.5, seed: 1006 })
const acucarHistory   = generatePriceSeries({ anchorPrice: 122,   drift:  0.03, volatility: 0.16, floor: 102,  ceiling: 140,  seed: 1007 })
const etanolHistory   = generatePriceSeries({ anchorPrice: 3.08,  drift:  0.04, volatility: 0.12, floor: 2.45, ceiling: 3.55, seed: 1008 })
const etanolB3History = generatePriceSeries({ anchorPrice: 2.94,  drift:  0.04, volatility: 0.12, floor: 2.35, ceiling: 3.45, seed: 1009 })

export const dashboardData: DashboardData = {
  generatedAt: new Date().toISOString(),
  commodities: [
    {
      id: 'petroleo',
      name: 'Petróleo',
      icon: 'Droplets',
      accentColor: '#F59E0B',
      description: 'Brent Crude — ICE/NYMEX',
      series: [
        {
          id: 'brent_ice',
          label: 'Brent ICE/NY',
          source: 'ICE',
          unit: 'USD/barril',
          currency: 'USD',
          color: '#F59E0B',
          history: brentHistory,
        },
      ],
      variationFactors: factors.petroleo,
    },
    {
      id: 'soja',
      name: 'Soja',
      icon: 'Sprout',
      accentColor: '#059669',
      description: 'CBOT Chicago + CEPEA Brasil',
      series: [
        {
          id: 'soja_cbot',
          label: 'Soja Chicago (CBOT)',
          source: 'CBOT',
          unit: 'cents/bushel',
          currency: 'USc',
          color: '#059669',
          history: sojaCbotHistory,
        },
        {
          id: 'soja_cepea',
          label: 'Soja CEPEA',
          source: 'CEPEA',
          unit: 'R$/saca 60kg',
          currency: 'BRL',
          color: '#6EE7B7',
          history: sojaHistory,
        },
      ],
      variationFactors: factors.soja,
    },
    {
      id: 'milho',
      name: 'Milho',
      icon: 'Wheat',
      accentColor: '#F97316',
      description: 'CBOT Chicago + B3 Brasil',
      series: [
        {
          id: 'milho_cbot',
          label: 'Milho Chicago (CBOT)',
          source: 'CBOT',
          unit: 'cents/bushel',
          currency: 'USc',
          color: '#EA580C',
          history: milhoCbotHistory,
        },
        {
          id: 'milho_b3',
          label: 'Milho B3',
          source: 'B3',
          unit: 'R$/saca 60kg',
          currency: 'BRL',
          color: '#FDBA74',
          history: milhoB3History,
        },
      ],
      variationFactors: factors.milho,
    },
    {
      id: 'acucar',
      name: 'Açúcar',
      icon: 'Cookie',
      accentColor: '#EC4899',
      description: 'ICE NY (SB=F) + CEPEA Brasil',
      series: [
        {
          id: 'acucar_ny',
          label: 'Açúcar NY (ICE)',
          source: 'ICE',
          unit: 'cents/lb',
          currency: 'USc',
          color: '#BE185D',
          history: acucarNyHistory,
        },
        {
          id: 'acucar_cepea',
          label: 'Açúcar CEPEA',
          source: 'CEPEA',
          unit: 'R$/saca 50kg',
          currency: 'BRL',
          color: '#F9A8D4',
          history: acucarHistory,
        },
      ],
      variationFactors: factors.acucar,
    },
    {
      id: 'etanol',
      name: 'Etanol',
      icon: 'Fuel',
      accentColor: '#8B5CF6',
      description: 'CEPEA + B3 Brasil',
      series: [
        {
          id: 'etanol_cepea',
          label: 'Etanol CEPEA',
          source: 'CEPEA',
          unit: 'R$/litro',
          currency: 'BRL',
          color: '#6D28D9',
          history: etanolHistory,
        },
        {
          id: 'etanol_b3',
          label: 'Etanol B3',
          source: 'B3',
          unit: 'R$/litro',
          currency: 'BRL',
          color: '#C4B5FD',
          history: etanolB3History,
        },
      ],
      variationFactors: factors.etanol,
    },
  ],
}
