<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Web Development',
                'icon' => 'Monitor',
                'description' => 'Building responsive, high-performance websites using Laravel, React, and modern technologies.',
            ],
            [
                'title' => 'Mobile Applications',
                'icon' => 'Smartphone',
                'description' => 'Creating seamless mobile experiences for iOS and Android using React Native and Flutter.',
            ],
            [
                'title' => 'UI/UX Design',
                'icon' => 'Palette',
                'description' => 'Designing intuitive and aesthetically pleasing user interfaces that drive engagement.',
            ],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(
                ['title' => $service['title']],
                $service
            );
        }
    }
}
