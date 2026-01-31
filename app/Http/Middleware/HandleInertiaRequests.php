<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $about = $this->getAboutData();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'about' => $about,
            // Mocking these for now to prevent hydration errors until backend Controller is updated
            'techStacks' => [],
            'services' => [],
            'projects' => [],
            'certificates' => [],
            'experiences' => [],
        ];
    }

    private function getAboutData()
    {
        // Ambil data dari Database
        $profile = \App\Models\Profile::first(['*']);

        // Fallback jika database kosong (biar gak error)
        if (!$profile) {
            return [
                'name' => 'Syifa Raditya Pratama',
                'role' => 'Full-Stack Developer',
                'short_desc' => 'Profile belum diisi di Admin Panel.',
                'long_desc' => 'Deskripsi lengkap belum diisi.',
                'email' => 'admin@example.com',
                'linkedin' => '#',
                'github' => '#',
                'image' => 'images/profile.png', // Default
            ];
        }

        return [
            'name' => $profile->name,
            'role' => $profile->role,
            'short_desc' => $profile->bio,
            'long_desc' => $profile->about_me ?? $profile->bio, // Fallback to bio if empty
            'email' => $profile->email,
            'linkedin' => $profile->linkedin,
            'github' => $profile->github,
            'whatsapp' => $profile->whatsapp ? (str_starts_with($profile->whatsapp, '0') ? '62' . substr($profile->whatsapp, 1) : $profile->whatsapp) : null,
            'instagram' => $profile->instagram,
            'is_open_to_work' => $profile->is_open_to_work,
            // Jika user upload foto di admin, pakai itu. Kalau gak, pakai default.
            'image' => $profile->image ? 'storage/' . $profile->image : 'images/profile.png',
            'logo' => $profile->logo ? 'storage/' . $profile->logo : null,
            'resume' => $profile->resume ? 'storage/' . $profile->resume : null,
        ];
    }
}
