import React, { useState } from 'react'

export interface ProductType {
  id?: number
  name: string
  price: number
  description?: string
}

type Props = {
  product: ProductType
  onDelete: (id: number) => void
  onUpdate: (product: ProductType) => void
}

export const Product: React.FC<Props> = ({ product, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<ProductType>({
    id: product.id,
    name: product.name || '',
    price: Number(product.price) || 0,
    description: product.description || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: name === 'price' ? Number(value) : value }))
  }

  const save = () => {
    if (!form.name || Number.isNaN(form.price)) return
    onUpdate(form)
    setEditing(false)
  }

  return (
    <div className="border border-white/10 rounded-xl p-6 mb-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all shadow-lg">
      {!editing ? (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
            <p className="text-sm text-slate-400 mb-3">{product.description}</p>
            <div className="inline-flex items-center px-3 py-1 bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
              <span className="text-lg font-bold text-white">${product.price}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-lg transition-all font-medium"
              onClick={() => setEditing(true)}
            >
              Editar
            </button>
            <button
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-lg transition-all font-medium"
              onClick={() => product.id && onDelete(product.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
            name="price"
            value={String(form.price)}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            step="0.01"
          />
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[100px]"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/50" onClick={save}>
              Save
            </button>
            <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-slate-300 rounded-lg font-medium transition-all" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Product
