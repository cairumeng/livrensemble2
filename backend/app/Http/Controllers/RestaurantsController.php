<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RestaurantsController extends Controller
{
    public function index()
    {
        $restaurant = Restaurant::where('user_id', Auth::id())->first();
        if (!$restaurant) {
            return response()->json([], 204);
        }
        return $restaurant;
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:50',
            'email' => 'required|email|unique:restaurants',
            'address' => 'required',
            'phoneNumber' => 'required',
            'description' => 'required|max:240',
            'frontImage' => 'required'
        ]);

        return Restaurant::create([
            'name' => $request->name,
            'user_id' => Auth::id(),
            'email' => $request->email,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'description' => $request->description,
            'front_image' => $request->frontImage
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|max:50',
            'address' => 'required',
            'phoneNumber' => 'required',
            'description' => 'required|max:240',
            'frontImage' => 'required'
        ]);

        $restaurant = Restaurant::where('user_id', Auth::id());

        if (!$restaurant) {
            return response()->json([], 204);
        }

        return $restaurant->update([
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phoneNumber,
            'description' => $request->description,
            'front_image' => $request->frontImage
        ]);
    }


    public function frontImageUpload(Request $request)
    {
        $request->validate(['frontImage' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']);
        $front_image = $request->frontImage;
        $front_image_name = time() . '.' . $front_image->extension();
        Storage::putFileAS('images/front_images', $front_image, $front_image_name);
        $path = Storage::url('images/front_images/' . $front_image_name);
        return response()->json([
            'path' => $path
        ]);
    }
}
