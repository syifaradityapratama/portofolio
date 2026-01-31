<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/project/{project:slug}', [HomeController::class, 'show'])->name('projects.show');

//Jalur Pos buat kirim pesan
Route::post('/contact', [HomeController::class, 'contact'])->name('contact.send')->middleware('throttle:6,1');
