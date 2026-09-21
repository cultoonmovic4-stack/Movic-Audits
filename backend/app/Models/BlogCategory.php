<?php

namespace App\Models;

use App\Traits\HasGlobalSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogCategory extends Model
{
    use HasFactory, HasGlobalSlug;

    protected $table = 'blog_categories';

    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    /**
     * Blog posts in this category.
     */
    public function posts(): HasMany
    {
        return $this->hasMany(BlogPost::class, 'category_id');
    }
}
