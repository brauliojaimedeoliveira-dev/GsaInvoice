
import { NavLink, useNavigate } from 'react-router-dom'

import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  Wallet,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  X,
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Faturação',
    path: '/invoices',
    icon: FileText,
  },
  {
    title: 'Clientes',
    path: '/clients',
    icon: Users,
  },
  {
    title: 'Produtos e Serviços',
    path: '/products',
    icon: Package,
  },
  {
    title: 'Pagamentos',
    path: '/payments',
    icon: Wallet,
  },
  {
    title: 'Relatórios',
    path: '/reports',
    icon: ChartNoAxesCombined,
  },
]

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <>
      {/* Fundo para dispositivos móveis */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          bg-[#100D18] text-white
          transition-transform duration-300
          lg:static lg:z-auto lg:translate-x-0
          ${
            isOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >
        {/* LOGÓTIPO */}
        <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">

          <div className="flex items-center gap-3">
            <img
              src="/logo-gsa.png"
              alt="GSA"
              className="h-12 w-12 rounded-lg object-contain"
            />

            <div>
              <h1 className="text-lg font-bold tracking-wide">
                GSA<span className="text-purple-400">INVOICE</span>
              </h1>

              <p className="text-[10px] tracking-widest text-gray-400">
                BUSINESS MANAGEMENT
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-4 py-7">

          <p className="mb-5 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Menu principal
          </p>

          <nav className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 rounded-xl
                    px-4 py-3.5 text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }
                    `
                  }
                >
                  <Icon size={19} strokeWidth={1.8} />
                  {item.title}
                </NavLink>
              )
            })}

          </nav>

          <p className="mb-5 mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Sistema
          </p>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Settings size={19} />
            Configurações
          </NavLink>

        </div>

        {/* RODAPÉ */}
        <div className="border-t border-white/10 p-4">

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />
            Terminar sessão
          </button>

          <p className="mt-4 text-center text-[10px] text-gray-600">
            GSA PLATFORM © 2026
          </p>

        </div>
      </aside>
    </>
  )
}
