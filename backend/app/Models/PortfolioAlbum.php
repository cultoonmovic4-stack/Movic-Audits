<?php

namespace App\Models;

use App\Traits\HasGlobalSlug;
use App\Traits\HasLifecycleStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PortfolioAlbum extends Model
{
    use HasFactory, HasGlobalSlug, HasLifecycleStatus, SoftDeletes;

    protected $table = 'portfolio_albums';

    public const STATUS_DRAFT = 'draft';
    public const STATUS_PUBLISHED = 'published';
    public const STATUS_ARCHIVED = 'archived';

    public const STATUSES = [
        self::STATUS_DRAFT,
        self::STATUS_PUBLISHED,
        self::STATUS_ARCHIVED,
    ];

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'description',
        'cover_media_id',
        'status',
        'featured',
        'sort_order',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope query to published albums.
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PUBLISHED);
    }

    /**
     * Scope query to featured albums.
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('featured', true);
    }

    /**
     * Parent category.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(PortfolioCategory::class, 'category_id');
    }

    /**
     * Cover media asset.
     */
    public function coverMedia(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'cover_media_id');
    }

    /**
     * Album gallery images.
     */
    public function images(): HasMany
    {
        return $this->hasMany(PortfolioImage::class, 'album_id')->orderBy('sort_order');
    }
}
