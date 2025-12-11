import React, { useState } from 'react'

export interface StockType {
  id?: number
  product_id: number
  branch_id: number
  amount: number
}

type Props = {
  stock: StockType
  onDelete: (id: number) => void
  onUpdate: (stock: StockType) => void
  productName?: string
  branchName?: string
}

export const Stock: React.FC<Props> = ({ stock, onDelete, onUpdate, productName, branchName }) => {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<StockType>({
    id: stock.id,
    product_id: stock.product_id,
    branch_id: stock.branch_id,
    amount: stock.amount,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: name === 'amount' ? Number(value) : Number(value) }))
  }

  const save = () => {
    onUpdate(form)
    setEditing(false)
  }

  return (
    <div className="border rounded p-4 mb-3">
      {!editing ? (
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{productName} @ {branchName}</h3>
            <p className="mt-2 text-sm">Amount: {stock.amount}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => stock.id && onDelete(stock.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            className="w-full border rounded px-2 py-1"
            name="amount"
            value={String(form.amount)}
            onChange={handleChange}
            placeholder="Amount"
            type="number"
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

export default Stock
