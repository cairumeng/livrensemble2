<?php

namespace App\Http\Controllers;

use App\Models\Command;
use Illuminate\Http\Request;

class CommandsController extends Controller
{
    public function index()
    {

        $commands = Command::with('restaurant', 'city')->orderBy('city_id')->get();
        return $commands->groupBy('city_id');
    }
}