<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DishesController extends Controller
{
    public function index()
    {
        $restaurant_id = Auth::user()->restaurant->id;
        return  Dish::with('category')->where('restaurant_id', $restaurant_id)->get();
    }

    public function imageUploader(Request $request)
    {
        $request->validate(['image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']);
        $image = $request->image;
        $image_name = time() . '.' . $image->extension();
        Storage::putFileAS('images/dish_images', $image, $image_name);
        $path = Storage::url('images/dish_images/' . $image_name);
        return response()->json([
            'path' => $path
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:127',
            'price' => 'required',
            'ingredients' => 'max:511',
        ]);
        return Dish::create([
            'name' => $request->name,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'spicy_level' => $request->spicy_level,
            'image' => $request->image ?? env('APP_URL') . '/images/default_dish.png',
            'ingredients' => $request->ingredients,
            'restaurant_id' => Auth::user()->restaurant->id
        ]);
    }

    public function destroy(Dish $dish)
    {
        return $dish->delete();
    }

    public function update(Dish $dish, Request $request)
    {
        $request->validate([
            'name' => 'required|max:127',
            'price' => 'required',
            'ingredients' => 'max:511',
        ]);
        return $dish->update($request->only([
            'name',
            'price',
            'spicy_level',
            'image',
            'ingredients'
        ]));
    }
}
