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
        $allTransactions = Transaction::orderBy('updated_at', 'desc')->get();

        $payload = [
            'transactions' => $allTransactions
        ];  

        return Inertia::render('Admin/Transactions', $payload);
    }


}
