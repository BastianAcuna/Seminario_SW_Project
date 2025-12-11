import { Link } from 'react-router'

export default () => {
    return (
        <>
            <div className="mb-12 text-center">
                <h1 className="text-6xl font-bold mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Bienvenido a USM App
                </h1>
                <p className="text-xl text-slate-400 mb-2">Sistema de gestión de inventario y sucursales</p>
                <p className="text-slate-500">Administra tus productos, sucursales y stock desde un solo lugar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Link 
                    to="/products" 
                    className="group border border-white/10 rounded-xl p-8 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/30"
                >
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📦</div>
                    <h3 className="text-2xl font-bold text-white mb-3">Productos</h3>
                    <p className="text-slate-400 mb-4">Gestiona tu catálogo completo de productos con precios y descripciones.</p>
                    <div className="inline-flex items-center gap-2 text-purple-400 font-medium">
                        Ver productos
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

                <Link 
                    to="/branches" 
                    className="group border border-white/10 rounded-xl p-8 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all shadow-lg hover:shadow-pink-500/20 hover:border-pink-500/30"
                >
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🏢</div>
                    <h3 className="text-2xl font-bold text-white mb-3">Sucursales</h3>
                    <p className="text-slate-400 mb-4">Administra todas tus ubicaciones de tiendas y sus detalles.</p>
                    <div className="inline-flex items-center gap-2 text-pink-400 font-medium">
                        Ver sucursales
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

                <Link 
                    to="/stocks" 
                    className="group border border-white/10 rounded-xl p-8 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/30"
                >
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📊</div>
                    <h3 className="text-2xl font-bold text-white mb-3">Stock</h3>
                    <p className="text-slate-400 mb-4">Controla el inventario disponible en cada sucursal.</p>
                    <div className="inline-flex items-center gap-2 text-purple-400 font-medium">
                        Ver stock
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>
            </div>

            <div className="border border-white/10 rounded-xl p-8 bg-linear-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0 text-7xl">🚀</div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-3">¿Listo para comenzar?</h3>
                        <p className="text-slate-400 mb-4">
                            Empieza agregando productos a tu catálogo, registra tus sucursales y mantén el control de tu inventario en tiempo real.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <Link 
                                to="/products" 
                                className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/50"
                            >
                                Crear producto
                            </Link>
                            <Link 
                                to="/branches" 
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all border border-white/10"
                            >
                                Agregar sucursal
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-3xl font-bold text-purple-400 mb-2">✨</div>
                    <p className="text-slate-400 text-sm">Interfaz moderna y elegante</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-3xl font-bold text-pink-400 mb-2">⚡</div>
                    <p className="text-slate-400 text-sm">Gestión rápida y eficiente</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-3xl font-bold text-purple-400 mb-2">🎯</div>
                    <p className="text-slate-400 text-sm">Control total de inventario</p>
                </div>
            </div>
        </>
    )
}
