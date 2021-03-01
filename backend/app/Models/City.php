<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = [
        'city', 'postal_code'
    ];

    public function commands()
    {
        return $this->hasMany(Command::class, 'city_id');
    }
}
