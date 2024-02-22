<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustomerController extends Controller
{
    //
    public function index(){
        $customers = DB::table('users')->where('role', 'customer')->get(['id', 'first_name', 'last_name', 'email', 'updated_at', 'created_at']);
        return Inertia::render('Admin/Customer', ['customers' => $customers]);
    }

    public function update(Request $request){
        $request->validate([
            'id' => 'required|integer',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'address' => 'string'
        ]);

        $fetchedUser = User::find($request->id);

        if (!$fetchedUser){
            return redirect()->back()->with('error', 'Customer not found');
        }

        $fetchedUser->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => strtolower($request->email),
            'address' => $request->address
        ]);

        $fetchedUser->save();
        
        return redirect()->back()->with('success', 'Customer updated successfully');
    }

    public function changePassword(Request $request){
        $request->validate([
            'id' => 'required|integer',
            'password' => 'required|string|min:8'
        ]);
        $fetchedUser = User::find($request->id);
        if (!$fetchedUser){
            return redirect()->back()->with('error', 'Customer not found');
        }
        $fetchedUser->update([
            'password' => bcrypt($request->password)
        ]);
        $fetchedUser->save();
        return redirect()->back()->with('success', 'Customer password updated successfully');
    }

    public function changeUserRole(Request $request){
        $request->validate([
            'id' => 'required|integer',
            'role' => 'required|string'
        ]);
        $fetchedUser = User::find($request->id);
        if (!$fetchedUser){
            return redirect()->back()->with('error', 'Customer not found');
        }
        $fetchedUser->update([
            'role' => $request->role
        ]);
        $fetchedUser->save();
        return redirect()->back()->with('success', 'Customer role updated successfully');
    }

    public function destroy(Request $request, string $id){
        $fetchedUser = User::find($id);
        if (!$fetchedUser){
            return redirect()->back()->with('error', 'Customer not found');
        }

        $fetchedUser->delete();

        return redirect()->back()->with('success', 'Customer deleted successfully');
    }
}
