<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MakeTransactionEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $is_admin;
    public $id;


    public function __construct($is_admin, $id)
    {
        $this->is_admin = $is_admin;
        $this->id = $id;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('transaction.'. $this->is_admin);
    }

    public function broadcastAs()
    {
        return 'live-reservation';
    }

    public function broadcastWith(){
        return [
            'id' => $this->id,
        ];
    }
}
