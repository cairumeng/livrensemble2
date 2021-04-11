<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    const STATUS_GROUPING = 0;
    const STATUS_CONFIRMED = 1;
    const STATUS_CANCEL = 2;
    const STATUS_DELIVERED = 3;

    protected $fillable = [
        'restaurant_id', 'current_price', 'total_price', 'start_time', 'city_id', 'delivery_time', 'closed_time', 'status', 'delivery_option', 'address'
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
