<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    //
    public function index(){
        $allTransactions = Transaction::all();
        $payload = [
            'transactions' => $allTransactions
        ];  

        return Inertia::render('Admin/Transactions', $payload);
    }


}
