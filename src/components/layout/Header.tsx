
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
} from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white px-5 md:px-8">

      {/* LADO ESQUERDO */}
      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-purple-50 hover:text-purple-600"
          aria-label="Abrir menu"
        >
          <Menu size={23} />
        </button>

        <div className="hidden sm:block">
          <h2 className="text-sm font-bold text-gray-800">
            Área administrativa
          </h2>

          <p className="text-xs text-gray-400">
            Gestão e faturação empresarial
          </p>
        </div>

      </div>

      {/* LADO DIREITO */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* PESQUISA */}
        <div className="hidden lg:relative lg:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            placeholder="Pesquisar..."
            className="w-64 rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:bg-white"
          />
        </div>

        {/* NOTIFICAÇÕES */}
        <button
          className="relative rounded-xl p-2.5 text-gray-500 transition hover:bg-purple-50 hover:text-purple-600"
          aria-label="Notificações"
        >
          <Bell size={21} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-purple-600" />
        </button>

        {/* PERFIL */}
        <button className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-50">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
            GA
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-gray-800">
              Administrador
            </p>

            <p className="text-xs text-gray-400">
              Super Admin
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-gray-400 md:block"
          />

        </button>

      </div>
    </header>
  )
}
