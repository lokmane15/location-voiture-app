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

    //Contart
    Route::post('/Contrat/{id}', ContratController::class . '@ContratMaking');
});
Route::post('/signup', authController::class . '@signup');
Route::post('/login', authController::class . '@login');

Route::get('/car/{id}', CarsController::class . '@show');

Route::get('/getContrat', ContratController::class . '@getContrat');

//cars
// all the cars
Route::get('/cars', CarsController::class . '@getCars');
//only cars disponible
Route::get('/carsDispo', CarsController::class . '@getCarsDisponible');

Route::post('/newcar', CarsController::class . '@store');

Route::put('/updatecar/{id}', CarsController::class . '@update');

Route::delete('/destroycar/{id}', CarsController::class . '@destroy');


//reservation
Route::post('/reservecar/{id}', ReservController::class . "@reserveCar");

Route::post('/reservation/success/{id}', ReservController::class . "@reservationSuccess");



//marque

Route::post('/marque', MarqueController::class . '@store');

Route::get('/marque', MarqueController::class . '@show');


Route::post('/reservecar/{id}', ReservController::class . "@reserveCar");
