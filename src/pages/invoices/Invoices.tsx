import { useMemo, useState } from 'react'

import {
  Plus,
  Search,
  FileText,
  Eye,
  Pencil,
  Filter,
} from 'lucide-react'

import InvoiceForm from './InvoiceForm'

import { useClients } from '../../context/ClientContext'

import type {
  Invoice,
  InvoiceValues,
} from '../../types/invoice'



const initialInvoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: 'FT 2026/001',
    clientName: 'Empresa Alpha, Lda.',
    issueDate: '2026-11-20',
    dueDate: '2026-11-30',
    total: 350000,
    status: 'Pago',
  },
  {
    id: 2,
    invoiceNumber: 'FT 2026/002',
    clientName: 'Comercial Beta',
    issueDate: '2026-11-21',
    dueDate: '2026-11-28',
    total: 180000,
    status: 'Pendente',
  },
  {
    id: 3,
    invoiceNumber: 'FT 2026/003',
    clientName: 'Grupo Omega',
    issueDate: '2026-11-22',
    dueDate: '2026-11-25',
    total: 520000,
    status: 'Atrasado',
  },
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    maximumFractionDigits: 2,
  }).format(value)

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('pt-AO').format(
    new Date(`${date}T12:00:00`)
  )

export default function Invoices() {

    const { clients } = useClients()

  const [invoices, setInvoices] =
    useState<Invoice[]>(initialInvoices)

  const [showForm, setShowForm] = useState(false)

  const [search, setSearch] = useState('')

  const nextInvoiceNumber =
    `FT ${new Date().getFullYear()}/${String(invoices.length + 1).padStart(3, '0')}`

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const searchValue = search.toLowerCase()

      return (
        invoice.invoiceNumber.toLowerCase().includes(searchValue) ||
        invoice.clientName.toLowerCase().includes(searchValue)
      )
    })
  }, [invoices, search])

  const handleSaveInvoice = (values: InvoiceValues) => {

    const client = clients.find(
      (item) => item.id === Number(values.clientId)
    )

    if (!client) return

    const total = values.items.reduce((acc, item) => {
      const subtotal = item.quantity * item.unitPrice

      const discount = subtotal * item.discount / 100

      const taxableAmount = subtotal - discount

      const tax = taxableAmount * item.taxRate / 100

      return acc + taxableAmount + tax
    }, 0)

    const newInvoice: Invoice = {
      id: Date.now(),
      invoiceNumber: values.invoiceNumber,
      clientName: client.name,
      issueDate: values.issueDate,
      dueDate: values.dueDate,
      total,
      status: 'Pendente',
    }

    setInvoices((current) => [
      newInvoice,
      ...current,
    ])

    setShowForm(false)
  }

  const getStatusStyle = (status: Invoice['status']) => {
    const styles = {
      Pago: 'bg-green-50 text-green-600',
      Pendente: 'bg-yellow-50 text-yellow-700',
      Atrasado: 'bg-red-50 text-red-600',
    }

    return styles[status]
  }

  if (showForm) {
    return (
      <div className="space-y-6">

        <div>
          <button
            onClick={() => setShowForm(false)}
            className="mb-4 text-sm font-semibold text-purple-600 hover:text-purple-800"
          >
            ← Voltar às faturas
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            Nova fatura
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Preencha os dados para registar uma nova fatura.
          </p>
        </div>

        <InvoiceForm
        key={nextInvoiceNumber}
        invoiceNumber={nextInvoiceNumber}
        clients={clients}
        onCancel={() => setShowForm(false)}
        onSave={handleSaveInvoice}
        />

      </div>
    )
  }

  return (
    <div className="space-y-7">

      {/* CABEÇALHO */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Faturação
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Consulte e faça a gestão das faturas da empresa.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700"
        >
          <Plus size={19} />
          Nova fatura
        </button>

      </div>

      {/* INDICADORES */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Total de faturas
            </p>

            <FileText className="text-purple-500" />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {invoices.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Faturas pagas
          </p>

          <h2 className="mt-4 text-2xl font-bold text-green-600">
            {invoices.filter((i) => i.status === 'Pago').length}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Faturas pendentes
          </p>

          <h2 className="mt-4 text-2xl font-bold text-orange-500">
            {invoices.filter((i) => i.status === 'Pendente').length}
          </h2>
        </div>

      </div>

      {/* TABELA */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center">

          <div>
            <h2 className="font-bold text-gray-900">
              Todas as faturas
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Consulte os documentos registados.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <div className="relative min-w-0 flex-1 md:w-64">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Pesquisar fatura..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setSearch('')}
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
            >
              <Filter size={17} />
              Limpar
            </button>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px] text-left">

            <thead className="bg-gray-50">
              <tr>
                {[
                  'Nº DOCUMENTO',
                  'CLIENTE',
                  'EMISSÃO',
                  'VENCIMENTO',
                  'VALOR TOTAL',
                  'ESTADO',
                  'AÇÕES',
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-xs font-semibold text-gray-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="transition hover:bg-gray-50"
                >

                  <td className="px-5 py-5 text-sm font-bold text-purple-600">
                    {invoice.invoiceNumber}
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-700">
                    {invoice.clientName}
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-500">
                    {formatDate(invoice.issueDate)}
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-500">
                    {formatDate(invoice.dueDate)}
                  </td>

                  <td className="px-5 py-5 text-sm font-bold text-gray-800">
                    {formatCurrency(invoice.total)}
                  </td>

                  <td className="px-5 py-5">
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">

                      <button
                        title="Visualizar"
                        className="rounded-lg p-2 text-gray-500 hover:bg-purple-50 hover:text-purple-600"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Editar"
                        className="rounded-lg p-2 text-gray-500 hover:bg-purple-50 hover:text-purple-600"
                      >
                        <Pencil size={17} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

              {filteredInvoices.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-gray-400"
                  >
                    Nenhuma fatura encontrada.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
          A apresentar {filteredInvoices.length} de {invoices.length} faturas.
        </div>

      </div>

    </div>
  )
}