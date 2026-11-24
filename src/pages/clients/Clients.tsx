
import { useMemo, useState } from 'react'

import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserRoundPlus,
  Eye,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'

import { useClients } from '../../context/ClientContext'

import ClientForm from './ClientForm'
import ClientDetails from './ClientDetails'

import type { Client } from '../../types/invoice'

export default function Clients() {

  const {
    clients,
    addClient,
    updateClient,
    deleteClient,
  } = useClients()

  const [showForm, setShowForm] = useState(false)

  const [editingClient, setEditingClient] =
    useState<Client | null>(null)

  const [selectedClient, setSelectedClient] =
    useState<Client | null>(null)

  const [search, setSearch] = useState('')

  const filteredClients = useMemo(() => {
    const value = search.toLowerCase()

    return clients.filter((client) =>
      client.name.toLowerCase().includes(value) ||
      client.nif.toLowerCase().includes(value) ||
      client.email.toLowerCase().includes(value)
    )
  }, [clients, search])

  const handleNewClient = () => {
    setEditingClient(null)
    setShowForm(true)
  }

  const handleEditClient = (client: Client) => {
    setEditingClient(client)
    setShowForm(true)
  }

  const handleSaveClient = (
    values: Omit<Client, 'id'>
  ) => {

    if (editingClient) {
      updateClient({
        ...values,
        id: editingClient.id,
      })
    } else {
      addClient(values)
    }

    setShowForm(false)
    setEditingClient(null)
  }

  const handleDeleteClient = (client: Client) => {

    const confirmed = window.confirm(
      `Tens a certeza de que pretendes eliminar ${client.name}?`
    )

    if (!confirmed) return

    deleteClient(client.id)
  }

  if (showForm) {
    return (
      <div className="space-y-6">

        <div>
          <button
            onClick={() => setShowForm(false)}
            className="mb-4 text-sm font-semibold text-purple-600 hover:text-purple-800"
          >
            ← Voltar aos clientes
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            {editingClient ? 'Editar cliente' : 'Novo cliente'}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {editingClient
              ? 'Atualize os dados cadastrais do cliente.'
              : 'Preencha os dados para cadastrar um novo cliente.'
            }
          </p>
        </div>

        <ClientForm
          key={editingClient?.id ?? 'new-client'}
          initialData={editingClient || undefined}
          onSubmit={handleSaveClient}
          onCancel={() => setShowForm(false)}
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
            Gestão de clientes
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Cadastre, consulte e faça a gestão dos seus clientes.
          </p>
        </div>

        <button
          onClick={handleNewClient}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700"
        >
          <Plus size={19} />
          Novo cliente
        </button>

      </div>

      {/* INDICADORES */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Total de clientes
            </p>

            <Users className="text-purple-500" />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {clients.length}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Clientes registados
          </p>

        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Clientes com e-mail
            </p>

            <UserCheck className="text-green-500" />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {clients.filter((client) => client.email).length}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Contactos registados
          </p>

        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Novos clientes
            </p>

            <UserRoundPlus className="text-blue-500" />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {clients.length}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Registos disponíveis nesta demonstração
          </p>

        </div>

      </section>

      {/* LISTAGEM */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center">

          <div>
            <h2 className="font-bold text-gray-900">
              Lista de clientes
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Consulte todos os clientes cadastrados.
            </p>
          </div>

          <div className="relative w-full md:w-80">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar por nome, NIF ou e-mail..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500"
            />

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px] text-left">

            <thead className="bg-gray-50">
              <tr>
                {[
                  'CLIENTE',
                  'NIF',
                  'E-MAIL',
                  'TELEFONE',
                  'ENDEREÇO',
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

              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="transition hover:bg-gray-50"
                >

                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-purple-600">
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>

                      <span className="text-sm font-semibold text-gray-800">
                        {client.name}
                      </span>

                    </div>
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-600">
                    {client.nif}
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-600">
                    {client.email}
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-600">
                    {client.phone || '—'}
                  </td>

                  <td className="px-5 py-5 text-sm text-gray-600">
                    {client.address}
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex items-center gap-1">

                      <button
                        title="Ver detalhes"
                        onClick={() => setSelectedClient(client)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-purple-50 hover:text-purple-600"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Editar cliente"
                        onClick={() => handleEditClient(client)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        title="Eliminar cliente"
                        onClick={() => handleDeleteClient(client)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

              {filteredClients.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">

                      <Search
                        size={30}
                        className="text-gray-300"
                      />

                      <p className="text-sm text-gray-500">
                        Nenhum cliente encontrado.
                      </p>

                      {search && (
                        <button
                          onClick={() => setSearch('')}
                          className="text-xs font-semibold text-purple-600"
                        >
                          Limpar pesquisa
                        </button>
                      )}

                    </div>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
          A apresentar {filteredClients.length} de {clients.length} clientes.
        </div>

      </section>

      {/* DETALHES */}
      {selectedClient && (
        <ClientDetails
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}

    </div>
  )
}
