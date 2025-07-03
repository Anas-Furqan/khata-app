<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;
    protected $fillable = ['name', 'phone', 'shop_name', 'address'];

    public function ledger()
    {
        return $this->hasMany(\App\Models\Ledger::class, 'customer_id');
    }
    
    public function bills()
    {
        return $this->hasMany(\App\Models\Bill::class, 'customer_id');
    }
}
