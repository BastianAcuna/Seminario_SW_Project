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
    <div className="border rounded p-4 mb-3">
      {!editing ? (
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="mt-2 font-medium">${product.price}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => product.id && onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            className="w-full border rounded px-2 py-1"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            className="w-full border rounded px-2 py-1"
            name="price"
            value={String(form.price)}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            step="0.01"
          />
          <textarea
            className="w-full border rounded px-2 py-1"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={save}>
              Save
            </button>
            <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Product
