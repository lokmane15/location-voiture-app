<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\signupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(signupRequest $request)
    {
        // Validate the request using the defined rules in your form request (e.g., LoginRequest)
        $request->validated();

        // Create a new user
        $user = User::create([
            "num_cin" => $request->input('num_cin'),
            "nom" => $request->input('nom'),
            "prenom" => $request->input('prenom'),
            "num_tel" => $request->input('num_tel'),
            "adresse" => $request->input('adresse'),
            "email" => $request->input('email'),
            "password" => bcrypt($request->input('password'))
        ]);

        // Create a token for the user
        $token = $user->createToken('main')->plainTextToken;

        // Return user and token in the response
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        // Validate the login request
        $credentials = $request->validated();

        // Extract 'remember' field and unset it from credentials
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        // Attempt authentication
        if (!Auth::attempt($credentials, $remember)) {
            return response()->json([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }

        // Retrieve authenticated user
        $user = Auth::user();

        // Create a token for the user
        $token = $user->createToken('main')->plainTextToken;

        // Return user and token in the response
        return response()->json([
            "user" => $user,
            "token" => $token
        ]);
    }

    // public function logout()
    // {
    //     $user=Auth::user();
    //     $user->currentAccessToken()->delete();

    //     return response([
    //         'success' =>true
    //     ]);
    // }
}
