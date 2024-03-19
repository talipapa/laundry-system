<?php

namespace App\Http\Controllers;

use App\Events\MakeTransactionEvent;
use App\Models\Transaction;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Luigel\Paymongo\Facades\Paymongo;

class ServicesController extends Controller
{
    public function index(){

        if (Auth::check()) {
            return Inertia::render('Customer/SessionedServicesPage');
        }

        return Inertia::render('Customer/ServicesPage');
    }

    public function guestCreateBooking(Request $request){



        
        if (Auth::check()){
            $user_id = null;
            $transaction_id = null;
    
            $totalPrice = 0;
            $totalPrice += $request->serviceType[2];
            foreach ($request->addOns as $addon) {
                $totalPrice += $addon['price'];
            }
    
            $addOns = [];

            $paymentIntent = Paymongo::paymentIntent()
            ->create([
                'amount' => $totalPrice * 100,
                'payment_method_allowed' => [
                    'paymaya', 'card', 'gcash', 'grabpay'  // <--- Make sure to add paymaya here.
                ],
                'payment_method_options' => [
                    'card' => [
                        'request_three_d_secure' => 'automatic',
                    ],
                ],
                'description' => 'This is a test payment intent',
                'currency' => 'PHP',
            ]);

    
            try {
                foreach ($request->addOns as $addon) {
                    array_push($addOns, $addon['name']);
                }
                $transaction = Transaction::create([
                    'user_id' => Auth::id(),
                    'service_type' => $request->serviceType[1],
                    'total_price' => $totalPrice,
                    'reserved_at' => Carbon::parse($request->reserveOn)->timezone('Asia/Manila')->format('Y-m-d'),
                    'addons' => $addOns,
                    'address' => $request->address,
                    'is_reviewed' => false,
                    'payment_intent_id' => $paymentIntent->id,
                ]);
                $transaction_id = $transaction->id;
                $transaction->save();
    
                broadcast(new MakeTransactionEvent(
                    "admin",
                    $transaction->id,
                    Auth::id(),
                    false,
                    $totalPrice,
                    ['foreground' => "text-red-400", 'name' => "unpaid"],
                    $transaction->service_type,
                    $transaction->addons,
                    $transaction->created_at,
                    $transaction->updated_at,
                    $transaction->reserved_at,
                    $transaction->address,
                    $paymentIntent->id
                ))->toOthers();
                return to_route('services.awaiting-confirmation', ['intent_id' => $paymentIntent->id]);
            } catch (\Throwable $th) {
                if($user_id != null){
                    $user = User::find($user_id);
                    $user->delete();
                }
                if($transaction_id != null){
                    $transaction = Transaction::find($transaction_id);
                    $transaction->delete();
                }
                return back()->with('error', 'An error occured while processing your request. Please try again later.');
            }


        }

        


        $user_id = null;
        $transaction_id = null;

        $totalPrice = 0;
        $totalPrice += $request->serviceType[2];
        foreach ($request->addOns as $addon) {
            $totalPrice += $addon['price'];
        }

        $addOns = [];

        foreach ($request->addOns as $addon) {
            array_push($addOns, $addon['name']);
        }

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'address' => 'string',
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $paymentIntent = Paymongo::paymentIntent()
        ->create([
            'amount' => $totalPrice * 100,
            'payment_method_allowed' => [
                'paymaya', 'card' ,'gcash', 'grabpay' // <--- Make sure to add paymaya here.
            ],
            'payment_method_options' => [
                'card' => [
                    'request_three_d_secure' => 'automatic',
                ],
            ],
            'description' => 'This is a test payment intent',
            'currency' => 'PHP',
        ]);
        
        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'address' => $request->address,
                'password' => Hash::make($request->password),
            ]);
            $user_id = $user->id;




            

    

            $transaction = Transaction::create([
                'user_id' => $user->id,
                'service_type' => $request->serviceType[1],
                'total_price' => $totalPrice,
                'reserved_at' => Carbon::parse($request->reserveOn)->timezone('Asia/Manila')->format('Y-m-d'),
                'address' => $request->address,
                'addons' => $addOns,
                'is_reviewed' => false,
                'payment_intent_id' => $paymentIntent->id,
            ]);
            $transaction_id = $transaction->id;
            $user->save();
            event(new Registered($user));
            Auth::login($user);
            $transaction->save();


            broadcast(new MakeTransactionEvent(
                "admin",
                $transaction->id,
                $user->id,
                false,
                $transaction->total_price,
                ['foreground' => "text-red-400", 'name' => "unpaid"],
                $transaction->service_type,
                $transaction->addons,
                $transaction->created_at,
                $transaction->updated_at,
                $transaction->reserved_at,
                $transaction->address,
                $paymentIntent->id
            ))->toOthers();
            

        } catch (\Throwable $th) {
            if($user_id != null){
                $user = User::find($user_id);
                $user->delete();
            }
            if($transaction_id != null){
                $transaction = Transaction::find($transaction_id);
                $transaction->delete();
            }
            return back()->with('error', 'An error occured while processing your request. Please try again later.');
        }
        // return back()->with('error', 'An error occured while processing your request. Please try again later.');

        return to_route('services.awaiting-confirmation', ['intent_id' => $paymentIntent->id]);
    }
}
