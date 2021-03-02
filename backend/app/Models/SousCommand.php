<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SousCommand extends Model
{
    protected $fillable = [
        'command_id', 'user_id', 'amount', 'address', 'note', 'created_at', 'updated_at'
    ];

    public function command()
    {
        return $this->belongsTo(Command::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
