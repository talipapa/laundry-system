<?php

namespace Database\Factories;

use App\Selections\ServiceAddons;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use App\Selections\ServiceType;

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
        $totalPrice = 0;
        $addons = [
            ServiceAddons::SHOE_CLEANING->name => ServiceAddons::SHOE_CLEANING->value,
            ServiceAddons::IRONING->name => ServiceAddons::IRONING->value,
        ];

        foreach ($addons as $key => $value) {
            $totalPrice += $value;
        }

        $serviceType = strtoupper(Arr::random([ServiceType::SELF_SERVICE->name, ServiceType::FULL_SERVICE->name]));
        $totalPrice += constant("App\Selections\ServiceType::{$serviceType}")->value;

        return [
            'user_id' => fake()->numberBetween(50, 200),
            'status' => Arr::random(['waiting', 'washing', 'pickup', 'complete']),
            'addons' => [ServiceAddons::SHOE_CLEANING->name, ServiceAddons::IRONING->name],
            'service_type' => $serviceType,
            'total_price' => $totalPrice,
            'reserved_at' => fake()->dateTimeBetween('-1 week', '+1 week'),
            'is_reviewed' => Arr::random([true, false]),
        ];
    }
}

