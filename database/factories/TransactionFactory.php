<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(50, 200),
            'status' => Arr::random(['waiting', 'washing', 'pickup', 'complete']),
            'is_reviewed' => Arr::random([true, false]),
        ];
    }
}

