<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioImage extends Model
{
    use HasFactory;

    protected $table = 'portfolio_images';

    protected $fillable = [
        'album_id',
        'media_id',
        'caption',
        'alt_text',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    /**
     * Parent portfolio album.
     */
    public function album(): BelongsTo
    {
        return $this->belongsTo(PortfolioAlbum::class, 'album_id');
    }

    /**
     * Associated media asset.
     */
    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'media_id');
    }
}
