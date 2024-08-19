<?php

namespace App\Http\Controllers;

use App\Models\Marque;
use Illuminate\Http\Request;

class MarqueController extends Controller
{
    public function store(Request $request)
    {
        $formFeilds = $request->validate([
            "nom_marque" => "required",
            "image_path" => "required|image"
        ]);

        if ($request->hasFile('image_path')) {
            $formFeilds['image_path'] = $request->file('image_path')->store('marque', 'public');
        }

        $marque = Marque::create($formFeilds);
        return response()->json($marque, 201); // 201 Created
    }

    public function show()
    {
        $marque = Marque::all();
        return response()->json($marque, 200);
    }

    public function getmarque($id)
    {
        $marque = Marque::findOrFail($id);
        return response()->json($marque, 200);
    }

    public function update(Request $request, $id)
    {
        $formFields = $request->validate([
            "nom_marque" => "required",
            "image_path" => "nullable|image"
        ]);

        $marque = Marque::findOrFail($id);

        if ($request->hasFile('image_path')) {
            $formFields['image_path'] = $request->file('image_path')->store('marque', 'public');
        } else {
            unset($formFields['image_path']);
        }

        $marque->fill($formFields)->save();

        return response()->json($marque, 200);
    }


    public function destroy($id)
    {
        $marque = Marque::findOrFail($id);
        $marque->delete();
        return response()->json("deleted!!", 200);
    }
}
