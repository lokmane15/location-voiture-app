<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Balance;
use Stripe\PaymentIntent;

class StripeController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function getEarnings()
    {
        // Retrieve the balance from Stripe
        $balance = Balance::retrieve();

        // Return the balance as a JSON response
        return response()->json($balance);
    }
    public function getTodaysPayments()
    {
        // Get the start and end of today in Unix timestamp
        $startOfDay = strtotime("today midnight");
        $endOfDay = strtotime("tomorrow midnight") - 1;

        // Retrieve all payment intents created today
        $payments = PaymentIntent::all([
            'created' => [
                'gte' => $startOfDay,
                'lte' => $endOfDay,
            ],
        ]);

        // Return the payments as a JSON response
        return response()->json($payments);
    }
}
