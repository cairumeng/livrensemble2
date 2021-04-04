<?php

namespace App\Http\Controllers;

use App\Models\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class RestaurantCommandsController extends Controller
{
    public function index()
    {
        $restaurant_id = Auth::user()->restaurant->id;
        return Command::with('city')->where('restaurant_id', $restaurant_id)->get();
    }

    public function store(Request $request)
    {

        $restaurant_id = Auth::user()->restaurant->id;

        $request->validate([
            'city_id' => 'required',
            'total_price' => 'required|min:0',
            'start_time' => 'required',
            'closed_time' => 'required|date|after:start_time',
            'delivery_time' => 'required|date|after:closed_time',
            'delivery_option' => 'required'
        ]);
        $command = Command::create([
            'restaurant_id' => $restaurant_id,
            'city_id' => $request->city_id,
            'current_price' => 0,
            'total_price' => $request->total_price,
            'start_time' => $request->start_time,
            'closed_time' => $request->closed_time,
            'delivery_time' => $request->delivery_time,
            'delivery_option' => $request->delivery_option,
            'address' => $request->address,
        ]);
        return $command->load('city');
    }

    public function destroy(Command $command)
    {
        return $command->delete();
    }
}
