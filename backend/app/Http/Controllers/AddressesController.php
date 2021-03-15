<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AddressesController extends Controller
{
    public function index()
    {
        return Address::with('city')->where('user_id', Auth::id())->get();
    }

    public function changeDefaultAddress(Request $request)
    {
        Address::where('user_id', Auth::id())->where('is_default', 1)->update(['is_default' => 0]);
        return Address::where('id', $request->address_id)->first()->update(['is_default' => 1]);
    }
}
