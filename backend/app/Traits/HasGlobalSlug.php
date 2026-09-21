<?php

namespace App\Traits;

use App\Services\SlugService;
use DomainException;

trait HasGlobalSlug
{
    public static function bootHasGlobalSlug(): void
    {
        static::saving(function ($model) {
            $slugService = app(SlugService::class);

            if (empty($model->slug)) {
                $sourceField = isset($model->title) ? 'title' : (isset($model->name) ? 'name' : 'slug');
                $model->slug = $slugService->generate($model->{$sourceField} ?? 'item', $model);
            } elseif ($model->isDirty('slug')) {
                if (! $slugService->isGloballyUnique($model->slug, $model)) {
                    throw new DomainException("Slug '{$model->slug}' is already in use globally across active, archived, or soft-deleted records.");
                }
            }
        });

        static::saved(function ($model) {
            app(SlugService::class)->syncModel($model);
        });

        static::deleted(function ($model) {
            app(SlugService::class)->release($model);
        });
    }
}
