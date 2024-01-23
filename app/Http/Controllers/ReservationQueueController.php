<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Selections\TransactionStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationQueueController extends Controller
{
    //
    public function index(){
        $currentOrders = Transaction::whereNot('status', TransactionStatus::COMPLETE->value)->get();
        $payload = [
            'currentOrders' => $currentOrders
        ];

        
        return Inertia::render('Admin/ReservationQueue', $payload);
    }
}
