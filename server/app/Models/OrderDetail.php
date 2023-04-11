<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    protected $table = 'order_details';
    protected $fillable = ['order_id', 'shoe_id', 'quantity', 'price'];

    public function order()
    {
        return $this->belongsTo(Orders::class);
    }

    public function shoe()
    {
        return $this->belongsTo(Shoe::class);
    }
    
}
