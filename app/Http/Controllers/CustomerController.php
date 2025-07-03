<?php
namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::latest()->get();
        return Inertia::render('Admin/Customers', ['customers' => $customers]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required',
            'phone'     => 'required',
            'shop_name' => 'required',
        ]);

        Customer::create($request->only('name', 'phone', 'shop_name', 'address'));
        return redirect()->back();
    }

    public function destroy(Customer $customer)
    {
        $customer->delete(); // Soft delete
        return redirect()->back();
    }

    public function trashed()
    {
        $trashed = Customer::onlyTrashed()->get();
        return Inertia::render('Admin/Customers/Trash', ['customers' => $trashed]);
    }

    public function restore($id)
    {
        Customer::onlyTrashed()->findOrFail($id)->restore();
        return redirect()->back();
    }

    public function forceDelete($id)
    {
        Customer::onlyTrashed()->findOrFail($id)->forceDelete();
        return redirect()->back();
    }

    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            'name'      => 'required',
            'phone'     => 'required',
            'shop_name' => 'required',
        ]);

        $customer->update($request->only('name', 'phone', 'shop_name', 'address'));
        return redirect()->back();
    }

}
