import AdminSidebar from '@/Components/AdminSidebar'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { Link } from '@inertiajs/react'

export default function Dashboard({
    totalPurchase,
    totalOutstanding,
    totalSuppliers,
    recentBills,
    outstandingBySupplier,
}) {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-64 w-full p-6">
                <h1 className="text-2xl font-bold mb-6">Supplier Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-100 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Total Purchase</h2>
                        <p className="text-xl font-bold">Rs {Number(totalPurchase).toLocaleString()}</p>
                    </div>
                    <div className="bg-red-100 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Total Outstanding</h2>
                        <p className="text-xl font-bold">Rs {Number(totalOutstanding).toLocaleString()}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Total Suppliers</h2>
                        <p className="text-xl font-bold">{totalSuppliers}</p>
                    </div>
                </div>

                {/* Outstanding by Supplier Chart */}
                <div className="mb-10 bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4">Outstanding by Supplier</h2>
                    <Bar
                        data={{
                            labels: outstandingBySupplier.map((s) => s.name),
                            datasets: [
                                {
                                    label: 'Outstanding',
                                    backgroundColor: '#f97316',
                                    data: outstandingBySupplier.map((s) => s.outstanding),
                                },
                            ],
                        }}
                        options={{ responsive: true, plugins: { legend: { display: false } } }}
                    />
                </div>

                {/* Recent Bills Table */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4">Recent Purchase Bills</h2>
                    <table className="w-full table-auto border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border">Date</th>
                                <th className="p-2 border">Bill #</th>
                                <th className="p-2 border">Supplier</th>
                                <th className="p-2 border">Total</th>
                                <th className="p-2 border">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBills.map((bill) => (
                                <tr key={bill.id}>
                                    <td className="p-2 border">{new Date(bill.created_at).toDateString()}</td>
                                    <td className="p-2 border">{bill.bill_no}</td>
                                    <td className="p-2 border">{bill.supplier_name}</td>
                                    <td className="p-2 border">Rs {Number(bill.total).toLocaleString()}</td>
                                    <td className="p-2 border text-center">
                                        <a
                                            href={`/adminpanel/suppliers/purchases/${bill.id}/download`}
                                            className="text-blue-600 underline"
                                            target="_blank"
                                        >
                                            Download
                                        </a>
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
