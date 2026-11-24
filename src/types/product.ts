export interface Product {
  id: number
  name: string
  code: string
  description: string
  type: 'Produto' | 'Serviço'
  price: number
  unit: string
  status: 'Activo' | 'Inactivo'
}