<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApplicationBootTest extends TestCase
{
    /**
     * Test that the API ping endpoint boots and returns the approved envelope.
     */
    public function test_api_ping_returns_standard_success_envelope(): void
    {
        $response = $this->getJson('/api/v1/ping');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'environment',
                    'timestamp',
                ],
            ])
            ->assertJson([
                'success' => true,
                'message' => 'Movic Audits API v1 online.',
            ]);
    }
}
