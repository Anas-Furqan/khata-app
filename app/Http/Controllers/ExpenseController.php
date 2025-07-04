<?php
namespace App\Http\Controllers;

use App\Exports\ExpensesExport;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::orderBy('date', 'desc')->get();
        return Inertia::render('Admin/Expenses/Index', ['expenses' => $expenses]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'  => 'required',
            'amount' => 'required|numeric|min:1',
            'date'   => 'required|date',
            'note'   => 'nullable|string',
        ]);

        Expense::create($request->only('title', 'amount', 'date', 'note'));

        return back()->with('success', 'Expense added successfully!');
    }

    public function destroy($id)
    {
        Expense::findOrFail($id)->delete();
        return back()->with('success', 'Expense deleted!');
    }

    public function export()
    {
        return Excel::download(new ExpensesExport, 'expenses.xlsx');
    }
}
