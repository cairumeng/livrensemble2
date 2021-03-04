<?php

namespace App\Models;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    protected $fillable = [
        'restaurant_id', 'name', 'price', 'ingredients', 'spicy_level', 'image', 'category_id', 'created_at', 'updated_at'
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function category()
    {
        return $this->belongsTo(DishCategory::class);
    }
}
