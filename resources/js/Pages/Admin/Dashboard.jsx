import { Bar, Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js'
import { Link } from '@inertiajs/react'
import AdminSidebar from '@/Components/AdminSidebar'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement)

export default function Dashboard({ totalSales, totalOutstanding, totalCustomers, recentBills, duesByCustomer, topCustomers, billsPerMonth, last7DaysSales }) {
  const formatRs = (n) => Number(n).toLocaleString('en-PK')

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-xl mt-2 font-bold text-green-600">Rs {formatRs(totalSales)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Outstanding Dues</h2>
            <p className="text-xl mt-2 font-bold text-red-600">Rs {formatRs(totalOutstanding)}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Customers</h2>
            <p className="text-xl mt-2 font-bold text-blue-600">{totalCustomers}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Outstanding Dues by Customer</h2>
            <Bar data={{
              labels: duesByCustomer.map(c => c.name),
              datasets: [{
                label: 'Outstanding Rs',
                data: duesByCustomer.map(c => c.due),
                backgroundColor: 'rgba(255,99,132,0.6)',
              }]
            }} options={{ responsive: true, plugins: { tooltip: { enabled: true }}}} />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Top 5 Customers by Sales</h2>
            <Pie data={{
              labels: topCustomers.map(c => c.name),
              datasets: [{
                data: topCustomers.map(c => c.total),
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF']
              }]
            }} options={{ responsive: true, plugins: { tooltip: { enabled: true }}}} />
          </div>

          <div className="bg-white p-4 rounded shadow col-span-2">
            <h2 className="text-lg font-semibold mb-4">Sales in Last 7 Days</h2>
            <Line data={{
              labels: last7DaysSales.map(b => b.date),
              datasets: [{
                label: 'Sales',
                data: last7DaysSales.map(b => b.total),
                fill: true,
                borderColor: '#4BC0C0',
                backgroundColor: 'rgba(75,192,192,0.2)'
              }]
            }} options={{ responsive: true, plugins: { tooltip: { enabled: true }}}} />
          </div>

          <div className="bg-white p-4 rounded shadow col-span-2">
            <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
            <Bar data={{
              labels: billsPerMonth.map(b => b.month),
              datasets: [{
                label: 'Total Sales',
                data: billsPerMonth.map(b => b.total),
                backgroundColor: '#36A2EB'
              }]
            }} options={{ responsive: true, plugins: { tooltip: { enabled: true }}}} />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Bills</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentBills.map((bill, i) => (
                <tr key={bill.id} className="border-b">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{bill.customer?.name}</td>
                  <td className="p-2">Rs {formatRs(bill.total)}</td>
                  <td className="p-2">{new Date(bill.created_at).toLocaleDateString()}</td>
                  <td className="p-2 text-right">
                    <Link href={route('admin.bills.show', bill.id)} className="text-blue-600 hover:underline">
                      Download
                    </Link>
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
