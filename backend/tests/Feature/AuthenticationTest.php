<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_authenticate_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@movicaudits.test',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@movicaudits.test',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'user' => [
                        'id',
                        'name',
                        'email',
                        'role',
                    ],
                ],
            ])
            ->assertJson([
                'success' => true,
                'message' => 'Login successful.',
                'data' => [
                    'user' => [
                        'email' => 'admin@movicaudits.test',
                        'role' => 'admin',
                    ],
                ],
            ]);

        $this->assertAuthenticatedAs($user);
    }

    public function test_user_cannot_authenticate_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'admin@movicaudits.test',
            'password' => Hash::make('password123'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@movicaudits.test',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
            ])
            ->assertJsonValidationErrors(['email']);

        $this->assertGuest();
    }

    public function test_unauthenticated_request_receives_401(): void
    {
        $response = $this->getJson('/api/v1/auth/me');

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Unauthenticated. Please log in to continue.',
            ]);
    }

    public function test_authenticated_user_can_retrieve_profile(): void
    {
        $user = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@movicaudits.test',
            'role' => 'admin',
        ]);

        $response = $this->actingAs($user)->getJson('/api/v1/auth/me');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => 'Admin User',
                        'email' => 'admin@movicaudits.test',
                        'role' => 'admin',
                    ],
                ],
            ]);
    }

    public function test_authenticated_admin_can_access_admin_routes(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->getJson('/api/v1/admin/ping');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Administrative API accessible.',
                'data' => [
                    'authorized' => true,
                ],
            ]);
    }

    public function test_non_admin_user_receives_403_on_admin_routes(): void
    {
        $regularUser = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($regularUser)->getJson('/api/v1/admin/ping');

        $response->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'You do not have permission to access the administrative area.',
            ]);
    }

    public function test_authenticated_user_can_logout(): void
    {
        $user = User::factory()->create([
            'email' => 'logout@movicaudits.test',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        $this->postJson('/api/v1/auth/login', [
            'email' => 'logout@movicaudits.test',
            'password' => 'password123',
        ])->assertStatus(200);

        $response = $this->postJson('/api/v1/auth/logout');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Logged out successfully.',
            ]);

        Auth::forgetGuards();

        $this->getJson('/api/v1/auth/me')->assertStatus(401);
    }

    public function test_login_is_throttled_after_5_attempts(): void
    {
        User::factory()->create([
            'email' => 'throttled@movicaudits.test',
            'password' => Hash::make('secret'),
        ]);

        // 5 failed attempts
        for ($i = 0; $i < 5; $i++) {
            $response = $this->postJson('/api/v1/auth/login', [
                'email' => 'throttled@movicaudits.test',
                'password' => 'wrong',
            ]);
            $response->assertStatus(422);
        }

        // 6th attempt should trigger 429
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'throttled@movicaudits.test',
            'password' => 'wrong',
        ]);

        $response->assertStatus(429);
    }
}
