
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import {
  Plus,
  Trash2,
  FileText,
  Calculator,
  Save,
} from 'lucide-react'

import { products } from '../../data/mockData'
import type { Client } from '../../types/invoice'

import type {
  InvoiceValues,
  InvoiceItem,
} from '../../types/invoice'

interface InvoiceFormProps {
  invoiceNumber: string
  clients: Client[]
  onCancel: () => void
  onSave: (values: InvoiceValues) => void
}

const initialValues: InvoiceValues = {
  clientId: '',
  invoiceNumber: `FT ${new Date().getFullYear()}/001`,
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  notes: '',
  items: [
    {
      productId: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      taxRate: 14,
    },
  ],
}

const validationSchema = Yup.object({
  clientId: Yup.number()
    .required('Selecione um cliente'),

  invoiceNumber: Yup.string()
    .required('O número da fatura é obrigatório'),

  issueDate: Yup.string()
    .required('A data de emissão é obrigatória'),

  dueDate: Yup.string()
    .required('A data de vencimento é obrigatória')
    .test(
      'valid-due-date',
      'O vencimento não pode ser anterior à emissão',
      function (value) {
        return !value || !this.parent.issueDate ||
          value >= this.parent.issueDate
      }
    ),

  items: Yup.array()
    .of(
      Yup.object({
        productId: Yup.number()
          .required('Selecione um produto'),

        description: Yup.string()
          .required('A descrição é obrigatória'),

        quantity: Yup.number()
          .min(1, 'A quantidade mínima é 1')
          .required('Introduza a quantidade'),

        unitPrice: Yup.number()
          .min(0, 'O preço não pode ser negativo')
          .required('Introduza o preço'),

        discount: Yup.number()
          .min(0, 'O desconto não pode ser negativo')
          .max(100, 'O desconto máximo é 100%')
          .required(),

        taxRate: Yup.number()
          .min(0, 'A taxa não pode ser negativa')
          .max(100, 'A taxa não pode ultrapassar 100%')
          .required(),
      })
    )
    .min(1, 'Adicione pelo menos um produto'),
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    maximumFractionDigits: 2,
  }).format(value)
}

export default function InvoiceForm({
  invoiceNumber,
  clients,
  onCancel,
  onSave,
}: InvoiceFormProps) {

  const calculateItem = (item: InvoiceItem) => {
    const subtotal = item.quantity * item.unitPrice

    const discountValue =
      subtotal * (item.discount / 100)

    const taxableAmount = subtotal - discountValue

    const taxValue =
      taxableAmount * (item.taxRate / 100)

    return {
      subtotal,
      discountValue,
      taxValue,
      total: taxableAmount + taxValue,
    }
  }

  return (
    <Formik
      initialValues={{ ...initialValues, invoiceNumber }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSave(values)}
    >
      {({ values, setFieldValue }) => {

        const totals = values.items.reduce(
          (acc, item) => {
            const result = calculateItem(item)

            return {
              subtotal: acc.subtotal + result.subtotal,
              discount: acc.discount + result.discountValue,
              tax: acc.tax + result.taxValue,
              total: acc.total + result.total,
            }
          },
          {
            subtotal: 0,
            discount: 0,
            tax: 0,
            total: 0,
          }
        )

        return (
          <Form className="space-y-7">

            {/* IDENTIFICAÇÃO */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                  <FileText size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Informações da fatura
                  </h2>

                  <p className="text-xs text-gray-400">
                    Identificação e dados do documento
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Número da fatura
                  </label>

                  <Field
                    name="invoiceNumber"
                    readOnly
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-600 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Cliente *
                  </label>

                  <Field
                    as="select"
                    name="clientId"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500"
                  >
                    <option value="">Selecionar cliente</option>

                    {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                    {client.name}
                    </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="clientId"
                    component="p"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Data de emissão *
                  </label>

                  <Field
                    name="issueDate"
                    type="date"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Data de vencimento *
                  </label>

                  <Field
                    name="dueDate"
                    type="date"
                    min={values.issueDate}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                  />

                  <ErrorMessage
                    name="dueDate"
                    component="p"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

              </div>
            </div>

            {/* PRODUTOS */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>
                  <h2 className="font-bold text-gray-900">
                    Produtos e serviços
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Adicione os artigos que pretende faturar.
                  </p>
                </div>

              </div>

              <FieldArray name="items">
                {({ push, remove }) => (
                  <div className="space-y-6">

                    {values.items.map((item, index) => {

                      const result = calculateItem(item)

                      return (
                        <div
                          key={index}
                          className="rounded-xl border border-gray-200 p-4"
                        >

                          <div className="mb-5 flex items-center justify-between">

                            <h3 className="text-sm font-bold text-purple-600">
                              Artigo #{index + 1}
                            </h3>

                            <button
                              type="button"
                              disabled={values.items.length === 1}
                              onClick={() => remove(index)}
                              className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label="Remover artigo"
                            >
                              <Trash2 size={18} />
                            </button>

                          </div>

                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            {/* PRODUTO */}
                            <div className="md:col-span-2">

                              <label className="mb-2 block text-xs font-semibold text-gray-600">
                                Selecionar produto *
                              </label>

                              <Field
                                as="select"
                                name={`items.${index}.productId`}
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                  const product = products.find(
                                    (p) => p.id === Number(event.target.value)
                                  )

                                  setFieldValue(
                                    `items.${index}.productId`,
                                    product ? product.id : ''
                                  )

                                  setFieldValue(
                                    `items.${index}.description`,
                                    product?.description || ''
                                  )

                                  setFieldValue(
                                    `items.${index}.unitPrice`,
                                    product?.price || 0
                                  )
                                }}
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                              >
                                <option value="">
                                  Selecionar produto ou serviço
                                </option>

                                {products.map((product) => (
                                  <option
                                    key={product.id}
                                    value={product.id}
                                  >
                                    {product.name}
                                  </option>
                                ))}
                              </Field>

                              <ErrorMessage
                                name={`items.${index}.productId`}
                                component="p"
                                className="mt-1 text-xs text-red-500"
                              />

                            </div>

                            {/* DESCRIÇÃO */}
                            <div className="md:col-span-2">
                              <label className="mb-2 block text-xs font-semibold text-gray-600">
                                Descrição
                              </label>

                              <Field
                                name={`items.${index}.description`}
                                placeholder="Descrição do produto ou serviço"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                              />
                            </div>

                            {/* QUANTIDADE */}
                            <div>
                              <label className="mb-2 block text-xs font-semibold text-gray-600">
                                Quantidade
                              </label>

                              <Field
                                name={`items.${index}.quantity`}
                                type="number"
                                min="1"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                              />
                            </div>

                            {/* PREÇO */}
                            <div>
                              <label className="mb-2 block text-xs font-semibold text-gray-600">
                                Preço unitário (Kz)
                              </label>

                              <Field
                                name={`items.${index}.unitPrice`}
                                type="number"
                                min="0"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                              />
                            </div>

                            {/* DESCONTO */}
                            <div>
                              <label className="mb-2 block text-xs font-semibold text-gray-600">
                                Desconto (%)
                              </label>

                              <Field
                                name={`items.${index}.discount`}
                                type="number"
                                min="0"
                                max="100"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                              />
                            </div>

                            {/* IMPOSTO */}
                            <div>
                              <label className="mb-2 block text-xs font-semibold text-gray-600">
                                Imposto (%)
                              </label>

                              <Field
                                name={`items.${index}.taxRate`}
                                type="number"
                                min="0"
                                max="100"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
                              />
                            </div>

                          </div>

                          <div className="mt-5 flex justify-between border-t border-gray-100 pt-4 text-sm">
                            <span className="text-gray-500">
                              Total do artigo
                            </span>

                            <strong className="text-gray-900">
                              {formatCurrency(result.total)}
                            </strong>
                          </div>

                        </div>
                      )
                    })}

                    <button
                      type="button"
                      onClick={() => push({
                        productId: '',
                        description: '',
                        quantity: 1,
                        unitPrice: 0,
                        discount: 0,
                        taxRate: 14,
                      })}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-purple-300 py-4 text-sm font-semibold text-purple-600 transition hover:bg-purple-50"
                    >
                      <Plus size={18} />
                      Adicionar produto ou serviço
                    </button>

                  </div>
                )}
              </FieldArray>

              <ErrorMessage
                name="items"
                component="p"
                className="mt-2 text-xs text-red-500"
              />
            </div>

            {/* OBSERVAÇÕES */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <label className="mb-3 block text-sm font-bold text-gray-800">
                Observações
              </label>

              <Field
                as="textarea"
                name="notes"
                rows={3}
                placeholder="Observações adicionais da fatura..."
                className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-500"
              />

            </div>

            {/* RESUMO FINANCEIRO */}
            <div className="rounded-2xl bg-[#100D18] p-6 text-white shadow-lg">

              <div className="mb-6 flex items-center gap-3">
                <Calculator className="text-purple-400" />

                <h2 className="font-bold">
                  Resumo financeiro
                </h2>
              </div>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>

                  <span>{formatCurrency(totals.subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Descontos</span>

                  <span>- {formatCurrency(totals.discount)}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Impostos</span>

                  <span>{formatCurrency(totals.tax)}</span>
                </div>

                <div className="border-t border-white/10 pt-5">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold">
                      Total geral
                    </span>

                    <strong className="text-2xl text-purple-400">
                      {formatCurrency(totals.total)}
                    </strong>

                  </div>

                </div>

              </div>

            </div>

            {/* BOTÕES */}
            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">

              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700"
              >
                <Save size={18} />
                Guardar fatura
              </button>

            </div>

          </Form>
        )
      }}
    </Formik>
  )
}

