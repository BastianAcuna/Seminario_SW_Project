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
    <div className="border rounded p-4 mb-3">
      {!editing ? (
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{branch.name}</h3>
            <p className="text-sm text-gray-600">{branch.address}</p>
            <p className="mt-2 text-sm">{branch.description}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => branch.id && onDelete(branch.id)}
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
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
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

export default Branch
