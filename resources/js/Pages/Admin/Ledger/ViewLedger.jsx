import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import AdminSidebar from '@/Components/AdminSidebar'
import { PlusCircle, X } from 'lucide-react'

export default function ViewLedger({ customer, entries }) {
    const [showModal, setShowModal] = useState(false)
    const { data, setData, post, reset, errors } = useForm({
        customer_id: customer.id,
        name: '',
        debit: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('admin.ledger.store'), {
            onSuccess: () => {
                setShowModal(false)
                reset('name', 'debit')
            }
        })
    }

    const formatNumber = (value) =>
        value ? Number(value).toLocaleString('en-PK', { maximumFractionDigits: 0 }) : '';


    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-64 w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Ledger: {customer.name} ({customer.shop_name})</h1>


                    <button onClick={() => setShowModal(true)} className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2">
                        <PlusCircle size={16} /> Add Entry
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded shadow text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-center">Date</th>
                                <th className="p-3 text-center">Name</th>
                                <th className="p-3 text-center">Debit</th>
                                <th className="p-3 text-center">Credit</th>
                                <th className="p-3 text-center">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50 text-center">
                                    <td className="p-3">{new Date(entry.date).toLocaleDateString('en-GB')}</td>
                                    <td className="p-3">{entry.name}</td>
                                    <td className="p-3">₨{formatNumber(entry.debit || 0).toLocaleString()}</td>
                                    <td className="p-3">₨{formatNumber(entry.credit || 0).toLocaleString()}</td>
                                    <td className="p-3 font-semibold">₨{formatNumber(entry.balance || 0).toLocaleString()}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5 flex justify-end space-x-3">
                    <a href={route('admin.ledger.download', customer.id)} target="_blank"
                        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                        Download PDF
                    </a>
                </div>
                {/* Add Entry Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
                            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
                                <X />
                            </button>
                            <h2 className="text-xl font-bold mb-4">Add Manual Payment</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="text" placeholder="Payment Mode (e.g. Cash / Cheque / JazzCash)" className="w-full border p-2 rounded"
                                    value={data.name} onChange={e => setData('name', e.target.value)} />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

                                <input type="number" placeholder="Amount" className="w-full border p-2 rounded"
                                    value={data.debit} onChange={e => setData('debit', e.target.value)} />
                                {errors.debit && <p className="text-sm text-red-500">{errors.debit}</p>}

                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Save Entry
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
