<?php
namespace App\Selections;
enum TransactionStatus:string{
    case UNPAID = "unpaid";
    case PAID = "paid";
    case WAITING = "waiting";
    case WASHING = "washing";
    case PICKUP = "pickup";
    case COMPLETE = "complete";
}
