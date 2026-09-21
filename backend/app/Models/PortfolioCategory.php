<?php

namespace App\Models;

use App\Traits\HasGlobalSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PortfolioCategory extends Model
{
    use HasFactory, HasGlobalSlug;

    protected $table = 'portfolio_categories';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    /**
     * Portfolio albums in this category.
     */
    public function albums(): HasMany
    {
        return $this->hasMany(PortfolioAlbum::class, 'category_id');
    }
}
