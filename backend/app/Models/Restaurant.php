<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Restaurant extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        '$name', 'email', 'phone_number', 'address', 'front_image', 'user_id'
    ];
    public function dishes()
    {
        return $this->hasMany(Dish::class, 'restaurant_id');
    }

    public function categories()
    {
        return $this->hasMany(DishCategory::class, 'restaurant_id');
    }
}
