<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    protected $fillable = [
        'restaurant_id', 'current_price', 'total_price', 'start_time', 'city_id', 'delivery_time', 'closed_time', 'is_valid', 'delivery_option', 'address'
    ];

    protected $dates = [
        'delivery_time', 'closed_time', 'start_time'
    ];

    protected $casts = [
        'delivery_option' => 'integer',
        'total_price' => 'float',
        'current_price' => 'float'
    ];


    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id')->select(['id', 'name', 'email', 'phone_number', 'address', 'front_image', 'description']);
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id')->select(['id', 'city', 'postal_code']);
    }

    public function sousCommands()
    {
        return $this->hasMany(SousCommand::class);
    }
}
