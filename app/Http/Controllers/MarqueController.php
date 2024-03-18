<?php

namespace App\Http\Controllers;

use App\Models\Marque;
use Illuminate\Http\Request;

class MarqueController extends Controller
{
    public function store(Request $request)
    {
        $imagePath = $request->input('image_path');

        // Get the public URL of the uploaded image
        //$imageUrl = asset(str_replace('public/', 'storage/', $imagePath));

        // Create a new Marque instance
        $marque = new Marque([
            'nom_marque' => $request->nom_marque,
            'image_path' => $imagePath, // Save the image URL in the database
        ]);

        // Save the Marque instance
        $marque->save();
    }
    public function show()
    {
        $marque = Marque::all();
        return response()->json($marque, 200);
    }
}
