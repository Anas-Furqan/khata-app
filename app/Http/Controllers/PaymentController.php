<?php
namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Ledger;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Ledger::with('customer')
            ->whereNotNull('debit')
            ->orderByDesc('date')
            ->get();

        $customers = Customer::all();

        return Inertia::render('Admin/Payments/Index', [
            'payments'  => $payments,
            'customers' => $customers,
        ]);
    }
}
