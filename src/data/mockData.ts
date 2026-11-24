
import type { Client } from '../types/invoice'
import type { Product } from '../types/product'

export const clients: Client[] = [
  {
    id: 1,
    name: 'Empresa Alpha, Lda.',
    nif: '5000123456',
    email: 'geral@alpha.ao',
    address: 'Luanda, Angola',
  },
  {
    id: 2,
    name: 'Comercial Beta',
    nif: '5000654321',
    email: 'comercial@beta.ao',
    address: 'Talatona, Luanda',
  },
  {
    id: 3,
    name: 'Grupo Omega',
    nif: '5000987654',
    email: 'contacto@omega.ao',
    address: 'Viana, Luanda',
  },
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Computador HP',
    code: 'PROD-001',
    description: 'Computador portátil HP',
    type: 'Produto',
    price: 450000,
    unit: 'Unidade',
    status: 'Activo'
  },
  {
    id: 2,
    name: 'Desenvolvimento Web',
    code: 'SERV-001',
    description: 'Criação de websites e aplicações',
    type: 'Serviço',
    price: 250000,
    unit: 'Serviço',
    status: 'Activo'
  },
  {
    id: 3,
    name: 'Manutenção Informática',
    code: 'SERV-002',
    description: 'Manutenção de equipamentos informáticos',
    type: 'Serviço',
    price: 35000,
    unit: 'Serviço',
    status: 'Activo'
  }
]
