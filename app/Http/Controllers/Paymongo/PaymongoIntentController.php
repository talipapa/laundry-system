<?php

namespace App\Http\Controllers\Paymongo;
use App\Events\MakeTransactionEvent;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Luigel\Paymongo\Facades\Paymongo;

class PaymongoIntentController extends Controller
{
    //

    public function viewIntent(Request $request){
        
        $paymentIntentId = $request->get('intent_id');
        $paymentIntent = null;
        $transactionid = DB::table('transactions')->where('payment_intent_id', "=", $paymentIntentId)->first();
        $transaction = Transaction::find($transactionid->id);

        // check if the payment intent exists
        try {
            $paymentIntent = Paymongo::paymentIntent()->find($paymentIntentId)->getAttributes(); 
        } catch (\Throwable $th) {
            $paymentIntent = null;
        }
        if ($paymentIntent == null) {
            $reservation = Transaction::find($transactionid);
            if ($reservation != null) {
                $reservation->delete();       
            }
            return abort(404);
        } 

        
        // check if the user is the owner of the transaction
        if (auth()->user()->id != $transaction->user_id){
            return abort(404);
        }

                
        return Inertia::render("Customer/PaymentStatusPage", [
            "intent_id" => $paymentIntentId,
            "transaction" => $transaction,
            "paymentIntent" => $paymentIntent,
            "error" => session('error'),
        ]);
    }

    public function makePayment(Request $request){
  
        $paymentIntentId = $request->paymentIntent;
        $transaction = DB::table('transactions')->where('payment_intent_id', "=", $paymentIntentId)->first();

        // Check if the transaction exists
        if ($transaction == null){
            return abort(404);
        }
        // Check if the user is the owner of the transaction
        if ($transaction->user_id != auth()->user()->id){
            return abort(404);
        }

        // Preparing payment intent
        $paymentIntent = Paymongo::paymentIntent()->find($paymentIntentId);
    
        // Preparing credit card
        $isCreditCard = $request->paymentType == "card";
        $paymentMethod = null;
        // Make a payment method
        if ($isCreditCard){
            // Validate request
            $validate = $request->validate([
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required',
                'address' => 'required',
                'paymentType' => 'required',
                'creditCardNumber' => 'required',
                'creditCardExpMonth' => 'required',
                'creditCardExpYear' => 'required',
                'creditCardVerificationValue' => 'required'
            ]);
            // Function if method is card
            $paymentMethod = Paymongo::paymentMethod()->create([
                'type' => $validate['paymentType'],
                'details' => [
                    'card_number' => $validate['creditCardNumber'],
                    'exp_month' => (int)$validate['creditCardExpMonth'],
                    'exp_year' => (int)$validate['creditCardExpYear'],
                    'cvc' => $validate['creditCardVerificationValue'],
                ],
                'billing' => [
                    'address' => [
                        'line1' => $validate['address']
                    ],
                    'name' => $validate['firstName'] . ' ' . $validate['lastName'],
                    'email' => $validate['email'],
                    'phone' => ''
                ],
            ]);
        } else{
            // Function if method is others
            $validate = $request->validate([
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required',
                'address' => 'required',
                'paymentType' => 'required'
            ]);

            $paymentMethod = Paymongo::paymentMethod()->create([
                'type' => $validate['paymentType'],
                'billing' => [
                    'address' => [
                        'line1' => $validate['address']
                    ],
                    'name' => $validate['firstName'] . ' ' . $validate['lastName'],
                    'email' => $validate['email'],
                    'phone' => ''
                ],
            ]);
        }

        try {
            $attachedPaymentIntent = $paymentIntent->attach($paymentMethod->id, 'http://localhost:8000/payment-success?intent_id='.$paymentIntentId);
            if ($attachedPaymentIntent->status == "succeeded"){
                $transaction = Transaction::find($transaction->id);
                $transaction->status = "paid";
                $transaction->save();
                return to_route('customer.reservation')->with('success', 'Payment successful');
            }
            return Inertia::location($attachedPaymentIntent->next_action['redirect']['url']);
        } catch (\Throwable $th) {
            // dd($th);  
            $errorResponse = json_decode($th->getMessage())->errors[0];
            if ($errorResponse->code == "resource_succeeded_state"){
                return to_route('services.payment-success', ['intent_id' => $paymentIntentId]);
            }
            return redirect()->back()->with('error', $errorResponse->detail);
        }
   
    }

    public function successPayment(Request $request){
        $paymentIntentId = $request->get('intent_id');
        $transaction = DB::table('transactions')->where('payment_intent_id', "=", $paymentIntentId)->first();
        $transaction = Transaction::find($transaction->id);

        // Check if the transaction exists
        if ($transaction == null){
            return abort(404);
        }
        // Check if the user is the owner of the transaction
        if ($transaction->user_id != auth()->user()->id){
            return abort(404);
        }

        $paymentIntent = Paymongo::paymentIntent()->find($paymentIntentId);

        if ($paymentIntent->status == "succeeded"){
            $transaction->status = "waiting";
            $transaction->save();
            broadcast(new MakeTransactionEvent(
                "admin",
                $transaction->id,
            ))->toOthers();

            return to_route('customer.reservation')->with('success', 'Payment successful');
        } else{
            return to_route('services.make-payment', ['intent_id' => $paymentIntentId])->with('error', 'Payment is cancelled');
        }


    }
}
