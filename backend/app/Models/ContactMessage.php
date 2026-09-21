<?php

namespace App\Models;

use App\Traits\HasLifecycleStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory, HasLifecycleStatus;

    protected $table = 'contact_messages';

    public const STATUS_NEW = 'new';
    public const STATUS_READ = 'read';
    public const STATUS_REPLIED = 'replied';
    public const STATUS_ARCHIVED = 'archived';

    public const STATUSES = [
        self::STATUS_NEW,
        self::STATUS_READ,
        self::STATUS_REPLIED,
        self::STATUS_ARCHIVED,
    ];

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
    ];

    /**
     * Prevent physical deletion per architectural decision (ADR v1.1.1).
     */
    protected static function booted(): void
    {
        static::deleting(function ($message) {
            throw new \DomainException('Physical deletion of contact messages is strictly prohibited. Update status instead.');
        });
    }

    /**
     * Explicitly reject force deletion.
     */
    public function forceDelete()
    {
        throw new \DomainException('Physical deletion of contact messages is strictly prohibited. Update status instead.');
    }
}
