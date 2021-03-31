<?php

namespace App\Http\Controllers;

use App\Models\DishCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DishCategoriesController extends Controller
{
    public function store(Request $request)
    {
        $restaurant_id = Auth::user()->restaurant->id;
        return DishCategory::create([
            'name' => $request->name,
            'restaurant_id' => $restaurant_id
        ]);
    }

    public function index()
    {
        $restaurant_id = Auth::user()->restaurant->id;
        return DishCategory::where('restaurant_id', $restaurant_id)->get();
    }

    public function update(DishCategory $dishCategory, Request $request)
    {
        $dishCategory->update(['name' => $request->name]);
    }

    public function destroy(DishCategory $dishCategory)
    {
        return $dishCategory->delete();
    }
}
