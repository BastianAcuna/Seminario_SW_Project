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
    <div className="border border-white/10 rounded-xl p-6 mb-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all shadow-lg">
      {!editing ? (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-3">
              <span className="text-purple-300">{productName}</span>
              <span className="text-slate-500 mx-2">en</span>
              <span className="text-pink-300">{branchName}</span>
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Cantidad:</span>
              <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
                <span className="text-lg font-bold text-white">{stock.amount}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-lg transition-all font-medium" onClick={() => setEditing(true)}>
              Editar
            </button>
            <button
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-lg transition-all font-medium"
              onClick={() => stock.id && onDelete(stock.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
            name="amount"
            value={String(form.amount)}
            onChange={handleChange}
            placeholder="Cantidad"
            type="number"
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

export default Stock
