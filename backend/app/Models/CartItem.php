<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'command_id', 'user_id', 'dish_id', 'dish_quantity'
    ];

    protected $casts = [
        'dish_quantity' => 'integer',
    ];
    public function dish()
    {
        return $this->belongsTo(Dish::class, 'dish_id')->select('id', 'name', 'price');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
