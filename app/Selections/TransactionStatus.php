<?php
namespace App\Selections;
enum TransactionStatus:string{
    case WAITING = "waiting";
    case WASHING = "washing";
    case PICKUP = "pickup";
    case COMPLETE = "complete";
}
