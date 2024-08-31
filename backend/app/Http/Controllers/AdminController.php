<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Hashing\HashManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    public function signup(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);
        // if ($credentials->fails()) {
        //     return response()->json(['error' => $credentials->errors()], 422);
        // }

        $admin = Admin::create([
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password'))
        ]);

        $token = $admin->createToken('admin Token')->plainTextToken;

        return response([
            'admin' => $admin,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        // Validate incoming request data
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        $admin = Admin::where('username', $credentials['username'])->first();

        if ($admin && Hash::check($credentials['password'], $admin->password)) {
            $token = $admin->createToken('admin Token')->plainTextToken;

            return response()->json(['message' => 'login successful', 'token' => $token], 200);
        } else {
            return response()->json(['message' => 'The credentials are not correct'], 401);
        }
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json("successfully logged out ", 201);
    }
}
