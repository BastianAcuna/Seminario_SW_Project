import { useEffect, useState } from 'react'
import Product from './components/Product'
import type { ProductType } from './components/Product'

const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:3001/api'

export default () => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [newProduct, setNewProduct] = useState<ProductType>({ name: '', price: 0, description: '' })

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/products`)
            const data = await res.json()
            setProducts(data)
        } catch (err) {
            console.error('Failed to fetch products', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const createProduct = async (e?: React.FormEvent) => {
        e?.preventDefault()
        
        // Validation
        if (!newProduct.name?.trim()) {
            setError('El nombre del producto es requerido')
            return
        }
        if (newProduct.price <= 0) {
            setError('El precio debe ser mayor a 0')
            return
        }
        
        setError(null)
        
        try {
            const res = await fetch(`${API_BASE}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            })
            if (!res.ok) throw new Error('Create failed')
            const created = await res.json()
            setProducts((p) => [created, ...p])
            setNewProduct({ name: '', price: 0, description: '' })
        } catch (err) {
            console.error(err)
            setError('Error al crear el producto')
        }
    }

    const updateProduct = async (product: ProductType) => {
        if (!product.id) return
        try {
            const res = await fetch(`${API_BASE}/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            })
            if (!res.ok) throw new Error('Update failed')
            const updated = await res.json()
            setProducts((p) => p.map((x) => (x.id === updated.id ? updated : x)))
        } catch (err) {
            console.error(err)
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' })
            if (res.status !== 204) throw new Error('Delete failed')
            setProducts((p) => p.filter((x) => x.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-5xl font-bold mb-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Productos
                </h1>
                <p className="text-slate-400">Gestiona el catalogo de productos</p>
            </div>

            <div className="space-y-6">
                <form className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur-sm shadow-lg" onSubmit={createProduct}>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">➕</span>
                        Crear nuevo producto
                    </h2>
                    
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="Nombre producto"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="Precio"
                            type="number"
                            step="0.01"
                            value={String(newProduct.price)}
                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        />
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[100px]"
                            placeholder="Descripcion"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <div>
                            <button className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/50" type="submit">
                                Crear producto
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mt-8">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                            <p className="text-slate-400 mt-4">Cargando productos...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5">
                            <span className="text-6xl mb-4 block">📦</span>
                            <p className="text-slate-400 text-lg">Aun no hay productos</p>
                            <p className="text-slate-500 text-sm mt-2">Crea el primer producto arriba</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                Todos los productos ({products.length})
                            </h3>
                            {products.map((p) => (
                                <Product key={p.id} product={p} onDelete={deleteProduct} onUpdate={updateProduct} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}