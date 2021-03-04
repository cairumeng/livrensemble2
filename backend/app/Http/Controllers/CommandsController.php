<?php

namespace App\Http\Controllers;

use App\Models\Command;

class CommandsController extends Controller
{

    public function show($id)
    {
        return Command::with('restaurant.categories.dishes')->find($id);
    }
}
