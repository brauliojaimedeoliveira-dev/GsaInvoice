import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { ClientProvider } from './context/ClientContext'
import { ProductProvider } from './context/ProductContext'

import './index.css'

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <ClientProvider>
      <ProductProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductProvider>
    </ClientProvider>
  </React.StrictMode>
)