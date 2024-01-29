<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Davila',
            'email' => 'davilajohn810@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'owner'
        ]);

        User::factory(200)->create();

        // Make a factory of 200 transactions from transaction model
        \App\Models\Transaction::factory(200)->create();
        \App\Models\Review::factory(50)->create();
    }
}
