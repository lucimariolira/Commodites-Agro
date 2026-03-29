import { VariationFactor } from '../types'

export const petroleo: VariationFactor[] = [
  {
    scope: 'global',
    period: 'week',
    factors: [
      'Tensões geopolíticas no Oriente Médio elevaram o prêmio de risco do Brent',
      'Relatório semanal EIA/API mostrou queda nos estoques de petróleo nos EUA',
      'Fed manteve tom hawkish, fortalecendo o dólar e pressionando commodities em USD',
      'Produção da OPEP+ permaneceu dentro das cotas acordadas para o trimestre',
    ],
  },
  {
    scope: 'brazil',
    period: 'week',
    factors: [
      'Petrobras manteve a política de paridade de importação (PPI) sem reajuste',
      'Demanda interna por combustíveis seguiu sazonalidade típica do período',
      'Câmbio BRL/USD oscilou entre R$5,10–5,25, amortecendo parte da variação externa',
    ],
  },
  {
    scope: 'global',
    period: 'month',
    factors: [
      'Demanda chinesa por petróleo surpreendeu positivamente, com importações acima de 11 mb/d',
      'IEA revisou para cima projeção de demanda global em 2025 (+1,3 mb/d)',
      'Conflitos no Mar Vermelho mantiveram rota do Suez sob pressão, elevando fretes',
      'EUA elevaram produção de shale para 13,3 mb/d, limitando o rally de preços',
      'Decisão da OPEP+ de manter cortes de 2,2 mb/d até o final do trimestre',
    ],
  },
  {
    scope: 'brazil',
    period: 'month',
    factors: [
      'Safra de cana-de-açúcar 2025/26 com boa perspectiva amplia oferta de etanol, competindo com gasolina',
      'Exportações de petróleo pré-sal mantiveram fluxo regular pelo porto de Santos',
      'Aneel sinalizou revisão tarifária que pode elevar custos energéticos do refino',
    ],
  },
]

export const soja: VariationFactor[] = [
  {
    scope: 'global',
    period: 'week',
    factors: [
      'USDA Weekly Export Sales acima do esperado para soja americana da safra 2024/25',
      'La Niña perdendo força no sul do Brasil gerou alívio nas previsões de colheita',
      'Exportações da Argentina retomaram após resolução temporária de greve portuária',
      'Dólar índice (DXY) avançou 0,4%, pesando sobre cotações em cents/bushel no CBOT',
    ],
  },
  {
    scope: 'brazil',
    period: 'week',
    factors: [
      'Colheita no RS e PR avançou para 78% da área plantada, acima da média histórica',
      'Basis FOB Paranaguá recuou 20 cts/bushel com elevada oferta no porto',
      'Demanda de esmagadoras internas manteve-se firme, sustentando preço CEPEA acima de R$105/saca',
    ],
  },
  {
    scope: 'global',
    period: 'month',
    factors: [
      'Safra brasileira 2024/25 estimada em 169 mt pela CONAB, pressionando futuros no CBOT',
      'China realizou compras antecipadas para 2025/26 totalizando 3,2 mt em março',
      'Custos de frete Panamax para o Golfo do México subiram 8% no mês',
      'Argentina reduziu alíquota de exportação, tornando a soja local mais competitiva',
    ],
  },
  {
    scope: 'brazil',
    period: 'month',
    factors: [
      'CEPEA apurou queda acumulada de 4,2% no mês, reflexo de oferta abundante em MT',
      'Hedge cambial das tradings elevou pressão vendedora no mercado físico',
      'Custo de armazenagem em Mato Grosso subiu com silos cheios, reduzindo prêmio ao produtor',
      'CONAB confirmou recorde de produção para 2024/25, mantendo pressão baixista',
    ],
  },
]

export const milho: VariationFactor[] = [
  {
    scope: 'global',
    period: 'week',
    factors: [
      'Relatório USDA WASDE manteve estoques finais globais inalterados em 315 mt',
      'Demanda de etanol de milho nos EUA seguiu sazonal, com processamento em 105 mb/semana',
      'Argentina projeta colheita 2024/25 de 50 mt, aliviando tensão de oferta sul-americana',
    ],
  },
  {
    scope: 'brazil',
    period: 'week',
    factors: [
      'Segunda safra (safrinha) no MT e MS em desenvolvimento sem estresse hídrico relevante',
      'Exportações pelo corredor Centro-Oeste/Porto de Santos superaram 1,2 mt na semana',
      'Indústria de rações (suínos/aves) manteve demanda constante, sustentando basis local',
    ],
  },
  {
    scope: 'global',
    period: 'month',
    factors: [
      'Conflito Rússia-Ucrânia mantém incerteza sobre exportações do corredor do Mar Negro',
      'Biocombustíveis europeus elevaram demanda por milho como matéria-prima (+5% a/a)',
      'Produção americana estimada em 383 mt para 2025/26, limitando potencial de alta',
      'Ucrânia reabriu terminal de Odessa, elevando oferta global e pressionando preços',
    ],
  },
  {
    scope: 'brazil',
    period: 'month',
    factors: [
      'CONAB revisou projeção da safrinha para 97 mt, recorde histórico, pesando nos preços B3',
      'Fretes rodoviários caíram 6% com maior disponibilidade de caminhoneiros pós-carnaval',
      'Câmbio desvalorizado favoreceu exportações, reduzindo oferta doméstica e sustentando preço interno',
      'Demanda de suinocultura e avicultura cresceu 3% no trimestre, sustentando consumo interno',
    ],
  },
]

export const acucar: VariationFactor[] = [
  {
    scope: 'global',
    period: 'week',
    factors: [
      'Preocupações com déficit de oferta global 2024/25 sustentaram SB=F acima de 19 cts/lb',
      'Chuvas excessivas em Maharashtra (Índia) atrasaram início da safra canavieira local',
      'Real se apreciou levemente, tornando açúcar brasileiro mais competitivo no mercado FOB',
    ],
  },
  {
    scope: 'brazil',
    period: 'week',
    factors: [
      'Centro-Sul encerrou a safra 2024/25 com produção de 44 mt, em linha com projeções UNICA',
      'Início do período entressafra reduziu oferta spot, sustentando prêmio CEPEA/NY',
      'Exportações via Santos movimentaram 210 mil t na semana, acima da média histórica',
    ],
  },
  {
    scope: 'global',
    period: 'month',
    factors: [
      'USDA projetou déficit global de 2,3 mt para 2024/25, revisão altista frente ao mês anterior',
      'Tailândia reportou queda de 15% na produção acumulada da safra atual',
      'Volatilidade cambial em mercados emergentes produtores (BRL, INR, THB) afetou precificação',
      'Fundo soberano árabe aumentou posições compradas em açúcar nos mercados futuros',
    ],
  },
  {
    scope: 'brazil',
    period: 'month',
    factors: [
      'Mix açúcar/etanol da safra 2025/26 deve pender para etanol dado preço favorável da commodity',
      'Custo de produção no Centro-Sul subiu 5% a/a com fertilizantes e energia, elevando suporte',
      'Estiagem no interior de SP e MG em fevereiro reduziu estimativas de moagem para 2025/26',
    ],
  },
]

export const etanol: VariationFactor[] = [
  {
    scope: 'global',
    period: 'week',
    factors: [
      'Petróleo em recuo reduziu competitividade do etanol frente à gasolina nos EUA',
      'EPA manteve volumes obrigatórios de RFS (Renewable Fuel Standard) sem alteração',
      'Exportações brasileiras de etanol para os EUA foram de 120 mil m³ na quinzena',
    ],
  },
  {
    scope: 'brazil',
    period: 'week',
    factors: [
      'Estoques de etanol hidratado nos centros distribuidores estavam abaixo da média sazonal',
      'Demanda da frota flex mantida por paridade etanol/gasolina favorável (abaixo de 70%)',
      'ANP registrou preço médio da bomba do etanol a R$3,42/l nas regiões produtoras',
    ],
  },
  {
    scope: 'global',
    period: 'month',
    factors: [
      'Acordo bilateral Brasil-EUA para biocombustíveis avançou na OMC',
      'Demanda por SAF (Sustainable Aviation Fuel) a base de cana cresceu 18% a/a',
      'Preços do petróleo pressionados reduziram expansão dos spreads etanol vs gasolina',
      'Europa sinalizou revisão das metas de biocombustíveis para 2030, impactando demanda global',
    ],
  },
  {
    scope: 'brazil',
    period: 'month',
    factors: [
      'Safra cana 2025/26 com previsão de moagem acima de 600 mt pelo Datagro',
      'ANP elevou teor obrigatório de anidro na gasolina de 27% para 30%, ampliando demanda',
      'Margens das usinas melhoraram com alta do açúcar, competindo pelo mix de produção',
      'Programa RenovaBio atingiu meta de emissão de CBIOs, sinalizando demanda estrutural firme',
    ],
  },
]
