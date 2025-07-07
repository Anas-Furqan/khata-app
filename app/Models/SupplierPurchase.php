<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupplierPurchase extends Model
{
    protected $fillable = ['supplier_id', 'bill_no', 'total'];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function items()
    {
        return $this->hasMany(SupplierPurchaseItem::class);
    }

    protected $appends = ['supplier_name'];

    public function getSupplierNameAttribute()
    {
        return $this->supplier?->name;
    }

}
