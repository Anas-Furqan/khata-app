<?php
namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Ledger;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LedgerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        return Inertia::render('Admin/Ledger/SelectCustomer', compact('customers'));
    }

    public function show($customer_id)
    {
        $customer   = Customer::findOrFail($customer_id);
        $rawEntries = Ledger::where('customer_id', $customer_id)
            ->orderBy('date')
            ->orderBy('id') // ensure order
            ->get();

        $balance = 0;
        $entries = $rawEntries->map(function ($entry) use (&$balance) {
            $credit = $entry->credit ?? 0;
            $debit  = $entry->debit ?? 0;

            $balance += $credit - $debit;

            return [
                'date'    => $entry->date,
                'name'    => $entry->name,
                'debit'   => $debit,
                'credit'  => $credit,
                'balance' => $balance,
            ];
        });

        return Inertia::render('Admin/Ledger/ViewLedger', [
            'customer' => $customer,
            'entries'  => $entries,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'name'        => 'required|string',
            'debit'       => 'required|numeric|min:1',
        ]);

        // Get last balance
        $last       = Ledger::where('customer_id', $request->customer_id)->latest()->first();
        $newBalance = ($last?->balance ?? 0) - $request->debit;

        Ledger::create([
            'customer_id' => $request->customer_id,
            'date'        => now()->toDateString(),
            'name'        => $request->name,
            'debit'       => $request->debit,
            'balance'     => $newBalance,
        ]);

        return back()->with('success', 'Payment recorded');
    }

    public function download($customer_id)
    {
        $customer = Customer::findOrFail($customer_id);

        $entries = Ledger::where('customer_id', $customer_id)
            ->orderBy('date')
            ->orderBy('id')
            ->get();

        $balance = 0;
        $entries = $entries->map(function ($entry) use (&$balance) {
            $credit = $entry->credit ?? 0;
            $debit  = $entry->debit ?? 0;
            $balance += $credit - $debit;

            return [
                'date'    => $entry->date,
                'name'    => $entry->name,
                'debit'   => $debit,
                'credit'  => $credit,
                'balance' => $balance,
            ];
        });

        $pdf = Pdf::loadView('pdf.ledger', [
            'customer' => $customer,
            'entries'  => $entries,
        ]);

        return $pdf->download("Ledger-{$customer->name}.pdf");
    }

}
