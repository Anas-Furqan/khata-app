<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supplier;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index() {
        $suppliers = Supplier::latest()->get();
        return Inertia::render('Admin/Suppliers/Index', ['suppliers' => $suppliers]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'phone' => 'nullable|string',
            'company' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        Supplier::create($request->all());
    }

    public function update(Request $request, Supplier $supplier) {
        $request->validate([
            'name' => 'required|string',
            'phone' => 'nullable|string',
            'company' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $supplier->update($request->all());
    }

    public function destroy(Supplier $supplier) {
        $supplier->delete();
    }

    public function trash() {
        $suppliers = Supplier::onlyTrashed()->latest()->get();
        return Inertia::render('Admin/Suppliers/Trash', ['suppliers' => $suppliers]);
    }

    public function restore($id) {
        Supplier::withTrashed()->findOrFail($id)->restore();
    }

    public function forceDelete($id) {
        Supplier::withTrashed()->findOrFail($id)->forceDelete();
    }
}
