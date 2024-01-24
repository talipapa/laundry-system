<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;

class Transaction extends Model
{
    use HasFactory;
    use HasUlids;

    protected $fillable = [
        'user_id',
        'status',
        'is_reviewed',
        'addons',
    ];

    protected $casts = [
        'addons' => 'array',
        'is_reviewed' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
