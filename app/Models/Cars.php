<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Cars extends Model
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'num_matricule',
        'kilomitrage',
        'annee',
        'couleur',
        'prix',
        'etat',
        'image',
        'marque',
        'model_id',
    ];
    public function model()
    {
        return $this->belongsTo(Models::class, 'model_id');
    }
}
