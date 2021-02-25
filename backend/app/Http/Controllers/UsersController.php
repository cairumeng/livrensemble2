<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest')->only(['store']);
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

    public function uploadAvatar(User $user, Request $request)
    {
        $request->validate(['avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']);
        $avatar = $request->avatar;
        $avatarName = time() . '.' . $avatar->extension();
        Storage::putFileAS('images/avatars', $avatar, $avatarName);
        $path = Storage::url('images/avatars/' . $avatarName);
        $user->update(['avatar' => $path]);

        return response()->json([
            'path' => $path
        ]);
    }

    public function update(User $user, Request $request)
    {
        $request->validate([
            'username' => 'required|max:12',
            'description' => 'required|max:512'
        ]);

        return $user->update([
            'username' => $request->username,
            'description' => $request->description
        ]);
    }

    public function passwordChange(User $user, Request $request)
    {
        $request->validate([
            'current_password' => 'required|min:6',
            'password' => 'required|min:6|confirmed'
        ]);
        if (Hash::check($request->current_password, $user->password)) {
            return $user->update([
                'password' => Hash::make($request->password)
            ]);
        } else {
            return response()->json([
                'errors' => [
                    'current_password' => ['Current password is not correct']

                ]
            ], 403);
        };
    }
}
