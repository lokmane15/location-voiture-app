<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CarsController extends Controller
{
    public function getCars()
    {
        $cars = Cars::all();
        return response()->json($cars, 200);
    }

    public function getCarsDisponible()
    {
        $cars = Cars::where('etat', 1)->with('model')->get();
        return response()->json($cars, 200);
    }

    public function show($id)
    {
        if (Auth::guard('sanctum')->check()) {
            $car = Cars::with('model')->findOrFail($id);
            return response()->json($car, 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'num_matricule' => 'required',
            'kilomitrage' => 'required',
            'annee' => 'required',
            'couleur' => 'required',
            'prix' => 'required',
            'etat' => 'required',
            'image' => 'required',
            'marque' => 'required',
            'model_id' => 'required',
        ]);

        $car = Cars::create($request->all());
        return response()->json($car, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'num_matricule' => 'required',
            'kilomitrage' => 'required',
            'annee' => 'required',
            'couleur' => 'required',
            'prix' => 'required',
            'etat' => 'required',
            'image' => 'required',
            'marque' => 'required',
            'model_id' => 'required',
        ]);

        $car = Cars::findOrFail($id);
        $car->update($request->all());
        return response()->json($car, 200);
    }

    public function destroy($id)
    {
        $car = Cars::findOrFail($id);
        $car->delete();
        return response()->json(null, 204);
    }
}
