<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DishCategory extends Model
{
    protected $fillable = [
        'name', 'restaurant_id'
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function dishes()

    {
        return $this->hasMany(Dish::class, 'category_id');
    }
}
