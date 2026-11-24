
import {
  X,
  UserRound,
  Hash,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

import type { Client } from '../../types/invoice'

interface ClientDetailsProps {
  client: Client
  onClose: () => void
}

export default function ClientDetails({
  client,
  onClose,
}: ClientDetailsProps) {

  const details = [
    {
      label: 'Nome do cliente',
      value: client.name,
      icon: UserRound,
    },
    {
      label: 'NIF',
      value: client.nif,
      icon: Hash,
    },
    {
      label: 'E-mail',
      value: client.email,
      icon: Mail,
    },
    {
      label: 'Telefone',
      value: client.phone || 'Não informado',
      icon: Phone,
    },
    {
      label: 'Endereço',
      value: client.address,
      icon: MapPin,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

        <div className="mb-7 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Detalhes do cliente
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Informações cadastrais
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>

        </div>

        <div className="mb-7 flex items-center gap-4 rounded-xl bg-purple-50 p-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-xl font-bold text-white">
            {client.name.substring(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-bold text-gray-900">
              {client.name}
            </h3>

            <p className="text-xs text-purple-600">
              Cliente cadastrado
            </p>
          </div>

        </div>

        <div className="space-y-5">

          {details.map((detail) => {
            const Icon = detail.icon

            return (
              <div key={detail.label} className="flex gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                  <Icon size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-400">
                    {detail.label}
                  </p>

                  <p className="break-words text-sm font-semibold text-gray-800">
                    {detail.value}
                  </p>
                </div>

              </div>
            )
          })}

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          Fechar detalhes
        </button>

      </div>

    </div>
  )
}
