import React, { useState } from 'react'

export interface BranchType {
  id?: number
  name: string
  address?: string
  description?: string
}

type Props = {
  branch: BranchType
  onDelete: (id: number) => void
  onUpdate: (branch: BranchType) => void
}

export const Branch: React.FC<Props> = ({ branch, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<BranchType>({
    id: branch.id,
    name: branch.name || '',
    address: branch.address || '',
    description: branch.description || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const save = () => {
    if (!form.name) return
    onUpdate(form)
    setEditing(false)
  }

  return (
    <div className="border border-white/10 rounded-xl p-6 mb-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all shadow-lg">
      {!editing ? (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-xl">{branch.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{branch.name}</h3>
                <p className="text-sm text-purple-300">{branch.address}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 pl-15">{branch.description}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-lg transition-all font-medium" onClick={() => setEditing(true)}>
              Editar
            </button>
            <button
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-lg transition-all font-medium"
              onClick={() => branch.id && onDelete(branch.id)}
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
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
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

export default Branch
