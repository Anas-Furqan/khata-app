<?php
namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Models\SupplierLedger;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierLedgerController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Suppliers/Ledger/SelectSupplier', [
            'suppliers' => Supplier::all(),
        ]);
    }

    public function show($supplier_id)
{
    $supplier = Supplier::findOrFail($supplier_id);
    $rawEntries = SupplierLedger::where('supplier_id', $supplier_id)
        ->orderBy('date')
        ->orderBy('id')
        ->get();

    $runningBalance = 0;
    $entries = [];

    foreach ($rawEntries as $entry) {
        $runningBalance += $entry->debit - $entry->credit;

        $entries[] = [
            'date'    => $entry->date,
            'name'    => $entry->name,
            'debit'   => $entry->debit,
            'credit'  => $entry->credit,
            'balance' => $runningBalance,
        ];
    }

    return Inertia::render('Admin/Suppliers/Ledger/ViewLedger', [
        'supplier' => $supplier,
        'entries' => $entries,
    ]);
}


    public function store(Request $r)
    {
        $r->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'name'        => 'required|string',
            'credit'      => 'required|numeric|min:1',
        ]);

        // ✅ Get last balance (null if no previous)
        $rawEntries = SupplierLedger::where('supplier_id', $supplier_id)
            ->orderBy('date')
            ->orderBy('id')
            ->get();

        $balance = 0;
        $entries = $rawEntries->map(function ($entry) use (&$balance) {
            $balance += $entry->debit - $entry->credit;

            return [
                'date'    => $entry->date,
                'name'    => $entry->name,
                'debit'   => $entry->debit,
                'credit'  => $entry->credit,
                'balance' => $balance,
            ];
        });

        return back()->with('success', 'Payment recorded.');
    }

    public function download($id)
    {
        $supplier = Supplier::findOrFail($id);
        $entries  = SupplierLedger::where('supplier_id', $id)
            ->orderBy('date')
            ->get()
            ->map(fn($e) => [
                'date'    => $e->date,
                'name'    => $e->name,
                'debit'   => $e->debit ?: 0,
                'credit'  => $e->credit ?: 0,
                'balance' => $e->balance,
            ]);

        $pdf = Pdf::loadView('pdf.supplier_ledger', [
            'supplier' => $supplier, 'entries' => $entries,
        ]);

        return $pdf->download("Ledger_{$supplier->name}.pdf");
    }
}
