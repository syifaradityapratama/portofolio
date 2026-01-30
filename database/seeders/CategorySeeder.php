<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Web Development',
            'Mobile Development',
            'UI/UX Design',
            'Data Analysis',
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate([
                'name' => $category,
                'slug' => \Illuminate\Support\Str::slug($category),
            ]);
        }
    }
}
