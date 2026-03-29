export function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-12 px-4 py-6">
      <div className="max-w-7xl mx-auto text-center space-y-1">
        <p className="text-xs text-slate-500">
          <span className="text-amber-500 font-medium">Aviso:</span>{' '}
          Os dados exibidos são simulados com base nas faixas históricas reais de 2024–2025
          (Brent/ICE, CBOT, CEPEA, B3) e têm fins exclusivamente ilustrativos.
        </p>
        <p className="text-xs text-slate-600">
          Para dados em tempo real, consulte CEPEA/ESALQ, B3, CME Group e ICE Futures.
        </p>
      </div>
    </footer>
  )
}
