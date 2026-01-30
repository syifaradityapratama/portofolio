<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'syifarpratama@gmail.com'],
            [
                'name' => 'Syifa Raditya Pratama',
                'password' => bcrypt('raditya11'),
                'email_verified_at' => now(),
            ]
        );

        // Content Seeders (Disabled for Production Manual Entry)
        // $this->call([
        //     ProfileSeeder::class,
        //     CategorySeeder::class,
        //     ServiceSeeder::class,
        //     TechStackSeeder::class,
        //     ProjectSeeder::class,
        // ]);
    }
}
