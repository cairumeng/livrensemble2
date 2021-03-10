<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CartItemsController extends Controller
{
    public function index()
    {
        return CartItem::where('user_id', Auth::id())->get();
    }
}
