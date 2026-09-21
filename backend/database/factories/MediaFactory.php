<?php

namespace Database\Factories;

use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Media>
 */
class MediaFactory extends Factory
{
    protected $model = Media::class;

    public function definition(): array
    {
        return [
            'disk' => 'public',
            'path' => 'media/' . date('Y/m') . '/' . Str::uuid() . '.webp',
            'original_name' => fake()->word() . '.webp',
            'mime_type' => 'image/webp',
            'size' => fake()->numberBetween(100000, 2000000),
            'alt_text' => fake()->sentence(3),
            'uploaded_by' => User::factory(),
        ];
    }
}
