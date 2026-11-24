
import type { LucideIcon } from 'lucide-react'
import { TrendingDown, TrendingUp } from 'lucide-react'

interface StatCardProps {
  title: "Total faturado"
  value: "2.450.000 Kz"
  description: "Comparação mensal"
  icon: LucideIcon
  trend: 12
  color: "bg-purple-100 text-purple-600"
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  color,
}: StatCardProps) {

  const isPositive = trend >= 0

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={23} />
        </div>

      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">

        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            isPositive
              ? 'bg-green-50 text-green-600'
              : 'bg-red-50 text-red-600'
          }`}
        >
          {isPositive ? (
            <TrendingUp size={13} />
          ) : (
            <TrendingDown size={13} />
          )}

          {Math.abs(trend)}%
        </span>

        <span className="text-xs text-gray-400">
          {description}
        </span>

      </div>

    </div>
  )
}
