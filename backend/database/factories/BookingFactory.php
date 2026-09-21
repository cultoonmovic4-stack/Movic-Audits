<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'service_id' => Service::factory(),
            'event_date' => fake()->dateTimeBetween('+1 week', '+6 months')->format('Y-m-d'),
            'event_location' => fake()->city(),
            'message' => fake()->paragraph(),
            'status' => Booking::STATUS_NEW,
            'internal_notes' => null,
        ];
    }
}
