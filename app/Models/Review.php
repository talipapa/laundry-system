<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'user_id',
        'rating',
        'comment',
    ];

    public function transaction(): HasOne
    {
        return $this->hasOne(Transaction::class, 'id', 'transaction_id');
    }
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
