<?php

namespace Database\Factories;

use App\Models\Media;
use App\Models\PortfolioAlbum;
use App\Models\PortfolioImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PortfolioImage>
 */
class PortfolioImageFactory extends Factory
{
    protected $model = PortfolioImage::class;

    public function definition(): array
    {
        return [
            'album_id' => PortfolioAlbum::factory(),
            'media_id' => Media::factory(),
            'caption' => fake()->sentence(),
            'alt_text' => fake()->words(3, true),
            'sort_order' => fake()->numberBetween(1, 20),
        ];
    }
}
