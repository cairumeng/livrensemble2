<?php

namespace App\Http\Controllers;

use App\Models\City;

class CitiesController extends Controller
{
    public function index()
    {
        return City::select('id', 'city', 'postal_code')->get();
    }
}
