<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'phone', 
        'company',
        'address'
    ];
}
