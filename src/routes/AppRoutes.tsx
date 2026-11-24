
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/auth/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import AdminLayout from '../layouts/AdminLayout'
import ModulePlaceholder from '../pages/modules/ModulePlaceholder'
import Invoices from '../pages/invoices/Invoices'
import Clients from '../pages/clients/Clients'
import Products from '../pages/products/Products'

export default function AppRoutes() {
  return (
    <Routes>

      {/* AUTENTICAÇÃO */}
      <Route path="/" element={<Login />} />

      {/* ÁREA ADMINISTRATIVA */}
      <Route element={<AdminLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
            path="/invoices"
            element={<Invoices />}
            />

        <Route
        path="/clients"
        element={<Clients />}
        />

        <Route
          path="/products"
          element={
            <ModulePlaceholder
              title="Produtos e Serviços"
              description="Gestão do catálogo de produtos, serviços e preços."
            />
          }
        />

        <Route
          path="/payments"
          element={
            <ModulePlaceholder
              title="Pagamentos"
              description="Controlo de pagamentos recebidos e valores pendentes."
            />
          }
        />

        <Route
          path="/reports"
          element={
            <ModulePlaceholder
              title="Relatórios"
              description="Análise e acompanhamento dos indicadores financeiros."
            />
          }
        />

        <Route
          path="/settings"
          element={
            <ModulePlaceholder
              title="Configurações"
              description="Configurações gerais da plataforma e da empresa."
            />
          }
        />

      </Route>

      {/* ROTAS DESCONHECIDAS */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

      <Route path="/products" element={<Products />} />

    </Routes>
  )
}
