import React, { useState } from 'react'
import { useForm, Link, router } from '@inertiajs/react'
import AdminSidebar from '@/Components/AdminSidebar'
import { PlusCircle, Edit2, Trash2 } from 'lucide-react'

export default function Index({ suppliers }) {
  const [editingSupplier, setEditingSupplier] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const { data, setData, post, put, reset } = useForm({
    name: '',
    phone: '',
    company: '',
    address: '',
  })

  const openForm = (supplier = null) => {
    setShowForm(true)
    if (supplier) {
      setEditingSupplier(supplier)
      setData({
        name: supplier.name,
        phone: supplier.phone || '',
        company: supplier.company || '',
        address: supplier.address || '',
      })
    } else {
      setEditingSupplier(null)
      reset()
    }
  }

  const closeForm = () => {
    setShowForm(false)
    reset()
  }

  const submit = (e) => {
    e.preventDefault()
    if (editingSupplier) {
      put(route('admin.suppliers.update', editingSupplier.id), {
        onSuccess: closeForm,
      })
    } else {
      post(route('admin.suppliers.store'), {
        onSuccess: closeForm,
      })
    }
  }

  const softDelete = (id) => {
    if (confirm('Are you sure to delete?')) {
      router.delete(route('admin.suppliers.destroy', id))
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Suppliers</h1>
          <button
            onClick={() => openForm()}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <PlusCircle size={18} /> Add Supplier
          </button>
        </div>

        {/* Table */}
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
                      onClick={() => openForm(s)}
                      className="text-blue-600"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => softDelete(s.id)}
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

        <Link
          href={route('admin.suppliers.trash')}
          className="text-sm text-blue-700 mt-4 inline-block"
        >
          View Trash →
        </Link>

        {/* Add/Edit Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
              onSubmit={submit}
              className="bg-white rounded shadow p-6 w-[400px] space-y-4 relative"
            >
              <h2 className="text-lg font-bold mb-2">
                {editingSupplier ? 'Edit' : 'Add'} Supplier
              </h2>

              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                placeholder="Phone"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={data.company}
                onChange={(e) => setData('company', e.target.value)}
                placeholder="Company"
                className="w-full border p-2 rounded"
              />
              <textarea
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                placeholder="Address"
                className="w-full border p-2 rounded"
              ></textarea>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
