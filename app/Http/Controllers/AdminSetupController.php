<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WebsiteSetting;
use App\Selections\UserLevel;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class AdminSetupController extends Controller
{
    //
    public function index(){
        $currentUser = User::find(auth()->user()->id);
        if (User::where('role', UserLevel::OWNER)->count() > 0){
            return abort(404);
        } 
        if (User::where('role', UserLevel::STAFF)->count() > 0){
            if ($currentUser->role == UserLevel::CUSTOMER->value){
                return abort(404);
            }
        }
        $webSettings = WebsiteSetting::first();
        return Inertia::render('AdminSetup', [
            'webSettings' => $webSettings
        ]);
    }

    public function claimOwnership(Request $request){
        $currentUser = User::find(auth()->user()->id);
        if (User::where('role', UserLevel::OWNER)->count() > 0){
            return abort(404);
        } 
        if (User::where('role', UserLevel::STAFF)->count() > 0){
            if ($currentUser->role == UserLevel::CUSTOMER->value){
                return abort(404);
            }
        }


        $webSettings = WebsiteSetting::first();
        if ($webSettings != null){
            $webSettings->update([
                'shop_longitude' => $request->laundryLocation_lng,
                'shop_latitude' => $request->laundryLocation_lat,
                'address' => $request->laundryLocation_address,
                'email' => $request->laundryLocation_email,
                'phone_number' => $request->laundryLocation_phone,
            ]);
            $webSettings->save();
            $currentUser->role = UserLevel::OWNER->value;
            $currentUser->save();
            return to_route('admin.dashboard')->with('success', 'Website details successfully set!');
        }
        $newWebSettings = WebsiteSetting::create([
            'shop_longitude' => $request->laundryLocation_lng,
            'shop_latitude' => $request->laundryLocation_lat,
            'address' => $request->laundryLocation_address,
            'email' => $request->laundryLocation_email,
            'phone_number' => $request->laundryLocation_phone,
        ]);
        $currentUser->role = UserLevel::OWNER->value;
        $newWebSettings->save();
        $currentUser->save();
        return to_route('admin.dashboard')->with('success', 'Website details successfully set!');
        

    }
}
