
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import type { Product } from '../../types/product'

interface ProductFormProps {
  initialData?: Product
  onSubmit: (values: Omit<Product, 'id'>) => void
  onCancel: () => void
}

const validationSchema = Yup.object({
  name: Yup.string().required('O nome é obrigatório'),
  code: Yup.string().required('O código é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  type: Yup.string()
    .oneOf(['Produto', 'Serviço'])
    .required('Seleccione o tipo'),
  price: Yup.number()
    .typeError('Informe um preço válido')
    .min(0, 'O preço não pode ser negativo')
    .required('O preço é obrigatório'),
  unit: Yup.string().required('Seleccione a unidade'),
  status: Yup.string()
    .oneOf(['Activo', 'Inactivo'])
    .required('Seleccione o estado')
})

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100'

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel
}: ProductFormProps) {
  const initialValues: Omit<Product, 'id'> = {
    name: initialData?.name ?? '',
    code: initialData?.code ?? '',
    description: initialData?.description ?? '',
    type: initialData?.type ?? 'Produto',
    price: initialData?.price ?? 0,
    unit: initialData?.unit ?? 'Unidade',
    status: initialData?.status ?? 'Activo'
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-5">

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Nome do produto/serviço
              </label>
              <Field
                name="name"
                placeholder="Ex.: Computador HP"
                className={inputClass}
              />
              <ErrorMessage
                name="name"
                component="p"
                className="mt-1 text-xs text-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Código
              </label>
              <Field
                name="code"
                placeholder="Ex.: PROD-001"
                className={inputClass}
              />
              <ErrorMessage
                name="code"
                component="p"
                className="mt-1 text-xs text-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Tipo
              </label>
              <Field as="select" name="type" className={inputClass}>
                <option value="Produto">Produto</option>
                <option value="Serviço">Serviço</option>
              </Field>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Preço (Kz)
              </label>
              <Field
                name="price"
                type="number"
                min="0"
                className={inputClass}
              />
              <ErrorMessage
                name="price"
                component="p"
                className="mt-1 text-xs text-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Unidade
              </label>
              <Field as="select" name="unit" className={inputClass}>
                <option value="Unidade">Unidade</option>
                <option value="Serviço">Serviço</option>
                <option value="Hora">Hora</option>
                <option value="Mês">Mês</option>
                <option value="Pacote">Pacote</option>
              </Field>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Estado
              </label>
              <Field as="select" name="status" className={inputClass}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Field>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Descrição
            </label>
            <Field
              as="textarea"
              name="description"
              rows={3}
              placeholder="Descreva o produto ou serviço..."
              className={inputClass}
            />
            <ErrorMessage
              name="description"
              component="p"
              className="mt-1 text-xs text-red-500"
            />
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
            >
              Guardar produto
            </button>
          </div>

        </Form>
      )}
    </Formik>
  )
}
