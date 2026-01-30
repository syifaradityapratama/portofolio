<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // INI YANG BENER BUAT PESAN
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');     // Nama pengirim
            $table->string('email');    // Email pengirim
            $table->text('message');    // Isi pesan
            $table->boolean('is_read')->default(false); // Penanda udah dibaca belum
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};