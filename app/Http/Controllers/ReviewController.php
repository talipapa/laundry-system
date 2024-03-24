<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Selections\TransactionStatus;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
class ReviewController extends Controller
{
    //
    public function viewReviewPage(Request $request){
        $getTransaction = DB::table('transactions')->where('user_id', auth()->user()->id)->where('status', TransactionStatus::COMPLETE->value)->whereNot('is_reviewed', false)->first();
        $payload = [
            'responseError' => session('error')
        ];
        if ($getTransaction !== null){
            return abort(403);
        }
        return Inertia::render('Customer/CustomerReviewFeedback', $payload);
    }

    public function makeCustomerReview(Request $request){
        
        $validatedRequest = $request->validate([
            'user_id' => 'required|numeric',
            'rating' => 'required|numeric|min:1|max:5',
            'message' => 'required|string|max:255',
        ]);

        if ($validatedRequest['user_id'] != auth()->user()->id){
            return back()->with('error', "Something went wrong");
        }

        $feedback = Review::create([
            'user_id' => $validatedRequest['user_id'],
            'rating' => $validatedRequest['rating'],
            'comment' => $validatedRequest['message'],
        ]);
        $feedback->save();

        return to_route('customer.reservation');
    }
}
