<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Models extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_model',
        'type_carburant',
        'gps',
        'capacite_assises',
        'marque_id',
    ];
    public function marque()
    {
        return $this->belongsTo(marque::class, "marque_id");
    }
}
