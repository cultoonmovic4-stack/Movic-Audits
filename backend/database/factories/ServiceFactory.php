<?php

namespace Database\Factories;

use App\Models\Media;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    protected $model = Service::class;

    public function definition(): array
    {
        $title = fake()->unique()->words(3, true);

        return [
            'title' => ucwords($title),
            'slug' => Str::slug($title),
            'short_description' => fake()->sentence(),
            'description' => '<p>' . fake()->paragraph() . '</p>',
            'media_id' => Media::factory(),
            'status' => Service::STATUS_PUBLISHED,
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }

    public function draft(): static
    {
        return $this->state(fn () => [
            'status' => Service::STATUS_DRAFT,
        ]);
    }

    public function archived(): static
    {
        return $this->state(fn () => [
            'status' => Service::STATUS_ARCHIVED,
        ]);
    }
}
