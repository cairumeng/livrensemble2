<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6'
        ]);

        return User::create([
            'username' => '',
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => env('APP_URL') . '/images/avatars/default_avatar.png'
        ]);
    }
}
