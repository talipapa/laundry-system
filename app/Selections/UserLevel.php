<?php
namespace App\Selections;
enum UserLevel:string{
    case OWNER = "owner";
    case STAFF = "staff";
    case CUSTOMER = "customer";
    
}
