import AdminSidebar from '@/Components/AdminSidebar'
import { useForm } from '@inertiajs/react'

export default function SelectCustomer({ customers }) {
  const { data, setData, get } = useForm({ customer_id: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (data.customer_id) {
      get(route('admin.ledger.show', data.customer_id))
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Search Customer Ledger</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md">
          <label className="block mb-1 font-semibold">Select Customer</label>
          <select
            value={data.customer_id}
            onChange={(e) => setData('customer_id', e.target.value)}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="">-- Choose Customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.shop_name})
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Ledger
          </button>
        </form>
      </div>
    </div>
  )
}
