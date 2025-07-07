<?php
namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Models\SupplierLedger;
use App\Models\SupplierPurchase;
use App\Models\SupplierPurchaseItem;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierPurchaseController extends Controller
{
    public function create()
    {
        $suppliers = Supplier::all();
        return Inertia::render('Admin/Suppliers/Purchases/Create', compact('suppliers'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'supplier_id'   => 'required|exists:suppliers,id',
            'items'         => 'required|array|min:1',
            'items.*.name'  => 'required|string',
            'items.*.qty'   => 'required|numeric|min:1',
            'items.*.meter' => 'required|numeric|min:0',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        $billNo = 'PBILL-' . str_pad(SupplierPurchase::count() + 1, 3, '0', STR_PAD_LEFT);
        $total  = collect($request->items)->sum(fn($i) => $i['meter'] * $i['price']);

        $purchase = SupplierPurchase::create([
            'supplier_id' => $request->supplier_id,
            'bill_no'     => $billNo,
            'total'       => $total,
        ]);

        foreach ($request->items as $item) {
            SupplierPurchaseItem::create([
                'supplier_purchase_id' => $purchase->id,
                'qty'                  => $item['qty'],
                'name'                 => $item['name'],
                'meter'                => $item['meter'],
                'price'                => $item['price'],
                'total'                => $item['meter'] * $item['price'],
            ]);
        }

        SupplierLedger::create([
            'supplier_id' => $request->supplier_id,
            'date'        => now()->toDateString(),
            'name'        => $billNo,
            'debit'       => $total,
        ]);

        return to_route('admin.suppliers.purchases.show', $purchase->id);
    }

    public function show($id)
    {
        $bill = SupplierPurchase::with('supplier', 'items')->findOrFail($id);

        return Inertia::render('Admin/Suppliers/Purchases/Show', [
            'bill' => $bill,
        ]);
    }

    public function history()
    {
        $bills = SupplierPurchase::with('supplier')->latest()->get();

        return Inertia::render('Admin/Suppliers/Purchases/History', [
            'bills' => $bills,
        ]);
    }

    public function download($id)
    {
        $bill = SupplierPurchase::with('supplier', 'items')->findOrFail($id);
        $pdf  = Pdf::loadView('pdf.supplier_bill', compact('bill'));
        return $pdf->download("Supplier-Bill-{$bill->bill_no}.pdf");
    }
}
