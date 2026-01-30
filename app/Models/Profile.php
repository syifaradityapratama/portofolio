<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name',
        'role',
        'bio',
        'is_open_to_work',
        'image',
        'logo',
        'resume',
        'linkedin',
        'github',
        'whatsapp',
        'instagram',
        'email',
    ];
}
