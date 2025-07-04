<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Models\SupplierBill;
use App\Models\SupplierBillItem;
use App\Models\SupplierLedger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierBillController extends Controller
{
    public function create()
    {
        $suppliers = Supplier::all();
        return Inertia::render('Admin/Suppliers/GenerateBill', compact('suppliers'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string',
            'items.*.qty' => 'required|numeric|min:1',
            'items.*.meter' => 'required|numeric|min:0',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        $billNo = 'SUP-BILL-' . str_pad(SupplierBill::count() + 1, 3, '0', STR_PAD_LEFT);

        $total = collect($request->items)->sum(fn($i) => $i['meter'] * $i['price']);

        $bill = SupplierBill::create([
            'supplier_id' => $request->supplier_id,
            'bill_no'     => $billNo,
            'total'       => $total,
        ]);

        foreach ($request->items as $item) {
            SupplierBillItem::create([
                'supplier_bill_id' => $bill->id,
                'qty'    => $item['qty'],
                'name'   => $item['name'],
                'meter'  => $item['meter'],
                'price'  => $item['price'],
                'total'  => $item['meter'] * $item['price'],
            ]);
        }

        SupplierLedger::create([
            'supplier_id' => $request->supplier_id,
            'date'        => now()->toDateString(),
            'name'        => $billNo,
            'debit'       => $total, // Because we owe them
        ]);

        return to_route('admin.supplierbills.show', $bill->id);
    }
}