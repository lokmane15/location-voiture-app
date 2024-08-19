<?php

namespace App\Http\Controllers;

use App\Models\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use function PHPUnit\Framework\returnValueMap;

class ModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Models::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formFeilds = $request->validate([
            'nom_model' => 'required',
            'type_carburant' => 'required',
            'gps' => 'required',
            'capacite_assises' => 'required',
            'marque_id' => 'required',
        ]);
        $models = Models::create($formFeilds);
        return response()->json($models, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Models $models, $id)
    {
        $models = Models::findOrFail($id);
        return response()->json($models, 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Models $models)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Models $models, $id)
    {
        $formFeilds = $request->validate([
            'nom_model' => 'required',
            'type_carburant' => 'required',
            'gps' => 'required',
            'capacite_assises' => 'required',
            'marque_id' => 'required',
        ]);
        $models = Models::findOrFail($id);
        $models->fill($formFeilds)->save();

        return response()->json("done!!!", 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Models $models, $id)
    {
        $models = Models::findOrFail($id);
        $models->delete();
        return response()->json('deleted!!', 201);
    }
    public function getModelsByMarqueid($id)
    {
        $models = Models::where('marque_id', $id)->get();
        return response()->json($models, 200);
    }
}
