<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BillItems extends Model
{
    protected $fillable = [
        'bill_id',
        'qty',
        'name',
        'meter',
        'price',
        'total',
    ];

    public function bill()
    {
        return $this->belongsTo(Bill::class, 'bill_id');
    }
}
