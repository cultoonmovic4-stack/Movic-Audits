<?php

namespace Database\Factories;

use App\Models\Media;
use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    protected $model = Testimonial::class;

    public function definition(): array
    {
        return [
            'client_name' => fake()->name(),
            'content' => fake()->paragraph(),
            'client_image_media_id' => Media::factory(),
            'status' => Testimonial::STATUS_PUBLISHED,
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }
}
