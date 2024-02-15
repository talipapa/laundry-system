<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'user_id',
        'username',
        'rating',
        'comment',
    ];

    public function transaction(): HasOne
    {
        return $this->hasOne(Transaction::class, 'id', 'transaction_id');
    }
    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class, 'id', 'user_id');
    }

    protected function getFullNameAttribute()
    {
        $user = User::find($this->user_id);

        if (!$user) {
            return 'NULL';
        }

        return ($user->first_name. ' '. $user->last_name);
        
    }

    protected $appends = [
        'fullName'
    ];

    protected $hidden = [
        'user_id',
        'transaction_id',
        'updated_at',
        'created_at'
    ];
}
