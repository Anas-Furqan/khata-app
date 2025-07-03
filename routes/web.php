<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LedgerController; 
use App\Http\Controllers\DashboardController; 
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';



Route::get('/', [AdminController::class, 'showLogin'])->name('admin.login');
Route::post('/adminpanel/login', [AdminController::class, 'login'])->name('admin.login.attempt');
Route::get('/adminpanel/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

Route::middleware(['admin.auth'])->prefix('adminpanel')->group(function () {
    Route::get('/customers', [CustomerController::class, 'index'])->name('admin.customers.index');
    Route::post('/customers', [CustomerController::class, 'store'])->name('admin.customers.store');
    Route::delete('/customers/{customer}', [CustomerController::class, 'destroy'])->name('admin.customers.destroy');

    // Trash Routes
    Route::get('/customers/trash', [CustomerController::class, 'trashed'])->name('admin.customers.trashed');
    Route::post('/customers/{id}/restore', [CustomerController::class, 'restore'])->name('admin.customers.restore');
    Route::delete('/customers/{id}/force', [CustomerController::class, 'forceDelete'])->name('admin.customers.force');
    Route::put('/customers/{customer}', [CustomerController::class, 'update'])->name('admin.customers.update');

});







// Bill routes
Route::get('/adminpanel/bills/create', [BillController::class, 'create'])->name('admin.bills.create');
Route::post('/adminpanel/bills', [BillController::class, 'store'])->name('admin.bills.store');
Route::get('/adminpanel/bills/history', [BillController::class, 'history'])->name('admin.bills.history');
Route::get('/adminpanel/bills/{bill}', [BillController::class, 'show'])->name('admin.bills.show');
Route::get('/adminpanel/bills/{bill}/download', [BillController::class, 'download'])->name('admin.bills.download');
Route::get('/adminpanel/bills/history', [BillController::class, 'history'])->name('admin.bills.history');




//ledger routes
Route::get('/adminpanel/ledger', [LedgerController::class, 'index'])->name('admin.ledger.index');
Route::get('/adminpanel/ledger/{customer}', [LedgerController::class, 'show'])->name('admin.ledger.show');
Route::post('/adminpanel/ledger', [LedgerController::class, 'store'])->name('admin.ledger.store');
Route::get('/adminpanel/ledger/{customer}/download', [LedgerController::class, 'download'])->name('admin.ledger.download');
