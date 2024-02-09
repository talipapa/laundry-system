<?php

use App\Models\User;
use App\Selections\UserLevel;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('transaction.{admin}', function ($user, $admin) {
    $user = User::find($user->id);
    if ($user->role != UserLevel::CUSTOMER->value){
        return true;
    } else{
        return false;
    }

});
