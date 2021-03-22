<?php

namespace App\Models;

use App\Models\Dish;
use App\Models\SousCommand;
use Illuminate\Database\Eloquent\Model;

class SousCommandDish extends Model
{
    protected $fillable = [
        'sous_command_id', 'dish_id', 'dish_quantity'
    ];

    protected $casts = [
        'dish_quantity' => 'integer',
    ];

    public function sousCommand()
    {
        return $this->belongsTo(SousCommand::class);
    }

    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
}
