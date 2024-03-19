<?php

namespace App\Http\Controllers\Paymongo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Luigel\Paymongo\Facades\Paymongo;

class PaymongoIntentController extends Controller
{
    //

    public function viewIntent(Request $request){

        

        



        return Inertia::render("TestingPage", [
            "intent_id" => $request->get('intent_id'),
            "lmao" => $request->get('lmao')
        ]);
    }
}
