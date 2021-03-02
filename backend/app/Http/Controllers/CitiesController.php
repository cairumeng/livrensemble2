<?php

namespace App\Http\Controllers;

use App\Models\City;

class CitiesController extends Controller
{
    public function index()
    {
        return City::select('id', 'city', 'postal_code')->get();
    }

    public function show($id)
    {
        //find equals to where and first method
        //first, find, method return an object
        // get, all method return an array
        return City::with('commands.restaurant')->find($id);
        // $commands = $city->load('commands.restaurant');
    }
}
