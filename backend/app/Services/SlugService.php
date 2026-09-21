<?php

namespace App\Services;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\PortfolioAlbum;
use App\Models\PortfolioCategory;
use App\Models\Service;
use App\Models\SlugRegistry;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SlugService
{
    /**
     * Models participating in the global slug registry.
     *
     * @var list<class-string<Model>>
     */
    protected static array $sluggedModels = [
        Service::class,
        PortfolioCategory::class,
        PortfolioAlbum::class,
        BlogCategory::class,
        BlogPost::class,
    ];

    /**
     * Generate a globally unique slug across all entities,
     * including active, archived, and soft-deleted records.
     */
    public function generate(string $text, ?Model $ignoreModel = null): string
    {
        $baseSlug = Str::slug($text);

        if (empty($baseSlug)) {
            $baseSlug = 'item';
        }

        $candidate = $baseSlug;
        $counter = 2;

        while (! $this->isGloballyUnique($candidate, $ignoreModel)) {
            $candidate = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $candidate;
    }

    /**
     * Atomically reserve a slug in the global database registry.
     * Concurrency-safe: handles MySQL unique key collisions by suffixing.
     */
    public function reserve(string $slug, string $sluggableType, ?int $sluggableId = null, ?Model $ignoreModel = null): string
    {
        $baseSlug = Str::slug($slug);
        if (empty($baseSlug)) {
            $baseSlug = 'item';
        }

        $candidate = $baseSlug;
        $counter = 2;

        while (true) {
            try {
                // If an ignoreModel exists and already holds this slug in registry, keep it
                if ($ignoreModel !== null && $ignoreModel->exists) {
                    $existing = SlugRegistry::where('sluggable_type', get_class($ignoreModel))
                        ->where('sluggable_id', $ignoreModel->getKey())
                        ->first();

                    if ($existing && $existing->slug === $candidate) {
                        return $candidate;
                    }
                }

                // Check pre-flight global uniqueness
                if (! $this->isGloballyUnique($candidate, $ignoreModel)) {
                    $candidate = $baseSlug . '-' . $counter;
                    $counter++;
                    continue;
                }

                // Atomic reservation via single database unique constraint
                SlugRegistry::create([
                    'slug' => $candidate,
                    'sluggable_type' => $sluggableType,
                    'sluggable_id' => $sluggableId,
                ]);

                return $candidate;
            } catch (QueryException $e) {
                // Duplicate entry caught due to concurrent race condition
                if ($e->getCode() === '23000' || str_contains($e->getMessage(), 'UNIQUE')) {
                    $candidate = $baseSlug . '-' . $counter;
                    $counter++;
                    continue;
                }
                throw $e;
            }
        }
    }

    /**
     * Check if candidate slug is globally unique across all registry and entity tables.
     */
    public function isGloballyUnique(string $slug, ?Model $ignoreModel = null): bool
    {
        // 1. Check central slug_registry table
        $registryQuery = SlugRegistry::where('slug', $slug);

        if ($ignoreModel !== null && $ignoreModel->exists) {
            $registryQuery->whereNot(function ($q) use ($ignoreModel) {
                $q->where('sluggable_type', get_class($ignoreModel))
                  ->where('sluggable_id', $ignoreModel->getKey());
            });
        }

        if ($registryQuery->exists()) {
            return false;
        }

        // 2. Check all individual registered entity tables (including withTrashed)
        foreach (self::$sluggedModels as $modelClass) {
            $query = $modelClass::query();

            if (in_array(\Illuminate\Database\Eloquent\SoftDeletes::class, class_uses_recursive($modelClass), true)) {
                $query->withTrashed();
            }

            $query->where('slug', $slug);

            if ($ignoreModel !== null && get_class($ignoreModel) === $modelClass && $ignoreModel->exists) {
                $query->where($ignoreModel->getKeyName(), '!=', $ignoreModel->getKey());
            }

            if ($query->exists()) {
                return false;
            }
        }

        return true;
    }

    /**
     * Synchronize a model's slug with the centralized registry.
     */
    public function syncModel(Model $model): void
    {
        if (empty($model->slug)) {
            return;
        }

        $registry = SlugRegistry::where('sluggable_type', get_class($model))
            ->where('sluggable_id', $model->getKey())
            ->first();

        if ($registry) {
            if ($registry->slug !== $model->slug) {
                $registry->update(['slug' => $model->slug]);
            }
        } else {
            SlugRegistry::updateOrCreate(
                ['slug' => $model->slug],
                [
                    'sluggable_type' => get_class($model),
                    'sluggable_id' => $model->getKey(),
                ]
            );
        }
    }

    /**
     * Release a slug from registry when an entity is physically hard-deleted.
     * Soft-deleted records retain their reservation permanently.
     */
    public function release(Model $model): void
    {
        // If soft-deleted, reservation must NOT be deleted
        if (in_array(\Illuminate\Database\Eloquent\SoftDeletes::class, class_uses_recursive($model), true)) {
            if ($model->trashed()) {
                return;
            }
        }

        SlugRegistry::where('sluggable_type', get_class($model))
            ->where('sluggable_id', $model->getKey())
            ->delete();
    }
}
