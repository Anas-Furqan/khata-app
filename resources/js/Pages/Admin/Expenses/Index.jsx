import { useForm } from '@inertiajs/react'
import AdminSidebar from '@/Components/AdminSidebar'
import { Trash2 } from 'lucide-react'

export default function ExpenseIndex({ expenses }) {
    const { data, setData, post, reset } = useForm({
        title: '', amount: '', date: '', note: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('admin.expenses.store'), {
            onSuccess: () => reset()
        })
    }

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-64 w-full p-6">
                <h1 className="text-2xl font-bold mb-6">Manage Expenses</h1>

                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
                    <input type="text" placeholder="Expense Title" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full border p-2 rounded" />
                    <input type="number" placeholder="Amount" value={data.amount} onChange={e => setData('amount', e.target.value)} className="w-full border p-2 rounded" />
                    <input type="date" value={data.date} onChange={e => setData('date', e.target.value)} className="w-full border p-2 rounded" />
                    <textarea placeholder="Optional Note" value={data.note} onChange={e => setData('note', e.target.value)} className="w-full border p-2 rounded" />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Expense</button>
                </form>



                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Expense History</h2>
                    <table className="w-full bg-white rounded shadow text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Date</th>
                                <th className="p-2">Title</th>
                                <th className="p-2">Amount</th>
                                <th className="p-2">Note</th>
                                <th className="p-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((e, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2">{e.date}</td>
                                    <td className="p-2">{e.title}</td>
                                    <td className="p-2">Rs {parseInt(e.amount).toLocaleString()}</td>
                                    <td className="p-2">{e.note}</td>
                                    <td className="p-2 text-right">
                                        <button onClick={() => router.delete(route('admin.expenses.destroy', e.id))} className="text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="text-right mt-4 text-lg font-bold">
                    Total Expense: Rs {expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0).toLocaleString()}
                </div>

                <div className='mt-6 flex justify-end'>
                    <a href={route('admin.expenses.export')} className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Download Excel
                    </a>
                </div>

            </div>
        </div>
    )
}
