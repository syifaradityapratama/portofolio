<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Project;
use App\Models\TechStack;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure we have categories and tech stacks
        $webCat = Category::where('slug', '=', 'web-development')->first();
        $mobileCat = Category::where('slug', '=', 'mobile-development')->first();

        $laravel = TechStack::where('name', '=', 'Laravel')->first();
        $react = TechStack::where('name', '=', 'React')->first();
        $tailwind = TechStack::where('name', '=', 'Tailwind CSS')->first();
        $ts = TechStack::where('name', '=', 'TypeScript')->first();

        $projects = [
            [
                'title' => 'Modern E-Commerce',
                'slug' => 'modern-ecommerce',
                'category_id' => $webCat->id ?? 1,
                'short_description' => 'A fully functional e-commerce platform with real-time inventory and payment gateway.',
                'content' => '<p>Built a scalable e-commerce solution using Laravel for the backend and React for the frontend. Features include:</p><ul><li>Real-time cart updates</li><li>Stripe Payment Integration</li><li>Admin Dashboard</li></ul>',
                'thumbnail' => 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
                'live_link' => '#',
                'github_link' => '#',
                'is_featured' => true,
                'stacks' => [$laravel, $react, $tailwind],
            ],
            [
                'title' => 'Portfolio V2',
                'slug' => 'portfolio-v2',
                'category_id' => $webCat->id ?? 1,
                'short_description' => 'My personal portfolio website showcasing projects and skills with 3D animations.',
                'content' => '<p>A god-tier portfolio website built with:</p><ul><li>React + Inertia.js</li><li>Three.js for 3D elements</li><li>Framer Motion for animations</li></ul>',
                'thumbnail' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
                'live_link' => '#',
                'github_link' => '#',
                'is_featured' => true,
                'stacks' => [$react, $ts, $tailwind],
            ],
        ];

        foreach ($projects as $data) {
            $stacks = $data['stacks'];
            unset($data['stacks']);

            $project = Project::firstOrCreate(
                ['slug' => $data['slug']],
                $data
            );

            // Sync Tech Stacks
            $stackIds = collect($stacks)->filter()->pluck('id')->toArray();
            $project->techStacks()->sync($stackIds);
        }
    }
}
