import { useEffect, useState } from 'react'
import Branch from './components/Branch'
import type { BranchType } from './components/Branch'

const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:3001/api'

export default () => {
    const [branches, setBranches] = useState<BranchType[]>([])
    const [loading, setLoading] = useState(false)

    const [newBranch, setNewBranch] = useState<BranchType>({ name: '', address: '', description: '' })

    const fetchBranches = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/branches`)
            const data = await res.json()
            setBranches(data)
        } catch (err) {
            console.error('Failed to fetch branches', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBranches()
    }, [])

    const createBranch = async (e?: React.FormEvent) => {
        e?.preventDefault()
        try {
            const res = await fetch(`${API_BASE}/branches`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBranch),
            })
            if (!res.ok) throw new Error('Create failed')
            const created = await res.json()
            setBranches((b) => [created, ...b])
            setNewBranch({ name: '', address: '', description: '' })
        } catch (err) {
            console.error(err)
        }
    }

    const updateBranch = async (branch: BranchType) => {
        if (!branch.id) return
        try {
            const res = await fetch(`${API_BASE}/branches/${branch.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(branch),
            })
            if (!res.ok) throw new Error('Update failed')
            const updated = await res.json()
            setBranches((b) => b.map((x) => (x.id === updated.id ? updated : x)))
        } catch (err) {
            console.error(err)
        }
    }

    const deleteBranch = async (id: number) => {
        try {
            const res = await fetch(`${API_BASE}/branches/${id}`, { method: 'DELETE' })
            if (res.status !== 204) throw new Error('Delete failed')
            setBranches((b) => b.filter((x) => x.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <h1 className="text-5xl">All branches</h1>

            <div className="m-4">
                <form className="mb-6 max-w-xl" onSubmit={createBranch}>
                    <h2 className="text-xl mb-2">Create new branch</h2>
                    <div className="grid grid-cols-1 gap-2">
                        <input
                            className="border rounded px-2 py-1"
                            placeholder="Name"
                            value={newBranch.name}
                            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                        />
                        <input
                            className="border rounded px-2 py-1"
                            placeholder="Address"
                            value={newBranch.address}
                            onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                        />
                        <textarea
                            className="border rounded px-2 py-1"
                            placeholder="Description"
                            value={newBranch.description}
                            onChange={(e) => setNewBranch({ ...newBranch, description: e.target.value })}
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
                ) : branches.length === 0 ? (
                    <p>No branches</p>
                ) : (
                    <div>
                        {branches.map((b) => (
                            <Branch key={b.id} branch={b} onDelete={deleteBranch} onUpdate={updateBranch} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
