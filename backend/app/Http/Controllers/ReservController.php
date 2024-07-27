<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use App\Models\Contrat;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class ReservController extends Controller
{
    public function reserveCar(Request $request, $id)
    {
        try {
            if (Auth::guard('sanctum')->check()) {
                // Verify car availability and validity
                $car = Cars::find($id);
                if (!$car || $car->etat != 1) {
                    return response()->json(['message' => 'Voiture non trouvée ou non disponible'], 404);
                }

                // Calculate duration and price
                $date_debut = Carbon::parse($request->input('date_debut'));
                $date_fin = Carbon::parse($request->input('date_fin'));
                $duree_location = $date_debut->diffInDays($date_fin);
                $prix_location_par_jour = $car->prix;
                $prix_total = $prix_location_par_jour * $duree_location;

                // Set Stripe API key (replace with your actual key)
                Stripe::setApiKey(config('services.stripe.secret'));

                // Create Stripe Checkout Session
                $lineItems = [
                    [
                        'price_data' => [
                            'currency' => 'mad',
                            'unit_amount' => $prix_total * 100, // Convert to cents
                            'product_data' => [
                                'name' => 'Car Reservation',
                            ],
                        ],
                        'quantity' => 1,
                    ],
                ];

                $session = Session::create([
                    'payment_method_types' => ['card'],
                    'line_items' => $lineItems,
                    'mode' => 'payment',
                    'success_url' => 'http://localhost:3000/success', // Route to handle success (replace with your route name)
                    'cancel_url' => 'http://localhost:3000/cancel', // Route to handle cancellation (replace with your route name)
                ]);

                return response()->json([
                    'url' => $session->url,
                    'session_id' => $session->id, // Pass the session ID back to the client
                ]);
            } else {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    // Function to handle successful reservation after payment (replace with your actual route name)
    public function reservationSuccess(Request $request, $id)
    {
        try {
            if (Auth::guard('sanctum')->check()) {
                Stripe::setApiKey(config('services.stripe.secret'));

                $sessionId = $request->input('session_id');

                // Retrieve Checkout Session details using its ID
                $session = Session::retrieve($sessionId);

                $user_id = Auth::guard('sanctum')->user()->id;

                // Ensure payment is successful
                if ($session->payment_status === 'paid') {
                    // Retrieve the car by ID
                    $car = Cars::find($id);

                    // Check if car exists
                    if (!$car) {
                        return response()->json(['message' => 'Voiture non trouvée'], 404);
                    }

                    // Create reservation
                    $reservation = Reservation::create([
                        'date_debut' => Carbon::parse($request->input('date_debut')),
                        'date_fin' => Carbon::parse($request->input('date_fin')),
                        'prix_total' => $session->amount_total / 10, // Convert from cents
                        'marque' => $car->marque ?? null, // Ensure 'marque' is set or set to null
                        'user_id' => $user_id, // Assuming user is authenticated
                        'car_id' => $car->id,
                    ]);

                    // Update car's status to unavailable
                    $car->etat = 0;
                    $car->save();

                    // Insert into contrat table
                    Contrat::create([
                        'date_signateur' => now(),
                        'user_id' => $user_id ?? null,
                        'car_id' => $car->id,
                    ]);

                    // Return success message and reservation details
                    return response()->json([
                        'message' => 'Réservation effectuée avec succès !',
                        'reservation' => $reservation,
                    ]);
                } else {
                    // Handle payment failure
                    return response()->json(['message' => 'Erreur lors du paiement'], 500);
                }
            } else {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        } catch (\Exception $error) {
            // Handle any errors during Stripe API interaction or reservation creation
            return response()->json(['message' => $error->getMessage()], 500);
        }
    }
}
