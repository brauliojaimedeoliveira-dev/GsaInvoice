
import { useMemo, useState } from 'react'
import {
  Plus,
  Search,
  Package,
  Pencil,
  Trash2,
  X
} from 'lucide-react'

import { useProducts } from '../../context/ProductContext'
import type { Product } from '../../types/product'
import ProductForm from '../../components/products/ProductForm'

export default function Products() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts()

  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] =
    useState<Product | undefined>()

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      `${product.name} ${product.code}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [products, search])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      maximumFractionDigits: 2
    }).format(value)
  }

  const handleSubmit = (values: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProduct({
        ...values,
        id: editingProduct.id
      })
    } else {
      addProduct(values)
    }

    setShowForm(false)
    setEditingProduct(undefined)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      'Tem a certeza de que pretende eliminar este produto?'
    )

    if (confirmed) deleteProduct(id)
  }

  const openNewForm = () => {
    setEditingProduct(undefined)
    setShowForm(true)
  }

  return (
    <div className="space-y-6 p-6">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Produtos e Serviços
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie os produtos e serviços da empresa.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
        >
          <Plus size={18} />
          Novo produto
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <p className="text-sm text-slate-500">Total de registos</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {products.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <p className="text-sm text-slate-500">Produtos</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {products.filter(p => p.type === 'Produto').length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <p className="text-sm text-slate-500">Serviços</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {products.filter(p => p.type === 'Serviço').length}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5">

        <div className="relative mb-5 max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Pesquisar produto ou código..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase text-slate-400">
                <th className="px-4 py-4">Produto</th>
                <th className="px-4 py-4">Código</th>
                <th className="px-4 py-4">Tipo</th>
                <th className="px-4 py-4">Preço</th>
                <th className="px-4 py-4">Estado</th>
                <th className="px-4 py-4 text-right">Acções</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map(product => (
                <tr
                  key={product.id}
                  className="border-b border-slate-50 hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-violet-50 p-2 text-violet-600">
                        <Package size={19} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {product.unit}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">
                    {product.code}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-600">
                    {product.type}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                    {formatCurrency(product.price)}
                  </td>

                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      product.status === 'Activo'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {product.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        title="Editar"
                        className="rounded-lg p-2 text-slate-500 hover:bg-violet-50 hover:text-violet-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        title="Eliminar"
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-sm text-slate-400"
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingProduct ? 'Editar produto' : 'Novo produto'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Preencha os dados do registo.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(undefined)
                }}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Fechar formulário"
              >
                <X size={20} />
              </button>
            </div>

            <ProductForm
              initialData={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false)
                setEditingProduct(undefined)
              }}
            />
          </div>
        </div>
      )}

    </div>
  )
}
