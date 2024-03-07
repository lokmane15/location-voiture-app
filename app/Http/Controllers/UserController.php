<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    function createUser(Request $request)
    {
        $user = User::create([
            "num_cin" => $request->input('name_cin'),
            "nom" => $request->input('nom'),
            "prenom" => $request->input('prenom'),
            "num_tel" => $request->input('num_tel'),
            "adresse" => $request->input('adresse'),
            "email" => $request->input('email'),
            "password" => $request->input('password'),
        ]);
        return $user;
    }
}

// {
//     "name_cin":"HH123456",
//     "nom":"abduh",
//     "prenom":"bsar",
//     "num_tel":"0876543215",
//     "adresse":"12 bloq 29 casablanca",
//     "email":"a@gmail.com",
//     "password":"12ee#ssw",
// }