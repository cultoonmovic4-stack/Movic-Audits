<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SlugRegistry extends Model
{
    use HasFactory;

    protected $table = 'slug_registry';

    protected $fillable = [
        'slug',
        'sluggable_type',
        'sluggable_id',
    ];
}
