<?php

namespace Database\Factories;

use App\Models\Media;
use App\Models\PortfolioAlbum;
use App\Models\PortfolioCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<PortfolioAlbum>
 */
class PortfolioAlbumFactory extends Factory
{
    protected $model = PortfolioAlbum::class;

    public function definition(): array
    {
        $title = fake()->unique()->words(3, true);

        return [
            'category_id' => PortfolioCategory::factory(),
            'title' => ucwords($title),
            'slug' => Str::slug($title),
            'description' => '<p>' . fake()->paragraph() . '</p>',
            'cover_media_id' => Media::factory(),
            'status' => PortfolioAlbum::STATUS_PUBLISHED,
            'featured' => fake()->boolean(30),
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }

    public function draft(): static
    {
        return $this->state(fn () => [
            'status' => PortfolioAlbum::STATUS_DRAFT,
        ]);
    }
}
