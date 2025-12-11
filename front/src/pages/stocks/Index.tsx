import { useEffect, useState } from 'react'
import Stock from './components/Stock'
import type { StockType } from './components/Stock'
import type { ProductType } from '../products/components/Product'
import type { BranchType } from '../branches/components/Branch'

const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:3001/api'

export default () => {
    const [stocks, setStocks] = useState<StockType[]>([])
    const [products, setProducts] = useState<ProductType[]>([])
    const [branches, setBranches] = useState<BranchType[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [newStock, setNewStock] = useState<StockType>({ product_id: 0, branch_id: 0, amount: 0 })

    const fetchAll = async () => {
        setLoading(true)
        try {
            const [sRes, pRes, bRes] = await Promise.all([
                fetch(`${API_BASE}/stocks`),
                fetch(`${API_BASE}/products`),
                fetch(`${API_BASE}/branches`),
            ])

            // If any response is not OK, collect text and surface a clear error instead of attempting to parse JSON
            if (!sRes.ok || !pRes.ok || !bRes.ok) {
                const statusTexts = await Promise.all([
                    sRes.ok ? Promise.resolve(null) : sRes.text(),
                    pRes.ok ? Promise.resolve(null) : pRes.text(),
                    bRes.ok ? Promise.resolve(null) : bRes.text(),
                ])
                const messages = []
                if (!sRes.ok) messages.push(`/api/stocks: ${sRes.status} ${sRes.statusText} - ${statusTexts[0]}`)
                if (!pRes.ok) messages.push(`/api/products: ${pRes.status} ${pRes.statusText} - ${statusTexts[1]}`)
                if (!bRes.ok) messages.push(`/api/branches: ${bRes.status} ${bRes.statusText} - ${statusTexts[2]}`)
                throw new Error(messages.join('\n'))
            }

            const [sData, pData, bData] = await Promise.all([sRes.json(), pRes.json(), bRes.json()])

            setStocks(sData)
            setProducts(pData)
            setBranches(bData)
            setError(null)

            // initialize newStock to first product/branch if available
            setNewStock((n: StockType) => ({
                ...n,
                product_id: pData[0]?.id || n.product_id,
                branch_id: bData[0]?.id || n.branch_id,
            }))
        } catch (err) {
            console.error('Failed to fetch stocks/products/branches', err)
            setError(String(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAll()
    }, [])

    const createStock = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!newStock.product_id || !newStock.branch_id) {
            setError('Elija una sucursal y un producto primero')
            return
        }
        try {
            const res = await fetch(`${API_BASE}/stocks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStock),
            })
            if (!res.ok) throw new Error('Create failed')
            const created = await res.json()
            setStocks((s) => [created, ...s])
            setNewStock({ product_id: products[0]?.id || 0, branch_id: branches[0]?.id || 0, amount: 0 })
        } catch (err) {
            console.error(err)
            setError(String(err))
        }
    }

    const updateStock = async (stock: StockType) => {
        if (!stock.id) return
        try {
            const res = await fetch(`${API_BASE}/stocks/${stock.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stock),
            })
            if (!res.ok) throw new Error('Update failed')
            const updated = await res.json()
            setStocks((s) => s.map((x) => (x.id === updated.id ? updated : x)))
        } catch (err) {
            console.error(err)
        }
    }

    const deleteStock = async (id: number) => {
        try {
            const res = await fetch(`${API_BASE}/stocks/${id}`, { method: 'DELETE' })
            if (res.status !== 204) throw new Error('Delete failed')
            setStocks((s) => s.filter((x) => x.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    const getProductName = (id?: number) => products.find((p) => p.id === id)?.name || String(id)
    const getBranchName = (id?: number) => branches.find((b) => b.id === id)?.name || String(id)

    return (
        <>
            <div className="mb-8">
                <h1 className="text-5xl font-bold mb-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Stock
                </h1>
                <p className="text-slate-400">Gestion de inventario en sucursales</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-300 text-sm">{error}</p>
                </div>
            )}

            <div className="space-y-6">
                <form className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur-sm shadow-lg" onSubmit={createStock}>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        Crear nuevo registro de stock
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="text-sm text-slate-400 mb-2 block">Producto</label>
                            <select
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                value={String(newStock.product_id)}
                                onChange={(e) => setNewStock({ ...newStock, product_id: Number(e.target.value) })}
                            >
                                {products.map((p) => (
                                    <option key={p.id} value={p.id} className="bg-slate-800">{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-slate-400 mb-2 block">Sucursal</label>
                            <select
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                value={String(newStock.branch_id)}
                                onChange={(e) => setNewStock({ ...newStock, branch_id: Number(e.target.value) })}
                            >
                                {branches.map((b) => (
                                    <option key={b.id} value={b.id} className="bg-slate-800">{b.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-slate-400 mb-2 block">Cantidad</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                placeholder="Cantidad"
                                type="number"
                                value={String(newStock.amount)}
                                onChange={(e) => setNewStock({ ...newStock, amount: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <button className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/50" type="submit">
                                Crear
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mt-8">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                            <p className="text-slate-400 mt-4">Cargando registros de stock...</p>
                        </div>
                    ) : stocks.length === 0 ? (
                        <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5">
                            <span className="text-6xl mb-4 block">📦</span>
                            <p className="text-slate-400 text-lg">No hay registros de inventario aun</p>
                            <p className="text-slate-500 text-sm mt-2">Crea el primer registro arriba</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                Todos los registros de stock ({stocks.length})
                            </h3>
                            {stocks.map((s) => (
                                <Stock
                                    key={s.id}
                                    stock={s}
                                    onDelete={deleteStock}
                                    onUpdate={updateStock}
                                    productName={getProductName(s.product_id)}
                                    branchName={getBranchName(s.branch_id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
