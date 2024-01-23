<?php

namespace App\Http\Middleware;

use App\Selections\UserLevel;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminClearancePrivilegeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $array = [
            UserLevel::OWNER->value,
            UserLevel::STAFF->value
        ];
        if (!in_array(auth()->user()->role, $array)){
            return abort(404);
        } 
        return $next($request);
    }
}
