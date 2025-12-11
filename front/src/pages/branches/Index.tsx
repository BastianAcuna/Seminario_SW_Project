import { useEffect, useState } from 'react'
import Branch from './components/Branch'
import type { BranchType } from './components/Branch'

const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:3001/api'

export default () => {
    const [branches, setBranches] = useState<BranchType[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

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
        
        // Validation
        if (!newBranch.name?.trim()) {
            setError('El nombre de la sucursal es requerido')
            return
        }
        
        setError(null)
        
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
            setError('Error al crear la sucursal')
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
            <div className="mb-8">
                <h1 className="text-5xl font-bold mb-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Sucursales
                </h1>
                <p className="text-slate-400">Gestiona las sucursales</p>
            </div>

            <div className="space-y-6">
                <form className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur-sm shadow-lg" onSubmit={createBranch}>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🏢</span>
                        Crear nueva sucursal
                    </h2>
                    
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="Nombre sucursal"
                            value={newBranch.name}
                            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                        />
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="Direccion"
                            value={newBranch.address}
                            onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                        />
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[100px]"
                            placeholder="Descripcion"
                            value={newBranch.description}
                            onChange={(e) => setNewBranch({ ...newBranch, description: e.target.value })}
                        />
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
                            <p className="text-slate-400 mt-4">Cargando sucursales...</p>
                        </div>
                    ) : branches.length === 0 ? (
                        <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5">
                            <span className="text-6xl mb-4 block">🏪</span>
                            <p className="text-slate-400 text-lg">Aun no hay sucursales</p>
                            <p className="text-slate-500 text-sm mt-2">Crea tu primer sucursal arriba</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                Todas las sucursales ({branches.length})
                            </h3>
                            {branches.map((b) => (
                                <Branch key={b.id} branch={b} onDelete={deleteBranch} onUpdate={updateBranch} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
