<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\authController;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\ContratController;
use App\Http\Controllers\MarqueController;
use App\Http\Controllers\ModelController;
use App\Http\Controllers\ReservController;
use App\Http\Controllers\StripeController;
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

Route::get('/getCar/{id}', CarsController::class . '@showForAdmin');

Route::get('/getContrat', ContratController::class . '@getContrat');

//cars
// all the cars
Route::get('/cars', CarsController::class . '@getCars');
//only cars disponible
Route::get('/carsDispo', CarsController::class . '@getCarsDisponible');
//car reserved already
Route::get('/carsNotDispo', CarsController::class . '@getCarsNotDisponible');


Route::middleware('auth:sanctum')->post('/newcar', CarsController::class . '@store');

Route::middleware('auth:sanctum')->post('/updatecar/{id}', CarsController::class . '@update');

Route::middleware('auth:sanctum')->delete('/destroycar/{id}', CarsController::class . '@destroy');


//reservation
Route::post('/reservecar/{id}', ReservController::class . "@reserveCar");

Route::post('/reservation/success/{id}', ReservController::class . "@reservationSuccess");





Route::post('/reservecar/{id}', ReservController::class . "@reserveCar");



//for the admin
Route::get('users', authController::class . '@users');
Route::middleware('auth:sanctum')->delete('destroyUser/{id}', authController::class . '@DestroyUser');
Route::get('user/{id}', authController::class . '@show');

//marque


Route::get('/marque', MarqueController::class . '@show');
Route::middleware('auth:sanctum')->get('/onemarque/{id}', MarqueController::class . '@getmarque');
Route::middleware('auth:sanctum')->post('/createmarque', MarqueController::class . '@store');
Route::middleware('auth:sanctum')->post('/marque/{id}', MarqueController::class . '@update');
Route::middleware('auth:sanctum')->delete('/marque/{id}', MarqueController::class . '@destroy');

//models
Route::middleware('auth:sanctum')->get('/models', ModelController::class . '@index');
Route::middleware('auth:sanctum')->get('/models/{id}', ModelController::class . '@show');
Route::middleware('auth:sanctum')->post('/models', ModelController::class . '@store');
Route::middleware('auth:sanctum')->put('/models/{id}', ModelController::class . '@update');
Route::middleware('auth:sanctum')->delete('/models/{id}', ModelController::class . '@destroy');


//reservetion 
Route::get('/reservation', ReservController::class . '@index');


//the model by the marque id

Route::get('/modelByMarqueid/{id}', ModelController::class . '@getModelsByMarqueid');


// Route::get('/test-image', function () {
//     return response()->file(storage_path('app/public/car/yxUtnTOMbVH8YjTMI54eC1udE8plrRBdfj5PMzFf.jpg'));
// });



//stripe balance
Route::get('/earnings', [StripeController::class, 'getEarnings']);


Route::get('/todays-payments', [StripeController::class, 'getTodaysPayments']);


//admin 

Route::post("admin/login", AdminController::class . '@login');
Route::post("admin/signup", AdminController::class . '@signup');
Route::middleware('auth:sanctum')->post('admin/logout', [AdminController::class, 'logout']);
