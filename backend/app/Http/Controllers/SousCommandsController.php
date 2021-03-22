<?php

namespace App\Http\Controllers;

use App\Models\SousCommand;
use App\Models\SousCommandDish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SousCommandsController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        $command_id = $user->currentCommand()->id;
        $deliveryInfo = $user->deliveryInfo();
        $address_id = $deliveryInfo['address_id'];
        $cartItems = $user->cartItems;
        $amount = $cartItems->reduce(function ($sum, $cartItem) {
            return $sum + $cartItem->dish_quantity * $cartItem->dish->price;
        });

        $sousCommand = DB::transaction(function () use ($command_id, $user, $address_id, $amount, $request, $cartItems) {
            $sousCommand = SousCommand::create([
                'command_id' => $command_id,
                'user_id' => $user->id,
                'address_id' => $address_id,
                'amount' => $amount,
                'note' => $request->note
            ]);


            foreach ($cartItems as $cartItem) {
                SousCommandDish::create([
                    'sous_command_id' => $sousCommand->id,
                    'dish_id' => $cartItem->dish_id,
                    'dish_quantity' => $cartItem->dish_quantity
                ]);
            };

            $user->cartItems()->delete();

            return $sousCommand;
        });

        if ($sousCommand) {
            return $sousCommand;
        } else {
            return response()->json([], 422);
        }
    }

    public function index()
    {
        return Auth::user()->sousCommands()->with('command.restaurant')->get();
    }

    public function show($id)
    {
        return SousCommand::with('sousCommandDishes.dish')->find($id);
    }
}
