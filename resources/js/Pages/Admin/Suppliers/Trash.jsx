import AdminSidebar from '@/Components/AdminSidebar'
import { ArrowLeftCircle, Trash2, RotateCw } from 'lucide-react'
import { router } from '@inertiajs/react'

export default function SupplierTrash({ trashed }) {
  const restore = (id) => {
    if (confirm('Restore this supplier?')) {
      router.put(route('admin.suppliers.restore', id))
    }
  }

  const forceDelete = (id) => {
    if (confirm('Permanently delete this supplier? This cannot be undone.')) {
      router.delete(route('admin.suppliers.forceDelete', id))
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Trashed Suppliers</h1>
          <a href={route('admin.suppliers.index')} className="text-blue-600 hover:underline flex items-center">
            <ArrowLeftCircle size={18} className="mr-1" /> Back to List
          </a>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trashed.map((supplier) => (
                <tr key={supplier.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{supplier.name}</td>
                  <td className="px-4 py-2">{supplier.phone}</td>
                  <td className="px-4 py-2">{supplier.company}</td>
                  <td className="px-4 py-2">{supplier.address}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button onClick={() => restore(supplier.id)} className="text-green-600 hover:underline">
                      <RotateCw size={16} />
                    </button>
                    <button onClick={() => forceDelete(supplier.id)} className="text-red-600 hover:underline">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {trashed.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">No trashed suppliers.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
