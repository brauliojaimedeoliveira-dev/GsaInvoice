import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import type { ReactNode } from 'react'
import type { Product } from '../types/product'
import { products as initialProducts } from '../data/mockData'

interface ProductContextType {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: number) => void
  getProductById: (id: number) => Product | undefined
}

const ProductContext = createContext<ProductContextType | undefined>(
  undefined
)

interface ProductProviderProps {
  children: ReactNode
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('gsa_products')

      return stored
        ? JSON.parse(stored) as Product[]
        : initialProducts
    } catch {
      return initialProducts
    }
  })

  useEffect(() => {
    localStorage.setItem('gsa_products', JSON.stringify(products))
  }, [products])

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now()
    }

    setProducts(current => [...current, newProduct])
  }

  const updateProduct = (updatedProduct: Product) => {
    setProducts(current =>
      current.map(product =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    )
  }

  const deleteProduct = (id: number) => {
    setProducts(current =>
      current.filter(product => product.id !== id)
    )
  }

  const getProductById = (id: number) => {
    return products.find(product => product.id === id)
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error(
      'useProducts deve ser utilizado dentro de ProductProvider'
    )
  }

  return context
}