<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Models\SupplierPurchase;
use App\Models\SupplierLedger;
use Inertia\Inertia;

class SupplierDashboardController extends Controller
{
    public function index()
    {
        $totalPurchase = SupplierPurchase::sum('total');
        $totalSuppliers = Supplier::count();

        $totalOutstanding = Supplier::all()->sum(function ($supplier) {
            $credit = SupplierLedger::where('supplier_id', $supplier->id)->sum('credit');
            $debit = SupplierLedger::where('supplier_id', $supplier->id)->sum('debit');
            return $debit - $credit;
        });

        $recentBills = SupplierPurchase::latest()->take(5)->get();

        $outstandingBySupplier = Supplier::with(['ledgers'])->get()->map(function ($supplier) {
            $credit = $supplier->ledgers->sum('credit');
            $debit = $supplier->ledgers->sum('debit');
            return [
                'name' => $supplier->name,
                'outstanding' => $debit - $credit,
            ];
        })->filter(fn($entry) => $entry['outstanding'] > 0)->values();

        return Inertia::render('Admin/Suppliers/Dashboard', [
            'totalPurchase' => $totalPurchase,
            'totalSuppliers' => $totalSuppliers,
            'totalOutstanding' => $totalOutstanding,
            'recentBills' => $recentBills,
            'outstandingBySupplier' => $outstandingBySupplier,
        ]);
    }
}
