import React from 'react'
import { Outlet, Link } from 'react-router'

const DefaultLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-100">
      <header className="bg-white/10 backdrop-blur-md sticky top-0 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/80 transition-all">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="font-bold text-lg text-white hidden sm:block">USM App</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link to="/" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all">Home</Link>
            <Link to="/products" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all">Productos</Link>
            <Link to="/branches" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all">Sucursales</Link>
            <Link to="/stocks" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all">Stock</Link>
          </nav>

          <div className="flex items-center gap-3">
          </div>
        </div>
      </header>

      <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm p-6 shadow-xl">
              <h4 className="font-bold text-lg mb-4 text-white">Navegacion</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="flex items-center gap-3 p-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all group">
                    <span className="w-2 h-2 bg-purple-500 rounded-full group-hover:bg-pink-500 transition-colors"></span>
                    Productos
                  </Link>
                </li>
                <li>
                  <Link to="/branches" className="flex items-center gap-3 p-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all group">
                    <span className="w-2 h-2 bg-purple-500 rounded-full group-hover:bg-pink-500 transition-colors"></span>
                    Sucursales
                  </Link>
                </li>
                <li>
                  <Link to="/stocks" className="flex items-center gap-3 p-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all group">
                    <span className="w-2 h-2 bg-purple-500 rounded-full group-hover:bg-pink-500 transition-colors"></span>
                    Stock
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-2xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <footer className="mt-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} USM App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default DefaultLayout
