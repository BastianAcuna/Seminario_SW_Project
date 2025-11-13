import "./index.css"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Products from './pages/products/Index.tsx'
import DefaultLayout from './layout/DefaultLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout/>} >
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
