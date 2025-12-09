import { TrendingUp } from 'lucide-react'

export function TotalVisits() {
  return (
    <div className="bg-background-secondary border-border-primary flex items-center gap-5 rounded-xl border px-8 py-3 whitespace-nowrap shadow-lg">
      <span className="font-bold text-white">Total de visistas</span>

      <div className="text-accent-green flex items-center gap-2">
        <span className="text-3xl font-bold">12345</span>

        <TrendingUp />
      </div>

      {/* <div className="flex items-center gap-2">
        <button>Portal</button>

        <button>Sair</button>
      </div> */}
    </div>
  )
}
