import { useEffect, useState } from 'react'
import AdminSidebar from '@/Components/AdminSidebar'

export default function PaymentHistory({ payments, customers }) {
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [filtered, setFiltered] = useState(payments)

  useEffect(() => {
    if (selectedCustomer === '') {
      setFiltered(payments)
    } else {
      setFiltered(
        payments.filter(p => p.customer?.id == selectedCustomer)
      )
    }
  }, [selectedCustomer, payments])

  const total = filtered.reduce((sum, p) => sum + parseFloat(p.debit || 0), 0)

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Payment History</h1>

        {/* Dropdown Select for Customer */}
        <div className="mb-4">
          <select
            value={selectedCustomer}
            onChange={e => setSelectedCustomer(e.target.value)}
            className="border rounded p-2 w-64"
          >
            <option value="">-- All Customers --</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.shop_name})
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <table className="w-full bg-white shadow text-sm rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Payment Method</th>
              <th className="p-3 text-right">Amount (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{new Date(p.date).toLocaleDateString('en-GB')}</td>
                <td className="p-3">{p.customer?.name}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3 text-right">
                  {parseFloat(p.debit).toLocaleString()}
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="font-bold bg-gray-100 border-t">
              <td className="p-3 text-right" colSpan="3">Total Received</td>
              <td className="p-3 text-right text-green-700">
                {total.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
