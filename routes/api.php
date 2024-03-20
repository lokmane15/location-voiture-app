<?php

use App\Http\Controllers\authController;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\ContratController;
use App\Http\Controllers\MarqueController;
use App\Http\Controllers\ReservController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // all the cars
    Route::get('/cars', CarsController::class . '@getCars');
    //only cars disponible
    Route::get('/carsDispo', CarsController::class . '@getCarsDisponible');

    Route::post('/reservecar/{id}', ReservController::class . "@reserveCar");

    Route::post('/reservation/success/{id}', ReservController::class . "@reservationSuccess");

    Route::get('/car/{id}', CarsController::class . '@show');

    //Contart
    Route::post('/Contrat/{id}', ContratController::class . '@ContratMaking');
    
    Route::get('/getContrat', ContratController::class . '@getContrat');
});
Route::post('/signup', authController::class . '@signup');
Route::post('/login', authController::class . '@login');


//cars
// all the cars
Route::get('/cars', CarsController::class . '@getCars');
//only cars disponible
Route::get('/carsDispo', CarsController::class . '@getCarsDisponible');

Route::post('/newcar', CarsController::class . '@store');

Route::put('/updatecar/{id}', CarsController::class . '@update');

Route::delete('/destroycar/{id}', CarsController::class . '@destroy');


//reservation




//marque

Route::post('/marque', MarqueController::class . '@store');

Route::get('/marque', MarqueController::class . '@show');


Route::post('/reservecar/{id}', ReservController::class . "@reserveCar");
