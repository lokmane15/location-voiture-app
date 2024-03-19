<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use App\Models\Contrat;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class ReservController extends Controller
{
    public function reserveCar(Request $request, $id)
    {
        try {
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
                        'currency' => 'usd',
                        'unit_amount' => $prix_total * 10, // Convert to cents
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
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    // Function to handle successful reservation after payment (replace with your actual route name)
    public function reservationSuccess(Request $request, $id)
    {
        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $sessionId = $request->input('session_id');

            // Retrieve Checkout Session details using its ID
            $session = Session::retrieve($sessionId);

            // Ensure payment is successful
            if ($session->payment_status === 'paid') {
                $car = Cars::find($id);

                // Create reservation
                $reservation = Reservation::create([
                    'date_debut' => Carbon::parse($request->input('date_debut')),
                    'date_fin' => Carbon::parse($request->input('date_fin')),
                    // Assuming date_fin is still available in request
                    'prix_total' => $session->amount_total / 10, // Convert from cents
                    'marque' => $car->marque,
                    'user_id' => $request->user()->id, // Assuming user is authenticated
                    'car_id' => $car->id,
                ]);

                // Update car's status to unavailable
                $car->etat = 0;
                $car->save();

                // Insert into contrat table
                Contrat::create([
                    'date_signateur' => now(),
                    'user_id' => $request->user()->id,
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
        } catch (\Exception $error) {
            // Handle any errors during Stripe API interaction or reservation creation
            return response()->json(['message' => $error->getMessage()], 500);
        }
    }
}
