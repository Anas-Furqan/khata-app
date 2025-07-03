import { Link } from '@inertiajs/react'
import { Users, Trash2, ChevronDown, ChevronUp, FileText, BookOpenText, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'

export default function AdminSidebar() {
  const [customerDropdown, setCustomerDropdown] = useState(false)
  const [billDropdown, setBillDropdown] = useState(false)
  const linkClass = "flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800"

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 space-y-4 fixed top-0 left-0">
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
    </div>
  )
}
