<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'command_id', 'user_id', 'dish_id', 'dish_quantity'
    ];
    public function dish()
    {
        return $this->belongsTo(Dish::class, 'dish_id')->select('id', 'name', 'price');
    }
}
