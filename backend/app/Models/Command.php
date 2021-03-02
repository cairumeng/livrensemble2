<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    protected $fillable = [
        'restaurant_id', 'current_price', 'total_price', 'start_time', 'closed_time', 'is_valid'
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id')->select(['id', 'name', 'email', 'phone_number', 'address', 'front_image', 'description']);
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id')->select(['id', 'city', 'postal_code']);
    }
}
