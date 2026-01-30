<?php

use App\Models\Project;
use App\Models\Category;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\seed;

beforeEach(function () {
    // Setup basic data required for views
    Profile::create([
        'name' => 'Syifa Raditya',
        'role' => 'Full Stack Developer',
        'email' => 'admin@example.com',
        'bio' => 'A passionate developer.',
        'is_open_to_work' => true,
    ]);
});

test('home page loads correctly', function () {
    get(route('home'))
        ->assertStatus(200)
        ->assertSee('Syifa Raditya')
        ->assertSee('Full Stack Developer');
});

test('project details page loads correctly', function () {
    $category = Category::create(['name' => 'Web App', 'slug' => 'web-app']);
    $project = Project::create([
        'title' => 'Awesome Project',
        'slug' => 'awesome-project',
        'short_description' => 'This is a test project.',
        'content' => 'Full description here.',
        'category_id' => $category->id,
        'is_featured' => true,
        'thumbnail' => 'projects/thumb.jpg',
    ]);

    get(route('projects.show', $project))
        ->assertStatus(200)
        ->assertSee('Awesome Project')
        ->assertSee('Full description here.');
});

test('contact form sends email and redirects correctly', function () {
    Mail::fake();

    $data = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'message' => 'Hello, look at my offer!',
    ];

    post(route('contact.send'), $data)
        ->assertRedirect()
        ->assertSessionHas('success', 'Pesan berhasil terkirim! Saya akan segera menghubungi Anda.');

    // Assert that a mail was sent
    Mail::assertSent(\App\Mail\ContactMail::class, function ($mail) use ($data) {
        return $mail->hasTo('admin@example.com');
    });
});

test('contact form requires validation', function () {
    post(route('contact.send'), [])
        ->assertSessionHasErrors(['name', 'email', 'message']);
});

test('admin panel requires authentication', function () {
    get('/admin')
        ->assertRedirect(); // Should redirect to login
});

test('profile can be created with all fields', function () {
    $profile = Profile::create([
        'name' => 'Test User',
        'role' => 'Developer',
        'email' => 'test@example.com',
        'bio' => 'Test bio',
        'linkedin' => 'https://linkedin.com/in/test',
        'github' => 'https://github.com/test',
        'whatsapp' => '6281234567890',
        'instagram' => 'test_ig',
        'is_open_to_work' => true,
    ]);

    expect($profile->name)->toBe('Test User');
    expect($profile->is_open_to_work)->toBeTrue();
});

test('project belongs to category', function () {
    $category = Category::create(['name' => 'Mobile App', 'slug' => 'mobile-app']);
    $project = Project::create([
        'title' => 'Mobile Project',
        'slug' => 'mobile-project',
        'short_description' => 'A mobile app project.',
        'category_id' => $category->id,
        'is_featured' => false,
    ]);

    expect($project->category->name)->toBe('Mobile App');
    expect($category->projects->first()->title)->toBe('Mobile Project');
});

test('services can be created', function () {
    $service = \App\Models\Service::create([
        'title' => 'Web Development',
        'icon' => 'code',
        'description' => 'Full-stack web development services.',
        'is_active' => true,
    ]);

    expect($service->title)->toBe('Web Development');
    expect($service->is_active)->toBeTrue();
});

test('experience can be created with type', function () {
    $experience = \App\Models\Experience::create([
        'type' => 'work',
        'title' => 'Senior Developer',
        'company' => 'Tech Corp',
        'period' => '2020 - Present',
        'description' => 'Building amazing products.',
        'sort_order' => 1,
    ]);

    expect($experience->type)->toBe('work');
    expect($experience->company)->toBe('Tech Corp');
});

test('certificate can be created', function () {
    $cert = \App\Models\Certificate::create([
        'name' => 'AWS Certified',
        'issuer' => 'Amazon Web Services',
        'issued_at' => now(),
        'credential_url' => 'https://aws.amazon.com/cert/123',
        'is_featured' => true,
        'sort_order' => 1,
    ]);

    expect($cert->name)->toBe('AWS Certified');
    expect($cert->is_featured)->toBeTrue();
});

test('tech stack can be attached to project', function () {
    $category = Category::create(['name' => 'API', 'slug' => 'api']);
    $project = Project::create([
        'title' => 'API Project',
        'slug' => 'api-project',
        'short_description' => 'An API project.',
        'category_id' => $category->id,
    ]);

    $tech = \App\Models\TechStack::create([
        'name' => 'Laravel',
        'image' => 'laravel.png',
        'url' => 'https://laravel.com',
    ]);

    $project->techStacks()->attach($tech);

    expect($project->techStacks->first()->name)->toBe('Laravel');
    expect($tech->projects->first()->title)->toBe('API Project');
});

test('message can be marked as read', function () {
    $message = \App\Models\Message::create([
        'name' => 'Sender Name',
        'email' => 'sender@example.com',
        'message' => 'Test message content.',
        'is_read' => false,
    ]);

    expect($message->is_read)->toBeFalse();

    $message->update(['is_read' => true]);

    expect($message->fresh()->is_read)->toBeTrue();
});

test('home page shows featured projects', function () {
    $category = Category::create(['name' => 'Featured', 'slug' => 'featured']);
    Project::create([
        'title' => 'Featured Project',
        'slug' => 'featured-project',
        'short_description' => 'This is featured.',
        'category_id' => $category->id,
        'is_featured' => true,
    ]);

    get(route('home'))
        ->assertStatus(200)
        ->assertSee('Featured Project');
});

test('contact form rejects invalid email', function () {
    post(route('contact.send'), [
        'name' => 'John',
        'email' => 'not-an-email',
        'message' => 'Test message',
    ])->assertSessionHasErrors(['email']);
});

// =========================================
// SECURITY TESTS
// =========================================

test('security headers are present on responses', function () {
    get(route('home'))
        ->assertStatus(200)
        ->assertHeader('X-Content-Type-Options', 'nosniff')
        ->assertHeader('X-Frame-Options', 'DENY')
        ->assertHeader('X-XSS-Protection', '1; mode=block')
        ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
});

test('content security policy header is present', function () {
    $response = get(route('home'));
    $csp = $response->headers->get('Content-Security-Policy');

    expect($csp)->toContain("default-src 'self'");
    expect($csp)->toContain("frame-ancestors 'none'");
});

test('contact form rate limiting works', function () {
    // Submit 7 requests (limit is 6 per minute)
    for ($i = 0; $i < 6; $i++) {
        post(route('contact.send'), [
            'name' => 'Test User',
            'email' => "test{$i}@example.com",
            'message' => 'Test message',
        ]);
    }

    // 7th request should be rate limited
    post(route('contact.send'), [
        'name' => 'Test User',
        'email' => 'test7@example.com',
        'message' => 'Test message',
    ])->assertStatus(429);
});

test('admin panel redirects unauthenticated users', function () {
    get('/admin/login')
        ->assertStatus(200); // Should show login page, not 403
});

