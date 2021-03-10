<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartItemsController extends Controller
{
    public function index()
    {
        return CartItem::with('dish')->where('user_id', Auth::id())->get();
    }

    public function store(Request $request)
    {
        return CartItem::create([
            'command_id' => $request->command_id,
            'user_id' => Auth::id(),
            'dish_id' => $request->dish_id,
            'dish_quantity' => 1
        ]);
    }
}
