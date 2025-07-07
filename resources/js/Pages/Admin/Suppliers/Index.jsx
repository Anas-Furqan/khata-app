import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import AdminSidebar from '@/Components/AdminSidebar'
import { Pencil, Trash2, Plus } from 'lucide-react'

export default function SupplierIndex({ suppliers }) {
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)

  const { data, setData, post, put, reset, errors } = useForm({
    name: '',
    phone: '',
    company: '',
    address: ''
  })

  const openAddModal = () => {
    reset()
    setIsEditing(false)
    setShowModal(true)
  }

  const openEditModal = (supplier) => {
    setIsEditing(true)
    setSelectedSupplier(supplier)
    setData({
      name: supplier.name,
      phone: supplier.phone,
      company: supplier.company || '',
      address: supplier.address || ''
    })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      put(route('admin.suppliers.update', selectedSupplier.id), {
        preserveScroll: true,
        onSuccess: () => setShowModal(false)
      })
    } else {
      post(route('admin.suppliers.store'), {
        preserveScroll: true,
        onSuccess: () => setShowModal(false)
      })
    }
  }

  const softDelete = (id) => {
    if (confirm('Are you sure you want to move this supplier to trash?')) {
      router.delete(route('admin.suppliers.destroy', id), {
        preserveScroll: true
      })
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Supplier List</h1>
          <button onClick={openAddModal} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            <Plus size={16} className="inline-block mr-1" /> Add Supplier
          </button>
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
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{supplier.name}</td>
                  <td className="px-4 py-2">{supplier.phone}</td>
                  <td className="px-4 py-2">{supplier.company}</td>
                  <td className="px-4 py-2">{supplier.address}</td>
                  <td className="px-4 py-2 text-center">
                    <button onClick={() => openEditModal(supplier)} className="text-green-600 hover:underline mr-2">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => softDelete(supplier.id)} className="text-red-600 hover:underline">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">No suppliers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Supplier' : 'Add Supplier'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border rounded p-2" />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full border rounded p-2" />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium">Company</label>
                  <input type="text" value={data.company} onChange={e => setData('company', e.target.value)} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <textarea value={data.address} onChange={e => setData('address', e.target.value)} className="w-full border rounded p-2"></textarea>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                    {isEditing ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
