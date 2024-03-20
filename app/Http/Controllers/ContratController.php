<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use App\Models\Contrat;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContratController extends Controller
{
    public function getContrat(Request $request)
    {
        // Check if there is an authenticated user
        if (Auth::guard('sanctum')->check()) {
            // Retrieve the authenticated user's ID
            $user_id = $request->user()->id;

            // Retrieve contracts for the user with related user and car data
            $contrats = Contrat::where('user_id', $user_id)
                ->with('user')
                ->with('car')
                ->get();

            // Iterate over each contract and find the corresponding reservation
            foreach ($contrats as $contrat) {
                // Find the reservation based on the car_id
                $reservation = Reservation::where('user_id', $user_id)
                    ->where('car_id', $contrat->car_id)
                    ->first();

                // Add reservation data inside the contract object
                $contrat->reservation = $reservation;
            }

            // Return contracts with associated reservation data as JSON response
            return response()->json($contrats, 200);
        } else {
            // Return unauthorized error response if no user is authenticated
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
