<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory;

    protected $table = 'media';

    protected $fillable = [
        'disk',
        'path',
        'original_name',
        'mime_type',
        'size',
        'alt_text',
        'uploaded_by',
    ];

    protected $casts = [
        'size' => 'integer',
    ];

    protected $appends = [
        'url',
    ];

    /**
     * Prevent deletion if referenced anywhere in active, archived, or soft-deleted records.
     */
    protected static function booted(): void
    {
        static::deleting(function ($media) {
            $count = $media->getReferenceCount();
            if ($count > 0) {
                throw new \DomainException("Cannot delete media ID {$media->id}: file is referenced in {$count} place(s).");
            }
        });
    }

    /**
     * Dynamically generated absolute URL from active environment.
     */
    public function getUrlAttribute(): string
    {
        return Storage::disk($this->disk ?: 'public')->url($this->path);
    }

    /**
     * Administrator who uploaded the media.
     */
    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Calculate active references across the entire database,
     * specifically including soft-deleted and archived records.
     */
    public function getReferenceCount(): int
    {
        $serviceRefs = Service::withTrashed()->where('media_id', $this->id)->count();
        $albumCoverRefs = PortfolioAlbum::withTrashed()->where('cover_media_id', $this->id)->count();
        $portfolioImageRefs = PortfolioImage::where('media_id', $this->id)->count();
        $blogPostRefs = BlogPost::withTrashed()->where('featured_media_id', $this->id)->count();
        $testimonialRefs = Testimonial::withTrashed()->where('client_image_media_id', $this->id)->count();

        return $serviceRefs + $albumCoverRefs + $portfolioImageRefs + $blogPostRefs + $testimonialRefs;
    }

    /**
     * Check if media is actively referenced anywhere.
     */
    public function isReferenced(): bool
    {
        return $this->getReferenceCount() > 0;
    }
}
