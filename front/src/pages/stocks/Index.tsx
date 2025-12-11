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
            setError('Please select a product and a branch before creating stock')
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
            <h1 className="text-5xl">Stock</h1>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <div className="m-4">
                <form className="mb-6 max-w-xl" onSubmit={createStock}>
                    <h2 className="text-xl mb-2">Create new stock record</h2>
                    <div className="grid grid-cols-1 gap-2">
                        <label className="text-sm">Product</label>
                        <select
                            className="border rounded px-2 py-1"
                            value={String(newStock.product_id)}
                            onChange={(e) => setNewStock({ ...newStock, product_id: Number(e.target.value) })}
                        >
                            {products.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>

                        <label className="text-sm">Branch</label>
                        <select
                            className="border rounded px-2 py-1"
                            value={String(newStock.branch_id)}
                            onChange={(e) => setNewStock({ ...newStock, branch_id: Number(e.target.value) })}
                        >
                            {branches.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>

                        <input
                            className="border rounded px-2 py-1"
                            placeholder="Amount"
                            type="number"
                            value={String(newStock.amount)}
                            onChange={(e) => setNewStock({ ...newStock, amount: Number(e.target.value) })}
                        />

                        <div>
                            <button className="px-3 py-1 bg-green-600 text-white rounded" type="submit">
                                Create
                            </button>
                        </div>
                    </div>
                </form>

                {loading ? (
                    <p>Loading...</p>
                ) : stocks.length === 0 ? (
                    <p>No stock records</p>
                ) : (
                    <div>
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
        </>
    )
}
