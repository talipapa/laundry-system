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
        'user_id',
        'rating',
        'comment',
    ];

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
        'updated_at',
        'created_at'
    ];
}
