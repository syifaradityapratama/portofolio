<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/project/{project:slug}', [HomeController::class, 'show'])->name('projects.show');

//Jalur Pos buat kirim pesan
Route::post('/contact', [HomeController::class, 'contact'])->name('contact.send')->middleware('throttle:6,1');

Route::get('/reset-password-secure-999', function () {
    $email = 'syifarpratama@gmail.com';
    $user = \App\Models\User::where('email', $email)->first();

    if (!$user) {
        $user = new \App\Models\User();
        $user->name = 'Syifa Raditya';
        $user->email = $email;
        $user->password = bcrypt('raditya11');
        $user->save();
        return "⚠️ User TIDAK ADA sebelumnya. <br>✅ Tapi sekarang SUDAH SAYA BUATKAN. <br><br>Email: $email <br>Password: raditya11";
    }

    $user->password = bcrypt('raditya11');
    $user->save();
    return "✅ User DITEMUKAN. <br>🔐 Password berhasil di-reset menjadi: raditya11";
});
