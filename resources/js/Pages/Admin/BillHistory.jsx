import AdminSidebar from '@/Components/AdminSidebar'
import { Link } from '@inertiajs/react'

export default function BillHistory({ bills }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <h1 className="text-2xl font-bold mb-6">Bill History</h1>

        <table className="w-full bg-white rounded shadow text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Bill No</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-right">PDF</th>
            </tr>
          </thead>
          <tbody>
            {bills.map(bill => (
              <tr key={bill.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{bill.bill_no}</td>
                <td className="p-3">{bill.customer?.name}</td>
                <td className="p-3">
                  {new Date(bill.created_at).toLocaleDateString('en-GB')}
                </td>
                <td className="p-3 text-right">Rs {Number(bill.total).toLocaleString()}</td>
                <td className="p-3 text-right">
                  <a
                    href={route('admin.bills.show', bill.id)}
                    className="text-blue-600 underline"
                    target="_blank"
                  >
                    Download PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
