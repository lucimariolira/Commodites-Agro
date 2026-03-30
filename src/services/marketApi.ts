import { PricePoint } from '../types'

// CORS proxy for Yahoo Finance (BZ=F, ZS=F, ZC=F, SB=F)
const PROXY = 'https://corsproxy.io/?url='

async function fetchYahooHistory(symbol: string): Promise<PricePoint[]> {
  try {
    const yahooUrl =
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
      `?interval=1d&range=1y&includePrePost=false`
    const res = await fetch(PROXY + encodeURIComponent(yahooUrl))
    if (!res.ok) return []
    const json = await res.json()
    const result = json?.chart?.result?.[0]
    if (!result) return []

    const timestamps: number[] = result.timestamp ?? []
    const closes: (number | null)[] = result.indicators?.quote?.[0]?.close ?? []

    return timestamps
      .map((ts, i) => ({
        date: new Date(ts * 1000).toISOString().slice(0, 10),
        value: closes[i] != null ? parseFloat(Number(closes[i]).toFixed(2)) : null,
      }))
      .filter((p): p is PricePoint => p.value !== null)
  } catch {
    return []
  }
}

async function fetchUsdBrl(): Promise<number> {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
    if (!res.ok) return 5.8
    const json = await res.json()
    const rate = parseFloat(json?.USDBRL?.bid ?? '0')
    return rate > 4 && rate < 12 ? rate : 5.8
  } catch {
    return 5.8
  }
}

function deriveHistory(source: PricePoint[], fn: (v: number) => number): PricePoint[] {
  return source.map(p => ({
    date: p.date,
    value: parseFloat(fn(p.value).toFixed(2)),
  }))
}

export interface MarketQuotes {
  brent_ice: PricePoint[]
  soja_cbot: PricePoint[]
  soja_cepea: PricePoint[]
  milho_cbot: PricePoint[]
  milho_b3: PricePoint[]
  acucar_ny: PricePoint[]
  acucar_cepea: PricePoint[]
}

export async function fetchMarketData(): Promise<MarketQuotes | null> {
  try {
    const [brent, soja, milho, acucar, usdBrl] = await Promise.all([
      fetchYahooHistory('BZ=F'),  // Brent Crude — USD/barril
      fetchYahooHistory('ZS=F'),  // Soja CBOT — cents/bushel
      fetchYahooHistory('ZC=F'),  // Milho CBOT — cents/bushel
      fetchYahooHistory('SB=F'),  // Açúcar NY (ICE) — cents/lb
      fetchUsdBrl(),              // USD/BRL spot
    ])

    // Requer pelo menos um símbolo com dados para prosseguir
    if (!brent.length && !soja.length && !milho.length && !acucar.length) {
      return null
    }

    // Soja CEPEA (R$/saca 60kg):
    //   cents/bu ÷ 100 = USD/bu
    //   1 saca 60kg = 60 / 27.2155 bu ≈ 2.2046 bu
    //   × usdBrl × fator basis (-5%)
    const soja_cepea = deriveHistory(
      soja,
      v => (v / 100) * (60 / 27.2155) * usdBrl * 0.95
    )

    // Milho B3 (R$/saca 60kg):
    //   cents/bu ÷ 100 = USD/bu
    //   1 saca 60kg = 60 / 25.4012 bu ≈ 2.3622 bu
    //   × usdBrl × fator basis (-8%)
    const milho_b3 = deriveHistory(
      milho,
      v => (v / 100) * (60 / 25.4012) * usdBrl * 0.92
    )

    // Açúcar CEPEA (R$/saca 50kg):
    //   cents/lb ÷ 100 = USD/lb
    //   1 saca 50kg = 110.231 lb
    //   × usdBrl × fator basis (-3%)
    const acucar_cepea = deriveHistory(
      acucar,
      v => (v / 100) * 110.231 * usdBrl * 0.97
    )

    return {
      brent_ice: brent,
      soja_cbot: soja,
      soja_cepea,
      milho_cbot: milho,
      milho_b3,
      acucar_ny: acucar,
      acucar_cepea,
    }
  } catch {
    return null
  }
}
