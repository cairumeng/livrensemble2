<?php

namespace App\Http\Controllers;

use App\Models\SousCommand;
use App\Models\SousCommandDish;

class RestaurantSousCommandsController extends Controller
{
    public function index($commandId)
    {
        return SousCommand::with('user', 'address')->where('command_id', $commandId)->get();
    }

    public function show($sousCommandId)
    {
        $sousCommand = SousCommand::with('user', 'address')->find($sousCommandId);

        $sousCommandDishes = SousCommandDish::with('dish')->where('sous_command_id', $sousCommandId)->get();


        return response()->json(['sousCommand' => $sousCommand, 'sousCommandDishes' => $sousCommandDishes]);
    }
}
