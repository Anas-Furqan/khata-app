<?php
namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\BillItems;
use App\Models\Customer;
use App\Models\Ledger;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillController extends Controller
{
    public function create()
    {
        $customers = Customer::all();
        return inertia('Admin/GenerateBill', ['customers' => $customers]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id'   => 'required|exists:customers,id',
            'items'         => 'required|array|min:1',
            'items.*.name'  => 'required|string',
            'items.*.qty'   => 'required|numeric|min:1',
            'items.*.meter' => 'required|numeric|min:0',
            'items.*.price' => 'required|numeric|min:0',
        ]);
        // Auto Bill Number
        $billNo = 'BILL-' . str_pad(Bill::count() + 1, 3, '0', STR_PAD_LEFT);

        // Create Bill
        $bill = Bill::create([
            'customer_id' => $request->customer_id,
            'bill_no'     => $billNo,
            'total'       => collect($request->items)->sum(fn($i) => $i['meter'] * $i['price']),
        ]);

        // Insert Items
        foreach ($request->items as $item) {
            BillItems::create([
                'bill_id' => $bill->id,
                'qty'     => $item['qty'],
                'name'    => $item['name'],
                'meter'   => $item['meter'],
                'price'   => $item['price'],
                'total'   => $item['meter'] * $item['price'],
            ]);
        }

        // Insert into Ledger
        Ledger::create([
            'customer_id' => $request->customer_id,
            'date'        => now()->toDateString(),
            'name'        => $billNo,
            'credit'      => $bill->total,
        ]);

        return to_route('admin.bills.show', $bill->id);
    }

    public function show(Bill $bill)
    {
        $bill->load('customer', 'items');

        return Inertia::render('Admin/ShowBill', [
            'bill' => $bill,
        ]);
    }

    public function download(Bill $bill)
    {
        $bill->load('customer', 'items');

        $pdf = Pdf::loadView('pdf.bill', ['bill' => $bill]);
        return $pdf->download($bill->bill_no . '.pdf');
    }

    public function history()
    {
        $bills = Bill::with('customer')->latest()->get();
        return Inertia::render('Admin/BillHistory', [
            'bills' => $bills,
        ]);
    }

}
