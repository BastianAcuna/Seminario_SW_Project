import { useEffect, useState } from 'react'
import Product from './components/Product'
import type { ProductType } from './components/Product'

const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:3001/api'

export default () => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(false)

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
            <h1 className="text-5xl">All products</h1>

            <div className="m-4">
                <form className="mb-6 max-w-xl" onSubmit={createProduct}>
                    <h2 className="text-xl mb-2">Create new product</h2>
                    <div className="grid grid-cols-1 gap-2">
                        <input
                            className="border rounded px-2 py-1"
                            placeholder="Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            className="border rounded px-2 py-1"
                            placeholder="Price"
                            type="number"
                            step="0.01"
                            value={String(newProduct.price)}
                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        />
                        <textarea
                            className="border rounded px-2 py-1"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
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
                ) : products.length === 0 ? (
                    <p>No products</p>
                ) : (
                    <div>
                        {products.map((p) => (
                            <Product key={p.id} product={p} onDelete={deleteProduct} onUpdate={updateProduct} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}