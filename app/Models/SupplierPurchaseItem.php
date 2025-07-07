<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupplierPurchaseItem extends Model
{
    protected $fillable = ['supplier_purchase_id', 'name', 'qty', 'meter', 'price', 'total'];

    public function purchase()
    {
        return $this->belongsTo(SupplierPurchase::class, 'supplier_purchase_id');
    }
}
