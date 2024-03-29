<?php

namespace App\Http\Controllers;

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
        $cartItem = CartItem::where('user_id', Auth::id())->where('dish_id', $request->dish_id)->first();
        if (!$cartItem) {
            return CartItem::create([
                'command_id' => $request->command_id,
                'user_id' => Auth::id(),
                'dish_id' => $request->dish_id,
                'dish_quantity' => 1
            ]);
        }

        if ($cartItem->dish_quantity + $request->quantity === 0) {
            $cartItem->delete();
        } else {
            $cartItem->update(['dish_quantity' => $cartItem->dish_quantity + $request->quantity]);
            return $cartItem;
        }
    }

    public function destroy($id)
    {
        return CartItem::destroy($id);
    }
}
