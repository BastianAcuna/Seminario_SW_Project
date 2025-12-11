import React from 'react'
import { Outlet, Link } from 'react-router'

const DefaultLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <header className="bg-white/60 backdrop-blur sticky top-0 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm text-slate-600 hover:text-slate-900">Home</Link>
            <Link to="/products" className="text-sm text-slate-600 hover:text-slate-900">Products</Link>
            <Link to="/branches" className="text-sm text-slate-600 hover:text-slate-900">Branches</Link>
              <Link to="/stocks" className="text-sm text-slate-600 hover:text-slate-900">Stocks</Link>
          </nav>

          <div className="flex items-center gap-3">
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 border rounded-lg bg-white p-4 shadow-sm">
              <h4 className="font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/products" className="text-slate-600 hover:text-indigo-600">Products</Link></li>
                <li><Link to="/branches" className="text-slate-600 hover:text-indigo-600">Branches</Link></li>
                <li><Link to="/stocks" className="text-slate-600 hover:text-indigo-600">Stocks</Link></li>
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <footer className="mt-12 border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-center text-slate-500">
          © {new Date().getFullYear()} 
        </div>
      </footer>
    </div>
  )
}

export default DefaultLayout
