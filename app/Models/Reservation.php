<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cars;
use App\Models\User;

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
        return $this->belongsTo(Cars::class);
    }

    // public function conducteur()
    // {
    //     return $this->belongsTo(conducteur::class);
    // }
}
