
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import type { ReactNode } from 'react'

import type { Client } from '../types/invoice'

import { clients as initialClients } from '../data/mockData'

interface ClientContextType {
  clients: Client[]
  addClient: (client: Omit<Client, 'id'>) => void
  updateClient: (client: Client) => void
  deleteClient: (id: number) => void
  getClientById: (id: number) => Client | undefined
}

const ClientContext = createContext<ClientContextType | undefined>(
  undefined
)

interface ClientProviderProps {
  children: ReactNode
}

export function ClientProvider({ children }: ClientProviderProps) {

  const [clients, setClients] = useState<Client[]>(() => {
    try {
      const stored = localStorage.getItem('gsa_clients')

      return stored
        ? JSON.parse(stored) as Client[]
        : initialClients
    } catch {
      return initialClients
    }
  })

  useEffect(() => {
    localStorage.setItem('gsa_clients', JSON.stringify(clients))
  }, [clients])

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now(),
    }

    setClients((current) => [...current, newClient])
  }

  const updateClient = (updatedClient: Client) => {
    setClients((current) =>
      current.map((client) =>
        client.id === updatedClient.id
          ? updatedClient
          : client
      )
    )
  }

  const deleteClient = (id: number) => {
    setClients((current) =>
      current.filter((client) => client.id !== id)
    )
  }

  const getClientById = (id: number) => {
    return clients.find((client) => client.id === id)
  }

  return (
    <ClientContext.Provider
      value={{
        clients,
        addClient,
        updateClient,
        deleteClient,
        getClientById,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export function useClients() {
  const context = useContext(ClientContext)

  if (!context) {
    throw new Error(
      'useClients deve ser utilizado dentro de ClientProvider'
    )
  }

  return context
}
