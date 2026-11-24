import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((current) => !current)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-[#F8F7FA]">

      {/* MENU LATERAL */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* CONTEÚDO */}
      <div className="flex min-w-0 flex-1 flex-col">

        <Header onMenuClick={toggleSidebar} />

        <main className="flex-1 p-5 md:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  )
}