<?php

namespace Database\Factories;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<BlogPost>
 */
class BlogPostFactory extends Factory
{
    protected $model = BlogPost::class;

    public function definition(): array
    {
        $title = fake()->unique()->words(4, true);

        return [
            'category_id' => BlogCategory::factory(),
            'author_id' => User::factory(),
            'featured_media_id' => Media::factory(),
            'title' => ucwords($title),
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(),
            'content' => '<p>' . fake()->paragraphs(3, true) . '</p>',
            'status' => BlogPost::STATUS_PUBLISHED,
            'published_at' => now()->subDays(rand(1, 30)),
            'seo_title' => ucwords($title) . ' | Movic Audits',
            'seo_description' => fake()->sentence(),
        ];
    }

    public function draft(): static
    {
        return $this->state(fn () => [
            'status' => BlogPost::STATUS_DRAFT,
            'published_at' => null,
        ]);
    }
}
