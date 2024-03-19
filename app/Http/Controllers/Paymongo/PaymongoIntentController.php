<?php

namespace App\Http\Controllers\Paymongo;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Luigel\Paymongo\Facades\Paymongo;

class PaymongoIntentController extends Controller
{
    //

    public function viewIntent(Request $request){
        
        $paymentIntentId = $request->get('intent_id');

        $paymentIntent = null;

        try {
            $paymentIntent = Paymongo::paymentIntent()->find($paymentIntentId);
        } catch (\Throwable $th) {
            $paymentIntent = null;
        }
        if ($paymentIntent == null) {
            // DB::table('transactions')->where('payment_intent_id', "==", $paymentIntentId)->first('id')->delete();
            dd($paymentIntentId);

            return abort(404);
        }



                
        return Inertia::render("Customer/PaymentStatusPage", [
            "intent_id" => $paymentIntentId,
        ]);
    }
}
