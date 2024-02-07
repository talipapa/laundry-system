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
        'reserved_at',
        'addons',
        'total_price',
        'service_type'
    ];

    protected $casts = [
        'addons' => 'array',
        'is_reviewed' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected $statusMapping = [
        'waiting' => 'text-yellow-400',
        'washing' => 'text-blue-400',
        'pickup' => 'text-green-400',
        'complete' => 'text-green-100',
    ];

    public function getStatusAttribute($value)
    {
        if (isset($this->attributes['status']) && array_key_exists($this->attributes['status'], $this->statusMapping)) {
            return [
                'name' => $this->attributes['status'],
                'foreground' => $this->statusMapping[$this->attributes['status']]
            ];
        }
        return $value;
    }
}
