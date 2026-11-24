
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Hash,
  Save,
} from 'lucide-react'

import type { Client } from '../../types/invoice'

interface ClientFormProps {
  initialData?: Client
  onSubmit: (values: Omit<Client, 'id'>) => void
  onCancel: () => void
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Introduza pelo menos 3 caracteres')
    .required('O nome é obrigatório'),

  nif: Yup.string()
    .matches(/^\d{10}$/, 'O NIF deve conter 10 dígitos')
    .required('O NIF é obrigatório'),

  email: Yup.string()
    .email('Introduza um e-mail válido')
    .required('O e-mail é obrigatório'),

  phone: Yup.string()
    .required('O telefone é obrigatório'),

  address: Yup.string()
    .required('O endereço é obrigatório'),
})

const inputStyle =
  'w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'

export default function ClientForm({
  initialData,
  onSubmit,
  onCancel,
}: ClientFormProps) {

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: initialData?.name || '',
        nif: initialData?.nif || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        address: initialData?.address || '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-7">

          {/* DADOS PRINCIPAIS */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <UserRound size={22} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Dados do cliente
                </h2>

                <p className="text-xs text-gray-400">
                  Introduza as informações de identificação.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* NOME */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nome ou denominação social *
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <Field
                    name="name"
                    placeholder="Ex.: Empresa Alpha, Lda."
                    className={inputStyle}
                  />
                </div>

                <ErrorMessage
                  name="name"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* NIF */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Número de Identificação Fiscal *
                </label>

                <div className="relative">
                  <Hash
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <Field
                    name="nif"
                    placeholder="5000123456"
                    maxLength={10}
                    className={inputStyle}
                  />
                </div>

                <ErrorMessage
                  name="nif"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* E-MAIL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  E-mail *
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <Field
                    name="email"
                    type="email"
                    placeholder="empresa@email.com"
                    className={inputStyle}
                  />
                </div>

                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* TELEFONE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Telefone *
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <Field
                    name="phone"
                    type="tel"
                    placeholder="+244 900 000 000"
                    className={inputStyle}
                  />
                </div>

                <ErrorMessage
                  name="phone"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* ENDEREÇO */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Endereço *
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <Field
                    name="address"
                    placeholder="Município, província"
                    className={inputStyle}
                  />
                </div>

                <ErrorMessage
                  name="address"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
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
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700 disabled:opacity-50"
            >
              <Save size={18} />
              {initialData ? 'Atualizar cliente' : 'Guardar cliente'}
            </button>

          </div>

        </Form>
      )}
    </Formik>
  )
}
