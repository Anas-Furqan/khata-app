<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ledger extends Model
{
    protected $fillable = [
        'customer_id',
        'date',
        'name',
        'debit',
        'credit',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
