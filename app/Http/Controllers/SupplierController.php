<?php
namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Suppliers/Index', [
            'suppliers' => Supplier::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required',
            'phone' => 'required',
        ]);

        Supplier::create($request->all());

        return back()->with('success', 'Supplier added successfully!');
    }

    public function update(Request $request, Supplier $supplier)
    {
        $supplier->update($request->all());

        return back()->with('success', 'Supplier updated successfully!');
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return back()->with('success', 'Supplier moved to trash!');
    }

    public function trash()
    {
        $trashed = Supplier::onlyTrashed()->get();

        return Inertia::render('Admin/Suppliers/Trash', [
            'trashed' => $trashed,
        ]);                   
    }   

    public function restore($id)
    {
        Supplier::withTrashed()->findOrFail($id)->restore();
        return back()->with('success', 'Supplier restored successfully!');
    }

    public function forceDelete($id)
    {
        Supplier::withTrashed()->findOrFail($id)->forceDelete();
        return back()->with('success', 'Supplier permanently deleted!');
    }
}
