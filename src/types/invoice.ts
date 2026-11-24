

export interface Client {
  id: number
  name: string
  nif: string
  email: string
  phone?: string
  address: string
}


export interface Product {
  id: number
  name: string
  description: string
  price: number
}

export interface InvoiceItem {
  productId: number | ''
  description: string
  quantity: number
  unitPrice: number
  discount: number
  taxRate: number
}

export interface InvoiceValues {
  clientId: number | ''
  invoiceNumber: string
  issueDate: string
  dueDate: string
  notes: string
  items: InvoiceItem[]
}

export interface Invoice {
  id: number
  invoiceNumber: string
  clientName: string
  issueDate: string
  dueDate: string
  total: number
  status: 'Pago' | 'Pendente' | 'Atrasado'
}
