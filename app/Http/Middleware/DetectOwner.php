<?php

namespace App\Http\Middleware;

use App\Selections\UserLevel;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class DetectOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (User::where('role', UserLevel::OWNER)->count() == 0){
            return to_route('admin-setup');
        } 
        if (auth()->user()->role == UserLevel::CUSTOMER->value){
            return to_route('dashboard');
        }
        return $next($request);


    }
}
