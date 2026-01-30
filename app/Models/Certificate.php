<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'name',
        'issuer',
        'issued_at',
        'credential_url',
        'image',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'issued_at' => 'date',
        'is_featured' => 'boolean',
    ];
}
