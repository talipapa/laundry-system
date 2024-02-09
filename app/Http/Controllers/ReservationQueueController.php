<?php

namespace App\Http\Controllers;

use App\Events\MakeTransactionEvent;
use App\Models\Transaction;
use App\Models\User;
use App\Selections\TransactionStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationQueueController extends Controller
{
    //
    public function index(){
        $currentOrders = Transaction::orderBy('updated_at', 'desc')->whereNot('status', TransactionStatus::COMPLETE->value)->get();
        $payload = [
            'currentOrders' => $currentOrders
        ];

        return Inertia::render('Admin/ReservationQueue', $payload);
    }

    public function changeStatus(Request $request){
        $request->validate([
            'id' => 'required|string',
            'status' => 'required|string'
        ]);
        
        $transaction = Transaction::find($request->id);
        if (!$transaction){
            return redirect()->back()->with('error', 'Transaction not found!');
        }
        $transaction->status = $request->status;
        $transaction->save();

        return redirect()->back()->with('success', 'Transaction status updated!');
    }

}
