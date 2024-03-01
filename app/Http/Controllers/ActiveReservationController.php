<?php

namespace App\Http\Controllers;

use App\Selections\TransactionStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ActiveReservationController extends Controller
{
    //
    public function index(Request $request){
        $currentUserReservation = DB::table('transactions')->where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->first();
        
        $pastUserReservation = DB::table('transactions')->where('user_id', auth()->user()->id)->where('status', TransactionStatus::COMPLETE->value)->orderBy('updated_at', 'desc')->get();


        $payload = [
            'currentUserReservation' => $currentUserReservation,
            'pastUserReservation' => $pastUserReservation
        ];
        return Inertia::render('Customer/CustomerActiveReservation', $payload);
    }
}
