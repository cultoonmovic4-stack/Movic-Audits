<?php

namespace App\Traits;

use InvalidArgumentException;

trait HasLifecycleStatus
{
    /**
     * Boot the trait to validate lifecycle status before saving.
     */
    public static function bootHasLifecycleStatus(): void
    {
        static::saving(function ($model) {
            $allowed = defined(static::class . '::STATUSES') ? static::STATUSES : [];
            if (! empty($allowed) && isset($model->status) && ! in_array($model->status, $allowed, true)) {
                throw new InvalidArgumentException(
                    sprintf("Invalid lifecycle status '%s' for %s. Allowed: %s",
                        $model->status,
                        class_basename($model),
                        implode(', ', $allowed)
                    )
                );
            }
        });
    }

    /**
     * Check if status is valid for this model.
     */
    public static function isValidStatus(string $status): bool
    {
        $allowed = defined(static::class . '::STATUSES') ? static::STATUSES : [];
        return in_array($status, $allowed, true);
    }
}
