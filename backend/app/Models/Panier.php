<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    protected $fillable = [
        'command_id', 'user_id', 'dish_id', 'dish_quantity'
    ];
}
