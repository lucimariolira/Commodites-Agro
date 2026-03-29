# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # instalar dependências (necessário na primeira vez)
npm run dev          # servidor de desenvolvimento em http://localhost:5173
npm run build        # type-check (tsc) + build de produção em dist/
npm run preview      # servir o build de produção localmente
```

**Alternativa sem Node.js:** `dashboard.html` é uma versão standalone (Chart.js via CDN, sem build) que abre diretamente no navegador.

## Arquitetura

### Dois artefatos paralelos

Este repositório tem **duas implementações do mesmo dashboard**:

| Artefato | Stack | Quando usar |
|---|---|---|
| `src/` + `index.html` | React 18 + Vite + Recharts + Tailwind | Desenvolvimento principal com Node.js |
| `dashboard.html` | HTML/CSS/JS puro + Chart.js CDN | Distribuição sem build, abre direto no browser |

Ao modificar funcionalidades, atualizar **ambos** os artefatos para mantê-los em sincronia.

### Fluxo de dados (React)

```
src/data/generators.ts     → Geometric Brownian Motion (GBM) com semente fixa
src/data/mockData.ts       → Gera as 9 séries de preços no carregamento do módulo
src/data/variationFactors.ts → Narrativas de mercado em PT-BR (arrays de strings)
        ↓
src/types/index.ts          → Interfaces centrais: PriceSeries, CommodityGroup, etc.
        ↓
src/App.tsx                 → Lê dashboardData, gerencia aba ativa (CommodityId)
        ↓
CommoditySection            → useCommodityData() → computeStats() por série
        ↓
PriceLineChart + PriceCard + VariationFactors
```

### Dados simulados

Não há API externa. Todos os preços são gerados por GBM determinístico com `mulberry32` (PRNG com semente fixa) e transformação Box-Muller. Os parâmetros de cada série estão em `mockData.ts`:

- `anchorPrice` — preço de partida (~12 meses atrás)
- `drift` — tendência anual (negativo = bearish)
- `volatility` — volatilidade anual
- `floor` / `ceiling` — limites hard das faixas 2024-2025
- `seed` — 1001–1009 (um por série; alterar o seed muda toda a série)

### Gráficos com dual eixo Y

Grupos com duas séries de moedas diferentes (ex: Soja CBOT em `USc` + CEPEA em `BRL`) usam dois eixos Y. `PriceLineChart` detecta isso via `series[0].currency !== series[1].currency`. Em mobile, o eixo direito é suprimido — o tooltip mostra ambos os valores.

### Adicionando uma commodity nova

1. Em `src/types/index.ts`, adicionar o novo id ao union `CommodityId`
2. Em `src/data/variationFactors.ts`, exportar um array `VariationFactor[]` com os 4 objetos (2 escopos × 2 períodos)
3. Em `src/data/mockData.ts`, gerar a(s) série(s) com `generatePriceSeries` e adicionar um `CommodityGroup` ao array `commodities`
4. Replicar a mesma lógica no bloco `COMMODITIES` de `dashboard.html`

### Responsividade

- Breakpoints: mobile `<640px`, tablet `640–1023px`, desktop `≥1024px`
- `useWindowSize` hook controla altura do gráfico e visibilidade do eixo Y direito
- CSS Tailwind: `grid-cols-1 sm:grid-cols-2` para cartões; `lg:grid-cols-2` para fatores de variação
- Nav usa `overflow-x-auto` com `scrollbar-none` para scroll horizontal no mobile
