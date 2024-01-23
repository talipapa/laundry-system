<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WebsiteSetting;
use App\Selections\UserLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class WebsiteOptions extends Controller
{
    //
    public function index(){
        $webSettings = WebsiteSetting::first();
        $users = User::all();
        $payload = [
            'webSettings' => $webSettings,
            'users' => DB::table('users')->whereNot('role', UserLevel::OWNER->value)->get(['id', 'first_name', 'last_name', 'email', 'role', 'updated_at', 'created_at'])
        ];
        return Inertia::render('Admin/WebsiteOptions', $payload);
    }

    public function changeContactInfo(Request $request){
        $request->validate([
            'phone' => 'required|string',
            'email' => 'required|email',
            'address' => 'required|string'
        ]);

        $webSettings = WebsiteSetting::first();

        $webSettings->update([
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address
        ]);

        $webSettings->save();

        return redirect()->back()->with('success', 'Contact info updated successfully');

    }

    public function changeCoordinates(Request $request){
        $request->validate([
            'latitude' => 'required',
            'longitude' => 'required'
        ]);

        $webSettings = WebsiteSetting::first();

        $webSettings->update([
            'shop_longitude' => $request->longitude,
            'shop_latitude' => $request->latitude
        ]);
        $webSettings->save();
        return redirect()->back()->with('success', 'Coordinates updated successfully');
    }
}
