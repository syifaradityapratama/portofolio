<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'type',
        'title',
        'company',
        'period',
        'description',
        'sort_order',
    ];
}
