<?php
namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Customer;
use App\Models\Ledger;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalSales = Bill::sum('total');

        $totalOutstanding = Customer::all()->sum(function ($customer) {
            return Ledger::where('customer_id', $customer->id)->sum('credit') -
            Ledger::where('customer_id', $customer->id)->sum('debit');
        });

        $totalCustomers = Customer::count();

        $recentBills = Bill::with('customer')->latest()->take(5)->get();

        $duesByCustomer = Customer::with('ledger')->get()->map(function ($customer) {
            $credit = $customer->ledger->sum('credit');
            $debit  = $customer->ledger->sum('debit');
            return [
                'name' => $customer->name,
                'due'  => $credit - $debit,
            ];
        })->filter(fn($c) => $c['due'] > 0)->values();

        $topCustomers = Customer::with('bills')->get()->map(function ($customer) {
            return [
                'name'  => $customer->name,
                'total' => $customer->bills->sum('total'),
            ];
        })->sortByDesc('total')->take(5)->values();

        $billsPerMonth = Bill::select(
            DB::raw("DATE_FORMAT(created_at, '%b') as month"),
            DB::raw("MONTH(created_at) as month_num"),
            DB::raw("SUM(total) as total")
        )
            ->groupBy(DB::raw("DATE_FORMAT(created_at, '%b')"), DB::raw("MONTH(created_at)"))
            ->orderBy(DB::raw("month_num"))
            ->get();

        $last7DaysSales = Bill::select(
            DB::raw("DATE(created_at) as date"),
            DB::raw("SUM(total) as total")
        )->where('created_at', '>=', now()->subDays(6))
            ->groupBy(DB::raw("DATE(created_at)"))
            ->orderBy(DB::raw("DATE(created_at)"))
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'totalSales'       => $totalSales,
            'totalOutstanding' => $totalOutstanding,
            'totalCustomers'   => $totalCustomers,
            'recentBills'      => $recentBills,
            'duesByCustomer'   => $duesByCustomer,
            'topCustomers'     => $topCustomers,
            'billsPerMonth'    => $billsPerMonth,
            'last7DaysSales'   => $last7DaysSales,
        ]);
    }
}
