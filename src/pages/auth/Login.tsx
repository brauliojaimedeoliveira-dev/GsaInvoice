import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
  ChartNoAxesCombined,
} from 'lucide-react'

interface LoginValues {
  email: string
  password: string
  remember: boolean
}

const slides = [
  {
    title: 'Tecnologia que transforma negócios.',
    description:
      'Soluções inteligentes para simplificar a gestão e impulsionar o crescimento da sua empresa.',
    icon: ChartNoAxesCombined,
    number: '01',
  },
  {
    title: 'Gestão inteligente. Resultados extraordinários.',
    description:
      'Tenha o controlo das suas operações, clientes e processos de faturação num único lugar.',
    icon: Zap,
    number: '02',
  },
  {
    title: 'O futuro da gestão começa aqui.',
    description:
      'Uma plataforma moderna, segura e preparada para acompanhar o crescimento do seu negócio.',
    icon: ShieldCheck,
    number: '03',
  },
]

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Introduza um endereço de e-mail válido')
    .required('O e-mail é obrigatório'),

  password: Yup.string()
    .min(6, 'A palavra-passe deve ter pelo menos 6 caracteres')
    .required('A palavra-passe é obrigatória'),

  remember: Yup.boolean(),
})

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentSlide = slides[activeSlide]
  const SlideIcon = currentSlide.icon

  const initialValues: LoginValues = {
    email: '',
    password: '',
    remember: false,
  }

  const handleLogin = (values: LoginValues) => {
    console.log('Dados do formulário:', values)

    alert('Formulário validado! A autenticação real será integrada à API.')
  }

  return (
    <main className="min-h-screen bg-[#F8F7FA] p-3 md:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-[1500px] overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

        {/* COLUNA ESQUERDA */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#100D18] p-10 text-white lg:flex xl:p-14">

          {/* Elementos decorativos */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-purple-500/20" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full border border-purple-500/20" />

          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-700/20 blur-[120px]" />

          {/* Logótipo */}
          <div className="relative z-10 flex items-center gap-4">
            <img
              src="/logo-gsa.png"
              alt="GSA PLATFORM"
              className="h-16 w-16 rounded-xl object-contain"
            />

            <div>
              <h1 className="text-2xl font-bold tracking-wider">
                GSA<span className="text-purple-400">INVOICE</span>
              </h1>

              <p className="text-xs tracking-[0.25em] text-gray-400">
                BUSINESS MANAGEMENT
              </p>
            </div>
          </div>

          {/* Conteúdo do slideshow */}
          <div className="relative z-10 max-w-xl">

            <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/10 text-purple-400">
              <SlideIcon size={42} strokeWidth={1.5} />
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
              GSA Innovation
            </p>

            <h2 className="mb-6 text-4xl font-bold leading-tight xl:text-5xl">
              {currentSlide.title}
            </h2>

            <p className="max-w-lg text-base leading-8 text-gray-400">
              {currentSlide.description}
            </p>

            {/* Indicadores */}
            <div className="mt-12 flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.number}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Ver slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? 'w-12 bg-purple-500'
                      : 'w-6 bg-gray-600 hover:bg-purple-400'
                  }`}
                />
              ))}

              <span className="ml-3 text-xs tracking-widest text-gray-500">
                {currentSlide.number} / 03
              </span>
            </div>
          </div>

          {/* Rodapé */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-gray-500">
            <span>© 2026 GSA PLATFORM</span>
            <span>Inovação e Tecnologia</span>
          </div>
        </section>

        {/* COLUNA DIREITA */}
        <section className="flex items-center justify-center px-6 py-12 md:px-12 lg:px-14 xl:px-20">

          <div className="w-full max-w-md">

            {/* Logo mobile */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <img
                src="/logo-gsa.png"
                alt="GSA PLATFORM"
                className="h-12 w-12 rounded-lg object-contain"
              />

              <h2 className="text-xl font-bold text-gray-900">
                GSA <span className="text-purple-600">PLATFORM</span>
              </h2>
            </div>

            <div className="mb-10">
              <div className="mb-4 inline-flex items-center rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">
                <span className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
                ÁREA ADMINISTRATIVA
              </div>

              <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Bem-vindo de volta!
              </h2>

              <p className="text-sm leading-6 text-gray-500">
                Introduza as suas credenciais para aceder à plataforma de gestão e faturação.
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      E-mail profissional
                    </label>

                    <div className="relative">
                      <Mail
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="exemplo@empresa.ao"
                        autoComplete="username"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                      />
                    </div>

                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-2 text-xs text-red-500"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Palavra-passe
                      </label>
                    </div>

                    <div className="relative">
                      <LockKeyhole
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Introduza a sua palavra-passe"
                        autoComplete="current-password"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-purple-600"
                        aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>

                    <ErrorMessage
                      name="password"
                      component="p"
                      className="mt-2 text-xs text-red-500"
                    />
                  </div>

                  {/* LEMBRAR-ME */}
                  <div className="flex items-center justify-between gap-3">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                      <Field
                        type="checkbox"
                        name="remember"
                        className="h-4 w-4 accent-purple-600"
                      />
                      Lembrar-me
                    </label>

                    <button
                      type="button"
                      className="text-sm font-semibold text-purple-600 hover:text-purple-800"
                      onClick={() => alert('A recuperação de palavra-passe será implementada posteriormente.')}
                    >
                      Esqueceu-se?
                    </button>
                  </div>

                  {/* BOTÃO */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-purple-600 py-4 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition-all hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Entrar na plataforma

                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                </Form>
              )}
            </Formik>

            {/* Segurança */}
            <div className="mt-10 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={16} className="text-purple-500" />
              Ambiente administrativo protegido
            </div>

            <p className="mt-8 text-center text-xs text-gray-400">
              © 2026 GSA PLATFORM. Todos os direitos reservados.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}