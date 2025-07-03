import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import AdminSidebar from '@/Components/AdminSidebar'
import { PlusCircle, Trash2 } from 'lucide-react'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2,
  }).format(value)

export default function GenerateBill({ customers }) {
  const [items, setItems] = useState([{ name: '', qty: 1, meter: 0, price: 0 }])

  const { data, setData, post } = useForm({
    customer_id: '',
    items: [],
    total: 0,
  })

  // Update useForm data whenever items or total changes
  useEffect(() => {
    setData('items', items)
    const total = items.reduce((sum, i) => sum + i.meter * i.price, 0)
    setData('total', total)
  }, [items])

  const addItem = () => {
    setItems([...items, { name: '', qty: 1, meter: 0, price: 0 }])
  }

  const updateItem = (index, key, value) => {
    const updated = [...items]
    updated[index][key] = value
    setItems(updated)
  }

  const removeItem = (index) => {
    const updated = [...items]
    updated.splice(index, 1)
    setItems(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('admin.bills.store'), {
      onSuccess: () => {
        alert('Bill generated!')
        setItems([{ name: '', qty: 1, meter: 0, price: 0 }])
        setData('customer_id', '')
      },
    })
  }

  const totalAmount = items.reduce((sum, i) => sum + i.meter * i.price, 0)

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <h1 className="text-2xl font-bold mb-6">Generate New Bill</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
          {/* Customer Select */}
          <div>
            <label className="block mb-1 font-semibold">Select Customer</label>
            <select
              value={data.customer_id}
              onChange={(e) => setData('customer_id', e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Choose Customer --</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.shop_name})
                </option>
              ))}
            </select>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-6 gap-2 items-center">
                <input
                  type="text"
                  placeholder="Item Name"
                  className="border p-2 rounded col-span-2"
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Qty"
                  className="border p-2 rounded"
                  value={item.qty || ''}
                  onChange={(e) => updateItem(index, 'qty', parseFloat(e.target.value) || 0)}
                />
                <input
                  type="number"
                  placeholder="Meter"
                  className="border p-2 rounded"
                  value={item.meter || ''}
                  onChange={(e) => updateItem(index, 'meter', parseFloat(e.target.value) || 0)}
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="border p-2 rounded"
                  value={item.price || ''}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    {formatCurrency(item.meter * item.price)}
                  </span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              type="button"
              onClick={addItem}
              className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2"
            >
              <PlusCircle size={16} /> Add Item
            </button>
          </div>

          <div className="text-right text-lg font-bold">
            Total: {formatCurrency(totalAmount)}
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            Generate Bill
          </button>
        </form>
      </div>
    </div>
  )
}
    