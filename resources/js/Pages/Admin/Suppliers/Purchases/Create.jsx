import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import AdminSidebar from '@/Components/AdminSidebar'
import { PlusCircle, Trash2 } from 'lucide-react'

// Format currency
const formatCurrency = (value) =>
    new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
    }).format(value)

export default function Create({ suppliers }) {
    const [items, setItems] = useState([{ name: '', qty: 1, meter: 0, price: 0 }])

    const { data, setData, post } = useForm({
        supplier_id: '',
        items: [],
        total: 0,
    })

    const addItem = () => {
        setItems([...items, { name: '', qty: 1, meter: 0, price: 0 }])
    }

    const updateItem = (index, key, value) => {
        const updated = [...items]
        updated[index][key] = value
        setItems(updated)
    }

    const removeItem = (index) => {
        const updated = [...items]
        updated.splice(index, 1)
        setItems(updated)
    }

    const totalAmount = items.reduce((sum, item) => sum + item.meter * item.price, 0)

    const handleSubmit = (e) => {
        e.preventDefault()
        setData('items', items)
        setData('total', totalAmount)

        post(route('admin.suppliers.purchases.store'), {
            onSuccess: () => {
                alert('Purchase bill generated successfully!')
                setItems([{ name: '', qty: 1, meter: 0, price: 0 }])
                setData('supplier_id', '')
            },
        })
    }

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="ml-64 w-full p-6">
                <h1 className="text-2xl font-bold mb-6">Generate Purchase Bill</h1>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
                    <div>
                        <label className="block mb-1 font-semibold">Select Supplier</label>
                        <select
                            value={data.supplier_id}
                            onChange={(e) => setData('supplier_id', e.target.value)}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">-- Choose Supplier --</option>
                            {suppliers.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name} ({s.company})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dynamic Items */}
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={index} className="grid grid-cols-6 gap-2 items-center">
                                <input
                                    type="text"
                                    placeholder="Item Name"
                                    className="border p-2 rounded col-span-2"
                                    value={item.name}
                                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                                />

                                <input
                                    type="number"
                                    placeholder="Qty"
                                    className="border p-2 rounded"
                                    value={item.qty || 0}
                                    onChange={(e) => updateItem(index, 'qty', parseFloat(e.target.value) || 0)}
                                />

                                <input
                                    type="number"
                                    placeholder="Meter"
                                    className="border p-2 rounded"
                                    value={item.meter || 0}
                                    onChange={(e) => updateItem(index, 'meter', parseFloat(e.target.value) || 0)}
                                />

                                <input
                                    type="number"
                                    placeholder="Price"
                                    className="border p-2 rounded"
                                    value={item.price || 0}
                                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                                />

                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold">
                                        {formatCurrency(item.meter * item.price)}
                                    </span>
                                    {items.length > 1 && (
                                        <button type="button" onClick={() => removeItem(index)} className="text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={addItem}
                            className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2"
                        >
                            <PlusCircle size={16} /> Add Item
                        </button>
                    </div>

                    {/* Total Display */}
                    <div className="text-right text-lg font-bold">
                        Total: {formatCurrency(totalAmount)}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
                    >
                        Generate Bill
                    </button>
                </form>
            </div>
        </div>
    )
}
