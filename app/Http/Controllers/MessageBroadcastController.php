<?php

namespace App\Http\Controllers;

use App\Events\MessagingEvent;
use Illuminate\Http\Request;

class MessageBroadcastController extends Controller
{
    //
    public function sendMessage(Request $request)
    {
        $message = $request->message;
        event(new MessagingEvent($message));
    }
}
