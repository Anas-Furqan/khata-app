import AdminSidebar from '@/Components/AdminSidebar'
import { Link } from '@inertiajs/react'

export default function History({ bills }) {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-64 w-full p-6">
                <h1 className="text-2xl font-bold mb-4">Supplier Bill History</h1>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-3 py-2">Bill No</th>
                                <th className="border px-3 py-2">Supplier</th>
                                <th className="border px-3 py-2">Date</th>
                                <th className="border px-3 py-2">Total</th>
                                <th className="border px-3 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill) => (
                                <tr key={bill.id}>
                                    <td className="border px-3 py-2">{bill.bill_no}</td>
                                    <td className="border px-3 py-2">{bill.supplier.name}</td>
                                    <td className="border px-3 py-2">
                                        {new Date(bill.created_at).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className="border px-3 py-2">
                                        Rs {parseFloat(bill.total).toLocaleString()}
                                    </td>
                                    <td className="border px-3 py-2">
                                        <Link
                                                    href={route('admin.supplier.purchases.download', bill.id)}
                                            className="text-blue-600 underline"
                                        >
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
