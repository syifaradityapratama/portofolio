<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Project;
use App\Models\Message;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // $about sudah di-handle via Middleware HandleInertiaRequests, jadi ga perlu di-fetch disini lagi.

        // Ambil Project dari Database (yang nanti lu isi di Admin Panel)
        $projects = Project::with('category')
            ->where('is_featured', '=', true, 'and') // Cuma tampilkan yang di-highlight
            ->latest()
            ->get();

        // Ambil semua kategori buat filter
        $categories = Category::all();

        // Ambil Tech Stack (cached for 1 hour)
        $techStacks = \Illuminate\Support\Facades\Cache::remember(
            'tech_stacks',
            3600,
            fn() =>
            \App\Models\TechStack::all()
        );

        // Ambil Services (cached for 1 hour)
        $services = \Illuminate\Support\Facades\Cache::remember(
            'active_services',
            3600,
            fn() =>
            \App\Models\Service::where('is_active', '=', true, 'and')->get()
        );

        // Ambil Experience (cached for 1 hour)
        $experiences = \Illuminate\Support\Facades\Cache::remember(
            'experiences',
            3600,
            fn() =>
            \App\Models\Experience::orderBy('sort_order', 'asc')->get()->groupBy('type')
        );

        // Ambil Certificates (cached for 1 hour)
        $certificates = \Illuminate\Support\Facades\Cache::remember(
            'certificates',
            3600,
            fn() =>
            \App\Models\Certificate::orderBy('sort_order', 'asc')->get()
        );

        return \Inertia\Inertia::render('Welcome', compact('projects', 'categories', 'techStacks', 'services', 'experiences', 'certificates'));
    }

    public function show(Project $project)
    {
        $project->load(['category', 'techStacks']);
        // about is handled by middleware
        return \Inertia\Inertia::render('Projects/Show', compact('project'));
    }

    public function contact(Request $request)
    {
        // 1. Validasi input biar gak asal-asalan
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // 2. Simpan ke Database
        Message::create($validated);

        // 3. Kirim Email ke Admin
        // Ambil email admin dari profile atau fallback
        $adminEmail = \App\Models\Profile::first(['*'])->email ?? 'syifarpratama@gmail.com';

        try {
            \Illuminate\Support\Facades\Mail::to($adminEmail)->queue(new \App\Mail\ContactMail($validated));
        } catch (\Exception $e) {
            // Log error tapi jangan bikin user error
            \Illuminate\Support\Facades\Log::error('Gagal kirim email: ' . $e->getMessage());
            // return redirect()->back()->with('error', 'Gagal kirim email: ' . $e->getMessage()); // Debug mode off
        }

        // 4. Balikin ke halaman depan + kasih notifikasi
        return redirect()->back()->with('success', 'Pesan berhasil terkirim! Saya akan segera menghubungi Anda.');
    }

    // getAboutData dipindah ke Middleware HandleInertiaRequests
}
