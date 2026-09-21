<?php

namespace App\Models;

use App\Traits\HasLifecycleStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory, HasLifecycleStatus;

    protected $table = 'bookings';

    public const STATUS_NEW = 'new';
    public const STATUS_CONTACTED = 'contacted';
    public const STATUS_IN_PROGRESS = 'in_progress';
    public const STATUS_CONFIRMED = 'confirmed';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_CANCELLED = 'cancelled';

    public const STATUSES = [
        self::STATUS_NEW,
        self::STATUS_CONTACTED,
        self::STATUS_IN_PROGRESS,
        self::STATUS_CONFIRMED,
        self::STATUS_COMPLETED,
        self::STATUS_CANCELLED,
    ];

    protected $fillable = [
        'name',
        'email',
        'phone',
        'service_id',
        'event_date',
        'event_location',
        'message',
        'status',
        'internal_notes',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];

    /**
     * Prevent physical deletion per architectural decision (ADR v1.1.1).
     */
    protected static function booted(): void
    {
        static::deleting(function ($booking) {
            throw new \DomainException('Physical deletion of bookings is strictly prohibited. Update status instead.');
        });
    }

    /**
     * Explicitly reject force deletion.
     */
    public function forceDelete()
    {
        throw new \DomainException('Physical deletion of bookings is strictly prohibited. Update status instead.');
    }

    /**
     * Service requested in booking enquiry.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
}
