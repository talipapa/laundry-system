<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class CustomerAccountEditController extends Controller
{
    //
    public function index(Request $request){
        $payload = [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'success' => session('success'),
            'error' => session('error'),
        ];

        return Inertia::render('Customer/CustomerAccountSettings', $payload);
    }
}
