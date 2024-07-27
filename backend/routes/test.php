<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_debut',
        'date_fin',
        'prix_total',
        'marque',
        'user_id',
        'car_id',
        'conducteur_id',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function conducteur()
    {
        return $this->belongsTo(Conducteur::class);
    }
}
//controller
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Car;

class ReservationController extends Controller
{
    public function reserveCar(Request $request, $carId)
    {
        // Vérifier la disponibilité de la voiture
        $car = Car::find($carId);
        if (!$car) {
            return response()->json(['message' => 'Voiture non trouvée'], 404);
        }

        // Votre logique de vérification de disponibilité

        // Créer une réservation
        $reservation = Reservation::create([
            'date_debut' => $request->input('date_debut'),
            'date_fin' => $request->input('date_fin'),
            'prix_total' => $request->input('prix_total'),
            'marque' => $car->marque,
            'user_id' => $request->user()->id, // Supposons que l'utilisateur est authentifié
            'car_id' => $car->id,
            'conducteur_id' => $request->input('conducteur_id'),
        ]);

        return response()->json(['message' => 'Réservation effectuée avec succès', 'reservation' => $reservation], 201);
    }
}
// <!DOCTYPE html>
// <html>
// <head>
//     <title>Réserver une voiture</title>
// </head>
// <body>
//     <h1>Réserver une voiture</h1>
//     <form method="POST" action="{{ route('reservation.reserve') }}">
//         @csrf
//         <label for="date_debut">Date de début :</label><br>
//         <input type="datetime-local" id="date_debut" name="date_debut"><br>
//         <label for="date_fin">Date de fin :</label><br>
//         <input type="datetime-local" id="date_fin" name="date_fin"><br>
//         <!-- Ajoutez d'autres champs nécessaires pour la réservation -->
//         <input type="hidden" name="car_id" value="{{ $car->id }}">
//         <input type="submit" value="Réserver">
//     </form>
// </body>
// </html>

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Car;
use App\Providers\RouteServiceProvider;

class ReservationController extends Controller
{
    public function showReservationForm($carId)
    {
        $car = Car::find($carId);
        if (!$car) {
            return response()->json(['message' => 'Voiture non trouvée'], 404);
        }

        return view('reservation', compact('car'));
    }

    public function reserveCar(Request $request)
    {
        // Votre logique de réservation ici
    }
}

//routes

use App\Http\Controllers\ReservationController;

Route::get('/reservation/{carId}', [ReservationController::class, 'showReservationForm'])->name('reservation.form');
Route::post('/reservation', [ReservationController::class, 'reserveCar'])->name('reservation.reserve');

//
use Carbon\Carbon;

public function reserveCar(Request $request, $carId)
{
    // Vérifier la disponibilité de la voiture
    $car = Car::find($carId);
    if (!$car) {
        return response()->json(['message' => 'Voiture non trouvée'], 404);
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
        'conducteur_id' => $request->input('conducteur_id'),
    ]);

    return response()->json(['message' => 'Réservation effectuée avec succès', 'reservation' => $reservation], 201);
}