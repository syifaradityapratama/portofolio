<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Project;
use App\Models\TechStack;

class BrowserTestSeeder extends Seeder
{
    public function run()
    {
        $category = Category::firstOrCreate(
            ['slug' => 'web-dev'],
            ['name' => 'Web Development']
        );

        $project = Project::firstOrCreate(
            ['slug' => 'browser-test-project'],
            [
                'title' => 'Browser Test Project',
                'category_id' => $category->id,
                'short_description' => 'Test Desc',
                'content' => 'Test Content',
                'thumbnail' => 'projects/thumb.jpg',
                'is_featured' => true,
            ]
        );

        $techStack = TechStack::firstOrCreate(
            ['name' => 'Laravel'],
            ['image' => 'tech-stacks/laravel.png']
        );

        $project->techStacks()->syncWithoutDetaching([$techStack->id]);

        $this->command->info('Browser test data seeded!');
    }
}
