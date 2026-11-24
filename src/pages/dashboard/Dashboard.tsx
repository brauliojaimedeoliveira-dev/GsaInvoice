
import {
  Wallet,
  FileText,
  Users,
  Clock,
  Plus,
  ArrowUpRight,
  MoreHorizontal,
} from 'lucide-react'

import StatCard from '../../components/ui/StatCard'

const invoices = [
  {
    id: 'FAT-2026-001',
    client: 'Empresa Alpha, Lda.',
    date: '24/11/2026',
    amount: '350.000 Kz',
    status: 'Pago',
  },
  {
    id: 'FAT-2026-002',
    client: 'Comercial Beta',
    date: '23/11/2026',
    amount: '180.000 Kz',
    status: 'Pendente',
  },
  {
    id: 'FAT-2026-003',
    client: 'Grupo Omega',
    date: '22/11/2026',
    amount: '520.000 Kz',
    status: 'Pago',
  },
  {
    id: 'FAT-2026-004',
    client: 'Tecnologia Plus',
    date: '21/11/2026',
    amount: '95.000 Kz',
    status: 'Atrasado',
  },
]

const chartData = [
  { month: 'Jan', value: 45 },
  { month: 'Fev', value: 65 },
  { month: 'Mar', value: 55 },
  { month: 'Abr', value: 80 },
  { month: 'Mai', value: 60 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: 72 },
  { month: 'Ago', value: 85 },
  { month: 'Set', value: 58 },
  { month: 'Out', value: 95 },
  { month: 'Nov', value: 75 },
  { month: 'Dez', value: 88 },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* CABEÇALHO DO DASHBOARD */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Acompanhe o desempenho financeiro da sua empresa.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700">
          <Plus size={19} />
          Nova fatura
        </button>

      </div>

      {/* INDICADORES */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total faturado"
          value="2.450.000 Kz"
          description="vs. mês anterior"
          icon={Wallet}
          trend={12.5}
          color="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Faturas emitidas"
          value="128"
          description="vs. mês anterior"
          icon={FileText}
          trend={8.2}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Total de clientes"
          value="86"
          description="vs. mês anterior"
          icon={Users}
          trend={5.4}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Faturas pendentes"
          value="15"
          description="vs. mês anterior"
          icon={Clock}
          trend={-3.2}
          color="bg-orange-100 text-orange-600"
        />

      </section>

      {/* GRÁFICO E RESUMO */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* GRÁFICO */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">
                Desempenho financeiro
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Evolução mensal da faturação
              </p>
            </div>

            <select
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none focus:border-purple-500"
              defaultValue="2026"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div className="flex h-64 items-end justify-between gap-2 border-b border-gray-100 px-1">

            {chartData.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <div
                  className="w-full max-w-10 rounded-t-lg bg-purple-500 transition-all duration-300 hover:bg-purple-700"
                  style={{ height: `${item.value}%` }}
                  title={`${item.month}: ${item.value}%`}
                />

                <span className="text-[10px] text-gray-400">
                  {item.month}
                </span>
              </div>
            ))}

          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
            Volume de faturação (dados demonstrativos)
          </div>

        </div>

        {/* RESUMO */}
        <div className="rounded-2xl bg-[#100D18] p-6 text-white shadow-sm">

          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              Resumo financeiro
            </h2>

            <MoreHorizontal size={22} className="text-gray-400" />
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Total recebido
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            1.850.000
            <span className="ml-1 text-sm text-purple-400">
              Kz
            </span>
          </h3>

          <div className="my-7 h-px bg-white/10" />

          <div className="space-y-6">

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Por receber
              </span>

              <span className="font-semibold">
                450.000 Kz
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Faturas atrasadas
              </span>

              <span className="font-semibold text-orange-400">
                150.000 Kz
              </span>
            </div>

          </div>

          <button className="mt-9 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold transition hover:bg-purple-700">
            Ver relatórios
            <ArrowUpRight size={17} />
          </button>

        </div>

      </section>

      {/* TABELA DE FATURAS */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-6 sm:flex-row sm:items-center">

          <div>
            <h2 className="font-bold text-gray-900">
              Faturas recentes
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Acompanhe as últimas faturas da empresa.
            </p>
          </div>

          <button className="text-sm font-semibold text-purple-600 hover:text-purple-800">
            Ver todas
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] text-left">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  Nº DA FATURA
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  CLIENTE
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  DATA
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  VALOR
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                  ESTADO
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="transition hover:bg-gray-50"
                >

                  <td className="px-6 py-5 text-sm font-semibold text-purple-600">
                    {invoice.id}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-700">
                    {invoice.client}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-500">
                    {invoice.date}
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-gray-800">
                    {invoice.amount}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        invoice.status === 'Pago'
                          ? 'bg-green-50 text-green-600'
                          : invoice.status === 'Pendente'
                            ? 'bg-yellow-50 text-yellow-600'
                            : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {invoice.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  )
}
