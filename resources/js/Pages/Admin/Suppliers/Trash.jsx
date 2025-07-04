import React from 'react'
import { router, Link } from '@inertiajs/react'
import AdminSidebar from '@/Components/AdminSidebar'
import { RotateCw, Trash2 } from 'lucide-react'

export default function Trash({ suppliers }) {
  const restore = (id) => {
    router.post(route('admin.suppliers.restore', id))
  }

  const forceDelete = (id) => {
    if (confirm('Are you sure? This will permanently delete!')) {
      router.delete(route('admin.suppliers.force', id))
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Deleted Suppliers</h1>
          <Link
            href={route('admin.suppliers.index')}
            className="text-sm text-blue-700"
          >
            ← Back to List
          </Link>
        </div>

        <div className="bg-white shadow rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Company</th>
                <th className="p-3">Address</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, i) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.phone}</td>
                  <td className="p-3">{s.company}</td>
                  <td className="p-3">{s.address}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => restore(s.id)}
                      className="text-green-600"
                    >
                      <RotateCw size={16} />
                    </button>
                    <button
                      onClick={() => forceDelete(s.id)}
                      className="text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
