<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'customer_id',
        'total_price',
        'customer_name',
        'customer_phone',
        'customer_address',
        'payment_method',
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}
