<?php

namespace App\Http\Controllers;

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

class ServicesController extends Controller
{
    public function index(){
        return Inertia::render('Customer/ServicesPage');
    }

    public function guestCreateBooking(Request $request){


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
            'password' => ['required', Rules\Password::defaults()],
        ]);
        
        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $user_id = $user->id;

            $transaction = Transaction::create([
                'user_id' => $user->id,
                'service_type' => $request->serviceType[1],
                'total_price' => $totalPrice,
                'reserved_at' => Carbon::parse($request->reserveOn)->timezone('Asia/Manila')->format('Y-m-d'),
                'addons' => $addOns,
                'is_reviewed' => false,
            ]);
            $transaction_id = $transaction->id;
            $user->save();
            event(new Registered($user));
            Auth::login($user);
            $transaction->save();
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


        return redirect(RouteServiceProvider::HOME);
    }
}
