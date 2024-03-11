<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use Illuminate\Http\Request;

class CarsController extends Controller
{
    public function getCars()
    {
        $cars = Cars::all();
        return $cars;
    }

    //get only the cars disponible
    public function getCarsDisponible()
    {
        $cars = Cars::whereEtat(1)->get();
        return $cars;
    }
    //get single car
    public function show($id)
    {
        return Cars::findOrFail($id);
    }
    //create
    public function store(Request $request)
    {
        $car = Cars::create($request->all());
        return response()->json($car, 201);
    }
    //update
    public function update(Request $request, $id)
    {
        $car = Cars::findOrFail($id);
        $car->update($request->all());
        return response()->json($car, 200);
    }
    //delete
    public function destroy($id)
    {
        $car = Cars::findOrFail($id);
        $car->delete();
        return response()->json(null, 204);
    }
}
