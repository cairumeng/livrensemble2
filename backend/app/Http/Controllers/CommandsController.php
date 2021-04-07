<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Command;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CommandsController extends Controller
{
    public function show($id)
    {
        return Command::with('restaurant.categories.dishes')->find($id);
    }

    public function index(Request $request)
    {
        $cityId = $request->query('cityId', 1);
        $city = City::find($cityId);
        $cityCommands = Command::where('city_id', $cityId)->where('closed_time', '>',  Carbon::now())->with('restaurant')->get();
        return response()->json(['city' => $city, 'cityCommands' => $cityCommands]);
    }
}
