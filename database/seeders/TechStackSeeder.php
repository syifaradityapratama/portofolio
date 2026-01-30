<?php

namespace Database\Seeders;

use App\Models\TechStack;
use Illuminate\Database\Seeder;

class TechStackSeeder extends Seeder
{
    public function run(): void
    {
        $stacks = [
            ['name' => 'Laravel', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg', 'url' => 'https://laravel.com'],
            ['name' => 'React', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', 'url' => 'https://react.dev'],
            ['name' => 'TypeScript', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg', 'url' => 'https://www.typescriptlang.org'],
            ['name' => 'Tailwind CSS', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', 'url' => 'https://tailwindcss.com'],
            ['name' => 'MySQL', 'image' => 'https://www.mysql.com/common/logos/logo-mysql-170x115.png', 'url' => 'https://www.mysql.com'],
            ['name' => 'Figma', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg', 'url' => 'https://www.figma.com'],
        ];

        foreach ($stacks as $stack) {
            TechStack::firstOrCreate(
                ['name' => $stack['name']],
                $stack
            );
        }
    }
}
