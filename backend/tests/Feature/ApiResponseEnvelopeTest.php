<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiResponseEnvelopeTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful response envelope format.
     */
    public function test_success_response_envelope_format(): void
    {
        $response = $this->getJson('/api/v1/ping');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data',
            ])
            ->assertJson([
                'success' => true,
            ]);
    }

    /**
     * Test 401 unauthenticated response envelope format.
     */
    public function test_unauthenticated_error_envelope_format(): void
    {
        $response = $this->getJson('/api/v1/auth/me');

        $response->assertStatus(401)
            ->assertJsonStructure([
                'success',
                'message',
                'data',
                'errors',
            ])
            ->assertJson([
                'success' => false,
                'data' => null,
            ]);
    }

    /**
     * Test 403 forbidden response envelope format.
     */
    public function test_forbidden_error_envelope_format(): void
    {
        $user = User::factory()->create(['role' => 'editor']);

        $response = $this->actingAs($user)->getJson('/api/v1/admin/ping');

        $response->assertStatus(403)
            ->assertJsonStructure([
                'success',
                'message',
                'data',
                'errors',
            ])
            ->assertJson([
                'success' => false,
                'data' => null,
            ]);
    }

    /**
     * Test 404 route not found error envelope format for API requests.
     */
    public function test_not_found_error_envelope_format(): void
    {
        $response = $this->getJson('/api/v1/non-existent-endpoint');

        $response->assertStatus(404)
            ->assertJsonStructure([
                'success',
                'message',
                'data',
                'errors',
            ])
            ->assertJson([
                'success' => false,
                'data' => null,
            ]);
    }

    /**
     * Test 422 validation error envelope format.
     */
    public function test_validation_error_envelope_format(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'not-an-email',
            // password omitted
        ]);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'data',
                'errors' => [
                    'email',
                    'password',
                ],
            ])
            ->assertJson([
                'success' => false,
                'data' => null,
            ]);
    }
}
