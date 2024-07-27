<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cars;
use App\Models\User;

class Contrat extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'date_signateur',
        'user_id',
        'car_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Cars::class);
    }
}
