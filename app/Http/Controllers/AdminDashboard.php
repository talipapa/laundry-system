<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\User;
use App\Selections\ServiceAddons;
use App\Selections\TransactionStatus;
use App\Selections\UserLevel;
use App\Selections\ServiceType;

class AdminDashboard extends Controller
{
    public function index(){
        $totalTransactions = Transaction::all()->count();
        $totalCurrentOrder = Transaction::where('status', '!=', TransactionStatus::COMPLETE->value)->get()->count();
        $totalCompletedOrder = Transaction::where('status', TransactionStatus::COMPLETE->value)->get()->count();
        $totalCustomer = User::where('role', UserLevel::CUSTOMER->value)->get()->count();
        $totalStaffMember = User::where('role', UserLevel::STAFF->value)->get()->count();

        $serviceTypeData = [
            [
                'name' => ServiceType::SELF_SERVICE->name,
                'count' => count(Transaction::where('service_type', ServiceType::SELF_SERVICE->name)->get()),
                'fill' => '#4ade80'
            ],
            [
                'name' => ServiceType::FULL_SERVICE->name,
                'count' => count(Transaction::where('service_type', ServiceType::FULL_SERVICE->name)->get()),
                'fill' => '#6aa5fa'
            ],
        ];
        $totalAddOnsCount = [
            [
                'name' => "Shoe cleaning",
                'count' => count(Transaction::whereJsonContains('addons', ServiceAddons::SHOE_CLEANING->name)->get()),
                'fill' => '#4ade80'
            ],
            [
                'name' => "Washing",
                'count' => count(Transaction::whereJsonContains('addons', ServiceAddons::IRONING->name)->get()),
                'fill' => '#6aa5fa'
            ],
        ];


        $totalTransactionPrice = Transaction::all()->sum('total_price');
        $pendingTransactionPrice = Transaction::where('status', '!=', TransactionStatus::COMPLETE->value)->get()->sum('total_price');
        $statistics = [
            'totalTransactions' => $totalTransactions,
            'totalCurrentOrder' => $totalCurrentOrder,
            'totalCompletedOrder' => $totalCompletedOrder,
            'totalTransactionPrice' => $totalTransactionPrice,
            'pendingTransactionPrice' => $pendingTransactionPrice,
            'totalStaffMember' => $totalStaffMember,
            'totalAddOnsCount' => $totalAddOnsCount,
            'serviceTypeData' => $serviceTypeData,
            'totalCustomer' => $totalCustomer
        ];

        
        $itemTransactionLimit = 10;
        $recentReservations = Transaction::where('status', '!=', TransactionStatus::COMPLETE->value)->orderBy('created_at', 'desc')->limit($itemTransactionLimit)->get();
        $recentCompletedTransactions = Transaction::where('status', TransactionStatus::COMPLETE->value)->orderBy('created_at', 'desc')->limit($itemTransactionLimit)->get();
        

        $payload = [
            'statistics' => $statistics,
            'recentReservations' => $recentReservations,
            'recentCompletedTransactions' => $recentCompletedTransactions
        ];


        return Inertia::render('Admin/Dashboard', $payload);
    }
}
