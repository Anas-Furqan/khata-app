import { Link } from '@inertiajs/react'
import { Users, Trash2, ChevronDown, ChevronUp, FileText, BookOpenText, LayoutDashboard, DollarSign, BookOpen } from 'lucide-react'
import { useState } from 'react'

export default function AdminSidebar() {
  const [customerDropdown, setCustomerDropdown] = useState(false)
  const [billDropdown, setBillDropdown] = useState(false)
  const [supplierOpen, setSupplierOpen] = useState(false)
  const linkClass = "flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800"

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 space-y-4 fixed top-0 left-0 overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <Link href="/adminpanel/dashboard" className={linkClass}>
        <LayoutDashboard size={18} /> Dashboard
      </Link>

      {/* Customer Dropdown */}
      <div>
        <button
          onClick={() => setCustomerDropdown(!customerDropdown)}
          className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-800"
        >
          <span className="flex items-center gap-2">
            <Users size={18} /> Customers
          </span>
          {customerDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {customerDropdown && (
          <div className="ml-6 mt-2 space-y-1 text-sm">
            <Link href="/adminpanel/customers" className="block px-2 py-1 rounded hover:bg-gray-800">
              Customer List
            </Link>
            <Link href="/adminpanel/customers/trash" className="block px-2 py-1 rounded hover:bg-gray-800">
              Trash
            </Link>
          </div>
        )}
      </div>

      {/* Bill Dropdown */}
      <div>
        <button
          onClick={() => setBillDropdown(!billDropdown)}
          className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-800"
        >
          <span className="flex items-center gap-2">
            <FileText size={18} /> Bill
          </span>
          {billDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {billDropdown && (
          <div className="ml-6 mt-2 space-y-1 text-sm">
            <Link href="/adminpanel/bills/create" className="block px-2 py-1 rounded hover:bg-gray-800">
              🧾 Generate Bill
            </Link>
            <Link href="/adminpanel/bills/history" className="block px-2 py-1 rounded hover:bg-gray-800">
              📜 Bill History
            </Link>
          </div>
        )}
      </div>
      <Link href="/adminpanel/ledger" className={linkClass}>
        <BookOpenText size={18} />Search Ledger
      </Link>

      <Link href="/adminpanel/expenses" className={linkClass}>
        <DollarSign size={18} /> Expenses
      </Link>

      <Link href="/adminpanel/payments" className={linkClass}>
        <BookOpen size={18} /> Payment History
      </Link>

      {/* Suppliers Dropdown */}
      <div>
        <button onClick={() => setSupplierOpen(!supplierOpen)} className={`${linkClass} w-full justify-between`}>
          <span className="flex items-center gap-2">
            <Users size={18} /> Suppliers
          </span>
          {supplierOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {supplierOpen && (
          <div className="ml-6 mt-2 space-y-1 text-sm">
            <Link href="/adminpanel/suppliers" className={linkClass}>Supplier List</Link>
            <Link href="/adminpanel/suppliers/trash" className={linkClass}>Trash</Link>
            <Link href="/adminpanel/suppliers/purchases/create" className={linkClass}>Generate Purchase Bill</Link>
            <Link href="/adminpanel/suppliers/purchases/history" className={linkClass}>Bill History</Link>
            <Link href="/adminpanel/suppliers/ledger" className={linkClass}>Ledger</Link>
            <Link href="/adminpanel/suppliers/dashboard" className={linkClass}>Dashboard</Link>
          </div>
        )}
      </div>

    </div>
  )
}
