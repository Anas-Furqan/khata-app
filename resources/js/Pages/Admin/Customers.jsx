import { useForm, router } from '@inertiajs/react'
import { Trash2, Edit2, PlusCircle, X } from 'lucide-react'
import { useState } from 'react'
import AdminSidebar from '@/Components/AdminSidebar'

export default function Customers({ customers }) {
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)

  const { data, setData, post, put, reset, errors } = useForm({
    name: '', phone: '', shop_name: '', address: ''
  })

  const openAdd = () => {
    reset()
    setEditMode(false)
    setEditingCustomer(null)
    setShowModal(true)
  }

  const openEdit = (customer) => {
    setEditMode(true)
    setEditingCustomer(customer)
    setData({
      name: customer.name,
      phone: customer.phone,
      shop_name: customer.shop_name,
      address: customer.address || ''
    })
    setShowModal(true)
  }

  const submit = (e) => {
    e.preventDefault()
    if (editMode && editingCustomer) {
      put(route('admin.customers.update', editingCustomer.id), {
        onSuccess: () => {
          setShowModal(false)
          reset()
          setEditMode(false)
          setEditingCustomer(null)
        }
      })
    } else {
      post(route('admin.customers.store'), {
        onSuccess: () => {
          setShowModal(false)
          reset()
        }
      })
    }
  }

  const deleteCustomer = (id) => {
    if (confirm('Delete this customer?')) {
      router.delete(route('admin.customers.destroy', id))
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Customer List</h1>
          <div className="flex gap-3">
            <a href={route('admin.customers.trashed')} className="bg-red-600 text-white px-3 py-2 rounded flex items-center gap-1">
              <Trash2 size={16} /> Trash
            </a>
            <button onClick={openAdd} className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-1">
              <PlusCircle size={16} /> Add Customer
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full bg-white rounded shadow text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-center">#</th>
              <th className="p-3 border text-center">Name</th>
              <th className="p-3 border text-center">Phone</th>
              <th className="p-3 border text-center">Shop</th>
              <th className="p-3 border text-center">Address</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-3 border text-center">{i + 1}</td>
                <td className="p-3 border text-center">{c.name}</td>
                <td className="p-3 border text-center">{c.phone}</td>
                <td className="p-3 border text-center">{c.shop_name}</td>
                <td className="p-3 border text-center">{c.address}</td>
                <td className="p-3 border text-center space-x-2">
                  <button onClick={() => openEdit(c)} className="text-blue-500">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteCustomer(c.id)} className="text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded shadow-lg w-full max-w-lg p-6 relative">
              <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
                <X />
              </button>
              <h2 className="text-xl font-bold mb-4">
                {editMode ? 'Edit Customer' : 'Add New Customer'}
              </h2>
              <form onSubmit={submit} className="space-y-4">
                <input type="text" placeholder="Customer Name" className="w-full border p-2 rounded"
                  value={data.name} onChange={e => setData('name', e.target.value)} />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

                <input type="text" placeholder="Phone Number" className="w-full border p-2 rounded"
                  value={data.phone} onChange={e => setData('phone', e.target.value)} />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}

                <input type="text" placeholder="Shop Name" className="w-full border p-2 rounded"
                  value={data.shop_name} onChange={e => setData('shop_name', e.target.value)} />
                {errors.shop_name && <p className="text-sm text-red-500">{errors.shop_name}</p>}

                <input type="text" placeholder="Address" className="w-full border p-2 rounded"
                  value={data.address} onChange={e => setData('address', e.target.value)} />

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  {editMode ? 'Update' : 'Save'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
