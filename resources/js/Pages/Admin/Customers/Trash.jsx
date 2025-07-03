import { router } from '@inertiajs/react'
import { Trash2, RotateCcw } from 'lucide-react'
import AdminSidebar from '@/Components/AdminSidebar'

export default function Trash({ customers }) {
  const restore = (id) => {
    router.post(route('admin.customers.restore', id))
  }

  const forceDelete = (id) => {
    if (confirm('Permanently delete?')) {
      router.delete(route('admin.customers.force', id))
    }
  }

  return (
    <div className="flex">
          <AdminSidebar />
          <div className="ml-64 w-full p-6">
      <h1 className="text-xl font-bold mb-4">Deleted Customers</h1>

      <table className="w-full bg-white rounded shadow text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, i) => (
            <tr key={c.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3 space-x-2">
                <button onClick={() => restore(c.id)} className="text-green-600"><RotateCcw size={16}/> Restore</button>
                <button onClick={() => forceDelete(c.id)} className="text-red-600"><Trash2 size={16}/> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}
