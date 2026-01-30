<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Profile::firstOrCreate(
            ['email' => 'syifarpratama@gmail.com'],
            [
                'name' => 'Syifa Raditya Pratama',
                'role' => 'Full-Stack Developer & Marketing Enthusiast',
                'bio' => 'Menggabungkan keahlian teknis Laravel dengan strategi pemasaran digital untuk menciptakan solusi yang berdampak.',
                'linkedin' => 'https://linkedin.com/in/syifaradityapratama',
                'github' => 'https://github.com/syifaradityapratama',
                'is_open_to_work' => true,
            ]
        );
    }
}
