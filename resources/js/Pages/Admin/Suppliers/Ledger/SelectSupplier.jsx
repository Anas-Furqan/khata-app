import AdminSidebar from '@/Components/AdminSidebar'
import { useState } from 'react'

export default function SelectSupplier({ suppliers }) {
  const [selected, setSelected] = useState('')
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Select Supplier for Ledger</h1>
        <select
          className="border p-2 rounded mb-4"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="">-- Choose Supplier --</option>
          {suppliers.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        {selected && (
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => window.location = route('admin.suppliers.ledger.show', selected)}
          >
            View Ledger
          </button>
        )}
      </div>
    </div>
  )
}
