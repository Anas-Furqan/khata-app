import AdminSidebar from '@/Components/AdminSidebar'

export default function Show({ bill }) {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-64 w-full p-6 bg-white shadow rounded">
                <h2 className="text-2xl font-bold mb-4">Purchase Bill: {bill.bill_no}</h2>
                <p><strong>Supplier:</strong> {bill.supplier.name} ({bill.supplier.company})</p>
                <p><strong>Date:</strong> {new Date(bill.created_at).toLocaleDateString('en-GB')}</p>
                <p><strong>Total:</strong> Rs. {parseInt(bill.total).toLocaleString()}</p>

                <table className="w-full mt-6 border">
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
                                <td className="p-2 border">{item.qty}</td>
                                <td className="p-2 border">{item.name}</td>
                                <td className="p-2 border">{item.meter}</td>
                                <td className="p-2 border">{item.price}</td>
                                <td className="p-2 border">{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <a
                        href={route('admin.supplier.purchases.download', bill.id)}
                        className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        target="_blank"
                    >
                        Download PDF
                    </a>
            </div>
        </div>
    );
}
