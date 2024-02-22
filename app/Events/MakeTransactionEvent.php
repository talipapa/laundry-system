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
    public $user_id;
    public $is_reviewed;
    public $total_price;
    public $status;
    public $service_type;
    public $addons;
    public $created_at;
    public $updated_at;

    public $reserved_at;
    public $address;


    public function __construct($is_admin, $id, $user_id, $is_reviewed, $total_price, $status, $service_type, $addons, $created_at, $updated_at, $reserved_at, $address)
    {
        $this->is_admin = $is_admin;
        $this->id = $id;
        $this->user_id = $user_id;
        $this->is_reviewed = $is_reviewed;
        $this->total_price = $total_price;
        $this->status = $status;
        $this->service_type = $service_type;
        $this->addons = $addons;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
        $this->reserved_at = $reserved_at;
        $this->address = $address;
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
            'user_id' => $this->user_id,
            'is_reviewed' => $this->is_reviewed,
            'total_price' => $this->total_price,
            'status' => $this->status,
            'service_type' => $this->service_type,
            'addons' => $this->addons,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'reserved_at' => $this->reserved_at,
        ];
    }
}
