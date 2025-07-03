import AdminSidebar from '@/Components/AdminSidebar'

export default function ShowBill({ bill }) {
    const formatCurrency = value =>
        new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 0,
        }).format(value)

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-64 w-full p-6">
                <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold mb-2">Bill #{bill.bill_no}</h2>
                    <p><strong>Customer:</strong> {bill.customer.name} ({bill.customer.shop_name})</p>
                    <p><strong>Date:</strong> {new Date(bill.created_at).toLocaleDateString()}</p>

                    <table className="w-full mt-4 border text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Qty</th>
                                <th className="p-2 border">Item</th>
                                <th className="p-2 border">Meter</th>
                                <th className="p-2 border">Price</th>
                                <th className="p-2 border">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bill.items.map((item, i) => (
                                <tr key={i}>
                                    <td className="p-2 border text-center">{item.qty}</td>
                                    <td className="p-2 border text-center">{item.name}</td>
                                    <td className="p-2 border text-center">{formatCurrency(item.meter)}</td>
                                    <td className="p-2 border text-center">{formatCurrency(item.price)}</td>
                                    <td className="p-2 border text-center">{formatCurrency(item.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" className="p-2 border text-right font-bold">Total</td>
                                <td className="p-2 border text-center font-bold">{formatCurrency(bill.total)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <a
                        href={route('admin.bills.download', bill.id)}
                        className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        target="_blank"
                    >
                        Download PDF
                    </a>

                </div>
            </div>
        </div>
    )
}
