<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'phone', 'company', 'address'];

    public function purchases()
    {
        return $this->hasMany(SupplierPurchase::class);
    }

    public function ledgers()
    {
        return $this->hasMany(\App\Models\SupplierLedger::class);
    }

}
