<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Cars;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function reserveCar(Request $request, $id)
    {
        // Vérifier la disponibilité de la voiture
        $car = Cars::find($id);

        if (!$car) {
            return response()->json(['message' => 'Voiture non trouvée'], 404);
        }

        // Check if the car is available (etat = 1)
        if ($car->etat != 1) {
            return response()->json(['message' => 'Voiture non disponible'], 404);
        }

        // Calculer la durée de location en jours
        $date_debut = Carbon::parse($request->input('date_debut'));
        $date_fin = Carbon::parse($request->input('date_fin'));
        $duree_location = $date_debut->diffInDays($date_fin);

        // Récupérer les tarifs associés à la voiture (supposons que le tarif est stocké dans la colonne 'prix' de la table 'cars')
        $prix_location_par_jour = $car->prix;

        // Calculer le prix total
        $prix_total = $prix_location_par_jour * $duree_location;

        // Créer une réservation
        $reservation = Reservation::create([
            'date_debut' => $date_debut,
            'date_fin' => $date_fin,
            'prix_total' => $prix_total,
            'marque' => $car->marque,
            'user_id' => $request->user()->id, // Supposons que l'utilisateur est authentifié
            'car_id' => $car->id,
        ]);

        // Update car's etat to 0 (not available)
        $car->etat = 0;
        $car->save();

        return response()->json(['message' => 'Réservation effectuée avec succès', 'reservation' => $reservation], 201);
    }
}
