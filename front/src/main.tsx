import "./index.css"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Products from './pages/products/Index.tsx'
import Branches from './pages/branches/Index'
import Stocks from './pages/stocks/Index'
import DefaultLayout from './layout/DefaultLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout/>} >
          <Route path="/products" element={<Products />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/stocks" element={<Stocks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
