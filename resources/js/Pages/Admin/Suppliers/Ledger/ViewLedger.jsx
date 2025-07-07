import AdminSidebar from '@/Components/AdminSidebar'
import { useForm } from '@inertiajs/react'

export default function ViewLedger({ supplier, entries }) {
  const { data, setData, post, reset } = useForm({
    supplier_id: supplier.id,
    name: '',
    credit: '',
  })

  const submit = e => {
    e.preventDefault()
    post(route('admin.suppliers.ledger.store'), {
      onSuccess: () => reset('name') & reset('credit')
    })
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Ledger: {supplier.name}</h1>
          <a
            href={route('admin.suppliers.ledger.download', supplier.id)}
            className="bg-green-600 px-3 py-2 rounded text-white"
          >Download PDF</a>
        </div>

        {/* Add Payment Form */}
        <form onSubmit={submit} className="my-4 flex gap-2">
          <input
            type="text" placeholder="Payment Description"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            type="number" placeholder="Amount"
            value={data.credit}
            onChange={e => setData('credit', e.target.value)}
            className="border p-2 rounded w-32"
            required
          />
          <button type="submit" className="bg-blue-700 text-white px-4 rounded">Add Payment</button>
        </form>

        {/* Ledger Table */}
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Debit</th>
              <th className="p-2 border">Credit</th>
              <th className="p-2 border">Balance</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2 border">{e.date}</td>
                <td className="p-2 border">{e.name}</td>
                <td className="p-2 border">{e.debit ? Number(e.debit).toLocaleString() : ''}</td>
                <td className="p-2 border">{e.credit ? Number(e.credit).toLocaleString() : ''}</td>
                <td className="p-2 border">{Number(e.balance).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
