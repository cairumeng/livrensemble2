<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Support\Facades\Auth;

class AddressesController extends Controller
{
    public function index()
    {
        return Address::with('city')->where('user_id', Auth::id())->get();
    }
}
