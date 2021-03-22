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

    public function store(Request $request)
    {
        Auth::user()->addresses()->update(['is_default' => 0]);

        return Auth::user()->addresses()->create([
            'name' => $request->name,
            'address' => $request->address,
            'city_id' => $request->cityId,
            'phone_number' => $request->phoneNumber,
            'is_default' => 1
        ]);
    }

    public function show($id)
    {
        return Address::with('city')->find($id);
    }

    public function update($id, Request $request)
    {
        return Address::where('id', $id)->update([
            'name' => $request->name,
            'address' => $request->address,
            'city_id' => $request->cityId,
            'phone_number' => $request->phoneNumber
        ]);
    }

    public function destroy($id)
    {
        return Address::where('id', $id)->delete();
    }
}
