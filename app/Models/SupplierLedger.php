<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SupplierLedger extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id', 'date', 'name', 'debit', 'credit', 'balance'
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
